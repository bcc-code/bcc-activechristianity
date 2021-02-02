const _ = require('lodash')
const path = require('path')
const {topicQuery, postQuery,sendQuery} = require('gatsby-source-ac/helpers')
const listTemplate = 'src/templates/archive/post-list.tsx'
const ac_strings=require('../src/strings/ac_strings.js')
const endpoints = require('../src/strings/static/endpoints')
const {normalizePostRes,filterTopics, getRandomArray,normalizeAvailableLanguages} = require('../src/helpers/normalizers')
/* SETUP */const  { groupAll: topicGroupAll, formatsIds, typeIds } = require('../src/strings/static/topic-ids')
const recommendedByPostQuery = (postId) => `
  query { 
    
    recommendedByPost(postId:${postId}){
      slug
    }
  }  
`
const { promises } = require('fs')
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
        }
        
      }
    }
}`
}
const perPage = 12

const getAuthorPosts = (index)=>{
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
const authorsTopicsQuery = `
  {
    ac{
      authors(hasPosts:true){
        paginatorInfo {
          total
          count
        }

      }
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
const allNormalizedPosts={}
module.exports = async function generatePosts(actions, graphql) {
  const { createPage } = actions

  return graphql(authorsTopicsQuery)
          .then(async (result) => {
            if (result.errors) {
              result.errors.forEach(e => console.error(e.toString()))
              return Promise.reject(result.errors)
            }
            const {authors,topics}=result.data.ac
            const {count,total}= result.data.ac.authors.paginatorInfo
            const pageCount=Math.ceil(total/count)

            const pageIndex= [];

            for (let i = 1; i <= pageCount; i++) {
              pageIndex.push(i);
            }
            await Promise.all(pageIndex.map(i=>{
              const eachPageQuery=getAuthorPosts(i)
                  return graphql(eachPageQuery)
                          .then(res =>{
                            
                            if (res.data.ac && res.data.ac.authors && res.data.ac.authors.data && res.data.ac.authors.data[0]){
                              const allAuthors = res.data.ac.authors.data
                              _.each(allAuthors, (author)=>{
                                authorsWPosts[author.slug]={
                                  name:author.name,
                                  slug:author.slug,
                                  posts:author.somePosts.data.map(p=>p.slug)
                                }
                              })
                            } else {
                              console.log('unexpected response')
                              console.log(res)
                            }
                    })
                }))

              topics
                  .filter(item => {
                    return !formatsIds[item.id] && !typeIds[item.id]
                  })
                  .map(t=>{
                    topicArchivePageCount[t.slug]= {
                      count:Math.ceil(t.somePosts.paginatorInfo.total/ perPage),
                      posts:{
                        top:t.somePosts.data.map(p=>p.slug)
                      }
                    }
                  }) 

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
                                    let authorPosts=[]
                                    node.authors.map(a=>{
                                      const filtered = authorsWPosts[a.slug].posts.filter(slug=>slug!==normalized.slug)
                                      if(filtered.length>0){
                                        authorPosts.push({
                                          name:a.name,
                                          slug:a.slug,
                                          posts:filtered
                                        })
                                      }
                                      return authorsWPosts[a.slug]
                                    })
                                    const topicPosts = []
                                    const nodeTopics = node.topics.filter(item => {
                                      return !formatsIds[item.id] && !typeIds[item.id]
                                    })
                                    
                                      for (let j = 0; j < nodeTopics.length ; j++) {
                                        const t=nodeTopics[j]
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
                                          
                                            const topicPosts=topicPostsRes.data.ac.topic.somePosts.data.map(p=>p.slug)
                                            topicArchivePageCount[t.slug].posts[getRandomCount]=topicPosts
                                            toAdd = getRandomArray(topicPosts,3)
                                          
                                          }
                                          
                                        }
                                        
                                        
                                        topicPosts.push({
                                          ...t,
                                          posts:toAdd
                                        })
                      
                                      }  
                                    // add recommendedPosts to readmore post
                                      await sendQuery(recommendedByPostQuery(node.acId),endpoints.api_url,{ "x-lang": process.env.LANG_CODE})
                                      .then(res=>{
                                        if(res && res.recommendedByPost){
                                          recommendedPosts=res.recommendedByPost.map(p=>p.slug)
                                          
                                        }
                                        return
                                      })
                                      
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
                                        

                                        const fullPostsInfo={
                                          normalized,
                                          allInterestedPosts,
                                          authorPosts,
                                          topicPosts,
                                          tranlsatedUrl
                                        }
                                        
                                      allNormalizedPosts[node.slug]=fullPostsInfo

                                  }   
                                }
                      
                              }
                            
                              return 
                          })

                          
                          const allPostsSlugs = Object.keys(allNormalizedPosts)
                          for(let k=0; k<allPostsSlugs.length;k++){
                            const slug = allPostsSlugs[k]
                            const post=allNormalizedPosts[slug]
                              const {normalized,allInterestedPosts, authorPosts,topicPosts,tranlsatedUrl}=post
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
                              const data = {
                                normalized,
                                allInterestedPosts:allInterestedPosts.map(s=>allNormalizedPosts[s]),
                                authorPosts:authorPosts.map(a=>({
                                  ...a,
                                  posts:a.posts.map(s=>allNormalizedPosts[s])
                                })),
                                topicPosts:topicPosts.map(t=>({
                                  ...t,
                                  posts:t.posts.map(s=>allNormalizedPosts[s])
                                })),
                                mediaTypes:{
                                  types:mediaTypes,
                                  default:defaultMediaType
                                },
                                tranlsatedUrl,
                                breadcrumb

                              }
                              console.log(normalized.slug)
                              createPage({
                                path: `${normalized.slug}`,
                                component: path.resolve(template),
                                context: {
                                  id: normalized.id,
                                  ...data
                                },
                              })
                          }
            })      
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}