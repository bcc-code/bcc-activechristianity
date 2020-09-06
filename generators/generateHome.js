const path = require('path')

const query =`{
    allAcNodeSetting {
        nodes {
            popular_posts
            featured_posts
        }
    }

    ac {
        popularPosts {
            slug
        }

        popularTopics(count:20) {
            id
        }

        type:topics(group_id:${process.env.TYPE_GROUP_ID}){
            id
        }
        format:topics(group_id:${process.env.FORMAT_GROUP_ID}){
            id
        }
    }
}`

const getTopic = (id)=>`{
    ac {
        topic(id:${id}){
            slug
            name
            posts{
                slug
            }
        }
    }
}`

module.exports = function generatePages(actions, graphql) {
    const { createPage } = actions
    return graphql(query).then(async(result)=>{
        if (result.errors){
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        } else {
            const {allAcNodeSetting,ac}=result.data

            const featuredPosts = allAcNodeSetting.nodes[0].featured_posts
            const popularPosts= ac.popularPosts.map(node=>node.slug)
            const popularTopicsUnfilteredIDs=ac.popularTopics.map(node=>node.id)
            const typeIDs = ac.type.map(node=>node.id)
            const formatIDs= ac.format.map(node=>node.id)
            const popularTopics = []


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
                            const allPosts = topic.posts.map(item=>item.slug)
                            popularTopics.push({
                                name:topic.name,
                                to:topic.slug,
                                posts:allPosts.slice(0,2)
                            })
                        })
                    }
                }
            }

            createPage({
                path: `/`,
                component: path.resolve('./src/templates/page/home.tsx'),
                context: {
                    featuredPosts,
                    popularPosts,
                    popularTopics,
                  },
              })
        }
    })
}