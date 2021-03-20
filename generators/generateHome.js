const path = require('path')
const {postQuery,getMultiPosts}= require('gatsby-source-ac/helpers')
const {typeScope,formatScope} = require('../src/strings/static/topic-ids')
const endpoints = require('../src/strings/static/endpoints')
const { processRecommendationContext, getRandomFeatured, normalizePostRes, getRandomArray } = require('../src/helpers/normalizers')
const baseUrl = endpoints.api_url
//${postQuery}
const headers = {
    "x-lang": process.env.LANG_CODE
    }

const topicQuery=`
    id
    name
    slug
    noOfPosts
    excerpt
    image {
        src
        srcset
        dataUri
      }
    somePosts(first:12){
        data {
            ${postQuery}
        }
      }
`
const query =`{
    allAcNodeSetting {
        nodes {
            popular_posts {
                ${postQuery}
            }
            featured_posts {
                ${postQuery}
            }
        }
    }

    ac {

        latestPosts:posts(page:1,first:12){
            data {
                ${postQuery}
            }
          }
        featuredTopics:topics(featured:true) {
        	${topicQuery}
      }
    }
}`

const getTopic = (id)=>`{
    ac {
        topic(id:${id}){
            ${topicQuery}
        }
    }
}`

// featuredTopics
const getPopularQuery = `{
    ac {
        popularPosts {
            slug
        }

        popularTopics(count:20) {
            id
            slug
        }
    }
}`

module.exports = function generatePages(actions, graphql) {
    const { createPage } = actions
    return graphql(query)
    .then(async(result)=>{
        if (result.errors){
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        } else {
            
            const {allAcNodeSetting,ac}=result.data
           
            const featuredPosts = allAcNodeSetting.nodes[0].featured_posts.filter(item=>item.slug!=="dummy-content")
            
            const popularPostsAll={
                "static":allAcNodeSetting.nodes[0].popular_posts.filter(item=>item.slug!=="dummy-content")
            }
    
            const staticTopics = []
            for (let i=0;i<ac.featuredTopics.length;i++){
                const item=ac.featuredTopics[i]
                
                staticTopics.push(
                    {
                        ...item,
                        posts:item.somePosts.data?item.somePosts.data.map(p=>normalizePostRes(p)):[]
                    }
                )
            }
            const popularTopicsAll = {
                "static":staticTopics
            }

            await graphql(getPopularQuery)
            .then(async(popularRes)=>{
                const {popularPosts,popularTopics}=popularRes.data.ac
                if (popularPosts){
                    popularPostsAll["dynamic"]= await getMultiPosts(popularPosts.map(node=>node.id),baseUrl,headers).catch(err=>{
                        console.log(err)
                        throw new Error(err.message)
                    })
                    if(popularPostsAll["dynamic"]){
                        popularPostsAll["dynamic"]=popularPostsAll["dynamic"].map(p=>normalizePostRes(p)) 
                    }                
                }
                
                
                if(popularTopics){
                    const popularTopicsUnfilteredIDs=getRandomArray(popularTopics,5).map(node=>node.id)
                    popularTopicsAll["dynamic"]=[]
                   
                    for (let k =0;k<popularTopicsUnfilteredIDs.length;k++){
                        const item=popularTopicsUnfilteredIDs[k]
                        const hasType = typeScope.find(t=>`${t.id}`===`${item}`)
                        if(!hasType){
                            const hasFormat=formatScope.find(f=>`${f.id}`===`${item}`)
                            if (!hasFormat){
                                const getTopicQuery = getTopic(item)
                                
                                await graphql(getTopicQuery)
                                .then(async res=>{
                                    if(res.data && res.data.ac &&res.data.ac.topic && res.data.ac.topic.somePosts.data){
                                       const {somePosts,...topic}=res.data.ac.topic
              
                                       const allPosts=somePosts.data?getRandomArray(somePosts.data).map(p=>normalizePostRes(p)):[]
                                        popularTopicsAll["dynamic"].push({...topic,posts:allPosts})
                                        
                                        
                                    } else {
                                        console.log(getTopicQuery)
                                        console.log(res.data.ac.topic)

                                        console.log(item)
                                        throw new Error('not able to find posts for this topic')
                                    }
                                    
                                })
                                .catch(err=>{
                                    console.log(err)
                                    throw new Error(err.message)
                                })
                            }
                        }
                    }
                    
                } 
            })
            .catch(error=>{
                console.log('Failed to get popular posts and popular topics')
                console.log(error)
            })
            const latestPosts=ac.latestPosts.data
            const popularPosts = popularPostsAll.dynamic && popularPostsAll.dynamic.length > 0 ? popularPostsAll.dynamic : popularPostsAll.static
            const props =processRecommendationContext({ popularPosts, featuredPosts, latestPosts })
            const { latest, popular, featured } = props
            const updated_at_IOS = new Date().toISOString(); 
            const context = {
                updated_at:new Date(updated_at_IOS),
                latest,
                featured,
                popular,
                mixedFeaturedPosts:[
                    getRandomFeatured({ latest, popular, featured }),
                    getRandomFeatured({ latest, popular, featured }),
                    getRandomFeatured({ latest, popular, featured })
                ],
                popularTopics:popularTopicsAll,
              }
            createPage({
                path: `/`,
                component: path.resolve('./src/templates/page/home.tsx'),
                context
              })


  /*             createPage({
                path: `/home-v2-beta`,
                component: path.resolve('./src/templates/page/home-v2-beta.tsx'),
                context
              }) */
        }
    })
}