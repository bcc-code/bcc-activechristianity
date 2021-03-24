/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require('lodash')
const  {getIndexPostQuery} = require('gatsby-source-ac/helpers')
const buildTranslatedStrings = require('./generators/json/build-translated-strings')
const buildMenus = require('./generators/json/build-menus')
const generateLogo = require('./generators/Other/generateLogo')
const {fetchScripts} = require('./fetch-external-scripts.js')
const endpoints = require('./src/strings/static/endpoints')
exports.onCreateWebpackConfig = ({ actions, plugins }) => {
    actions.setWebpackConfig({
      plugins: [
        plugins.define({
          'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
          'process.env.LANG': JSON.stringify(process.env.LANG),
          'process.env.LANG_CODE': JSON.stringify(process.env.LANG_CODE),
          'process.env.LOCALE': JSON.stringify(process.env.LOCALE),
          'process.env.ALGOLIA_APP_ID': JSON.stringify(process.env.ALGOLIA_APP_ID),
          'process.env.ALGOLIA_SEARCH_KEY': JSON.stringify(process.env.ALGOLIA_SEARCH_KEY),
          'process.env.BRANCH': JSON.stringify(String(process.env.BRANCH).substr(0,6)),
          'process.env.LISTEN_SECTION':JSON.stringify(process.env.LISTEN_SECTION),
          'process.env.GLOSSARY_SECTION':JSON.stringify(process.env.GLOSSARY_SECTION),
          'process.env.SCRIPTURE_SECTION':JSON.stringify(process.env.SCRIPTURE_SECTION),
          'process.env.GA_ID':JSON.stringify(process.env.GA_ID),
          'process.env.CLICKY_ID':JSON.stringify(process.env.CLICKY_ID),
          'process.env.DONT_ADD_TRACKING_CODE':JSON.stringify(process.env.DONT_ADD_TRACKING_CODE)
        })
      ],
      node: {
        fs: "empty",
      }
    })
  }

  exports.onPreInit = async () => {
    if (process.env.DONT_ADD_TRACKING_CODE!=="true"){
      fetchScripts()
    }
    await getIndexPostQuery(endpoints.api_url)
    await buildTranslatedStrings.translationStrings()
    await buildMenus.languageSites()
    await generateLogo()
  }

  exports.createPages = ({ page,actions, graphql }) => {
    const generatePosts = require('./generators/generatePosts.js')
    const generatePages = require('./generators/generatePages.js')
    const generateAuthors = require('./generators/generateAuthors.js')
    const generateTopics = require('./generators/TopicsFormatsTypes/index.js')
    const generateHome = require('./generators/generateHome.js')
    const generateExplore = require('./generators/generateExplore')
    const generatePodcast = require('./generators/generatePodcast')
    const generateRedirect = require('./generators/generateRedirect')
    const generateSeries = require('./generators/generateSeries')
    const generatePlaylists = require('./generators/generatePlaylists')
    const generateGlossary = require('./generators/generateGlossary')
    const generateScriptures = require('./generators/generateScriptures')
    
     const generators = [
      generateHome(actions, graphql),
      generateExplore(actions, graphql),
      generatePosts(actions, graphql), 
    ]

    if (process.env.SUPER_SLIM_DEV_MODE!=="true"){
      generators.push(
        generateAuthors(actions, graphql),
        generatePages(actions, graphql),
        generateTopics(actions, graphql),
        generateRedirect(actions, graphql),
       /*  generateSeries(actions, graphql) */
      )

      if (process.env.LISTEN_SECTION==="all"|| process.env.LISTEN_SECTION==="podcast_only"){
        console.log('generate podcast')
        generators.push(generatePodcast(actions, graphql))
      }
  
      if (process.env.LISTEN_SECTION==="all"){
        console.log("generating playlist")
        generators.push(generatePlaylists(actions, graphql))
      }
  
      if (process.env.GLOSSARY_SECTION==="true"){
        console.log("generating glossry")
        generators.push( generateGlossary(actions, graphql))
      }
  
      if (process.env.SCRIPTURE_SECTION==="true"){
        console.log("generating scriptures")
        generators.push(generateScriptures(actions, graphql)) 
      } 
    }


    return Promise.all(generators)

}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // Only update the `/user` page.
  if (page.path.match(/^\/user/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = `/user/*`

    // Update the page.
    createPage(page)
  }
}



exports.onPostBuild = async ({graphql, pathPrefix}, pluginOptions) => {
  const ac_strings=require('./src/strings/ac_strings.js')
  const allPagesQuery = `{
    allSitePage {
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
              }
            }
          }
      }
    }

  `

    const allPagesRes = await graphql(allPagesQuery)
    const findPages=[
      ac_strings.slug_about,
      ac_strings.slug_contact,
      ac_strings.slug_explore,
      ac_strings.slug_scripture,
      ac_strings.slug_playlist,
      ac_strings.slug_glossary,
    ]

    const {data}=allPagesRes
      
    if(data && data.allSitePage && data.allSitePage.edges){
      const nodes = data.allSitePage.edges
      const nodeMaps={

      }

      nodes.forEach(({node}) => {
          const {slug, context }=node
          const getType=context && context.pageType?context.pageType:"other"
          const toAdd = slug

          if(nodeMaps[getType]){
              nodeMaps[getType].push(toAdd)
          } else {
              nodeMaps[getType]=[toAdd]
          }
      });

      //
      console.log(Array.isArray(nodeMaps.contributor) && nodeMaps.contributor.length)
      console.log(Array.isArray(nodeMaps.glossary) && nodeMaps.glossary.length)
      console.log(Array.isArray(nodeMaps.playlist) && nodeMaps.playlist.length)
      console.log(Array.isArray(nodeMaps.post) && nodeMaps.post.length)
      console.log(nodeMaps.other)

      const validate={
        home:{
          slug:'/',
          validate:false
        },
        explore:{
          slug:ac_strings.slug_explore,
          validate:false
        },
        contact:{
          slug:ac_strings.slug_contact,
          validate:false
        },
        about:{
          slug:ac_strings.slug_about,
          validate:false
        }
      }

      //ac_strings.slug_home
      //ac_strings.slug_explore
      //ac_strings.slug_contact
      //ac_strings.slug_about

      // read + latest + subtopics
      // watch + latest + subtopics

    
      // pageType:'contributor' shoud be >400
      // pageType:'topic' should be > 80
      // catch

      // check topic (example id)

      // check format + latest

      if (process.env.LISTEN_SECTION ==="all"|| process.env.LISTEN_SECTION==="podcast_only"){
        /*  console.log('check podcast') */
        // check listen
        // check listen latest 1 + 2 + subtopics
        //
      }
  
      if (process.env.LISTEN_SECTION==="all"){
        console.log("check playlist")
        //slug_playlist
      }
  
      if (process.env.GLOSSARY_SECTION==="true"){
        console.log("check glossry")
        //slug_glossary
      }
  
      if (process.env.SCRIPTURE_SECTION==="true"){
        console.log("check scriptures")
        //slug_scripture
        //`${page.slug}-result`

      } 
    } else {
      throw Error ('not able to find pages')
    }


}