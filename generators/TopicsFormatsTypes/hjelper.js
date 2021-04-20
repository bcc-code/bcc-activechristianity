const {postQuery} = require('gatsby-source-ac/helpers')
const path = require('path')
const ac_strings = require('../../src/strings/ac_strings')
const {formatsAll,typesAll} = require('../../src/strings/static/topic-ids')
const listTemplateQuery = 'src/templates/archive/post-list-query.tsx'
const listTemplateStatic = 'src/templates/archive/post-list.tsx'
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
  const isTopic = topicType==='topic'
  const isType = topicType==='type'
  const generatePageCount = isType?totalPages:1
  //*only create the first page, and use query strings for the rest
    let firstPostsDate = ''
      for (let i = 1; i <=generatePageCount; i++){
        let currentPage = i
        let pagePath = `${baseUrl}/${currentPage}`
       
        if(i===1){
            pagePath=`${baseUrl}${hasRecommendPage && isTopic ?'/1':''}`
        }
        console.log(pagePath)
        const component = isType?path.resolve(listTemplateStatic):path.resolve(listTemplateQuery)
      
        const paginate = {
          currentPage,
          totalPages,
          baseUrl,
          hasRecommendPage
        }

        const query=getPostsPerPageQuery(node.id,i)
        const perPagePosts = await graphql(query).then(res=>{
          if(res.data.ac && res.data.ac.topic && res.data.ac.topic.allPosts){
            const posts = res.data.ac.topic.allPosts.data
            
            if(i===1 && posts.length>0){
              firstPostsDate=posts[0].updated_at

            }
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
                fetchedPost: isType,
                pageType:isType?"category":"topic",
                type:node.topicType,
                updated_at:firstPostsDate,
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
  totalCount,
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
      const component = path.resolve(listTemplateQuery)
         
      let currentPage = 1
      // 
      let firstPostsDate = ''
      
      for (let i = 0; i <=1; i += perPage, currentPage++) {
        if(i===1 && allPosts.length>0){
          firstPostsDate=allPosts[0].updated_at

        }
        let pagePath = `${baseUrl}${currentPage > 1 ? '/' + currentPage : ''}`
        const pageType=isTopic?"topic":"category"
        const context = {
          id:topic.id,
          subTopicId:subTopic.id,
          pageType,
          updated_at:firstPostsDate,
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
