const helpers = require('./helpers')

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

const {sendQuery,getMultiPosts, postQuery} = helpers

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest },options) => {
    const { createNode } = actions
    const {fieldName,typeName,baseUrl} = options

      const firstQueryRes = await sendQuery(settingsQuery,baseUrl)

      if (firstQueryRes) {
        if (firstQueryRes.settings && Array.isArray(firstQueryRes.settings)){
            const {settings} = firstQueryRes
            const metadata = {}
            settings.forEach(s => {
              metadata[s.key] = s.value
            })
            if (metadata["featured_posts"]){

                const featuredArraySlug = JSON.parse(metadata["featured_posts"])
                  metadata["featured_posts"]=await getMultiPosts(featuredArraySlug, baseUrl)
                  /* metadata["featured_posts"]=featured_slug. */
            }

            if (metadata["popular_posts"]){
                const popularArraySlug = JSON.parse(metadata["popular_posts"])
                  metadata["popular_posts"]=await getMultiPosts(popularArraySlug, baseUrl)
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
   
        for (let i = 1; i <=pageCount; i++){
            console.log(i)
            
            const response = await sendQuery(getPostsQuery(i),baseUrl)

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
            const glossaryRes = await sendQuery(glossaryQuery,baseUrl)           
            
            const glossary = glossaryRes.glossary
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
            console.log(`creating ${entities.length} nodes`)
            for(let k=0;k<entities.length;k++){
                const post = entities[k]
                const transformedPost = Object.assign({},post)
                const glossaryContent = scanForAllGlossary(transformedPost.content)
                transformedPost.acId = post.id
                transformedPost.content = glossaryContent.text
                transformedPost.glossary = glossaryContent.postGlossaries
                transformedPost.readMorePosts=post.readMorePosts?post.readMorePosts.map(p=>p.slug):[]
                transformedPost.recommendPosts=[]

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



