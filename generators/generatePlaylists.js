const _ = require('lodash')
const path = require('path')
const TS = require('../src/strings/NewStrings.json')
const template = 'src/templates/single-resource/playlist.tsx'

const query = `
    {
    ac {
      playlists {
        title
        slug
        excerpt
        tracks {
          src
          title
          post {
            title
            slug
          }
          
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
  
      const playlists = result.data.ac.playlists
  
  
      _.each(playlists, (playlist) => {
        const basePath = `/${TS.playlist}/${playlist.slug}`
        console.log(basePath)
        createPage({
          path: basePath,
          component: path.resolve(template),
          context: {
            title:playlist.title,
            slug: playlist.slug,
            playlist,
            breadcrumb:[]
          },
        })
      })
  
    })
  }