const _ = require('lodash')
const path = require('path')
const TS = require('../../src/strings/index')
const menu = require('../../src/strings/menu')
/* SETUP */
const template = 'src/templates/single-resource/e-book.tsx'
const query = `{
  allWordpressWpAcEbook {
    edges {
      node {
        title
		    slug
      }
    }
  }
}`

/* BUILDER */

module.exports = function generateEbooks(actions, graphql) {
  const { createPage } = actions

  return graphql(query).then((result) => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const eBooks = result.data.allWordpressWpAcEbook.edges


    _.each(eBooks, ({ node: eBook }) => {
      createPage({
        path: `/${TS.slug_ac_ebook}/${eBook.slug}`,
        component: path.resolve(template),
        context: {
          title:eBook.title,
          slug: eBook.slug,
          type:"page",
          breadcrumb:[menu.all.read,{name:TS["e-books"],to:TS.slug_ac_ebook}]
        },
      })
    })

  })
}