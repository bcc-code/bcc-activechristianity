const _ = require('lodash')
const path = require('path')
const ac_strings=require('../src/strings/ac_strings.js')
const TS = require('../src/strings')
/* SETUP */

const query = `{
  ac {
    allPages {
      id
      title
      slug
      label
      flexibleContent
    }

    about:page(id:${process.env.ABOUT_PAGE_ID}){
      title
      slug
    }
  }
}`

const pagesContext = {

  "podcast":{
    context: {
      id:process.env.PODCAST_FILTER_ID
    }
  }
}

/* BUILDER */

module.exports = function generatePages(actions, graphql) {
  const { createPage } = actions
  const themePages=[]

  const podcastHosts=[]
  const aboutUsChildren=[]
  return graphql(query).then(result=>{
    console.log("Generating pages")
    if (result.errors){
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    } else {
      const pageInfo = result.data.ac.allPages
      const podcast = {
        title:ac_strings.podcast,
        slug:ac_strings.slug_podcast
      }
      const aboutMain = result.data.ac.about

      const buildPages = [
        {
          slug:ac_strings.glossaries,
          templateName:"glossaries"
        },
        {
          slug:ac_strings.playlist,
          templateName:"playlists"
        },
        {
          slug:ac_strings.contact,
          templateName:"contact"
        }
      ]

      _.each(pageInfo,(page)=>{
        if (page && page.label.indexOf("about-us-") >-1){
          aboutUsChildren.push(page)
        } else if (page && page.label.indexOf("build-") >-1){
          let templateName
          if (page.label.indexOf("build-page") >-1){
            templateName="page"
           } else {
            templateName=page.label.replace("build-","")
           }          

          let context = {
            ...page,
              breadcrumb:[
                {
                  name:page.title,
                  to:page.slug
                }
              ]
          }
          if (pagesContext[page.label]){
            const pageContext = pagesContext[page.label]
            if (pageContext.context){
              context = {...context,...pageContext.context}
            }
            
          }
          console.log(page.slug)
          createPage({
            path: `${page.slug}`,
            component: path.resolve(`./src/templates/page/${templateName}.tsx`),
            context,
          })
        } 
      })

      // about us
      createPage({
        path: `${aboutMain.slug}`,
        component: path.resolve(`src/templates/page/about-us.tsx`),
        context:{
          title:aboutMain.title,
          id:aboutMain.id,
          childPages:aboutUsChildren,
          breadcrumb:[]
        },
      })





    }
  })

  

}

