
const _ = require('lodash')
const path = require('path')
const listTemplate = 'src/templates/archive/post-list.tsx'
const videoTemplate ='src/templates/archive/video-list.tsx'
const resourceTemplate = 'src/templates/page/resources.tsx'

const exploreTemplate='src/templates/page/explore.tsx'
const formatTemplate= 'src/templates/recommend/format-recommend.tsx'

const ac_strings = require('../../src/strings/ac_strings.json')
const TS = require('../../src/strings')
const {getSubTopics,getSubTopicPosts,createSubTopicPages, formatScope,typeScope,typesAll} = require('./hjelper')


const query = `{
    ac {
        formats: topics(group_id:${process.env.FORMAT_GROUP_ID}) {
            id
            name
            slug
            noOfPosts
            group {
                id
                name
                slug
            }
            posts {
                slug
            }
        }

        types: topics(group_id:${process.env.TYPE_GROUP_ID}) {
            id
            name
            slug
            noOfPosts
            group {
                id
                name
                slug
            }
            posts {
                slug
            }
        }

        allPages {
            id
            title
            slug
            label
            parent {
                title
                label
              
            }
        }

        podcasts:topic (id:${process.env.PODCAST_FILTER_ID}){
            noOfPosts
          }

        ebooks {
            slug
        }
          
        playlists {
            slug
        }
    }
}`

const perPage= 12

