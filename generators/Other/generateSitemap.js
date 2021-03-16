

const nodeMaps={

}
const packageJson = require('../../package.json')

const processNodes = (nodes)=>{
    nodes.forEach(({node}) => {
     
        const {slug, context }=node
        const getType=context && context.pageType?context.pageType:"other"
        const isVideo=context && context.mediaTypes && context.mediaTypes.types && context.mediaTypes.types==="video"
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
                expect:context.normalized.exceprt,
                content_loc:context.normalized.media.video.src
              }
            }
          }

          nodeMaps["videos"]=[toAddVideo]
        }
    });

    console.log(nodeMaps)
}

const pagesQuery = `
    edges {
        node {
        id
        slug:path
        context {
            pageType
            updated_at
            normalized {
              title
              excerpt
              image {
                  src
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
            allSitePage {
                ${pagesQuery}
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
            
        }`,
        mapping: {
          posts:{
            sitemap: `posts`,
            serializer: (nodes) => {
                processNodes(nodes)
                /* console.log(nodeMaps['post']) */
                return Array.isArray(nodeMaps['post'])?nodeMaps['post']:[] 
 
            }
          },
          contributors:{
            sitemap: `contributors`,
            serializer: (nodes) => {
              return Array.isArray(nodeMaps['contributor'])?nodeMaps['contributor']:[] 
 
            }
          },
          topics:{
            sitemap: `topic`,
            serializer: (nodes) => {
              return Array.isArray(nodeMaps['topic'])?nodeMaps['topic']:[] 
 
            }
          },
          glossaries:{
            sitemap: `glossary`,
            serializer: (nodes) => {
              return Array.isArray(nodeMaps['glossary'])?nodeMaps['glossary']:[]
            }
          },
          homes:{
            sitemap: `home`,
            serializer: (nodes) => {
              return Array.isArray(nodeMaps['home'])?nodeMaps['home']:[]
 
            }
          },
          allSitePage:{
            sitemap: `other`,
            serializer: (nodes) => {
              return Array.isArray(nodeMaps['other'])?nodeMaps['other']:[]
 
            }
          },
          latest:{
            sitemap: `latest`,
            serializer: (nodes) => {
              return Array.isArray(nodeMaps['latest'])?nodeMaps['latest']:[]
 
            }
          },
          categories:{
            sitemap: `categories`,
            serializer: (nodes) => {
              return Array.isArray(nodeMaps['category'])?nodeMaps['category']:[]
 
            }
          },
          playlists:{
            sitemap: `playlists`,
            serializer: (nodes) => {
              return Array.isArray(nodeMaps['playlist'])?nodeMaps['playlist']:[]
 
            }
          },
          videos:{
            sitemap: `videos`,
            serializer: (nodes) => {
              return Array.isArray(nodeMaps['video'])?nodeMaps['video']:[]
 
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