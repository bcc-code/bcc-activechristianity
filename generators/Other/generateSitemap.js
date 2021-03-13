

const nodeMaps={

}

const processNodes = (nodes)=>{
    nodes.forEach(({node}) => {
     
        const {slug, context }=node
        const getType=context.pageType?context.pageType:"other"
        const toAdd = {
            node:{
              ...node,
              slug,
              updated_at:context.updated_at,
              feature_image:context.normalized.image.src
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
            type
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
            posts:site {
                siteMetadata {
                siteUrl
                }
            }
            contributors:site {
                siteMetadata {
                siteUrl
                }
            }
            topics:site {
                siteMetadata {
                siteUrl
                }
            }
            glossaries:site {
                siteMetadata {
                siteUrl
                }
            }
            homes:site {
                siteMetadata {
                siteUrl
                }
            }
        }`,
        mapping: {
          posts:{
            sitemap: `posts`,
            serializer: (nodes) => {
                processNodes(nodes)
                console.log(nodeMaps['post'])
              return nodeMaps['post']
 
            }
          },
          contributors:{
            sitemap: `contributor`,
            serializer: (nodes) => {
                console.log(nodeMaps['contributor'])
              return nodeMaps['contributor']
 
            }
          },
          topics:{
            sitemap: `topic`,
            serializer: (nodes) => {
                console.log(nodeMaps['topic'])
              return nodeMaps['topic']
 
            }
          },
          glossaries:{
            sitemap: `glossary`,
            serializer: (nodes) => {
                console.log(nodeMaps['glossary'])
              return nodeMaps['glossary']
 
            }
          },
          homes:{
            sitemap: `home`,
            serializer: (nodes) => {
                console.log(nodeMaps['home'])
              return nodeMaps['home']
 
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