const _ = require('lodash')
const path = require('path')
const saveFile = require('../saveFile')
const {topicQuery, postQuery} = require('gatsby-source-ac/helpers')
const languagePostQuery = postQuery
const ac_strings = require('../../src/strings/ac_strings.js')
const {formatScope,typeScope,groupAll} = require('../../src/strings/topic-ids.js')
const {createArchivePages} = require('./hjelper')
const generateFormat = require('./gFormat.js')
const generateType = require('./gType.js')
const generateTopic = require('./gTopic.js')


/* SETUP */
 

const query = `{
  ac {
    topics(hasPosts: true) {
      ${topicQuery}

      pagination:somePosts(first:12){

          paginatorInfo {
              total
              count
              currentPage
          }
      }
      
    }
      
  }

}`
const getContextPostsQuery =(id)=> `{

  ac {
    topic(id:${id}){
    subTopics {
        id
        name
        group_id
        slug
        }
    featuredPostsRes:posts(isFeatured: true) {
        ${languagePostQuery}
        }
    popularPostsRes:somePosts(orderBy:{column:VIEWS, order:DESC},first:12){
        data {
            ${languagePostQuery}
          } 
      }
    latestPostsRes:somePosts(first:12){
        data {
            ${languagePostQuery}
        }
    }
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
            console.log("generating topics")
            const topicInfo = result.data.ac.topics
            const formatIds = {}
            const typeIds={}
            
            for(let t=0;t<topicInfo .length;t++){
              const node = topicInfo[t]
                
              let topicType = 'topic'
              let baseUrl = `${ac_strings.slug_topic}/${node.slug}`
              if (`${node.group.id}` === `${groupAll.format}` ) {
                topicType='format'
                baseUrl = `${node.slug}/${ac_strings.slug_latest}`
              } else if (`${node.group.id}` ===`${groupAll.type}`) {
                topicType='type'
                baseUrl = `${node.slug}/${ac_strings.slug_latest}`
                
              } 
                              
              let breadcrumb= [{
                name:node.name,
                to:baseUrl
              }]
              if(topicType==='topic'){
           
                const navParentItem={name:ac_strings.topic,to:ac_strings.slug_topic}
                breadcrumb=[
                    navParentItem, 
                    {
                    name:node.name,
                    to:baseUrl
                  }]
              }
                // create achive of each topic, type, format
/*                 await createArchivePages({
                  graphql,
                  createPage,
                  paginatorInfo:node.pagination.paginatorInfo,
                  node,
                  baseUrl,
                  breadcrumb,
                  topicType
                })  */
            
              const nodeInfo = {
                key: '',
                name:node.name,
                to:node.slug,
                count:node.noOfPosts,
                image:node.image
              }

              if (["type","format","topic"].includes(topicType)){//["type","format","topic"]
                const contextPostsQuery = getContextPostsQuery(node.id)
                
                const contextPostsRes = await graphql(contextPostsQuery)
                  .then(res=>{
                      if(res.errors){
                      res.errors.forEach(e => console.error(e.toString()))
                      throw new Error(res.errors)
                      } else {
                      return res
                      }
                  })
                  .then(res=>res.data.ac.topic)
                const {subTopics,featuredPostsRes,popularPostsRes,latestPostsRes} =contextPostsRes

                const popularPosts = popularPostsRes.data
                const latestPosts=latestPostsRes.data
                const featuredPosts=featuredPostsRes
                const contextPosts = {
                    popularPosts,
                    latestPosts,
                    featuredPosts
                }

                if (topicType==='format'){
                  const find = formatScope.find(f=>`${f.keyId}`===`${node.id}` && f.keyname!=="podcast")
                  if(find){
                    nodeInfo.key=find.keyname
                    formatIds[`${node.id}`]=nodeInfo
                    //onst {actions, graphql,contextPosts,subTopics,node:format,nodeInfo}=data
                    await generateFormat({
                        actions,
                        graphql,
                        contextPosts,
                        subTopics,
                        node,
                        nodeInfo,
                        breadcrumb
                    })
                  }
                }

              if (topicType==='type'){
                const findType=typeScope.find(t=>`${t.keyId}`===`${node.id}`)
                console.log(findType)
                if (findType){
                    nodeInfo.key=findType.keyname
                    typeIds[`${node.id}`]=nodeInfo
                    await generateType({
                        actions,
                        graphql,
                        contextPosts,
                        subTopics,
                        node,
                        nodeInfo,
                        breadcrumb
                    })
                }
              }

              if(topicType==="topic"){
                
                await generateTopic({
                    actions,
                    graphql,
                    contextPosts,
                    subTopics,
                    node,
                    nodeInfo,
                    breadcrumb
                })
              }
            }

            

          }
          const data = {
            formatIds,
            typeIds
          }

          saveFile('./src/strings', 'topic-filters', 'json',  data)
        }
    })

}

