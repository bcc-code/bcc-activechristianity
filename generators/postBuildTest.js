const {formatScope,typeScope} = require('../src/strings/static/topic-ids.js')
const  { sendQuery } = require('gatsby-source-ac/helpers')
const endpoints = require('../src/strings/static/endpoints')
exports.onPostBuildTest = async ({graphql}) => {
    const ac_strings=require('../src/strings/ac_strings.js')
    const allPagesQuery = `{
      allSitePage {
        edges {
            node {
              id
              slug:path
              context {
                  pageType
                  updated_at
                  mediaTypes {
                    default
                  }
                }
              }
            }
        }
      }
  
    `
  
    const postBuildTestQuery = `
      query {
        posts {
          paginatorInfo {
            count
            total
          }
        }
    
        formats:topics (group_id:4){
          slug
          id
          noOfPosts
        }
    
        types:topics(group_id:5){
          id
          slug
          noOfPosts
          subTopics {
              id
              slug
              group_id
          }
          
        }
        testTopic1:topic(id:83819){
          slug
          noOfPosts
        }
        testTopic2:topic(id:134){
          slug
          noOfPosts
        }
        testAuthor1:author(id:1508){
          slug
        }
        testAuthor2:author(id:1597){
            slug
        }
        authorsCount:authors{
          paginatorInfo {
            total
          }
        }
      }
    `
      const allPagesRes = await graphql(allPagesQuery)
      const allPostAndTopicTestData = await sendQuery(postBuildTestQuery,endpoints.api_url,{ "x-lang": process.env.LANG_CODE})
      const {posts,formats,types,testTopic1,testTopic2,authorsCount,testAuthor2,testAuthor1}=allPostAndTopicTestData
  
   
      const {data}=allPagesRes
  
      if(data && data.allSitePage && data.allSitePage.edges){
        const nodes = data.allSitePage.edges
        const nodeMaps={}
  
        const slugsToValidateArray=[
          ac_strings.slug_explore,
          ac_strings.slug_contact,
          ac_strings.slug_about,
          ac_strings.slug_privacy_policy,
          ac_strings.slug_cookie_policy,
  
          ac_strings.slug_latest,
          ac_strings.slug_topic,
          `${ac_strings.slug_ac_author}/${testAuthor2.slug}`,
          `${ac_strings.slug_ac_author}/${testAuthor1.slug}`
        ]
        
  
        const postTotal=posts.paginatorInfo.total
        const pageCount=Math.ceil(postTotal/12)
        slugsToValidateArray.push(`${ac_strings.slug_latest}/2`,`${ac_strings.slug_latest}/${pageCount}`)
        formats.forEach(node=>{
          console.log(node)
          const find = formatScope.find(f=>`${f.keyId}`===`${node.id}`)
          if(find && node.noOfPosts>0){
            slugsToValidateArray.push(`${node.slug}`,`${node.slug}/${ac_strings.slug_latest}`)
          }
        })
  
        for(let j=0;j<types.length;j++){
          const node=types[j]
          const find = typeScope.find(t=>`${t.keyId}`===`${node.id}`)
          if(find && node.noOfPosts>0){
            const topicPageTotal=node.noOfPosts
            const pageCount=Math.ceil(topicPageTotal/12)
            slugsToValidateArray.push(`${node.slug}`,`${node.slug}/${ac_strings.slug_latest}`,`${node.slug}/${ac_strings.slug_latest}/${pageCount}`)
            for(let k=0;k<node.subTopics.length;k++){
              const subTopic=node.subTopics[k]
              const noOfPostsQuery = `
                query {
                  topic(id: ${node.id}) {
                    id
                    name
                    noOfPosts (hasTopics: { value: ${subTopic.id}, column: ID })
  
                  }
                }
              `
              const noOfPostRes = await sendQuery(noOfPostsQuery,endpoints.api_url,{ "x-lang": process.env.LANG_CODE})
  
              if(noOfPostRes && noOfPostRes.topic && noOfPostRes.topic.noOfPosts){
  
                const {noOfPosts}=noOfPostRes.topic
                if(noOfPosts>0 && subTopic.id!==node.id){
                  slugsToValidateArray.push(`${node.slug}/${subTopic.slug}`)
                }
              } else {
                console.log(`cannot find number of posts for this topic: ${node.slug}/${subTopic.slug}`)
              }
              
            }
            
          }
        }
  
  
        const testTopics=[testTopic1,testTopic2]
  
        testTopics.forEach(node=>{
          slugsToValidateArray.push(`${ac_strings.slug_topic}/${node.slug}`,
          `${ac_strings.slug_topic}/${node.slug}/1`)
        })
  
        const slugsToValidateObject={
          '/':false
        }
   
        const missingPagesSlugs=[]
  
        if (process.env.LISTEN_SECTION ==="all"|| process.env.LISTEN_SECTION==="podcast_only"){
          slugsToValidateArray.push(ac_strings.slug_listen)
          slugsToValidateArray.push(`${ac_strings.slug_listen}/${ac_strings.slug_latest}`)
        }
  
        if (process.env.LISTEN_SECTION ==="all"){
          console.log("check playlist")
          slugsToValidateArray.push(ac_strings.slug_playlist)
        }
  
        if (process.env.SCRIPTURE_SECTION==="true"){
          console.log("check scriptures")
          slugsToValidateArray.push(ac_strings.slug_scripture,`${ac_strings.slug_scripture}-result`)
        }
  
        if (process.env.GLOSSARY_SECTION==="true"){
          console.log(Array.isArray(nodeMaps.glossary) && nodeMaps.glossary.length)
          console.log("check glossry")
        }
  
        // generate slug map to validate all pages
        slugsToValidateArray.forEach((item,i)=>{
          if(typeof item==="string" && item!==""){
            let toValidateSlug = item
            if (!item.startsWith("/")){
              toValidateSlug=`/${item}`
            }
            slugsToValidateObject[toValidateSlug]=false
          } else {
            throw new Error(`Unable to find slug on index ${i}`)
          }
        })
        
        nodes.forEach(({node}) => {
            const {slug, context }=node
            const getType=context && context.pageType?context.pageType:"other"
            const toAdd = slug
            //try to find  pages the needs to be validated, if not add them to the missing page array
            if(slugsToValidateObject[slug]!==undefined){
              slugsToValidateObject[slug]=true
            } 
  
            //  at the same sort all pages by type
            if(nodeMaps[getType]){
                nodeMaps[getType].push(toAdd)
            } else {
                nodeMaps[getType]=[toAdd]
            }
        });
  
        const checkFoundSlugsArray = Object.keys(slugsToValidateObject)
        checkFoundSlugsArray.forEach(item=>{
          if (slugsToValidateObject[item]===false){
              missingPagesSlugs.push(item)//
            
          }
        })
  
        if(missingPagesSlugs.length>0){
          console.log(missingPagesSlugs)
          throw new Error(`Did not generate pages.`)
        } else {
          console.log(slugsToValidateObject)
          console.log('Found all these pages')
        }
  
        let hasPost=Array.isArray(nodeMaps.post) && nodeMaps.post.length>0 
           console.log(`${nodeMaps.post.length} posts generated`)
           console.log(`${posts.paginatorInfo.total} posts should be generated`)
         if(!hasPost || posts.paginatorInfo.total!== nodeMaps.post.length){
           
          throw new Error('some posts are missing')
         }
  
  
        if (process.env.LISTEN_SECTION==="all"){
          const hasPlaylists = Array.isArray(nodeMaps.playlist) && nodeMaps.playlist.length>0
          if(!hasPlaylists){
            throw new Error('no playlist generated')
          } else {
            console.log(`${nodeMaps.playlist.length} playlists generated`)
          }
  
        }
    
        if (process.env.GLOSSARY_SECTION==="true"){
          const hasGlossary = Array.isArray(nodeMaps.glossary) && nodeMaps.glossary.length>0
          if(!hasGlossary){
            throw new Error('no glossary generated')
          } else {
            console.log(`${nodeMaps.glossary.length} glossary generated`)
          }
        }
    
      } else {
        throw new Error ('not able to find pages')
      }
  
  
  }