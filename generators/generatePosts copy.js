const _ = require('lodash')
const path = require('path')
const {topicQuery, postQuery} = require('gatsby-source-ac/helpers')
const listTemplate = 'src/templates/archive/post-list.tsx'
const ac_strings=require('../src/strings/ac_strings.js')
const {normalizePostRes} = require('../src/helpers/normalizers')
/* SETUP */
const template = 'src/templates/single-resource/post.tsx'

const query = `{
    allAcNodePost(limit:12) {
      pageInfo {
        totalCount
        itemCount
      }
      edges {
        node {
          title
          acId
          readMorePosts
          topics {
            id
          }
          authors {
            id
          }
        }
        
      }
    }
}`

const getPerPageQuery = (pageNr)=>{
  return `{
    allAcNodePost(limit:12,skip:${12*pageNr}) {
      edges {
        node {
          title
          acId
          ${postQuery}
          readMorePosts
        }
        
      }
    }
}`
}
const perPage = 12

/* BUILDER */

module.exports = function generatePosts(actions, graphql) {
  const { createPage } = actions

  return graphql(query)
  .then(async (result) => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }


    const pageInfo = result.data.allAcNodePost.pageInfo
    const totalPages = Math.ceil(pageInfo.totalCount / perPage)

    for (let i = 0; i < totalPages ; i++) {
        const postsRes = await graphql(getPerPageQuery(i))
        const posts = postsRes.data.allAcNodePost.edges
        const postsInfo = posts.map(async ({node})=>{
          const normalized = normalizePostRes(node)
/*           console.log(node.authors)
          console.log(normalized.topics) */
          const authorNavWPost = await getAuthorPosts(graphql,node)

          // end of await
        /*   console.log(authorNavWPost) */
          
        })
      }
    
    return 
  })
}

const getAuthorPosts = (graphql,node)=>{
  
  
  return Promise.all(node.authors.map(({id})=>{
    
    return graphql(`
      {
        ac{
          author(id:${id}){
              name
              slug
              somePosts(first:12) {
                data {
                  ${postQuery}
                }
              }
          }
        }
      }
    `).then(res=>{
      console.log(id)
      console.log(res.data.ac)
      /* return res.data.ac */
    })
  }))
/*   .then(authorsRes=>{
    if (authorsRes.errors) {
      authorsRes.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(authorsRes.errors)
    }
    if(authorsRes){
      const authorNavWPost=[]
      authorsRes.map(item=>{
       //node.id
      
       const {author}=item.data.ac
       const authorPostsRes = author.somePosts.data
       const authorPosts= authorPostsRes
                                .filter(p => `${p.id}` !== `${node.id}`)
                                .slice(0, 6)
                                .map(p=>normalizePostRes(p))
            authorNavWPost.push({
              name:author.name,
              to:`${ac_strings.slug_ac_author}/${author.slug}`,
              posts:authorPosts
            })
      })

      return authorNavWPost
    }
  }) */
}