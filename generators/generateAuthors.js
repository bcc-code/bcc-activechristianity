const _ = require('lodash')
const path = require('path')
const TS = require('../src/strings/index.js')
const template = 'src/templates/archive/post-list.tsx'

const getPageCountQuery = `
  {
    ac {
      authors {
        paginatorInfo {
          total
          count
        }
      }
    }
  }
`

const getEachPagePosts = (index)=>{
  return `
    {
      ac {
        authors (page:${index}){
          data {
            name
            slug
            image {
              src
              srcset
            }
            excerpt
            posts {
              slug
            }
          }
        }
      }
    }
  `
}


/* BUILDER */

module.exports = function generateTaxonomies(actions, graphql) {
  const { createPage } = actions

  return graphql(getPageCountQuery).then((result) => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    const {count,total}= result.data.ac.authors.paginatorInfo
    const pageCount=Math.ceil(total/count)
    console.log("Generating authros")
    const pageIndex= [];

    for (let i = 1; i <= pageCount; i++) {
      pageIndex.push(i);
    }
    return Promise.all(pageIndex.map(i=>{
      const eachPageQuery=getEachPagePosts(i)
          return graphql(eachPageQuery)
                  .then(res =>{
                    
                    if (res.data.ac && res.data.ac.authors && res.data.ac.authors.data && res.data.ac.authors.data[0]){
                      const allAuthors = res.data.ac.authors.data
                      _.each(allAuthors, (author)=>{
                        const {name,id,slug,posts} =author

                        const totalCount = posts.length
                        const perPage = 12
                        if (!totalCount) return null
                        const totalPages = Math.ceil(totalCount / perPage)
                        const allPosts=posts.map(p=>p.slug)
                        let currentPage = 1
  
                        const baseUrl = `/${TS.slug_ac_author}/${author.slug}`

                        for (let i = 0; i < totalCount; i += perPage, currentPage++) {
                          let pagePath = `${baseUrl}${currentPage > 1 ? '/' + currentPage : ''}`
                          console.log(pagePath)
                          createPage({
                            path:pagePath,
                            component:path.resolve(template),
                            context: {
                              posts: allPosts.slice(i,i+perPage),
                              paginate: {
                                currentPage,
                                totalPages,
                                baseUrl
                              },
                              author,
                              title:name,
                              slug:slug,
                              id:id,
                              breadcrumb:[]
                            }
                          })
                        }
                      })
                    } else {
                      console.log('unexpected response')
                      console.log(res)
                    }
            })
        }))


  })
}