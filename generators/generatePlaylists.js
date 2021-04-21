const _ = require('lodash')
const path = require('path')
const ac_strings = require('../src/strings/ac_strings.js')
const template = 'src/templates/single-resource/playlist.tsx'

const query = `
    {
    ac {
      playlists {
        id
        title
        slug
        excerpt
        type
        tracks {
          url
          title
          duration
          post {
            title
            slug
          }
          
        }
        image {
          src
          srcset
          dataUri
          alt
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
      const playlistMain= {
        title:ac_strings.playlist,
        slug:ac_strings.slug_playlist
    }
      console.log("Generating playlist")
      _.each(playlists, (playlist) => {
        const basePath = `/${ac_strings.slug_playlist}/${playlist.slug}`
        console.log(basePath)
        createPage({
          path: basePath,
          component: path.resolve(template),
          context: {
            title:playlist.title,
            slug: playlist.slug,
            playlist,
            pageType:'playlist',
            breadcrumb:[{name:playlistMain.title,to:playlistMain.slug}]
          },
        })
      })
  
    })
  }