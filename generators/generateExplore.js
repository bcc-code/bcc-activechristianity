const path = require('path')
const {topicQuery} = require('gatsby-source-ac/helpers')
const {formatsAll} = require('./TopicsFormatsTypes/hjelper')
const exploreTemplate='src/templates/page/explore.tsx'
const ac_strings=require('../src/strings/ac_strings.js')
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


                const popularTopicsRes = await graphql(`{
                    ac {
                        popularTopics: topics(ids:[${popularTopicsSlugs.map(t=>t.id).join(",")}]) {
                            ${topicQuery}
                        } 
                    }
                }`)

                const {popularTopics} = popularTopicsRes.data.ac

                

                  const {animation,song,testimony,interview}=formatsAll
                  const contextExplore = {
                    title: explorePage.title,
                    slug:  explorePage.slug,
                    popularTopics,
                    featuredTopics,
                    recommendFormats:[animation,song,testimony,interview].map(f=>f.keyId)
                }
                createPage({
                    path: explorePage.slug,
                    component: path.resolve(exploreTemplate),
                    context:contextExplore,
                    })
               
          }
    })

}

