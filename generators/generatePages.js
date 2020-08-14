const _ = require('lodash')
const path = require('path')


/* SETUP */

const query = `{
  ac {
    allPages {
      id
      title
      slug
      label
    }
  }
}`

const pagesContext = {
  "read-recommend": {
    childPages: [process.env.EBOOK_PAGE_ID,process.env.SERIES_PAGE_ID]
  },
  "listen-recommend": {
    childPages: [process.env.PLAYLIST_PAGE_ID,process.env.PODCAST_FILTER_ID]
  },
  "podcast":{
    context: {
      id:process.env.PODCAST_FILTER_ID
    }
  }
}

/* BUILDER */

module.exports = function generatePages(actions, graphql) {
  const { createPage } = actions
  
  return graphql(query).then(result=>{
    if (result.errors){
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    } else {
      const pageInfo = result.data.ac.allPages

      createPage({
        path: `/`,
        component: path.resolve('./src/templates/home.tsx'),
      })

      _.each(pageInfo,(page)=>{

        if (page && page.label!=="Frontpage"){

          let context = {
            title:page.title,
              breadcrumb:[]
          }

          if (pagesContext[page.label]){
            const pageContext = pagesContext[page.label]
            if (pageContext.childPages){
              const childPagesToAdd=[]
              const pageIds = pageContext.childPages
              pageIds.forEach(i=>{
                if (i){
                  const pageToAdd=pageInfo.find(each=>each.id===i)
                  if (pageToAdd){
                    childPagesToAdd.push(pageToAdd)
                  }
                }
                
              })
              context["childPages"] = childPagesToAdd
            }

            if (pageContext.context){
              context = {...context,...pageContext.context}
            }
            
          }


          createPage({
            path: `${page.slug}`,
            component: path.resolve(`./src/templates/${page.label}.tsx`),
            context,
          })
        } else {
          console.log(page)
        }
      })
    }
  })

}

