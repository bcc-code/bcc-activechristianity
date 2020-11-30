const _ = require('lodash')
const path = require('path')
const saveFile = require('./saveFile')
const ac_strings = require('../src/strings/ac_strings.js')

const query = `
    {
    ac {
        series {
            id
            slug
            title
            posts {
              title
              excerpt
              slug
            }
          }
    }
  }
`

module.exports = function generatePlaylists(actions, graphql) {
    const { createPage } = actions
  
    return graphql(query).then((result) => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }
  
      const series = result.data.ac.series

      const data = {
        'series':{},
        'posts':{}
      }
      _.each(series, (node) => {
        data['series'][node.id]=node
        _.each(node.posts,(post)=>{
            console.log(post.slug)
            data['posts'][post.slug]=node.id
        })
/*         const basePath = `/${ac_strings.slug_playlist}/${playlist.slug}` */

/*         createPage({
          path: basePath,
          component: path.resolve(template),
          context: {
            title:playlist.title,
            slug: playlist.slug,
            playlist,
            breadcrumb:[{name:playlistMain.title,to:playlistMain.slug}]
          },
        }) */
      })
      console.log(data)
      saveFile('./src/strings', 'series', 'json',  data)
    })
  }