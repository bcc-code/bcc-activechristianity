const _ = require('lodash')
const path = require('path')
const {getSubTopicPosts,createSubTopicPages, formatScope,typesAll} = require('./hjelper')
const ac_strings=require('../../src/strings/ac_strings.js')
const query = `{
    ac {

        podcasts:topic (id:${process.env.PODCAST_FILTER_ID}){
            noOfPosts
        }
          
        playlists {
            id
            slug
        }
    }
}`

module.exports = async function generateTypes(data) {
    const {actions, graphql,contextPosts,subTopics,node:type,nodeInfo,breadcrumb}=data

    const { createPage } = actions
    
    const typeFormatEach={
        info:nodeInfo,
        items:[]
    }
    for(let j=0;j<subTopics.length;j++){
        const subTopic=subTopics[j]
        
        const find = formatScope.find(f=>`${f.keyId}`===`${subTopic.id}`)
       
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
                        type:nodeInfo.key,
                        breadcrumb:[],
                        createPage,allPosts,
                        topic:type,
                        subTopic
                    })
            }) 
        }

        
    } 

    if(`${type.id}`===`${typesAll.listen.keyId}`){
        const result = await graphql(query)
        .catch(error=>{
            console.log(error)
        })

        if(result.data && result.data.ac){
            const {podcasts,playlists} = result.data.ac


            if (playlists){
                const playlistPage = {
                    title:ac_strings.playlist,
                    slug:ac_strings.slug_playlist
                }
                if(ac_strings.slug_playlist && ac_strings.slug_playlist.toLowerCase() !== "false") {
                    const playlistItem = {key:"playlist",name:playlistPage.title,to:playlistPage.slug,count:playlists.length}
                
                    typeFormatEach["playlist"]=playlistItem
                        
                }
            }
            if (podcasts){
                const podcastPage = {
                    title:ac_strings.podcast,
                    slug:ac_strings.slug_podcast
                }
                const podcastCount = podcasts.noOfPosts

                    
                if(ac_strings.slug_podcast && ac_strings.slug_podcast.toLowerCase() !== "false" ){
                    const podcastItem = {key:"podcast",name:podcastPage.title,to:podcastPage.slug,count:podcastCount}
                    typeFormatEach["podcast"]=podcastItem
                }
            }
           


        }
        
       
    }

    typeFormatEach.items.sort((a, b) => {
        if (b.key === "animation") {
            return 1
        } if (a.key === "animation") {
            return -1
        } else {
            return b.count - a.count
        }
    })

    const typekey=nodeInfo.key
    const context= {
        typekey,
        title:type.name,
        breadcrumb,
        items:subTopics,
        ...typeFormatEach,
        ...contextPosts
    }

    createPage({
        path: `${type.slug}`,
        component: path.resolve(`./src/templates/recommend/${typekey}-recommend.tsx`),
        context,
    })
}
