const path = require('path')
const {topicQuery} = require('gatsby-source-ac/helpers')
const exploreTemplate='src/templates/page/explore.tsx'
const ac_strings=require('../src/strings/ac_strings.js')
const {groupAll, formatsAll, formatsIds} = require('../src/strings/topic-ids.js')
const {sendQuery}= require('gatsby-source-ac/helpers')

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
    formatTopics:topics(group_id:${groupAll.format}){
        ${topicQuery}
      }
  }
}`


module.exports = function generateTopics(actions, graphql) {
    const { createPage } = actions
    
    return graphql(query)
    .then(async (result)=>{
      
        if (result.errors){
            result.errors.forEach(e => console.error(e.toString()))
            return Promise.reject(result.errors)
          } else {

                const acData = result.data.ac
                const {popularTopicsSlugs,featuredTopics,formatTopics} = acData
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

                const formats = []
                const recommendFormats = []
                formatTopics.forEach(f=>{
                    if (formatsIds[f.id]){
                        formats.push(f)
                        if (["animation","song","testimony","interview"].includes(formatsIds[f.id].keyname)){
                            recommendFormats.push(f)
                        }
                    }
                })
                
                const {popularTopics} = popularTopicsRes.data.ac

                  const contextExplore = {
                    title: explorePage.title,
                    slug:  explorePage.slug,
                    popularTopics,
                    featuredTopics,
                    recommendFormats:recommendFormats,
                    allFormats:formats
                }
                createPage({
                    path: explorePage.slug,
                    component: path.resolve(exploreTemplate),
                    context:contextExplore,
                    })
               
          }
    }).catch(error=>[
        console.log(error)
    ])

}

