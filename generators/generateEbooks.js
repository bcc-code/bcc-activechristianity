const _ = require('lodash')
const path = require('path')

const template = 'src/templates/single-resource/e-book.tsx'

const query = `
    {
    ac {
        ebooks {
            id
            title
            excerpt
            sources {
              locale
              preview
            }
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
              dataUri
              alt
            }
          }
    
          ebook:page(id:${process.env.EBOOK_PAGE_ID}){
            title
            slug
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
      console.log("Generating ebooks")
      const eBooks = result.data.ac.ebooks
      const ebookPage = result.data.ac.ebook

      const navParentItem={name:ebookPage.title,to: ebookPage.slug}
      _.each(eBooks, (ebook) => {
        const basePath = `/${ebookPage.slug}/${ebook.slug}`  

        createPage({
          path: basePath,
          component: path.resolve(template),
          context: {
            pagePath:basePath,
            title:ebook.title,
            slug: ebook.slug,
            ebook,
            breadcrumb:[navParentItem]
          },
        })
      })
  
    })
    .catch(err=>{
      console.log(query)
      console.log(err)
    })
  }