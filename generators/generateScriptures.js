const _ = require('lodash')
const path = require('path')
const ac_strings=require('../src/strings/ac_strings.js')

const allBooksQuery =  `
{
    ac {

        bible {
            old {
                chapters
                id
                no
                total
                name
            }
            new {
                chapters
                id
                no
                total
                name
            }
        }
    }
}
`

const perChapterQuery =  (bookId, ch) => `
    {
        ac {
            biblePosts(id:"${bookId}", ch:${ch}){
                slug
              }
        }
    }

`

module.exports = function generateTaxonomies(actions, graphql) {
    const { createPage } = actions
  
    return graphql(allBooksQuery).then(async (result) => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }
      const {bible} = result.data.ac
      const page = {
        title:ac_strings.scripture,
        slug:ac_strings.slug_scripture,
        label:"scripture"
      }
      createPage({
        path: `${page.slug}`,
        component: path.resolve(`./src/templates/page/${page.label}.tsx`),
        context:{
          bible,
          title:page.title
        },
      })

      createPage({
        path: `${page.slug}-result`,
        component: path.resolve(`./src/templates/page/${page.label}-result.tsx`),
        context:{
          title:page.title
        },
      })
    })
  }