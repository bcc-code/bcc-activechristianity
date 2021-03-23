const _ = require('lodash')
const path = require('path')
const {topicQuery, postQuery} = require('gatsby-source-ac/helpers')
const languagePostQuery = postQuery
const ac_strings = require('../../src/strings/ac_strings.js')
const {formatScope,typeScope,groupAll} = require('../../src/strings/static/topic-ids.js')
const {createArchivePages} = require('./hjelper')
const generateFormat = require('./gFormat.js')
const generateType = require('./gType.js')
const generateTopic = require('./gTopic.js')
const { processRecommendationContext, getRandomFeatured } = require('../../src/helpers/normalizers')

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

    allPages {
      id
      title
      slug
      label
      flexibleContent
      parent {
        id
        title
        slug
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
            const groupedTopics={}

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

                const toAdd = { id: node.id, name: `${node.name} (${node.noOfPosts})`, to: `${ac_strings.slug_topic}/${node.slug}` }
                if (groupedTopics[node.group.name]) {
                  groupedTopics[node.group.name].topics.push(toAdd)
                } else {
                    groupedTopics[node.group.name] =
                    {
                        info: { name: node.group.name, to: ac_strings.slug_topic },
                        topics: [toAdd]
                    }
                }

                const navParentItem={name:ac_strings.topic,to:ac_strings.slug_topic}
                breadcrumb=[
                    navParentItem, 
                    {
                    name:node.name,
                    to:baseUrl
                  }]
              }
                // create achive of each topic, type, format
                await createArchivePages({
                  graphql,
                  createPage,
                  paginatorInfo:node.pagination.paginatorInfo,
                  node,
                  baseUrl,
                  breadcrumb,
                  topicType
                })
            
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
                const props =processRecommendationContext({ popularPosts, featuredPosts, latestPosts })
                const { latest, popular, featured } = props
                const contextPosts = {
                  latest,
                  featured,
                  popular,
                }

                if (topicType==='format'){
                  const find = formatScope.find(f=>`${f.keyId}`===`${node.id}` && f.keyname!=="podcast")
                  if(find){
                    nodeInfo.key=find.keyname
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
                if (findType){
                    nodeInfo.key=findType.keyname
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

            //

          }

          const pageInfo = result.data.ac.allPages

          const themePages = []
          _.each(pageInfo,(page)=>{
          
            if(page.parent && `${page.parent.id}`=="75"){
              themePages.push(page)
            }
          })
          createPage({
            path: `${ac_strings.slug_topic}`,
            component: path.resolve(`./src/templates/page/topics.tsx`),
            context:{
              title:ac_strings.topic,
              themes: themePages.map(page=>({title:page.title,slug:page.slug})),
              groupedTopics:Object.keys(groupedTopics)
                                .sort((a, b) => a.localeCompare(b))
                                .map(groupName=>{
                                  return groupedTopics[groupName]
                                })
            }
          })
        }
    })

}

