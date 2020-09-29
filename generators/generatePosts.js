const _ = require('lodash')
const path = require('path')
const listTemplate = 'src/templates/archive/post-list.tsx'
const TS = require('../src/strings')
const ac_strings=require('../src/strings/ac_strings.json')
/* SETUP */
const template = 'src/templates/single-resource/post.tsx'

const query = `{
  allAcNodePost {
      totalCount
      nodes {
        slug
        id
      }
    }
}`

const perPage = 12

/* BUILDER */

module.exports = function generatePosts(actions, graphql) {
  const { createPage } = actions

  return graphql(query)
  .then(async (result) => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allAcNodePost.nodes
    console.log("Generating posts")

    // Iterate over the array of posts
    _.each(posts, (post) => {
      createPage({
        path: `${post.slug}`,
        component: path.resolve(template),
        context: {
          id: post.id,
        },
      })

    })

    const component = path.resolve(listTemplate)
    const baseUrl = `${ac_strings.slug_latest}`
    

    let currentPage = 1
    const totalCount=posts.length
    const allPosts= posts.map(p=>p.slug)
    // create achive of each topic, type, format
    const totalPages = Math.ceil(totalCount / perPage)
    for (let i = 0; i < totalCount; i += perPage, currentPage++) {
      let pagePath = `${baseUrl}${currentPage > 1 ? '/' + currentPage : ''}`
      createPage({
        path:pagePath,
        component,
        context: {
          posts: allPosts.slice(i,i+perPage),
          paginate: {
            currentPage,
            totalPages,
            baseUrl
          },
          title:TS.latest
        },
      })
    }
    
    return 
  })
}