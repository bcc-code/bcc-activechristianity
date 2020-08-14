/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require('lodash')
const generatePostsAndFormats = require('./generators/generatePostsAndFormats.js')
const generatePages = require('./generators/generatePages.js')
const generateTopics = require('./generators/generateTopics.js')
const generateAuthors = require('./generators/generateAuthors.js')
const generateEbooks = require('./generators/generateEbooks.js')
const generatePlaylists = require('./generators/generatePlaylists.js')
const generateSeries = require('./generators/generateSeries.js')
const generateGlossary = require('./generators/generateGlossary.js')

const buildTranslations = require('./generators/json/build-translations')

const fetch = require('node-fetch');

const path = require('path')

exports.onCreateWebpackConfig = ({ stage, loaders, actions, plugins }) => {
    actions.setWebpackConfig({
      plugins: [
        plugins.define({
          'process.env.API_URL': JSON.stringify(process.env.API_URL),
          'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
          'process.env.MEDIA_CDN_URL': JSON.stringify(process.env.MEDIA_CDN_URL ),
          'process.env.URL': JSON.stringify(process.env.URL),
          'process.env.LANG': JSON.stringify(process.env.LANG),
          'process.env.LANG_CODE': JSON.stringify(process.env.LANG_CODE),
          'process.env.LOCALE': JSON.stringify(process.env.LOCALE),
          'process.env.BIBLE_VERSION': JSON.stringify(process.env.BIBLE_VERSION),
          'process.env.ALGOLIA_APP_ID': JSON.stringify(process.env.ALGOLIA_APP_ID),
          'process.env.ALGOLIA_SEARCH_KEY': JSON.stringify(process.env.ALGOLIA_SEARCH_KEY),
          'process.env.BRANCH': JSON.stringify(String(process.env.BRANCH).substr(0,6)),
          'process.env.EDIFICATION_FILTER_ID': JSON.stringify(process.env.EDIFICATION_FILTER_ID),
          'process.env.TESTIMONY_FILTER_ID': JSON.stringify(process.env.TESTIMONY_FILTER_ID),
          'process.env.QUESTION_FILTER_ID': JSON.stringify(process.env.QUESTION_FILTER_ID),
          'process.env.COMMENTARY_FILTER_ID': JSON.stringify(process.env.COMMENTARY_FILTER_ID),
          'process.env.MESSAGE_FILTER_ID': JSON.stringify(process.env.MESSAGE_FILTER_ID),
          'process.env.SONG_FILTER_ID': JSON.stringify(process.env.SONG_FILTER_ID),
          'process.env.PODCAST_FILTER_ID': JSON.stringify(process.env.PODCAST_FILTER_ID),
          'process.env.LISTEN_POSTS_FILTER_ID': JSON.stringify(process.env.LISTEN_POSTS_FILTER_ID),
          'process.env.WATCH_POSTS_FILTER_ID': JSON.stringify(process.env.WATCH_POSTS_FILTER_ID),
          'process.env.READ_POSTS_FILTER_ID': JSON.stringify(process.env.READ_POSTS_FILTER_ID),
        })
      ]
    })
  }



  exports.onPreBootstrap = async () => {
    await buildTranslations.translationStrings()
    await buildTranslations.languageSites()

  }

  exports.createPages = ({ page,actions, graphql }) => {

     const generators = [
      generatePostsAndFormats(actions, graphql),
      generatePages(actions, graphql),
      generateTopics(actions, graphql),
      generateAuthors(actions, graphql),
      generateEbooks(actions, graphql),
      generatePlaylists(actions, graphql),
      generateSeries(actions, graphql),
      generateGlossary(actions, graphql)
    ]

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
    page.matchPath = "/user/*"

    // Update the page.
    createPage(page)
  }
}
