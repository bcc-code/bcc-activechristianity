const fetch = require('node-fetch');
const cliProgress = require('cli-progress');
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

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);
 

const getRecommendPosts = (postId)=>`

    {
        recommendedByPost(postId:${postId}){
            slug
          }
    }
`
const getPostsQuery = (pageNr)=>`
    {
        posts(page:${pageNr}) {
            data {
                id
                title
                slug
                excerpt
                image {
                    src
                    srcset
                    dataUri
                      colors
            
                }
                readtime
                meta {
                    url
                }
                track {
                    url
                    title
                    duration
                    post {
                        title
                        slug
                    }
                }
                authors {
                    name
                    slug
                    pivot {
                        as
                    }
                    id 
                }
                topics {
                    name
                    slug
                    id
                    group {
                        name
                        slug
                        id
                    }
                }
                published 
                readMorePosts:posts {
                    slug
                }
                langs {
                    lang
                    slug
                }
                content
                likes
                views
            }
        }
    }
`



exports.sourceNodes = async ({ actions, createNodeId, createContentDigest },options) => {
    const { createNode } = actions
    const {fieldName,typeName,baseUrl} = options
    const sendQuery = (query) => {
        return fetch(baseUrl, {
            method: 'POST',
            'credentials': 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                /*              */
            },
            body: JSON.stringify({ query })
        })
            .then(response => response.json())
    }
      const firstQueryRes = await sendQuery(settingsQuery)

      if (firstQueryRes.data) {
        if (firstQueryRes.data.settings && Array.isArray(firstQueryRes.data.settings)){
            const {settings} = firstQueryRes.data
            const metadata = {}
            settings.forEach(s => {
              metadata[s.key] = s.value
            })
            if (metadata["featured_posts"]){

                const featuredArraySlug = JSON.parse(metadata["featured_posts"])
                const featuredPostsQuery = `{
                    posts(ids: [${featuredArraySlug.join(",")}]) {
                        data {
                         slug
                        }
                      }
                }`
                const featured_slug=await sendQuery(featuredPostsQuery)
                  metadata["featured_posts"]=featured_slug.data.posts.data.map(p=>p.slug)
                  /* metadata["featured_posts"]=featured_slug. */
 
            }

            if (metadata["popular_posts"]){
                const popularArraySlug = JSON.parse(metadata["popular_posts"])

                const popularPostsQuery = `{
                    posts(ids: [${popularArraySlug.join(",")}]) {
                        data {
                         slug
                        }
                      }
                }`
                
                const popular_slug=await sendQuery(popularPostsQuery)
                  metadata["popular_posts"]=popular_slug.data.posts.data.map(p=>p.slug)
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
  
      if (firstQueryRes.data.posts){
          
        const {count,total}=firstQueryRes.data.posts.paginatorInfo
        const pageCount = Math.ceil(total/count)
        console.log(`Source ac_post`)
        bar1.start(pageCount, 0);
        for (let i = 1; i <=pageCount; i++){
            console.log(i)
            bar1.update(i);
            const response = await sendQuery(getPostsQuery(i))

                if (Array.isArray(response) && response[0]){
                    console.log(response[0].errors)
                    throw new Error('Failed to fetch')
                }

                const posts=response.data.posts.data
                
                if (Array.isArray(posts)){
                    entities=entities.concat(posts)
                }
        }
        bar1.stop();

            const words = {}
            const glossaryQuery = `{
                glossary {
                    word
                    content
                    slug
                    id
                  }
            }`
            const glossaryRes = await sendQuery(glossaryQuery)           
            
            const glossary = glossaryRes.data.glossary
            glossary.forEach(g=>{
                words[g.word.toLowerCase()]=g
            })

            const replacer = (word) => {

                const origialWord=word
                word = word.toLowerCase()
              
                if (words[word]){
     
                    return `<span class="ac-glossary-link">${origialWord}</span>`
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
              let test = `Some random text containing ${glossary[0].word} and ${glossary[1].word} and ${glossary[2].word} should get replaced`

              const replacedTest = scanForAllGlossary(test)

              if (replacedTest.text!==test){
                
                console.log('Replacer is working')
            } else {
                throw new Error('Replacer not working!')
            }

            for(let k=0;k<entities.length;k++){
                const post = entities[k]
                const transformedPost = Object.assign({},post)
                const glossaryContent = scanForAllGlossary(transformedPost.content)
                transformedPost.acId = post.id
                transformedPost.content = glossaryContent.text
                transformedPost.glossary = glossaryContent.postGlossaries
                transformedPost.readMorePosts=post.readMorePosts?post.readMorePosts.map(p=>p.slug):[]
                transformedPost.recommendPosts=[]
                const recommendByPostQuery = getRecommendPosts(post.id)
                
/*                 const recommendByPostRes = await sendQuery(recommendByPostQuery)
                .catch(error=>{
                    console.log(error)
                    return null
                })

                if(recommendByPostRes && recommendByPostRes.errors){
                    console.log(recommendByPostQuery)
                    console.log(recommendByPostRes)
                    
                } else if(recommendByPostRes){
                    transformedPost.recommendPosts = recommendByPostRes.data.recommendedByPost.map(post=>post.slug)
                }
 */
                const nodeContent = JSON.stringify(transformedPost)
                const nodeMeta = {
                    id: createNodeId(`ac-post-${post.id}`),
                    parent: null,
                    children: [],
                    internal: {
                        type: `${fieldName}_post`,
                        mediaType: `text/html`,
                        content: nodeContent,
                        contentDigest: createContentDigest(transformedPost)
                    }
                }
    
                const node = Object.assign({}, transformedPost, nodeMeta)
                createNode(node)
            }

            
      }

  
  }

exports.onPostBuild = async ({ cache }) => {
    await cache.set(`key`, `value`)
    const cachedValue = await cache.get(`key`)
    console.log(cachedValue) // logs `value`
}