module.exports = function generateTopics(actions, graphql) {
    const { createPage } = actions
    const resource_grouped = {}
    return graphql(query)
    .then(async (result)=>{
        if (result.errors){
            result.errors.forEach(e => console.error(e.toString()))
            return Promise.reject(result.errors)
          } else {
            const formats = result.data.ac.formats
            const types = result.data.ac.types
            const pageInfo = result.data.ac.allPages
            const ebooksAll = result.data.ac.ebooks
            const playlistsAll = result.data.ac.playlists
            const podcastCount = result.data.ac.podcasts.noOfPosts
            const explorePage = pageInfo.find(page=>`${page.id}`===process.env.EXPLORE_PAGE_ID)
            const resourcePage = pageInfo.find(page=>`${page.id}`===process.env.RESOURCE_PAGE_ID)
            const resourceNavItem = {
                name:resourcePage.title,
                to:resourcePage.slug
            }
            let all = [...formats,...types]

            all.forEach((node) => {

                const baseUrl = `${node.slug}/${ac_strings.latest_slug}`
                
        
                let currentPage = 1
                const totalCount=node.posts.length
                const allPosts= node.posts.map(p=>p.slug)
     
                // create achive of each format
                const totalPages = Math.ceil(totalCount / perPage)
                for (let i = 0; i < totalCount; i += perPage, currentPage++) {
                    let pagePath = `${baseUrl}${currentPage > 1 ? '/' + currentPage : ''}`

                    createPage({
                    path:pagePath,
                    component:node.id===process.env.VIDEO_POSTS_FILTER_ID?path.resolve(videoTemplate):path.resolve(listTemplate),
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
            })


            if(formats && formatScope){
              
                resource_grouped["format"]={
                    name:ac_strings.type,
                    items:[]
                }

                for(let j=0;j<formats.length;j++){
                    const format=formats[j]
                    
                    const find = formatScope.find(f=>f.keyId===`${format.id}`)
                    
                    if (find){
                        resource_grouped["format"].items.push(({key: find.keyname,name:format.name,to:format.slug,count:format.noOfPosts}))
                        const querySubTopics = getSubTopics(format.id)
                        

                        const subTRes = await graphql(querySubTopics)

                        const subTopics = subTRes.data.ac.topic.subTopics
                        const formatType={
                            info:{
                                key:find.keyname,
                                name:format.name,
                                to:format.slug,
                                count:format.noOfPosts
                            },
                            items:[]
                        }

                        for (let k =0;k<subTopics.length;k++){
                            const stTopic=subTopics[k]    
                            if (`${stTopic.group_id}`=== process.env.TYPE_GROUP_ID) {
                                const stTopic=subTopics [k]
                               
                                const findType=typeScope.find(t=>t.keyId===`${stTopic.id}`)
   
                                if (findType){
                                    const getTypePosts = getSubTopicPosts(format.id,stTopic.id)
                                    await graphql(getTypePosts)
                                        .then(subTopicPostRes=>{
                                        const allPosts = subTopicPostRes.data.ac.topic.posts.map(item=>item.slug)
    
                                        formatType.items.push({
                                            key:findType.keyname,
                                            id:stTopic.id,
                                            name:stTopic.name,
                                            to:stTopic.slug,
                                            count:allPosts.length
                                        })
/*                                         createSubTopicPages({
                                            type:findType.keyname,
                                            breadcrumb:[resourceNavItem],
                                            createPage,
                                            allPosts,
                                            topic:format,
                                            subTopic:stTopic
                                        }) */
                                    })  
                                }
                                    
                            }
                        }
                        // create format overview 
                        createPage({
                            path:format.slug,
                            component:path.resolve(formatTemplate),
                            context: {
                              id:format.id,
                              title:format.name,
                              formatType,
                              breadcrumb:[resourceNavItem, {name:format.name ,to:format.slug}]
                            },
                          })

                    }
                }
            }

            if(types){
                //read 
                
                for(let j=0;j<types.length;j++){
                    const type=types[j]

                    const findType=typeScope.find(t=>t.keyId===`${type.id}`)
      
                    if (findType){
                        
                        const querySubTopics = getSubTopics(type.id)

                        const subTRes = await graphql(querySubTopics)
                        
                        const subTopics = subTRes.data.ac.topic.subTopics
                        const typeFormatEach={
                            info:{key:findType.keyname,name:type.name,to:type.slug,count:type.noOfPosts},
                            items:[]}


                        for(let j=0;j<subTopics.length;j++){
                            const subTopic=subTopics[j]
                            
                            const find = formatScope.find(f=>f.keyId===`${subTopic.id}`)
                           
                            if (find){
                                
                                const geFormatPostsQuery = getSubTopicPosts(type.id,subTopic.id)
                                
                                await graphql( geFormatPostsQuery)
                                    .then(subTopicPostRes=>{
                                        const allPosts = subTopicPostRes.data.ac.topic.posts.map(item=>item.slug)
                                        typeFormatEach.items.push({key:find.keyname,name:subTopic.name,to:subTopic.slug,count:allPosts.length})
                                        
                                        createSubTopicPages({
                                            type:find.keyname,
                                            breadcrumb:[resourceNavItem],
                                            createPage,allPosts,
                                            topic:type,
                                            subTopic
                                        })
                                }) 
                            }

                            
                        }

                        const typeBreadcrumb = [resourceNavItem, {name:type.name ,to:type.slug}]
                        let typeMenu=[...typeFormatEach.items]
                        resource_grouped[findType.keyname]={
                            name:type.name,
                            slug:type.slug,
                            breadcrumb:typeBreadcrumb
                        }

                        if(`${type.id}`===typesAll.read.keyId){
                            
                            const ebookPage = pageInfo.find(page=>`${page.id}`===process.env.EBOOK_PAGE_ID)
                            if (ebookPage){
                                const ebookItem={key:"ebook",name:ebookPage.title,to:ebookPage.slug,count:ebooksAll.length}
                                typeFormatEach["ebook"]=ebookItem
                                resource_grouped["format"].items.push(ebookItem)
                                typeMenu.push(ebookItem)
                            }

                        }

                        if(`${type.id}`===typesAll.listen.keyId){
                            const playlistPage = pageInfo.find(page=>page.id===process.env.PLAYLIST_PAGE_ID);
                            const podcastPage = pageInfo.find(page=>page.id===process.env.PODCAST_PAGE_ID);
                            if(playlistPage){
                                const playlistItem = {key:"playlist",name:playlistPage .title,to:playlistPage.slug,count:playlistsAll.length}
                                const podcastItem = {key:"podcast",name:podcastPage.title,to:podcastPage.slug,count:podcastCount}
                                typeFormatEach["playlist"]=playlistItem
                                typeFormatEach["podcast"]=podcastItem
                                resource_grouped["format"].items.push(playlistItem,podcastItem)
                                typeMenu.push(playlistItem,podcastItem)
                            }
                            
                        }
                        typeMenu = typeMenu.sort((a,b)=>a.count<b.count)
 
                        resource_grouped[findType.keyname]={
                            name:type.name,
                            slug:type.slug,
                            breadcrumb:typeBreadcrumb,
                            menu:typeMenu,
                            ...typeFormatEach
                        }

                    }
                }

            }

            resource_grouped["general"]={
                name:ac_strings.general,
                items:[]
            }

            pageInfo.forEach(page=>{
                if(page.parent && page.parent.label==="general"){
                    resource_grouped["general"]["items"].push({name:page.title,to:page.slug})
                }
            })

                const { format, general, ...sortedTypes }=resource_grouped
            
                Object.keys(sortedTypes).forEach(typekey=>{
                    const eachType=resource_grouped[typekey]

                    createPage({
                        path: `${eachType.slug}`,
                        component: path.resolve(`./src/templates/recommend/${typekey}-recommend.tsx`),
                        context:{
                            title:eachType.name,
                            ...eachType
                            
                            
                        },
                    })
                })

                if (resourcePage){

                createPage({
                    path: resourcePage.slug,
                    component: path.resolve(resourceTemplate),
                    context: {
                      title:resourcePage.title,
                      slug: resourcePage.slug,
                      resource:resource_grouped
                    },
                  })
            }

            if(explorePage){
                createPage({
                    path: explorePage.slug,
                    component: path.resolve(exploreTemplate),
                    context: {
                      title:explorePage.title,
                      slug: explorePage.slug,
                      resource:resource_grouped
                    },
                  })
            }
            
        }
            
    })

}