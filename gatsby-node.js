/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require('lodash')
const generatePosts = require('./generators/generatePosts.js')
const generatePages = require('./generators/generatePages.js')
const generateAuthors = require('./generators/generateAuthors.js')
const generatePlaylists = require('./generators/generatePlaylists.js')
const generateScriptures=require('./generators/generateScriptures.js')
const generateGlossary = require('./generators/generateGlossary.js')
const generateTopics = require('./generators/TopicsFormatsTypes/index.js')
const generateHome = require('./generators/generateHome.js')
const generateExplore = require('./generators/generateExplore')
const generatePodcast = require('./generators/generatePodcast')
const generateRedirect = require('./generators/generateRedirect')
const buildTranslations = require('./generators/json/build-translations')

exports.onCreateWebpackConfig = ({ stage, loaders, actions, plugins }) => {
    actions.setWebpackConfig({
      plugins: [
        plugins.define({
          'process.env.API_URL': JSON.stringify(process.env.API_URL),
          'process.env.API_HOST': JSON.stringify(process.env.API_HOST),
          'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
          'process.env.URL': JSON.stringify(process.env.URL),
          'process.env.LANG': JSON.stringify(process.env.LANG),
          'process.env.LANG_CODE': JSON.stringify(process.env.LANG_CODE),
          'process.env.LOCALE': JSON.stringify(process.env.LOCALE),
          'process.env.BIBLE_VERSION': JSON.stringify(process.env.BIBLE_VERSION),
          'process.env.ALGOLIA_APP_ID': JSON.stringify(process.env.ALGOLIA_APP_ID),
          'process.env.ALGOLIA_SEARCH_KEY': JSON.stringify(process.env.ALGOLIA_SEARCH_KEY),
          'process.env.BRANCH': JSON.stringify(String(process.env.BRANCH).substr(0,6)),
          'process.env.PODCAST_PLAYLIST_SLUG': JSON.stringify(process.env.PODCAST_PLAYLIST_SLUG),
          'process.env.USER_PAGE_ID':JSON.stringify(process.env.USER_PAGE_ID),
          'process.env.PODCAST_FILTER_ID':JSON.stringify(process.env.PODCAST_FILTER_ID),
        })
      ]
    })
  }

  exports.onPreBootstrap = async () => {
    console.log('loading pre bootscrap')
    await buildTranslations.translationStrings()
    await buildTranslations.languageSites()

  }

  exports.createPages = ({ page,actions, graphql }) => {

     const generators = [
/*       generateAuthors(actions, graphql),  */
      generatePages(actions, graphql),
 /*      generateExplore(actions, graphql),
      generateHome(actions, graphql), 
      generatePosts(actions, graphql),
      generateTopics(actions, graphql), 
      generateRedirect(actions, graphql) */
    ]

/*     if (process.env.LANG_CODE==="en"){
      generators.push( generateGlossary(actions, graphql))
      generators.push(generatePlaylists(actions, graphql))
      generators.push(generateScriptures(actions, graphql))
      generators.push(generatePodcast(actions, graphql))
    } */
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
