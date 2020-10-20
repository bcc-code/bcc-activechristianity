
const _ = require('lodash')
const path = require('path')
const listTemplate = 'src/templates/archive/post-list.tsx'
const videoTemplate ='src/templates/archive/video-list.tsx'
const fs = require('fs')
const stringify = require(`json-stringify-safe`)
const exploreTemplate='src/templates/page/explore.tsx'
const formatTemplate= 'src/templates/recommend/format-recommend.tsx'
const ac_strings = require('../../src/strings/ac_strings.json')
const TS = require('../../src/strings')
const {getSubTopicsAndFeaturedPosts,getSubTopicPosts,createSubTopicPages, formatScope,typeScope,typesAll} = require('./hjelper')


const query = `{
    ac {
        formats: topics(group_id:${process.env.FORMAT_GROUP_ID}) {
            id
            name
            slug
            image {
                src
                srcset
                dataUri
              }
            noOfPosts
            group {
                id
                name
                slug
            }
            posts {
                slug
                views
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
                views
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
            id
            slug
        }
    }
}`

const perPage= 12

module.exports = function generateTopics(actions, graphql) {
    const { createPage } = actions
    const resource_grouped = {}
    const typesPopular={}
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
            const scripturePage = pageInfo.find(page=>`${page.id}`===process.env.SCRIPTURE_PAGE_ID)
            let all = [...formats,...types]

            all.forEach((node) => {

                const baseUrl = `${node.slug}/${ac_strings.slug_latest}`
                
        
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

            const formatIds = {}
            const typeIds={}
            if(formats && formatScope){
              
                resource_grouped["format"]={
                    name:ac_strings.type,
                    items:[]
                }

                for(let j=0;j<formats.length;j++){
                    console.log(`generating formats ${j}/${formats.length}`)
                    const format=formats[j]
                   
                    const find = formatScope.find(f=>f.keyId===`${format.id}`)
                    
                    if (find){
                        formatIds[`${format.id}`]=format
                        resource_grouped["format"].items.push(({key: find.keyname,name:format.name,to:format.slug,count:format.noOfPosts,image:format.image}))
                        const querySubTopics = getSubTopicsAndFeaturedPosts(format.id)
                        const mostPopular=format.posts.sort((a,b)=>b.views-a.views).slice(0,10).map(p=>p.slug)
                        
                        const subTRes = await graphql(querySubTopics)
                        const subTopics = subTRes.data.ac.topic.subTopics
                        const featuredPosts = subTRes.data.ac.topic.posts.map(p=>p.slug)
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
                              mostPopular,
                              featuredPosts,
                              breadcrumb:[{name:format.name ,to:format.slug}]
                            },
                          })

                    }
                }
            }

            if(types){
                console.log("generating types")
                for(let j=0;j<types.length;j++){
                    console.log(`generating types ${j}/${types.length}`)
                    const type=types[j]

                    const findType=typeScope.find(t=>t.keyId===`${type.id}`)
      
                    if (findType){
                        typeIds[`${type.id}`]=type
                        const querySubTopics = getSubTopicsAndFeaturedPosts(type.id)
                        
                        const subTRes = await graphql(querySubTopics)
                        
                        const subTopics = subTRes.data.ac.topic.subTopics
                        const featuredPosts = subTRes.data.ac.topic.posts.map(p=>p.slug)
                        const typeFormatEach={
                            info:{
                                key:findType.keyname,
                                name:type.name,
                                to:type.slug,
                                count:type.noOfPosts
                            },
                            items:[]}


                        for(let j=0;j<subTopics.length;j++){
                            const subTopic=subTopics[j]
                            
                            const find = formatScope.find(f=>f.keyId===`${subTopic.id}`)
                           
                            if (find){
                                
                                const geFormatPostsQuery = getSubTopicPosts(type.id,subTopic.id)
                                
                                await graphql( geFormatPostsQuery)
                                    .then(subTopicPostRes=>{
                                        const allPosts = subTopicPostRes.data.ac.topic.posts.map(item=>item.slug)
                                        typeFormatEach.items.push({
                                            key:find.keyname,
                                            name:subTopic.name,
                                            to:`${type.slug}/${subTopic.slug}`,
                                            count:allPosts.length
                                        })
                                        
                                        createSubTopicPages({
                                            type:findType.keyname,
                                            breadcrumb:[],
                                            createPage,allPosts,
                                            topic:type,
                                            subTopic
                                        })
                                }) 
                            }

                            
                        }

                        const typeBreadcrumb = [ {name:type.name ,to:type.slug}]

                        typesPopular[findType.keyname]=type.posts.sort((a,b)=>b.views-a.views).slice(0,10).map(p=>p.slug)

                        if(`${type.id}`===typesAll.read.keyId){
                            
                            const ebookPage = pageInfo.find(page=>`${page.id}`===process.env.EBOOK_PAGE_ID)
                            if (ebookPage){
                                const ebookItem={key:"ebook",name:ebookPage.title,to:ebookPage.slug,count:ebooksAll.length}
                                typeFormatEach["ebook"]=ebookItem
                                resource_grouped["format"].items.push(ebookItem)
                                
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
                            }
                            
                        }
                    
                        typeFormatEach["items"]=typeFormatEach["items"].sort((a, b) => {
                            if (b.key === "animation") {
                                return 1
                            } if (a.key === "animation") {
                                return -1
                            } else {
                                return b.count - a.count
                            }
                        })
                        resource_grouped[findType.keyname]={
                            name:type.name,
                            slug:type.slug,
                            breadcrumb:typeBreadcrumb,
                            featuredPosts,
                            ...typeFormatEach
                        }
                        

                    }
                }

            }
            const data = {
                formatIds,
                typeIds
            }
            saveFile('./src/strings', 'topic-filters', 'json',  data)
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
                    const mostPopular=typesPopular[typekey]
                    console.log(eachType)
                    createPage({
                        path: `${eachType.slug}`,
                        component: path.resolve(`./src/templates/recommend/${typekey}-recommend.tsx`),
                        context:{
                            typekey,
                            title:eachType.name,
                            mostPopular,
                            ...eachType
                            
                            
                        },
                    })
                })


            if(explorePage){
                createPage({
                    path: explorePage.slug,
                    component: path.resolve(exploreTemplate),
                    context: {
                      title:explorePage.title,
                      slug: explorePage.slug,
                      resource:resource_grouped,
                      scripturePage:({name: scripturePage.title,to: scripturePage.slug})
                    },
                  })
            }
        }
            
    })

}
//saveFile('./src/strings', 'languages', 'json',  data)

function saveFile(folder, name, extension, data) {
    const filename = path.resolve(`${folder}/${name}.${extension}`)
    try {
      fs.writeFileSync(filename, stringify(data, null, 2))
    } catch(err) {
      console.error(`AC Translations could not save the file. Please make sure the folder structure is already in place.`, err)
    }
  
    console.log(`File ${filename} – saved`)
  }