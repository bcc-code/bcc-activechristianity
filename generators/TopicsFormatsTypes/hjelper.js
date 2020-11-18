const {postQuery,postQueryNoPlaylist} = require('gatsby-source-ac/helpers')
const path = require('path')
const TS = require('../../src/strings')
const listTemplate = 'src/templates/archive/post-list.tsx'
const videoTemplate = 'src/templates/archive/video-list.tsx'
const baseUrl = process.env.API_URL
const perPage= 12
const languagePostQuery = process.env.LANG_CODE==="en"?postQuery:postQueryNoPlaylist
const formatsAll = {
  "animation":{
    keyId: process.env.ANIMATION_FILTER_ID,
    keyname: "animation",
  },
  "message":{
      keyId: process.env.MESSAGE_FILTER_ID,
      keyname: "message",
  },
  "song": {
      keyId: process.env.SONG_FILTER_ID,
      keyname: "song",
  },
  "edification":{
      keyId: process.env.EDIFICATION_FILTER_ID,
      keyname: "edification",
  },
  "testimony":{
      keyId: process.env.TESTIMONY_FILTER_ID,
      keyname: "testimony",
  },
  "question":{
      keyId: process.env.QUESTION_FILTER_ID,
      keyname: "question",
  },
  "commentary":{
      keyId: process.env.COMMENTARY_FILTER_ID,
      keyname: "commentary",
  },
  "interview":{
    keyId: process.env.INTERVIEW_FILTER_ID,
    keyname: "interview",
},
}
module.exports.formatsAll=formatsAll

const typesAll={
  "read":{
      keyId:process.env.READ_POSTS_FILTER_ID,
      keyname:"read"
  },
  "watch":{
      keyId:process.env.WATCH_POSTS_FILTER_ID,
      keyname:"watch"
  },
  "listen":{
      keyId:process.env.LISTEN_POSTS_FILTER_ID,
      keyname:"listen"
  }
}

module.exports.typesAll = typesAll


module.exports.formatScope = Object.keys(formatsAll).map(key=>formatsAll[key])

module.exports.typeScope = Object.keys(typesAll).map(key=>typesAll[key])

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
    somePosts(first:12){
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
  
      allPosts:somePosts(first:12,page:${page}){
        data{
          slug
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
          posts (hasTopics: { value: ${id2}, column: ID }){
            ${languagePostQuery}
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
  const {total,count}=paginatorInfo 
  const hasRecommendPage=total>10
  const totalPages = Math.ceil(total/count);
      for (let i = 1; i <=totalPages; i++){
        let currentPage = i
        let pagePath = `${baseUrl}/${currentPage}`
        if(i===1){
            pagePath=`${baseUrl}${hasRecommendPage && topicType==='topic'?'/1':''}`
        }
        
        const component = (`${node.id}`===process.env.WATCH_POSTS_FILTER_ID || `${node.id}`===process.env.ANIMATION_FILTER_ID)?path.resolve(videoTemplate): path.resolve(listTemplate)
        const paginate = {
          currentPage,
          totalPages:totalPages,
          baseUrl,
          hasRecommendPage
        }
        const query=getPostsPerPageQuery(node.id,i)
        const perPagePosts = await graphql(query).then(res=>res.data.ac.topic.allPosts.data.map(p=>p.slug))
            console.log(pagePath)
            
            createPage({
              path:pagePath,
              component,
              context: {
                posts: perPagePosts,
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
  breadcrumb
})=>{

    const totalCount = allPosts.length

    if (!totalCount) {

      console.log('No posts for this topic' + topic.name + '/' +subTopic.name)
    } else {
      const totalPages = Math.ceil(totalCount / perPage)
      const baseUrl = `${isTopic===true?`${TS.slug_topic}/`:''}${topic.slug}/${subTopic.slug}`
  
      const component = (`${topic.id}`===process.env.WATCH_POSTS_FILTER_ID || 
      `${subTopic.id}`===process.env.WATCH_POSTS_FILTER_ID)?path.resolve(videoTemplate):path.resolve(listTemplate)
      const pageBreadcrumb = breadcrumb?[...breadcrumb]:[]
  
      pageBreadcrumb.push(
  
      {
        name:subTopic.name,
        to:subTopic.slug
      }
      )
      
      let currentPage = 1
    
      for (let i = 0; i < totalCount; i += perPage, currentPage++) {
        let pagePath = `${baseUrl}${currentPage > 1 ? '/' + currentPage : ''}`
        console.log(pagePath)
  
        createPage({
          path:pagePath,
          component,
          context: {
            type,
            posts: allPosts.slice(i,i+perPage),
            paginate: {
              currentPage,
              totalPages,
              baseUrl
            },
            title:subTopic.name,
            breadcrumb:pageBreadcrumb,
            isTopic
  /*            ...node */
          },
        })
      }
    }

}