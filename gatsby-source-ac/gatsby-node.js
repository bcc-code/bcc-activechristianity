const helpers = require('./helpers')
const he = require('he')
const {decode} = require('html-entities');
const {parse } =require('node-html-parser');
const {sendQuery,getMultiPosts, postQuery} = helpers
const htmlTags2PlainText = (html) => {
    if (html) {
        let text = html.replace(/<\/?[^>]+>/ig, " ");
        return he.decode(text);
    } else {
        return ''
    }
}


const settingsQuery = `
{
    settings {
        key
        value
    }

    posts {
        paginatorInfo {
          total
          count
        }
      }
}
`

const getPostsQuery = (pageNr)=>`
    {
        posts(page:${pageNr}) {
            data {
                ${postQuery}
                content
                langs {
                    lang
                    slug
                }
                readMorePosts:posts {
                    slug
                }
                seo {
                    title
                    desc
                }
                meta {
                    credits
                    no_dict
                    url
                }

            }
        }
    }
`

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest },options) => {
    const { createNode } = actions
    const {fieldName,baseUrl,headers} = options
       
        const createPostNode = (post)=>{
            const nodeContent = JSON.stringify(post)
                const nodeMeta = {
                    id: createNodeId(`ac-post-${post.id}`),
                    parent: null,
                    children: [],
                    internal: {
                        type: `${fieldName}_post`,
                        mediaType: `text/html`,
                        content: nodeContent,
                        contentDigest: createContentDigest(post)
                    }
                }
    
                const node = Object.assign({},post, nodeMeta)
                createNode(node)
        }
      const firstQueryRes = await sendQuery(settingsQuery,baseUrl,headers)
        
      if (firstQueryRes) {
        if (firstQueryRes.settings && Array.isArray(firstQueryRes.settings)){
            const {settings} = firstQueryRes
            const metadata = {}
            settings.forEach(s => {
              metadata[s.key] = s.value
            })
            if (metadata["featured_posts"]){

                const featuredArraySlug = JSON.parse(metadata["featured_posts"])
                  metadata["featured_posts"]=await getMultiPosts(featuredArraySlug, baseUrl,headers)
                  if(metadata["featured_posts"][0]){
                    const dummypost = createDummyPost(metadata["featured_posts"][0])
                    metadata["featured_posts"].push(dummypost)
                  }
                  /* metadata["featured_posts"]=featured_slug. */
            }

            if (metadata["popular_posts"]){
                const popularArraySlug = JSON.parse(metadata["popular_posts"])
                  metadata["popular_posts"]=await getMultiPosts(popularArraySlug, baseUrl,headers)
                  if(metadata["popular_posts"][0]){
                    const dummypost = createDummyPost(metadata["popular_posts"][0])
                    metadata["popular_posts"].push(dummypost)
                  }
            }

              // Data can come from anywhere, but for now create it manually
  
            const nodeContent = JSON.stringify(metadata)
   
            const nodeMeta = {
              id: createNodeId(`ac-settings`),
              parent: null,
              children: [],
              internal: {
                type: `${fieldName}_setting`,
                mediaType: `text/html`,
                content: nodeContent,
                contentDigest: createContentDigest(metadata)
              }
            }
  
            const node = Object.assign({}, metadata, nodeMeta)
            createNode(node)
        }
      }

      let entities = [];
  
      if (firstQueryRes.posts){

        const {count,total}=firstQueryRes.posts.paginatorInfo
        const pageCount = Math.ceil(total/count)
        console.log(5)
        for (let i = 1; i <=5 ; i++){
            console.log(i)
            
            const response = await sendQuery(getPostsQuery(i),baseUrl,headers)
                if (Array.isArray(response) && response[0]){
                    console.log(response[0].errors)
                    throw new Error('Failed to fetch')
                }

                const posts=response.posts.data
                
                if (Array.isArray(posts)){
                    entities=entities.concat(posts)
                }
        }
        
            const words = {}
            const glossaryQuery = `{
                glossary {
                    word
                    content
                    slug
                    id
                  }
            }`
            const glossaryRes = await sendQuery(glossaryQuery,baseUrl,headers)           
            
            const glossary = glossaryRes.glossary

            if(glossary.length>0){
                glossary.forEach(g=>{
                    let shorten = htmlTags2PlainText(g.content)

                    if (g.content.length > 235) {
                        let parts = shorten.substr(0, 220).split(' ')
                        parts.pop()
                        shorten = parts.join(' ')
                    }
                    words[g.word.toLowerCase()]={...g,content:shorten}
                })
    
            }
            
            const replacer = (word) => {

                const origialWord=word
                word = word.toLowerCase()
              
                if (words[word]){
     
                    return `<span class="ac-glossary-link rtBibleRef">${origialWord}</span>`
                } else {
                    console.log(`Unable to find record for this word: ${word}`)
                }
                return 
              }

              const scanForAllGlossary = (text)=>{
                const postGlossaries= []
                let toReplace=text
                Object.keys(words).forEach(word=>{
                        const regex = new RegExp(`(\\s)(${word})([^a-zA-Z0-9]*)`, 'mi');
                        const match = String(toReplace).match(regex)
                        if (match && match.length>2){
                            const word = match[2].toLowerCase()
                            if (words[word]){
                                postGlossaries.push(words[word])

                                toReplace= String(toReplace).replace(match[0], `${match[1]}${replacer(match[2])}${match[3]}`) 
                            }else {
                                console.log(`Unable to find record for this word: ${word}`)
                            }
                        }
                })
                
                return {text:toReplace,postGlossaries}
              }

              if(glossary.length>3){
      
                let test = `Some random text containing ${glossary[0].word} and ${glossary[1].word} and ${glossary[2].word} should get replaced`

                const replacedTest = scanForAllGlossary(test)
  
                if (replacedTest.text!==test){
                  
                  console.log('Replacer is working')
              } else {
                  throw new Error('Replacer not working!')
              }
              }
              
            console.log(`creating ${entities.length} nodes`)
            for(let k=0;k<entities.length;k++){
                
                const post = entities[k]
                const transformedPost = Object.assign({},post)
                if(glossary.length>0){
                    const glossaryContent = scanForAllGlossary(transformedPost.content)
                    transformedPost.title = decode(post.title)
                    transformedPost.excerpt = decode(post.excerpt)
                    transformedPost.content = glossaryContent.text 
                    transformedPost.glossary = glossaryContent.postGlossaries
                }

                transformedPost.content = removeUnwantedNodes(transformedPost.content)
                transformedPost.content = checkingLinks(transformedPost.content)
                console.log(transformedPost.content)
                transformedPost.acId = post.id
                transformedPost.readMorePosts=post.readMorePosts?post.readMorePosts.map(p=>p.slug):[]
                transformedPost.recommendPosts=[]
                if( k===0){
                    const dummyContentPost = createDummyPost(transformedPost)

                      createPostNode(dummyContentPost)
                }
                createPostNode(transformedPost)
            }
            
      }

  }

