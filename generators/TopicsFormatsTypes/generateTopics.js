const _ = require('lodash')
const path = require('path')

const listTemplate = 'src/templates/archive/post-list.tsx'

const topicRecommendTemplate = 'src/templates/recommend/topic-recommend.tsx'
const TS = require('../../src/strings')
const {getSubTopics,getSubTopicPosts,createSubTopicPages, formatScope,typeScope,typesAll,formatsAll} = require('./hjelper')
/* SETUP */
 

const query = `{
    ac {
      topics {
          id
          name
          slug
          noOfPosts
          group {
              id
              name
          }
          posts {
            slug
          }

        }

        page(id:${process.env.RESOURCE_PAGE_ID}){
          title
          slug
        }

        topicMain:page(id:${process.env.TOPICS_PAGE_ID}){
          title
          slug
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
            const topicInfo = result.data.ac.topics
            const resourcePage = result.data.ac.page
            const topicsMain= result.data.ac.topicMain
            const navTopItem={name:resourcePage.title,to:resourcePage.slug}
            const navParentItem={name:topicsMain.title,to:topicsMain.slug}
            const filteredTopics = []
            
            topicInfo.forEach((node) => {
     
                
                if (node.group.id !== process.env.FORMAT_GROUP_ID && node.group.id !==process.env.TYPE_GROUP_ID) {
                    filteredTopics.push(node)

                    const component = path.resolve(listTemplate)
                    const baseUrl = `${TS.slug_topic}/${node.slug}`
                  
                    let currentPage = 1
                    const totalCount=node.posts.length
                    const allPosts= node.posts.map(p=>p.slug)
                    // create achive of each topic, type, format
                    const totalPages = Math.ceil(totalCount / perPage)
                    const firstPageNr=allPosts.length>20?'/1':''
                    for (let i = 0; i < totalCount; i += perPage, currentPage++) {
                      
                      let pagePath = `${baseUrl}${currentPage > 1 ? '/' + currentPage : firstPageNr}`

                      const paginate = {
                        currentPage,
                        totalPages,
                        baseUrl,
                        hasRecommendPage:allPosts.length>20
                      }
              

                      createPage({
                        path:pagePath,
                        component,
                        context: {
                          posts: allPosts.slice(i,i+perPage),
                          paginate,
                          id:node.id,
                          title:node.name,
                          breadcrumb:[
                            navTopItem,
                            navParentItem, 
                            {
                            name:node.name,
                            to:baseUrl
                          }]
                        },
                      })
                    }
                }

            })

            if (filteredTopics.length>0){ 
           
                for (let i=0;i<filteredTopics.length;i++){
                    const topic=filteredTopics[i]
              
                    if(topic.noOfPosts>20){
                        
                        const querySubTopics = getSubTopics(topic.id)
                        const topicFormat = []
                        const topicType = []

                        const subTRes = await graphql(querySubTopics)

                        const subTopics = subTRes.data.ac.topic.subTopics

                        for (let i =0;i<subTopics.length;i++){
                            
                            const stTopic=subTopics [i]
                            if (`${stTopic.group_id}`=== process.env.TYPE_GROUP_ID) {
                              const find = typeScope.find(t=>t.keyId===`${stTopic.id}`)
                              if (find){
                                
                                const getTypePosts = getSubTopicPosts(topic.id,stTopic.id)
                                await graphql(getTypePosts)
                                    .then(subTopicPostRes=>{
                                    
                                    const allPosts = subTopicPostRes.data.ac.topic.posts.map(item=>item.slug)
                                    topicType.push({ 
                                      key:find.keyname,
                                      id: stTopic.id, 
                                      name: stTopic.name, 
                                      to: `${topic.slug}/${stTopic.slug}`,
                                      count:allPosts.length
                                    })
                                    createSubTopicPages({
                                      createPage,allPosts,
                                      topic,subTopic:stTopic, 
                                      isTopic:true,
                                      breadcrumb:[
                                        navTopItem,
                                        navParentItem
                                      ]
                                      })
                                
                                })
                              }
                                
                               
                            }

                            if (`${stTopic.group_id}` === process.env.FORMAT_GROUP_ID) {
                              const find = formatScope.find(f=>f.keyId===`${stTopic.id}`)
                              if (find){
                                
                                const getFormatPosts = getSubTopicPosts(topic.id,stTopic.id)
                                await graphql(getFormatPosts)
                                .then((subTopicPostRes)=>{
                                    const allPosts = subTopicPostRes.data.ac.topic.posts.map(item=>item.slug)
                                    topicFormat.push({ 
                                      key:find.keyname,
                                      id: stTopic.id, 
                                      name: stTopic.name, 
                                      to: `${topic.slug}/${stTopic.slug}`,
                                      count:allPosts.length
                                    })
                                    createSubTopicPages({
                                      createPage,
                                      allPosts,
                                      topic,
                                      subTopic:stTopic,
                                      isTopic:true,
                                      breadcrumb:[
                                        navTopItem,
                                        navParentItem
                                      ]
                                    })
                                
                                })
                              }
                          }
                        }
                        // create recommend
                        const pagePath = `${TS.slug_topic}/${topic.slug}`

                        createPage({
                            path:pagePath,
                            component:path.resolve(topicRecommendTemplate),
                            context: {
                              id:topic.id,
                              title:topic.name,
                              slug:topic.slug,
                              types:topicType,
                              formats:topicFormat,
                              breadcrumb:[
                                navTopItem, 
                                navParentItem,{
                                name:topic.name,
                                to:pagePath
                              }
                            ]
                            },
                          })
                        
                    } 
                }
            
            }
          }
    })

}
