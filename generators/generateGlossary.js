const _ = require('lodash')
const path = require('path')
const TS = require('../src/strings/index.js')
const template = 'src/templates/single-resource/glossary.tsx'
const getGlossaryQuery = `
  {
    ac {
        glossary {
            word
            content
            slug
            id
          }

          glossariesPage:page(id:${process.env.GLOSSARY_PAGE_ID}){
            title
            slug
          }  
    }
  }
`


/* BUILDER */

module.exports = function generateTaxonomies(actions, graphql) {
  const { createPage } = actions

  return graphql(getGlossaryQuery).then((result) => {
    console.log("Generating glossary")
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    

    if (result.data.ac && result.data.ac.glossary){
        const allGlossaries= result.data.ac.glossary
        const glossariesPage = result.data.ac.glossariesPage
        const navParentItem={name:glossariesPage.title,to:glossariesPage.slug}
        allGlossaries.forEach(glossary=>{
            const baseUrl=`${glossariesPage.slug}/${glossary.slug}`
            createPage({
                path:baseUrl,
                component:path.resolve(template),
                context: {
                    glossary,
                  title:glossary.word,
                  slug:glossary.slug,
                  id:glossary.id,
                  breadcrumb:[navParentItem]
                }
              })
        })
    }

  })
}