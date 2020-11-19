const _ = require('lodash')
const path = require('path')

const topicRecommendTemplate = 'src/templates/recommend/topic-recommend.tsx'
const {getSubTopicPosts,createSubTopicPages, groupAll,formatScope} = require('./hjelper')
const TS = require('../../src/strings')
module.exports = async function generateTopic(data) {
    const {actions, graphql,contextPosts,subTopics,node:topic,breadcrumb}=data
    const { createPage } = actions

    const topicFormat = []
    for (let i =0;i<subTopics.length;i++){
                        
        const stTopic=subTopics [i]

        if (`${stTopic.group_id}` === groupAll.format) {
          const find = formatScope.find(f=>f.keyId===`${stTopic.id}`)
          if (find){
            
            const getFormatPosts = getSubTopicPosts(topic.id,stTopic.id)
            await graphql(getFormatPosts)
            .then((subTopicPostRes)=>{
                if(subTopicPostRes.data && subTopicPostRes.data.ac){
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
                  breadcrumb
                })
            
                } else {
                  console.log('error with this response')
                  console.log(subTopicPostRes)
                }
            })
          }
      }
    }
    // create recommend
    const pagePath = `${TS.slug_topic}/${topic.slug}`
    console.log(topic.slug)
    createPage({
        path:pagePath,
        component:path.resolve(topicRecommendTemplate),
        context: {
          id:topic.id,
          title:topic.name,
          slug:topic.slug,
          formats:topicFormat,
          image:topic.image,
          breadcrumb,
          ...contextPosts
        },
      })
}