exports.onPostBuild = async ({ cache }) => {
    await cache.set(`key`, `value`)
    const cachedValue = await cache.get(`key`)
    console.log(cachedValue) // logs `value`
}


const removeUnwantedNodes=(text)=>{
    const root = parse(text)
    const scripts = root.querySelector("script")
    const audio = root.querySelectorAll("audio")
    const wpAudio = root.querySelector(".powerpress_player")
    const podcastLinks = root.querySelectorAll(".powerpress_links")
    const playlist = root.querySelector(".cue-playlist-container")
    const quotes=(root.querySelectorAll(".wp-embedded-content"))
    if(scripts){
        scripts.remove()
    }

    if(wpAudio){
        wpAudio.remove()
    }

    if(podcastLinks.length>0){
       podcastLinks.forEach(node=>{
           node.remove()
       })
    }

    if(playlist){
        playlist.remove()
    }

    if(quotes.length>0){
        quotes.forEach(node=>{
            node.remove()
        })
    }
    
    if(audio.length>0){
        audio.forEach(node=>{
            node.remove()
        })
     }

     return root.toString()
}

const checkingLinks=(text)=>{
    const root = parse(text)
    const links = root.querySelectorAll("a")
    if(links.length>0){
        links.forEach(node=>{
            console.log(node.rawAttrs)
        })
    }
}

const createDummyPost = (transformedPost)=>{
    const dummyContentPost = {...transformedPost}
    dummyContentPost.acId = "dummy-content"
    dummyContentPost.id = "dummy-content"
    dummyContentPost.topics=[]
    dummyContentPost.title="dummy-content"
    dummyContentPost.slug="dummy-content"
    dummyContentPost.track = {
        url:"dummy-content",
        title:"dummy-content",
        duration:0,
        post: {
            title:transformedPost.title,
            slug:transformedPost.slug
        },
        playlists :[{
            slug:"dummy-content",
            title:"dummy-content"
        }]
    }
    dummyContentPost.seo={
        title:"dummy-content",
        desc:"dummy-content",
    }
    dummyContentPost.meta= {
        credits:"dummy-content",
        no_dict:false,
        url:"dummy-content"
    }

    dummyContentPost.glossary = [{
        word:"dummy-content",
        content:"dummy-content",
        slug:"dummy-content",
        id:"dummy-content"
        }]

        return dummyContentPost
}

