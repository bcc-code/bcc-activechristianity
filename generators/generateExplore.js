const path = require('path')
const {topicQuery} = require('gatsby-source-ac/helpers')
const exploreTemplate='src/templates/page/explore.tsx'
const ac_strings=require('../src/strings/ac_strings.js')
const TS = require('../src/strings')
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
                const {popularTopicsSlugs,featuredTopics} = acData
                const explorePage = {
                    title:ac_strings.explore,
                    slug: ac_strings.slug_explore,
                }

                const scripturePage = {
                    title:ac_strings.scripture,
                    slug: ac_strings.slug_scripture
                }
                const popularTopicsRes = await graphql(`{
                    ac {
                        popularTopics: topics(ids:[${popularTopicsSlugs.map(t=>t.id).join(",")}]) {
                            ${topicQuery}
                        } 
                    }
                }`)

                const {popularTopics} = popularTopicsRes.data.ac
                
  
                const context = {
                    title: explorePage.title,
                    slug:  explorePage.slug,
                    popularTopics,
                    featuredTopics 
                }
                const navTopicsItem={name:ac_strings.topic,to:ac_strings.slug_topic}
                createPage({
                    path: `${ac_strings.slug_topic}`,
                    component: path.resolve(`./src/templates/page/topics.tsx`),
                    context:{
                      title:ac_strings.topic,
                      breadcrumb:[
                        navTopicsItem
                      ],
                      popularTopics,
                      featuredTopics 
                    }, 
                  })

                if(process.env.LOCALE==="en"){
                    context.scripturePage=({name: scripturePage.title,to: scripturePage.slug})
                }
                createPage({
                    path: explorePage.slug,
                    component: path.resolve(exploreTemplate),
                    context,
                    })
               
          }
    })

}

