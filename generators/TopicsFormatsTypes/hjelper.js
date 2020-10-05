const ac_strings = require('../../src/strings/ac_strings.json')
const path = require('path')
const TS = require('../../src/strings')
const listTemplate = 'src/templates/archive/post-list.tsx'
const perPage= 12

const formatsAll = {
  "message":{
      keyId: process.env.MESSAGE_FILTER_ID,
      keyname: "message",
  },

  "song": {
      keyId: process.env.SONG_FILTER_ID,
      keyname: "song",
  },
  "edification":{
      keyId: process.env.EDIFICATION_FILTER_ID,
      keyname: "edification",
  },
  "testimony":{
      keyId: process.env.TESTIMONY_FILTER_ID,
      keyname: "testimony",
  },
  "question":{
      keyId: process.env.QUESTION_FILTER_ID,
      keyname: "question",
  },
  "commentary":{
      keyId: process.env.COMMENTARY_FILTER_ID,
      keyname: "commentary",
  },
/*   "podcast":{
      keyId: process.env.PODCAST_FILTER_ID,
      keyname: "podcast",
  } */
}
module.exports.formatsAll=formatsAll

const typesAll={
  "read":{
      keyId:process.env.READ_POSTS_FILTER_ID,
      keyname:"read"
  },
  "watch":{
      keyId:process.env.WATCH_POSTS_FILTER_ID,
      keyname:"watch"
  },
  "listen":{
      keyId:process.env.LISTEN_POSTS_FILTER_ID,
      keyname:"listen"
  }
}

module.exports.typesAll = typesAll


module.exports.formatScope = Object.keys(formatsAll).map(key=>formatsAll[key])

module.exports.typeScope = Object.keys(typesAll).map(key=>typesAll[key])

module.exports.getSubTopicsAndFeaturedPosts = (id)=>`{
  ac {
      topic(id: ${id}) {
          id
          name
          subTopics {
            id
            name
            group_id
            slug
          }
          posts(isFeatured: true) { slug}
      }
      
  }
}`

module.exports.getSubTopicPosts=(id1,id2) =>`{
  ac {
      topic(id: ${id1}) {
          id
          name
          posts (hasTopics: { value: ${id2}, column: ID }){
            slug
          }
        }
  }
}`

module.exports.createSubTopicPages=({
  type,
  createPage, 
  allPosts,
  topic,
  subTopic,
  isTopic,
  breadcrumb
})=>{

    const totalCount = allPosts.length

    if (!totalCount) {
      console.log(topic.slug)
      console.log('No posts for this topic')
    }
    const totalPages = Math.ceil(totalCount / perPage)
    const baseUrl = `${isTopic===true?`${TS.slug_topic}/`:''}${topic.slug}/${subTopic.slug}`

    const component = (topic.id=== process.env.VIDEO_POSTS_FILTER_ID|| subTopic.id===process.env.VIDEO_POSTS_FILTER_ID)?path.resolve(videoListTemplate):path.resolve(listTemplate)
    const pageBreadcrumb = breadcrumb?[...breadcrumb]:[]

    pageBreadcrumb.push(
      {
      name:topic.name,
      to:topic.slug
    },
    {
      name:subTopic.name,
      to:subTopic.slug
    }
    )
    
    let currentPage = 1
  
    for (let i = 0; i < totalCount; i += perPage, currentPage++) {
      let pagePath = `${baseUrl}${currentPage > 1 ? '/' + currentPage : ''}`
      createPage({
        path:pagePath,
        component,
        context: {
          type,
          posts: allPosts.slice(i,i+perPage),
          paginate: {
            currentPage,
            totalPages,
            baseUrl
          },
          title:`${subTopic.name}`,
          breadcrumb:pageBreadcrumb
/*            ...node */
        },
      })
    }
}