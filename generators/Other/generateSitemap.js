

const pageType = (node)=>{
    const {slug, context }=node
/*     if (slug.startsWith(`/${ac_strings.slug_ac_author}`)){
        return 'contributor'
    } else if (slug.startsWith(`/${ac_strings.slug_topic}`)) {
        return 'topic'
    } 
    else if (slug.startsWith(`/${ac_strings.slug_glossary}`)) {
        return 'glossary'
    }
    else if (slug.startsWith(`/${ac_strings.slug_playlist}`)) {
        return 'playlist'
    } else  */if(!!context){
        if (context.pageType==="post"){
            return 'post'
        } else if (context.pageType==="home"){
            return 'home'
        } else  if (context.pageType==='contributor'){
            return 'contributor'
        } else {
            return 'other'
        }
      } else {
        return 'other'
      }
}

const nodeMaps={

}

const processNodes = (nodes)=>{
    nodes.forEach(({node}) => {
        const getType=pageType(node)
        const {slug, context }=node
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
                processNodes(nodes)
                console.log(nodeMaps['contributor'])
              return nodeMaps['contributor']
 
            }
          },
          homes:{
            sitemap: `home`,
            serializer: (nodes) => {
                processNodes(nodes)
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