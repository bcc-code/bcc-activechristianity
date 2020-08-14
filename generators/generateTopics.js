const _ = require('lodash')
const path = require('path')

const template = 'src/templates/archive/post-list.tsx'
const videoTemplate ='src/templates/archive/video-list.tsx'
const topicRecommendTemplate = 'src/templates/topic-recommend.tsx'
const formatTemplate= 'src/templates/format.tsx'
/* SETUP */
 

const query = `{
    ac {
      topics {
          id
          name
          slug
          group {
              id
              name
          }
          posts {
            slug
          }
        }

      allPages {
        title
        slug
        label
        }
    }
  }`

module.exports = function generateTopics(actions, graphql) {
    const { createPage } = actions

    return graphql(query).then(result=>{
      
      if (result.errors){
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      } else {
        const topicInfo = result.data.ac.topics
        const pageInfo = result.data.ac.allPages
        
        _.each(topicInfo,(node=>{
          
          const allPosts=node.posts.map(p=>p.slug)

          if (!allPosts.length) return
          

          // create recommend page for each format 
          const isTypeOrFormat = node.group.name === 'Type'||node.group.name === 'Format'
          if (isTypeOrFormat ){

              const findPage = pageInfo.find(p=>p.slug===node.slug)
              
              if (!findPage){
                  createPage({
                      path:node.slug,
                      component:node.group.name === 'Format'? path.resolve(formatTemplate):path.resolve(topicRecommendTemplate),
                      context: {
                        id:node.id,
                        title:node.name,
                        node,
                      },
                    })
              } else {
                  console.log('this page will be created in generatePages.js')
                  console.log(findPage)
  
              }

              
          }

          
          const totalCount = allPosts.length
          const perPage = 12
          if (!totalCount) return null

          const totalPages = Math.ceil(totalCount / perPage)
          const component = node.id===process.env.VIDEO_POSTS_FILTER_ID?path.resolve(videoTemplate):path.resolve(template)
          const baseUrl = isTypeOrFormat? node.slug+'/latest':`topic/${node.slug}`
          

          let currentPage = 1

          // create achive of each topic, type, format
          for (let i = 0; i < totalCount; i += perPage, currentPage++) {
            let path = `${baseUrl}${currentPage > 1 ? '/' + currentPage : ''}`
            createPage({
              path,
              component,
              context: {
                posts: allPosts.slice(i,i+perPage),
                paginate: {
                  currentPage,
                  totalPages,
                  baseUrl
                },
                id:node.id,
                title:node.name
              },
            })
          }
      }))
        
      }
    })
  
  }
  
  