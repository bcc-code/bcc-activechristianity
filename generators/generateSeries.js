const _ = require('lodash')
const path = require('path')
const TS = require('../src/strings/index')
const template = 'src/templates/single-resource/e-book.tsx'

const query = `
    {
    ac {
        series {
            title
            slug
            posts {
              title
              slug
            }
            excerpt
          }
        }
    }
`

module.exports = function generateSeries(actions, graphql) {
    const { createPage } = actions
  
    return graphql(query).then((result) => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }
  
      const series = result.data.ac.series
  
  
      _.each(series, (serie) => {
        const {title,posts,excerpt,slug}=serie
        _.each(posts,(child)=>{
            createPage({
                path: `/serie/${slug}/${child.slug}`,
                component: path.resolve(template),
                context: {
                  title:child.title,
                  slug:child.slug,
                  serie,
                  breadcrumb:[{name:title,to:`/serie/${slug}`}]
                },
              })
        })
      })
  
    })
  }