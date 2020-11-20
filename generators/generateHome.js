const path = require('path')
const {postQuery,getMultiPosts,postQueryNoPlaylist}= require('gatsby-source-ac/helpers')
const {typeScope,formatScope} = require('./TopicsFormatsTypes/hjelper')
const baseUrl = process.env.API_URL
//${postQuery}
const headers = {
    "x-lang": process.env.LANG_CODE
}
const languagePostQuery = process.env.LANG_CODE==="en"?postQuery:postQueryNoPlaylist
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
            ${languagePostQuery}
        }
      }
`
const query =`{
    allAcNodeSetting {
        nodes {
            popular_posts {
                ${languagePostQuery}
            }
            featured_posts {
                ${languagePostQuery}
            }
        }
    }

    ac {

        latestPosts:posts(page:1,first:12){
            data {
                ${languagePostQuery}
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
           
            const featuredPosts = allAcNodeSetting.nodes[0].featured_posts
            
            const popularPostsAll={
                "static":allAcNodeSetting.nodes[0].popular_posts
            }
    
            const staticTopics = []
            for (let i=0;i<ac.featuredTopics.length;i++){
                const item=ac.featuredTopics[i]
                
                staticTopics.push(
                    {
                        ...item,
                        posts:item.somePosts.data
                    }
                )
            }
            const popularTopicsAll = {
                "static":staticTopics
            }

            await graphql(getPopularQuery)
            .then(async(popularRes)=>{
                console.log(popularRes.data.ac)
                const {popularPosts,popularTopics}=popularRes.data.ac
                if (popularPosts){
                    popularPostsAll["dynamic"]= await getMultiPosts(popularPosts.map(node=>node.id),baseUrl,headers)
                }
                
                
                if(popularTopics){
                    const popularTopicsUnfilteredIDs=popularTopics.map(node=>node.id)
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
                                    if(res.data && res.data.ac &&res.data.ac.topic){
                                        const topic = res.data.ac.topic
                                        const allPosts = await getMultiPosts( topic.posts.slice(0,2),baseUrl,headers)
                                        popularTopicsAll["dynamic"].push({...topic,posts:allPosts})
                                    }
                                    
                                    
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

            const context = {
                latestPosts:ac.latestPosts.data,
                featuredPosts,
                popularPosts:popularPostsAll,
                popularTopics:popularTopicsAll,
              }
              console.log(context)
            createPage({
                path: `/`,
                component: path.resolve('./src/templates/page/home.tsx'),
                context
              })
        }
    })
}