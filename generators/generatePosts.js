const _ = require('lodash')
const path = require('path')
const { postQuery} = require('gatsby-source-ac/helpers')
const {normalizePostRes,getRandomArray,normalizeAvailableLanguages} = require('../src/helpers/normalizers')
const  { formatsIds, typeIds } = require('../src/strings/static/topic-ids')

const template = 'src/templates/single-resource/post.tsx'

const query = `{
    allAcNodePost(limit:12) {
      pageInfo {
        totalCount
        itemCount
      }
      edges {
        node {
          title
          acId
          readMorePosts
          topics {
            id
          }
          authors {
            slug
            id
          }
        }
        
      }
    }
}`

const getPerPageQuery = (pageNr)=>{
  return `{
    allAcNodePost(limit:12,skip:${12*pageNr}) {
      edges {
        node {
          title
          acId
          ${postQuery}
          readMorePosts
          langs {
            lang
            slug
          }
          glossary {
              slug
              id
              content
              word
          }
          updated_at
        }
        
      }
    }
}`
}
const perPage = 12

const getauthorsPosts = (index)=>{
  return `
    {
      ac {
        authors (page:${index},hasPosts:true){
          data {
            name
              slug
              somePosts(first:12) {
                data {
                 slug
                }
              }
          
          }
        }
      }
    }
  `
}

/* BUILDER */
const authorsQuery = `
  {
    ac{
      authors(hasPosts:true){
        paginatorInfo {
          total
          count
        }

      }

    }
  }
`

const topicsQuery = `
{
  ac{
    topics {
      slug
      id
      noOfPosts
      somePosts(first:7) {
        paginatorInfo {
          total
          count
        }
        data {
          slug
        }
      }
    }

  }
}
`

const getTopicPostsPerPageQuery = (id,page)=>`{
  ac {
    topic(id:${id}) {	
  
      somePosts(first:12,page:${page}){
        data{
           slug
        }
      }
    }
  }
}`

const authorsWPosts = {}
const topicArchivePageCount={}

