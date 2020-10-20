const _ = require('lodash')
const path = require('path')
const ac_strings=require('../src/strings/ac_strings.json')

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

    topicMain:page(id:${process.env.TOPICS_PAGE_ID}){
      title
      slug
    }

    podcast:page(id:${process.env.PODCAST_PAGE_ID}){
      title
      slug
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
      const topicsMain= result.data.ac.topicMain
      const podcast = result.data.ac.podcast
      const aboutMain = result.data.ac.about
      const navTopicsItem={name:topicsMain.title,to:topicsMain.slug}
     

      _.each(pageInfo,(page)=>{
        if (page && page.label==="theme-page"){
          themePages.push(page)
        } else if (page && page.label==="podcast-host"){
          podcastHosts.push(page)
        } else if (page && page.label.indexOf("about-us-") >-1){
          aboutUsChildren.push(page)
        } else if (page && page.label.indexOf("build-") >-1){
          const templateName=page.label.replace("build-","")
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

      // topic
      createPage({
        path: `${topicsMain.slug}`,
        component: path.resolve(`./src/templates/page/topics.tsx`),
        context:{
          title:topicsMain.title,
          id:topicsMain.id,
          themes:themePages,
          breadcrumb:[
            navTopicsItem
          ]
        }, 
      })

      _.each(themePages,page=>{
        const themePagePath=`${ac_strings.slug_theme}/${page.slug}`

        createPage({
          path: themePagePath,
          component: path.resolve(`./src/templates/page/theme-page.tsx`),
          context:{
            title:page.title,
            id:page.id,
            breadcrumb:[
              navTopicsItem,
              {
                name:page.title,
                to:themePagePath
              }
            ]
          },
        })

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
      
      // podcast and hosts
      const allHostsSlug= []
      for (let i =0;i<podcastHosts.length;i++){
        const hostPage = podcastHosts[i]
        const hostPath = `${ac_strings.slug_host}/${hostPage.slug}`
        // const getHostImage = getPostImage(hostPage.slug)
        // get image and slug
        // const result = await graphql(getHostImage)
        allHostsSlug.push(hostPath)
  
        createPage({
          path: hostPath,
          component: path.resolve(`src/templates/page/podcast-host.tsx`),
          context:{
            title:hostPage.title,
            id:hostPage.id,
            breadcrumb:[]

          },
        })
      }

      createPage({
        path: ac_strings.slug_podcast_intro,
        component: path.resolve(`src/templates/page/podcast-intro.tsx`),
        context:{
          title:podcast.title,
          postId:process.env.POCAST_INTRO_POST_ID,
          breadcrumb:[
            {
              name:podcast.title,
              to:podcast.slug
            }
          ],
          hosts:allHostsSlug

        },
      })

      createPage({
        path: podcast.slug,
        component: path.resolve(`src/templates/page/podcast.tsx`),
        context:{
          title:podcast.title,
          id:process.env.PODCAST_FILTER_ID,
          breadcrumb:[
            {
              name:podcast.title,
              to:podcast.slug
            }
          ],
          hosts:allHostsSlug

        },
      })

/*       console.log(ac_strings.slug_user)
      createPage({
        path: ac_strings.slug_user,
        component: path.resolve(`src/templates/page/user.tsx`),
        context:{
          title:ac_strings.title_user,
          userPages:userPages.map(page=>({component:page.label.replace("user-",""),path:page.slug, title:page.title}))
        },
      }) */
    }
  })

  

}

