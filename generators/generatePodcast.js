const { reduceRight } = require('lodash')
const _ = require('lodash')
const path = require('path')
const ac_strings=require('../src/strings/ac_strings.js')
const {formatsAll, podcast:podcastIds} = require('../src/strings/topic-ids')
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

  }
}`

/* BUILDER */

module.exports = function generatePages(actions, graphql) {
  const { createPage } = actions


  const podcastHosts=[]

  return graphql(query).then(result=>{
    console.log("Generating podcast")
    if (result.errors){
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    } else {
      const pageInfo = result.data.ac.allPages
      const podcast = {
        title:ac_strings.podcast,
        slug:ac_strings.slug_podcast
      }


      _.each(pageInfo,(page)=>{
        if (page && page.label==="podcast-host"){
            podcastHosts.push(page)      
        }  
        })
 

      
      // podcast and hosts
      const allHostsSlug= []
/*       for (let i =0;i<podcastHosts.length;i++){
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
      } */

      createPage({
        path: ac_strings.slug_podcast_intro,
        component: path.resolve(`src/templates/page/podcast-intro.tsx`),
        context:{
          title:podcast.title,
          postId:`${podcastIds.intro_post}`,
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
          id:`${formatsAll.podcast.keyId}`,
          breadcrumb:[
            {
              name:podcast.title,
              to:podcast.slug
            }
          ],
          hosts:allHostsSlug

        },
      })

    }
  })

  

}

