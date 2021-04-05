const {postQuery} = require('gatsby-source-ac/helpers')
const path = require('path')
const ac_strings = require('../../src/strings/ac_strings')
const {formatsAll,typesAll} = require('../../src/strings/static/topic-ids')
const listTemplate = 'src/templates/archive/post-list-query.tsx'
const videoTemplate = 'src/templates/archive/video-list.tsx'
const {  normalizePostRes } = require('../../src/helpers/normalizers')
const perPage= 12
const languagePostQuery = postQuery



module.exports.getSubTopicsAndFeaturedPosts = (id)=>`{
  ac {
      topic(id: ${id}) {
          id
          name
          subTopics {
            id
            name
            group_id
            slug
          }
          posts(isFeatured: true) {
            ${languagePostQuery}
          }
      }
      
  }
}`

module.exports.getSubTopics = (id)=>`{
  ac {
      topic(id: ${id}) {
          id
          name
          subTopics {
            id
            name
            group_id
            slug
          }
      }
      
  }
}`
module.exports.getTopicPagination=(id)=>`
  topic(id:${id}) {
    name
    somePosts(first:${perPage}){
          paginatorInfo {
            total
            count
            currentPage
          }
        }
    }
  }
`
const getPostsPerPageQuery = (id,page)=>`{
  ac {
    topic(id:${id}) {
      allPosts:somePosts(first:${perPage},page:${page}){
        data{
           ${postQuery}
        }
      }
    }
  }
}`
module.exports.getPostsPerPageQuery=getPostsPerPageQuery

module.exports.getPopularPosts=(id)=>`
  popularPosts:topic(id:${id}) {
    somePosts(orderBy:{column:VIEWS, order:DESC}){
      data {
        ${languagePostQuery}
      }
    }
  }
`

module.exports.getSubTopicPosts=(id1,id2) =>`{
  ac {
      topic(id: ${id1}) {
          id
          name
          noOfPosts (hasTopics: { value: ${id2}, column: ID })
          somePosts (hasTopics: { value: ${id2}, column: ID },first:${perPage},page:1){
            data {
              ${postQuery}
            }
          }
      }
  }
}`

module.exports.createArchivePages =async function ({
  graphql,
  createPage, 
  paginatorInfo,
  node,
  baseUrl,
  breadcrumb,
  topicType
}){
  const count = 10
  const {total}=paginatorInfo
  const hasRecommendPage=total>count
  const totalPages = Math.ceil(total/perPage);

  //*only create the first page, and use query strings for the rest
      for (let i = 1; i <=1; i++){
        let currentPage = i
        let pagePath = `${baseUrl}/${currentPage}`
        if(i===1){
            pagePath=`${baseUrl}${hasRecommendPage && topicType==='topic'?'/1':''}`
        }
        const component = (`${node.id}`===typesAll.watch || `${node.id}`===formatsAll.animation)?path.resolve(videoTemplate): path.resolve(listTemplate)
        const paginate = {
          currentPage,
          totalPages,
          baseUrl,
          hasRecommendPage
        }

        const query=getPostsPerPageQuery(node.id,i)
        const perPagePosts = await graphql(query).then(res=>{
          if(res.data.ac && res.data.ac.topic && res.data.ac.topic.allPosts){
            return res.data.ac.topic.allPosts.data
          } else {
            console.log(query)
            throw new Error('not able to get pages')
          }

        })
        createPage({
          path:pagePath,
          component,
          context: {
            posts: perPagePosts.map(p=>normalizePostRes(p)),
            paginate,
            id:node.id,
            title:node.name,
            image:node.image,
            breadcrumb
          },
        })


      }
}

module.exports.createSubTopicPages=({
  type,
  createPage, 
  allPosts,
  topic,
  subTopic,
  isTopic,
  breadcrumb,
  totalCount
})=>{
    if (!totalCount) {

      console.log('No posts for this topic' + topic.name + '/' +subTopic.name)
    } else {
      const baseUrl = `${isTopic===true?`${ac_strings.slug_topic}/`:''}${topic.slug}/${subTopic.slug}`
      const pageBreadcrumb = breadcrumb?[...breadcrumb]:[]
      pageBreadcrumb.push( {
        name:subTopic.name,
        to:subTopic.slug
      })
      const totalPages = Math.ceil(totalCount / perPage)
      const component = (`${topic.id}`===typesAll.watch || 
      `${subTopic.id}`===typesAll.watch) ? path.resolve(videoTemplate) : path.resolve(listTemplate)
         
      let currentPage = 1
      // 
      for (let i = 0; i <=1; i += perPage, currentPage++) {
        let pagePath = `${baseUrl}${currentPage > 1 ? '/' + currentPage : ''}`
        const context = {
          id:topic.id,
          subTopicId:subTopic.id,
          type,
          posts: allPosts,
          paginate: {
            currentPage,
            totalPages,
            baseUrl
          },
          title:subTopic.name,
          breadcrumb:pageBreadcrumb,
          isTopic
/*            ...node */
        }

        createPage({
          path:pagePath,
          component,
          context,
        })
      }
    }

}