module.exports = async function generatePosts(actions, graphql) {
  const { createPage } = actions
   /* get all authors info and topics that belongs to each posts */
      const authorsRes = await graphql(authorsQuery)
      .then((result) => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        }else {
          return result
        }
      })

  /*get all authors*/
      const {authors}=authorsRes.data.ac

      const {count,total}= authors.paginatorInfo
      const pageCount=Math.ceil(total/count)
      const pageIndex= [];

      for (let i = 1; i <= pageCount; i++) {
        pageIndex.push(i);
      }

      for (let i = 1; i <= pageCount; i++) {
        console.log(i)
        const eachPageQuery=getauthorsPosts(i)
        const res = await graphql(eachPageQuery)
        if (res.data && res.data.ac && res.data.ac.authors && res.data.ac.authors.data && res.data.ac.authors.data[0]){
          const allAuthors = res.data.ac.authors.data
          _.each(allAuthors, (author)=>{
            authorsWPosts[author.slug]={
              name:author.name,
              slug:author.slug,
              posts:author.somePosts.data.map(p=>p.slug)
            }
          })
        } else {
          console.log(eachPageQuery)
          console.log('unexpected response')
          console.log(res)
        }
      }
    /* get all topics */
      const topicsRes = await graphql(topicsQuery).then((result) => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        }else {
          return result
        }
      })
      const {topics}=topicsRes.data.ac
        for (let i = 0; i < topics.length ; i++) {
          const t=topics[i]
          const toAdd = {
            count:Math.ceil(t.somePosts.paginatorInfo.total/ perPage),
            posts:{
              top:t.somePosts.data.map(p=>p.slug)
            }
          }

         if (!typeIds[t.id]){
            topicArchivePageCount[t.slug]=toAdd
          }
        }

        /*get all posts*/
        await graphql(query)
                .then(async (result) => {
                  if (result.errors) {
                    result.errors.forEach(e => console.error(e.toString()))
                    return Promise.reject(result.errors)
                  }

                  const pageInfo = result.data.allAcNodePost.pageInfo
                  const {totalCount,itemCount}=pageInfo
                  const pageCount=Math.ceil(totalCount/itemCount)
                  for (let i = 0; i < pageCount ; i++) {
                      const postsRes = await graphql(getPerPageQuery(i))
                      const posts = postsRes.data.allAcNodePost.edges
                      for (let k=0; k<posts.length;k++){
                        const {node}=posts[k]
                        const checkId = isNumeric(node.acId)
                        if(checkId){
                          const normalized = normalizePostRes(node)
                          const {langs}=node
                          const tranlsatedUrl = normalizeAvailableLanguages(langs, false)
                          let readMorePosts = node.readMorePosts
                          let recommendedPosts = []
                          let authorsPosts=[]
                          node.authors.map(a=>{
                            const filtered = authorsWPosts[a.slug].posts.filter(slug=>slug!==normalized.slug)
                            if(filtered.length>0){
                              authorsPosts.push({
                                name:a.name,
                                slug:a.slug,
                                posts:filtered
                              })
                            }
                            return authorsWPosts[a.slug]
                          })
                          const topicPosts = []
                          const formatPosts = []
                          
                            for (let j = 0; j < node.topics.length ; j++) {
                              const t=node.topics[j]
                              

                              if (!typeIds[t.id]){
                                const info = topicArchivePageCount[t.slug]
                              const getRandomCount = Math.ceil(Math.random() * info.count)
                              let toAdd = []
                              if(getRandomCount===1 ){
                            
                                toAdd = getRandomArray(info.posts.top,3)

                              } else {
                                
                                if(topicArchivePageCount[t.slug].posts[getRandomCount]){

                                toAdd = getRandomArray(info.posts[getRandomCount],3)
                                
                                } else {
                
                                  const topicPostsRes=await graphql(getTopicPostsPerPageQuery(t.id,getRandomCount))
                                                                  .then((result) => {
                                                                    if (result.errors) {
                                                                      result.errors.forEach(e => console.error(e.toString()))
                                                                      return Promise.reject(result.errors)
                                                                    }else {
                                                                      return result
                                                                    }
                                                                  })
                                
                                  const posts=topicPostsRes.data.ac.topic.somePosts.data.map(p=>p.slug)
                                  topicArchivePageCount[t.slug].posts[getRandomCount]=posts
                                  toAdd = getRandomArray(posts,3)
                                
                                }
                                
                              }
                              if(`${t.id}`===`108198`){
                                console.log(node.meta)
                              }
                              if(formatsIds[t.id]){
                                formatPosts.push({
                                  ...t,
                                  posts:toAdd
                                })
                              } else {
                                topicPosts.push({
                                  ...t,
                                  posts:toAdd
                                })
                              }
                              }
                              
                              
                              
                              
            
                            }  
                          // add recommendedPosts to readmore post
                            /* await sendQuery(recommendedByPostQuery(node.acId),endpoints.api_url,{ "x-lang": process.env.LANG_CODE})
                            .then(res=>{
                              if(res && res.recommendedByPost){
                                recommendedPosts=res.recommendedByPost.map(p=>p.slug)
                                
                              }
                              return
                            }) */
                            
                              let randName = [];
                              let recommendPostsSlugs = [...recommendedPosts]
                              let randomRecommendPosts=[]
                              if (recommendPostsSlugs.length > 0) {
                                  const count=readMorePosts.length>2?3:recommendPostsSlugs.length
                                  randName = getRandomArray(recommendPostsSlugs, count)
                                  // prepare to remove dupicates in readmores 
                                  randomRecommendPosts = randName.map(item => item.replace(/^\/|\/$/g, ''))
                              }
                              let allInterestedPosts = [...randomRecommendPosts, ...readMorePosts]
                              allInterestedPosts = [...new Set(allInterestedPosts)]
                              

                              
                             
                              const {media, types,format}=normalized
                              const mediaTypes= []

                              let defaultMediaType = "none"
                              if (media.audio) {
                                  mediaTypes.push("audio")
                                  defaultMediaType = "audio"
                              }
                              if (media.video && media.video.src) {
          
                                  mediaTypes.push("video")
                                  defaultMediaType = "video"
                              }

                              const breadcrumb = []
          
                              if (types) {
                                  breadcrumb.push(types[0])
                              }
                          
                              if (format) {
                                  breadcrumb.push(format[0])
                              }
                              const updated_at_IOS = new Date(node.updated_at); 
                              const data = {
                                normalized,
                                allInterestedPosts,
                                authorsPosts,
                                topicPosts,
                                formatPosts,
                                mediaTypes:{
                                  types:mediaTypes,
                                  default:defaultMediaType
                                },
                                tranlsatedUrl,
                                breadcrumb,
                                updated_at:updated_at_IOS.toISOString()
          
                              }
                              if (process.env.SUPER_SLIM_DEV_MODE==="true"){
                                console.log(normalized.slug)
                              }
/*                               console.log(normalized.slug)
                              console.log(data.mediaTypes.types) */
                              createPage({
                                path: `${normalized.slug}`,
                                component: path.resolve(template),
                                context: {
                                  id:node.id,
                                  ...data
                                },
                              })

                        }   
                      }
            
                    }
                  
                    return 
                })

                return
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}