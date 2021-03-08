const _ = require('lodash')
const path = require('path')

const topicRecommendTemplate = 'src/templates/recommend/topic-recommend.tsx'
const ac_strings = require('../../src/strings/ac_strings')
const {groupAll,formatScope}= require('../../src/strings/static/topic-ids.js')
module.exports = async function generateTopic(data) {
    const {actions, graphql,contextPosts,subTopics,node:topic,breadcrumb}=data
    const { createPage } = actions
    const {total}=topic.pagination.paginatorInfo
    const hasRecommendPage=total>10
    const topicFormat = []

    // create recommend
    const pagePath = `${ac_strings.slug_topic}/${topic.slug}`

    if(hasRecommendPage){
      return createPage({
        path:pagePath,
        component:path.resolve(topicRecommendTemplate),
        context: {
          pageType:"home",
          id:topic.id,
          title:topic.name,
          slug:topic.slug,
          formats:topicFormat,
          image:topic.image,
          breadcrumb,
          ...contextPosts,
          posts: contextPosts.latestPosts,
        },
      })
    }

}
