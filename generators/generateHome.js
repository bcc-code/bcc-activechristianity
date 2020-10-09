const path = require('path')
const {formatScope} = require('./TopicsFormatsTypes/hjelper')


const topicQuery=`
    id
    name
    slug
    noOfPosts
    excerpt
    posts {
        slug
    }
`
const query =`{
    allAcNodeSetting {
        nodes {
            popular_posts
            featured_posts
        }
    }

    ac {

        type:topics(group_id:${process.env.TYPE_GROUP_ID}){
            id
        }
        format:topics(group_id:${process.env.FORMAT_GROUP_ID}){
            ${topicQuery}
        }

        featuredTopics:topics(featured:true) {
        	${topicQuery}
      }
        allPages {
            id
            title
            slug
            label
            parent {
                title
                label
            
            }
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
            const pageInfo = ac.allPages
            const playlistPage = pageInfo.find(page=>page.id===process.env.PLAYLIST_PAGE_ID);
            const podcastPage = pageInfo.find(page=>page.id===process.env.PODCAST_PAGE_ID);
            const featuredPosts = allAcNodeSetting.nodes[0].featured_posts
           
            const formatIDs= ac.format.map(node=>node.id)
            const typeIDs = ac.type.map(node=>node.id)
            const filteredFormats=[]
            ac.format.forEach(node=>{
                const find = formatScope.find(f=>f.keyId===`${node.id}`)
                if(find){
                    filteredFormats.push({...node,posts:node.posts.slice(0,10).map(item=>item.slug)})
                }
            })
            
            const popularPosts={
                "dynamic":[],
                "static":allAcNodeSetting.nodes[0].popular_posts
            }
    
            const popularTopics = {
                "dynamic":[],
                "static":ac.featuredTopics.map(item=>({
                    ...item,
                    posts:item.posts.slice(0,2).map(item=>item.slug)
                }))
            }

            await graphql(getPopularQuery)
            .then(async(popularRes)=>{
                console.log(popularRes.data.ac)
                const {ac_popularPosts,ac_popularTopics}=popularRes.data.ac
                if (ac_popularPosts){
                    popularPosts["dynamic"]= ac_popularPosts.map(node=>node.slug)
                }
                
                
                if(ac_popularTopics){
                    const popularTopicsUnfilteredIDs=ac_popularTopics.map(node=>node.id)
                    for (let k =0;k<popularTopicsUnfilteredIDs.length;k++){
                        const item=popularTopicsUnfilteredIDs[k]
                        const hasType = typeIDs.find(t=>t===item)
                        if(!hasType){
                            const hasFormat=formatIDs.find(f=>f===item)
                            if (!hasFormat){
                                const getTopicQuery = getTopic(item)
                                await graphql(getTopicQuery)
                                .then(res=>{
                                    const topic = res.data.ac.topic
                                    const allPosts = topic.posts.slice(0,2).map(item=>item.slug)
                                    popularTopics["dynamic"].push({
                                        ...topic,
                                        posts:allPosts
                                    })
                                })
                            }
                        }
                    }
                } 
            })
            .catch(error=>{
                console.log('Failed to get popular posts and popular topics')
                conosle.log(error.message)
            })

            createPage({
                path: `/`,
                component: path.resolve('./src/templates/page/home.tsx'),
                context: {
                    featuredPosts,
                    popularPosts,
                    popularTopics,
                    playlistPage,
                    podcastPage,
                    formats:filteredFormats
                  },
              })
        }
    })
}