


const packageJson = require('../../package.json')

const processNodes = (nodes, key)=>{
    const nodeMaps={

    }
    nodes.forEach(({node}) => {
     
        const {slug, context }=node
        const getType=context && context.pageType?context.pageType:"other"
        const isVideo=context && context.mediaTypes && context.mediaTypes.default && context.mediaTypes.default==="video"

        let versionUpdated = packageJson['version-updated-at']
        const thumbnail = context && context.normalized && context.normalized.image && context.normalized.image.src;
        if (context && context.updated_at){
          const d1 = new Date(versionUpdated);
          const d2 = new Date(context.updated_at);
          versionUpdated =d2>d1?context.updated_at:versionUpdated
        }
        
        const toAdd = {
            node:{
              ...node,
              slug,
              updated_at:versionUpdated,
              feature_image:thumbnail
            }
          }
        if(nodeMaps[getType]){
            nodeMaps[getType].push(toAdd)
        } else {
            nodeMaps[getType]=[toAdd]
        }

        if(isVideo){
          const toAddVideo = {
            node:{
              ...node,
              slug,
              updated_at:versionUpdated,
              video: {
                thumbnail_loc:thumbnail,
                title:context.normalized.title,
                description:context.normalized.exceprt,
                content_loc:context.normalized.media.video.src
              }
            }
          }
          if(nodeMaps["video"]){
            nodeMaps["video"].push(toAddVideo)
          } else {
            nodeMaps["video"]=[toAddVideo]
          }
          
        }
    });
    return nodeMaps[key]
}

const pagesQuery = `
    edges {
        node {
        id
        slug:path
        context {
            pageType
            updated_at
            mediaTypes {
              default
            }
            normalized {
              
              title
              excerpt
              image {
                  src
              }
              media {
								video {
                  src
                }
              }
            }
        }
        }
    }
`

const options = {
    query: `{
            site {
              siteMetadata {
                  siteUrl
              }
            }

            posts:allSitePage {
              ${pagesQuery}
            }
            contributors:allSitePage {
              ${pagesQuery}
            }
            topics:allSitePage {
              ${pagesQuery}
            }
            glossaries:allSitePage {
              ${pagesQuery}
            }
            homes:allSitePage {
              ${pagesQuery}
            }
            latest:allSitePage {
              ${pagesQuery}
            }
            catergory:allSitePage {
              ${pagesQuery}
            }
            playlists:allSitePage {
              ${pagesQuery}
            }
            videos:allSitePage {
              ${pagesQuery}
            }
            allSitePage {
              ${pagesQuery}
            }
            
        }`,
        mapping: {
          posts:{
            sitemap: `posts`,
            serializer: (nodes) => {
                const posts = processNodes(nodes,'post')
                /* console.log(nodeMaps['post']) */
                return Array.isArray(posts)?posts:[] 
 
            }
          },
          contributors:{
            sitemap: `contributors`,
            serializer: (nodes) => {
              const posts = processNodes(nodes,'contributor')
              return Array.isArray(posts)?posts:[] 
 
            }
          },
          topics:{
            sitemap: `topic`,
            serializer: (nodes) => {
              const posts = processNodes(nodes,'topic')
              return Array.isArray(posts)?posts:[] 
 
            }
          },
          glossaries:{
            sitemap: `glossary`,
            serializer: (nodes) => {
              const posts = processNodes(nodes,'glossary')
              return Array.isArray(posts)?posts:[] 
            }
          },
          homes:{
            sitemap: `home`,
            serializer: (nodes) => {
              const posts = processNodes(nodes,'home')
              return Array.isArray(posts)?posts:[] 
 
            }
          },
          allSitePage:{
            sitemap: `other`,
            serializer: (nodes) => {
              const posts = processNodes(nodes,'other')
              return Array.isArray(posts)?posts:[] 
 
            }
          },
          latest:{
            sitemap: `latest`,
            serializer: (nodes) => {
              const posts = processNodes(nodes,'latest')
              return Array.isArray(posts)?posts:[] 
            }
          },
          categories:{
            sitemap: `categories`,
            serializer: (nodes) => {
              const posts = processNodes(nodes,'category')
              return Array.isArray(posts)?posts:[] 
 
            }
          },
          playlists:{
            sitemap: `playlists`,
            serializer: (nodes) => {
              const posts = processNodes(nodes,'playlist')
              return Array.isArray(posts)?posts:[] 
 
            }
          },
          videos:{
            sitemap: `videos`,
            serializer: (nodes) => {
              const posts = processNodes(nodes,'video')
              return Array.isArray(posts)?posts:[] 
 
            }
          }
        },
        additionalSitemaps: [ // optional: add additional sitemaps, which are e. g. generated somewhere else, but need to be indexed for this domain
          {
              name: `other-pages`,
              url: `/other-pages.xml`,
          }]
}

module.exports.options=options
module.exports.pagesQuery=pagesQuery