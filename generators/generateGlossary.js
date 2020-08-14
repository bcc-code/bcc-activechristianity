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
    }
  }
`


/* BUILDER */

module.exports = function generateTaxonomies(actions, graphql) {
  const { createPage } = actions

  return graphql(getGlossaryQuery).then((result) => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    

    if (result.data.ac && result.data.ac.glossary){
        const allGlossaries= result.data.ac.glossary

        allGlossaries.forEach(glossary=>{
            const baseUrl=`${TS.glossary}/${glossary.word}`
            createPage({
                path:baseUrl,
                component:path.resolve(template),
                context: {
                    glossary,
                  title:glossary.word,
                  slug:glossary.slug,
                  id:glossary.id,
                  breadcrumb:[]
                }
              })
        })
    }

  })
}