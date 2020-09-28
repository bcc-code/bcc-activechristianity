const _ = require('lodash')
const path = require('path')
const listTemplate = 'src/templates/archive/post-list.tsx'
const TS = require('../src/strings')
const ac_strings=require('../src/strings/ac_strings.json')

const allBooks =  `
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

const perChapter =  (bookId, ch) => `
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
  
    return graphql(getPageCountQuery).then((result) => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }
      const {count,total}= result.data.ac.authors.paginatorInfo
      const pageCount=Math.ceil(total/count)
      console.log(pageCount)
      const pageIndex= [];
  
      for (let i = 1; i <= pageCount; i++) {
        pageIndex.push(i);
      }
      return Promise.all(pageIndex.map(i=>{
        const eachPageQuery=getEachPagePosts(i)
            return graphql(eachPageQuery)
                    .then(res =>{
             
                      if (res.data.ac && res.data.ac.authors.data && res.data.ac.authors.data[0]){
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
                      }
              })
          }))
  
  
    })
  }