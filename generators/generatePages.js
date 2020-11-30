const _ = require('lodash')
const path = require('path')
const ac_strings=require('../src/strings/ac_strings.js')
/* SETUP */

const query = `{
  ac {
    allPages {
      id
      title
      slug
      label
      flexibleContent
      parent {
        id
        title
        slug
      }
    }

  }
}`


/* BUILDER */

module.exports = function generatePages(actions, graphql) {
  const { createPage } = actions

  return graphql(query).then(result=>{
    console.log("Generating pages")
    if (result.errors){
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    } else {
      const pageInfo = result.data.ac.allPages

      const aboutMain = {
        page:ac_strings.about_us,
        slug:ac_strings.slug_about
      }

      const parentIds = {
        about:{
          "id": "13",
          templateName:'about-us',
          children:[]
        },
        themes:{
          "id": "75",
          templateName:'theme-page',
          children:[]
        },
        pages:{
          "id": "76",
          templateName:`page`,
          children:[]
        }
      }
      const buildPages = [
        {
          title:ac_strings.glossary,
          slug:ac_strings.slug_glossary,
          templateName:"glossaries"
        },
        {
          title:ac_strings.playlist,
          slug:ac_strings.slug_playlist,
          templateName:"playlists"
        },
        {
          title:ac_strings.contact,
          slug:ac_strings.slug_contact,
          templateName:"contact"
        }
      ]

      _.each(buildPages,page=>{
        console.log(page)
        createPage({
          path: `${page.slug}`,
          component: path.resolve(`./src/templates/page/${page.templateName}.tsx`),
          context:{
            title:page.title,
            slug:page.slug
          },
        })
      })

      _.each(pageInfo,(page)=>{
        
          if(page.parent){
            if (`${page.parent.id}`==`${parentIds.about.id}`){
              parentIds.about.children.push(page)
            } else if (`${page.parent.id}`==`${parentIds.themes.id}`){
              parentIds.themes.children.push(page)
            } else if (`${page.parent.id}`==`${parentIds.pages.id}`){
              parentIds.pages.children.push(page)
            } 
          }
      })

     
      // themes pages
      _.each(parentIds.themes.children,page=>{
        console.log(page)
        let context = {
          ...page,
            breadcrumb:[
              {
                name:page.title,
                to:page.slug
              }
            ]
        }
        createPage({
          
          path: `${ac_strings.slug_theme}/${page.slug}`,
          component: path.resolve(`./src/templates/page/${parentIds.themes.templateName}.tsx`),
          context,
        })
      })
 // pages
      _.each(parentIds.pages.children,page=>{
        console.log(page)
        let context = {
          ...page,
            breadcrumb:[
              {
                name:page.title,
                to:page.slug
              }
            ]
        }
        createPage({
          path: `${page.slug}`,
          component: path.resolve(`./src/templates/page/${parentIds.pages.templateName}.tsx`),
          context,
        })
      })

      // about us
      console.log('building about')
      console.log(aboutMain)
      createPage({
        path: `${aboutMain.slug}`,
        component: path.resolve(`src/templates/page/about-us.tsx`),
        context:{
          title:aboutMain.title,
          childPages:parentIds.about.children,
          breadcrumb:[]
        },
      })





    }
  })

  

}

