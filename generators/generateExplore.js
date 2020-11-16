const path = require('path')
const {topicQuery} = require('gatsby-source-ac/helpers')
const exploreTemplate='src/templates/page/explore.tsx'
/* SETUP */
 

const query = `{
  ac {
    popularTopicsSlugs:popularTopics {
        slug
        id
    }
    featuredTopics:topics(featured:true) {
        ${topicQuery}
    }

    explorePage:page(id:${process.env.EXPLORE_PAGE_ID}){
        id
        title
        slug
        label
    }
    scripturePage:page(id:${process.env.SCRIPTURE_PAGE_ID}){
        id
        title
        slug
        label
    }
  }

}`


const perPage = 12

module.exports = function generateTopics(actions, graphql) {
    const { createPage } = actions
    
    return graphql(query)
    .then(async (result)=>{
      
        if (result.errors){
            result.errors.forEach(e => console.error(e.toString()))
            return Promise.reject(result.errors)
          } else {

                const acData = result.data.ac
                const {popularTopicsSlugs,featuredTopics,explorePage,scripturePage} = acData
                
                const popularTopicsRes = await graphql(`{
                    ac {
                        popularTopics: topics(ids:[${popularTopicsSlugs.map(t=>t.id).join(",")}]) {
                            ${topicQuery}
                        } 
                    }
                }`)

                const {popularTopics} = popularTopicsRes.data.ac
                createPage({
                    path: explorePage.slug,
                    component: path.resolve(exploreTemplate),
                    context: {
                      title:explorePage.title,
                      slug: explorePage.slug,
                      popularTopics,
                      featuredTopics,
                      scripturePage:({name: scripturePage.title,to: scripturePage.slug})
                    },
                  })
          }
    })

}

