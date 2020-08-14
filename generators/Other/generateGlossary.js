const _ = require('lodash')
const path = require('path')
const TS = require('../../src/strings/index')
const menu = require('../../src/strings/menu')
/* SETUP */
const template = 'src/templates/single-resource/glossary.tsx'
const query = `{
  allWordpressWpGlossary(sort: {fields: title, order: ASC}) {
    edges {
      node {
        title
        content
        slug
      }
    }
  }
}`

/* BUILDER */

module.exports = function generateGlossary(actions, graphql) {
  const { createPage } = actions

  return graphql(query).then((result) => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const { allWordpressWpGlossary } = result.data || { allWordpressWpGlossary: { edges: [] } }

    const { edges } = allWordpressWpGlossary


    _.each(edges, ({ node: glossary }) => {
      createPage({
        path: `/${TS.slug_glossary}/${glossary.slug}`,
        component: path.resolve(template),
        context: {
          ...glossary,
          breadcrumb:[menu.all.explore,menu.all.glossary]
        },
      })
    })

    createPage({
      path: `/${TS.slug_glossary}`,
      component: path.resolve(`src/templates/resource-sections/glossary-overview.tsx`),
      context: {
        glossaries: edges,
        breadcrumb:[menu.all.explore]
      },
    })
  })
}