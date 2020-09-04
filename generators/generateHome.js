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
            slug
        }

        type:topics(group_id:${process.env.TYPE_GROUP_ID}){
            slug
        }
        format:topics(group_id:${process.env.FORMAT_GROUP_ID}){
            slug
        }
    }
}

`

module.exports = function generatePages(actions, graphql) {
    const { createPage } = actions
    return graphql(query).then(result=>{
        if (result.errors){
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        } else {
            const {allAcNodeSetting,ac}=result.data

            const featuredPosts = allAcNodeSetting.nodes[0].featured_posts
            const popularPosts= ac.popularPosts.map(node=>node.slug)
            const popularTopicsUnfiltered=ac.popularTopics.map(node=>node.slug)
            const types = ac.type.map(node=>node.slug)
            const formats= ac.format.map(node=>node.slug)
            const popularTopics = []
            popularTopicsUnfiltered.forEach(item=>{
                const hasType = types.find(t=>t===item)
                if(!hasType){
                    const hasFormat=formats.find(f=>f===item)
                    if (!hasFormat){
                        popularTopics.push(item)
                    }
                }
            })
            console.log({
                featuredPosts,
                popularPosts,
                popularTopics,
              })
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