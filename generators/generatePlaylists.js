const _ = require('lodash')
const path = require('path')
const TS = require('../src/strings/ac_strings.json')
const template = 'src/templates/single-resource/playlist.tsx'

const query = `
    {
    ac {
      playlists {
        title
        slug
        excerpt
        tracks {
          url
          title
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

      resource:page(id:${process.env.RESOURCE_PAGE_ID}){
        title
        slug
      }

      playlistMain:page(id:${process.env.PLAYLIST_PAGE_ID}){
        title
        slug
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
      const resourcePage = result.data.ac.resource
      const playlistMain= result.data.ac.playlistMain
      const navTopItem={name:resourcePage.title,to:resourcePage.slug}
  
      _.each(playlists, (playlist) => {
        const basePath = `/${TS.playlist}/${playlist.slug}`

        createPage({
          path: basePath,
          component: path.resolve(template),
          context: {
            title:playlist.title,
            slug: playlist.slug,
            playlist,
            breadcrumb:[navTopItem,{name:playlistMain.title,to:playlistMain.slug}]
          },
        })
      })
  
    })
  }