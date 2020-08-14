const _ = require('lodash')
const path = require('path')
const {saveFile} = require('./json/build-translations')

/* SETUP */
const template = 'src/templates/single-resource/post.tsx'
const listTemplate = 'src/templates/archive/post-list.tsx'
const videoListTemplate ='src/templates/archive/video-list.tsx'
const query = `{
  allAcNodePost {
      totalCount
      nodes {
        slug
        id
        slug
        topics {
          slug
          id
          name
          group {
            name
          }
        }
      }
    }
}`

const formatTitles = {
  "read":"Article",
  "watch":"Video",
  "listen":"Audio",
}


/* BUILDER */

module.exports = function generatePosts(actions, graphql) {
  const { createPage } = actions

  return graphql(query)
  .then((result) => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allAcNodePost.nodes
    // example-> "read/listen":{posts:[]}
    const typeFormatPosts={}
    // example-> {"read":{"edification"}}
    const typeToFormatLinks={}

    // example-> {"edification":{"read"}}
    const formatToTypeLinks={}

    // Iterate over the array of posts
    _.each(posts, (post) => {
      const postTopics =post.topics


      const postFormat = []
      const postType = []

      _.each(postTopics,(pt)=>{
        if (pt.group.name === 'Type') {
          postType.push(pt)
        } else if (pt.group.name === 'Format') {
          if (pt.id!==process.env.PODCAST_FILTER_ID){
            postFormat.push(pt)
          }
        } 
      })

      // if it is a "type/format" topic
      if (postType.length>0 && postFormat.length>0){
        _.each(postType, (pt)=>{
          _.each(postFormat,(pf)=>{
            const typeId=pt.id
            const formatId=pf.id
            // add format under type
            if (!typeToFormatLinks[typeId]){
              typeToFormatLinks[typeId]={info:pt,[formatId]:pf}
            } else {
              typeToFormatLinks[typeId][formatId]=pf
            }

             // add format under type
            if (!formatToTypeLinks[formatId]){
              formatToTypeLinks[formatId]={info:pf,[typeId]:pt}
            } else {
              formatToTypeLinks[formatId][typeId]=pt
            }


            // example-> "read/listen":{posts:[]}
            if (typeFormatPosts[pt.slug+'/'+pf.slug]){
              typeFormatPosts[pt.slug+'/'+pf.slug].posts.push(post.slug)
            } else {
              typeFormatPosts[pt.slug+'/'+pf.slug]={
                type:pt,
                format:pf,
                posts:[post.slug]
              }
            }

          })

        })
      }

      const breadcrumb = []

      if (postFormat.length>0){
        breadcrumb.push({name:postFormat[0].name,to:postFormat[0].slug})
      }

      createPage({
        path: `${post.slug}`,
        component: path.resolve(template),
        context: {
          id: post.id,
          breadcrumb
        },
      })


    })
    

    const typeFormatPostsList = Object.keys(typeFormatPosts)
    _.each(typeFormatPostsList,(tf=>{
      const node= typeFormatPosts[tf]
    
      const allPosts=node.posts
      if (!allPosts.length) return
      const totalCount = allPosts.length
      const perPage = 12
      if (!totalCount) return null
      const totalPages = Math.ceil(totalCount / perPage)
      const baseUrl = tf

      const component = node.type.slug==='watch'?path.resolve(videoListTemplate):path.resolve(listTemplate)

      let currentPage = 1

      for (let i = 0; i < totalCount; i += perPage, currentPage++) {
        let path = `${baseUrl}${currentPage > 1 ? '/' + currentPage : ''}`
        console.log(`${formatTitles[node.type.slug]} ${node.format.name}`)

        const {type,format} = node
        createPage({
          path,
          component,
          context: {
            posts: allPosts.slice(i,i+perPage),
            paginate: {
              currentPage,
              totalPages,
              baseUrl
            },
            title:`${formatTitles[node.type.slug]} ${node.format.name}`,
            type:node.type,
            format:node.format,
            breadcrumb:[
              {
              name:type.name,
              to:type.slug
            },{
              name:format.name,
              to:format.slug
            }]
 /*            ...node */
          },
        })
      }
    }))
    saveFile('./src/strings', 'types-formats', 'json',  {typeToFormatLinks,formatToTypeLinks})

    return 
  })
}