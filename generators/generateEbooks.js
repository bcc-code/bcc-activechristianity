const _ = require('lodash')
const path = require('path')
const TS = require('../src/strings/index.js')
const template = 'src/templates/single-resource/e-book.tsx'

const query = `
    {
    ac {
        ebooks {
            title
            excerpt
            sources
            slug
            authors {
              name
              slug
              pivot {
                as
              }
            }
            image {
              src
              srcset
              alt
            }
          }
            
      }
  }
`

module.exports = function generateEbooks(actions, graphql) {
    const { createPage } = actions
  
    return graphql(query).then((result) => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }
  
      const eBooks = result.data.ac.ebooks

  
      _.each(eBooks, (ebook) => {
        const basePath = `/${TS.slug_ac_ebook}/${ebook.slug}`  
        console.log(basePath)

        createPage({
          path: basePath,
          component: path.resolve(template),
          context: {
            title:ebook.title,
            slug: ebook.slug,
            ebook,
            breadcrumb:[{name:TS["e-books"],to:TS.slug_ac_ebook}]
          },
        })
      })
  
    })
  }