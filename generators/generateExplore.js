const path = require('path')
const {topicQuery} = require('gatsby-source-ac/helpers')
const exploreTemplate='src/templates/page/explore.tsx'
const ac_strings=require('../src/strings/ac_strings.js')
const {groupAll, formatsIds} = require('../src/strings/static/topic-ids.js')


/* SETUP */
 //108206

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

    edification:topic(id:108206){
        name
        slug
        posts(isFeatured:true){
          slug
        }
     }
    questions:topic(id:1503){
        name
        slug
        posts(isFeatured:true){
          slug
        }
     }
      
    songs:topic(id:108204){
        name
        slug
        posts(isFeatured:true){
          slug
        }
      }
      
    featuredVideos:topic(id:108198){
        name
        slug
        posts(isFeatured:true){
          slug
        }
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
                console.log(acData)
                const {popularTopicsSlugs,featuredTopics,formatTopics,questions,songs,featuredVideos,edification} = acData
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
                        if (["animation","testimony","interview"].includes(formatsIds[f.id].keyname)){
                            recommendFormats.push(f)
                        }
                    }
                })
                const topicsPosts=(topic)=>{
                    return ({
                        id: topic.id,
                        name: topic.name,
                        slug: topic.slug,
                        posts:topic.posts?topic.posts.map(p=>p.slug):[]
                    })
                }
                const {popularTopics} = popularTopicsRes.data.ac

                  const contextExplore = {
                    title: explorePage.title,
                    slug:  explorePage.slug,
                    popularTopics,
                    featuredTopics,
                    recommendFormats:recommendFormats,
                    allFormats:formats,
                    questions:topicsPosts(questions),
                    songs:topicsPosts(songs),
                    featuredVideos:topicsPosts(featuredVideos),
                    edification:topicsPosts(edification)
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

