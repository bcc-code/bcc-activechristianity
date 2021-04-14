/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require('lodash')
const  {getIndexPostQuery, sendQuery } = require('gatsby-source-ac/helpers')
const {formatScope,typeScope,groupAll} = require('./src/strings/static/topic-ids.js')
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
      generatePages(actions, graphql),

    ]

    if (process.env.SUPER_SLIM_DEV_MODE!=="true"){
      generators.push(
        generatePosts(actions, graphql), 
        generateTopics(actions, graphql),
        generateAuthors(actions, graphql),
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

  const postBuildTestQuery = `
    query {
      posts {
        paginatorInfo {
          count
          total
        }
      }
  
      formats:topics (group_id:4){
        slug
        id
        noOfPosts
      }
  
      types:topics(group_id:5){
        id
        slug
        noOfPosts
        subTopics {
            id
            slug
            group_id
        }
        
      }
      testTopic1:topic(id:83819){
        slug
        noOfPosts
      }
      testTopic2:topic(id:134){
        slug
        noOfPosts
      }
      testAuthor1:author(id:1508){
        slug
      }
      testAuthor2:author(id:1597){
          slug
      }
      authorsCount:authors{
        paginatorInfo {
          total
        }
      }
    }
  `
    const allPagesRes = await graphql(allPagesQuery)
    const allPostAndTopicTestData = await sendQuery(postBuildTestQuery,endpoints.api_url,{ "x-lang": process.env.LANG_CODE})
    const {posts,formats,types,testTopic1,testTopic2,authorsCount,testAuthor2,testAuthor1}=allPostAndTopicTestData

 
    const {data}=allPagesRes

    if(data && data.allSitePage && data.allSitePage.edges){
      const nodes = data.allSitePage.edges
      const nodeMaps={}

      const slugsToValidateArray=[
        ac_strings.slug_explore,
        ac_strings.slug_contact,
        ac_strings.slug_about,
        ac_strings.slug_privacy_policy,
        ac_strings.slug_cookie_policy,
        ac_strings.slug_read,
        ac_strings.slug_watch,
        ac_strings.slug_latest,
        ac_strings.slug_topic,
        `${ac_strings.slug_read}/${ac_strings.slug_latest}`,
        `${ac_strings.slug_ac_author}/${testAuthor2.slug}`,
        `${ac_strings.slug_ac_author}/${testAuthor1.slug}`
      ]
      

      const postTotal=posts.paginatorInfo.total
      const pageCount=Math.ceil(postTotal/12)
      slugsToValidateArray.push(`${ac_strings.slug_latest}/2`,`${ac_strings.slug_latest}/${pageCount}`)
      formats.forEach(node=>{
        console.log(node)
        const find = formatScope.find(f=>`${f.keyId}`===`${node.id}`)
        if(find && node.noOfPosts>0){
          slugsToValidateArray.push(`${node.slug}`,`${node.slug}/${ac_strings.slug_latest}`)
        }
      })

      types.forEach(node=>{
        const find = typeScope.find(t=>`${t.keyId}`===`${node.id}`)

        if(find && node.noOfPosts>0){
          const topicPageTotal=node.noOfPosts
          const pageCount=Math.ceil(topicPageTotal/12)
          slugsToValidateArray.push(`${node.slug}/${ac_strings.slug_latest}`,`${node.slug}/${ac_strings.slug_latest}/${pageCount}`)
          node.subTopics.forEach(t=>{
            const find = formatScope.find(f=>`${f.keyId}`===`${t.id}`)
            if(find){
              slugsToValidateArray.push(`${node.slug}/${t.slug}`)
            }
          })
        }

      })

      const testTopics=[testTopic1,testTopic2]

      testTopics.forEach(node=>{
        slugsToValidateArray.push(`${ac_strings.slug_topic}/${node.slug}`,
        `${ac_strings.slug_topic}/${node.slug}/1`)
      })

      const slugsToValidateObject={
        '/':false
      }
 
      const missingPagesSlugs=[]

      if (process.env.LISTEN_SECTION ==="all"|| process.env.LISTEN_SECTION==="podcast_only"){
        slugsToValidateArray.push(ac_strings.slug_listen)
        slugsToValidateArray.push(`${ac_strings.slug_listen}/${ac_strings.slug_latest}`)
      }

      if (process.env.LISTEN_SECTION ==="all"){
        console.log("check playlist")
        slugsToValidateArray.push(ac_strings.slug_playlist)
      }

      if (process.env.SCRIPTURE_SECTION==="true"){
        console.log("check scriptures")
        slugsToValidateArray.push(ac_strings.slug_scripture,`${ac_strings.slug_scripture}-result`)
      }

      if (process.env.GLOSSARY_SECTION==="true"){
        console.log(Array.isArray(nodeMaps.glossary) && nodeMaps.glossary.length)
        console.log("check glossry")
      }

      // generate slug map to validate all pages
      slugsToValidateArray.forEach((item,i)=>{
        if(typeof item==="string" && item!==""){
          let toValidateSlug = item
          if (!item.startsWith("/")){
            toValidateSlug=`/${item}`
          }
          slugsToValidateObject[toValidateSlug]=false
        } else {
          throw new Error(`Unable to find slug on index ${i}`)
        }
      })
      console.log(slugsToValidateObject)
   
      
      nodes.forEach(({node}) => {
          const {slug, context }=node
          const getType=context && context.pageType?context.pageType:"other"
          const toAdd = slug
          //try to find  pages the needs to be validated, if not add them to the missing page array
          if(slugsToValidateObject[slug]!==undefined){
            slugsToValidateObject[slug]=true
          } 

          //  at the same sort all pages by type
          if(nodeMaps[getType]){
              nodeMaps[getType].push(toAdd)
          } else {
              nodeMaps[getType]=[toAdd]
          }
      });

      const checkFoundSlugsArray = Object.keys(slugsToValidateObject)
      checkFoundSlugsArray.forEach(item=>{
        console.log(slugsToValidateObject[item])
        if (slugsToValidateObject[item]===false){
          console.log(item)
            missingPagesSlugs.push(item)//
          
        }
      })
      
      if(missingPagesSlugs.length>0){
        console.log(missingPagesSlugs)
        throw new Error(`Did not generate pages.`)
      } else {
        console.log(slugsToValidateObject)
        console.log('Found all these pages')
      }

      let hasPost=Array.isArray(nodeMaps.post) && nodeMaps.post.length>0 
         console.log(`${nodeMaps.post.length} posts generated`)
         console.log(`${posts.paginatorInfo.total} posts should be generated`)
       if(!hasPost || posts.paginatorInfo.total!== nodeMaps.post.length){
         
        throw new Error('some posts are missing')
       }


      if (process.env.LISTEN_SECTION==="all"){
        const hasPlaylists = Array.isArray(nodeMaps.playlist) && nodeMaps.playlist.length>0
        if(!hasPlaylists){
          throw new Error('no playlist generated')
        } else {
          console.log(`${nodeMaps.playlist.length} playlists generated`)
        }

      }
  
      if (process.env.GLOSSARY_SECTION==="true"){
        const hasGlossary = Array.isArray(nodeMaps.glossary) && nodeMaps.glossary.length>0
        if(!hasGlossary){
          throw new Error('no glossary generated')
        } else {
          console.log(`${nodeMaps.glossary.length} glossary generated`)
        }
      }
  
    } else {
      throw new Error ('not able to find pages')
    }


}