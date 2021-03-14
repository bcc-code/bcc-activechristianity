

const nodeMaps={

}
const packageJson = require('../../package.json')
const processNodes = (nodes)=>{
    nodes.forEach(({node}) => {
     
        const {slug, context }=node
        const getType=context && context.pageType?context.pageType:"other"
        let versionUpdated = packageJson['version-updated-at']
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
              feature_image:context && context.normalized && context.normalized.image && context.normalized.image.src
            }
          }
        if(nodeMaps[getType]){
            nodeMaps[getType].push(toAdd)
        } else {
            nodeMaps[getType]=[toAdd]
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
            normalized {
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
            sitemap: `contributor`,
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
          
        },
        additionalSitemaps: [ // optional: add additional sitemaps, which are e. g. generated somewhere else, but need to be indexed for this domain
          {
              name: `other-pages`,
              url: `/other-pages.xml`,
          }]
}

module.exports.options=options
module.exports.pagesQuery=pagesQuery