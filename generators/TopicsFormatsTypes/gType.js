const _ = require('lodash')
const path = require('path')
const {getSubTopicPosts,createSubTopicPages, formatScope,typesAll} = require('./hjelper')

const query = `{
    ac {
        playlistPage:page(id:${process.env.PLAYLIST_PAGE_ID}){
            id
            title
            slug
            label
            
        }

        podcastPage:page(id:${process.env.PODCAST_PAGE_ID}){
            id
            title
            slug
            label
        }


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
                        type:nodeInfo.key,
                        breadcrumb:[],
                        createPage,allPosts,
                        topic:type,
                        subTopic
                    })
            }) 
        }

        
    } 

    if(`${type.id}`===typesAll.listen.keyId){
        const result = await graphql(query)

        const {playlistPage,podcastPage,podcasts,playlists} = result.data.ac
        const podcastCount = podcasts.noOfPosts

        if(playlistPage){
            const playlistItem = {key:"playlist",name:playlistPage .title,to:playlistPage.slug,count:playlists.length}
           
            typeFormatEach["playlist"]=playlistItem
                
        }

        if(podcastPage){
            const podcastItem = {key:"podcast",name:podcastPage.title,to:podcastPage.slug,count:podcastCount}
        typeFormatEach["podcast"]=podcastItem
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
        ...typeFormatEach,
        ...contextPosts
    }
    console.log(type.slug)
    createPage({
        path: `${type.slug}`,
        component: path.resolve(`./src/templates/recommend/${typekey}-recommend.tsx`),
        context,
    })
}
