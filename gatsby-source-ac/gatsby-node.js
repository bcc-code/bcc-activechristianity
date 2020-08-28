const fetch = require('node-fetch');
const { graphql } = require('gatsby');
const { array } = require('prop-types');

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
            
                langs {
                    lang
                    slug
                }
                content
            }
        }
    }
`


exports.sourceNodes = async ({ actions, createNodeId, createContentDigest },options) => {
    const { createNode } = actions
    const {fieldName,typeName,baseUrl} = options
  
      const firstQueryRes = await fetch(baseUrl, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query:`
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
      ` })
      })
      .then(response => response.json())

      if (firstQueryRes.data) {
        if (firstQueryRes.data.settings && Array.isArray(firstQueryRes.data.settings)){
            const {settings} = firstQueryRes.data
            const metadata = {}
            settings.forEach(s => {
              metadata[s.key] = s.value
            })
            if (metadata["featured_posts"]){

                const arraySlug = JSON.parse(metadata["featured_posts"])

                const featured_slug=await fetch(baseUrl, { 
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query:
                        `{
                            posts(ids: [${arraySlug.join(",")}]) {
                                data {
                                 slug
                                }
                              }
                        }` 
                     })
                  })
                  .then(response => response.json())
                  metadata["featured_posts"]=featured_slug.data.posts.data.map(p=>p.slug)
                  /* metadata["featured_posts"]=featured_slug. */
 
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
        const pages = Math.ceil(total/count)
        console.log(`starting with ${pages} requests`)

        for (let i = 1; i <=pages;i++){
            console.log(i)
            const response = await fetch(baseUrl, { 
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body:JSON.stringify({ query:getPostsQuery(i)})
            })
            .then(response => response.json())

                if (Array.isArray(response) && response[0]){
                    console.log(response[0].errors)
                    throw new Error('Failed to fetch')
                }

                const posts=response.data.posts.data
                
                if (Array.isArray(posts)){
                    entities=entities.concat(posts)
                }
        }

            const words = {}

            const glossaryRes = await fetch(baseUrl, { 
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify({ query:`{
                    glossary {
                        word
                        content
                        slug
                        id
                      }
                }`})
            })
            .then(response => response.json())            
            
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

            entities.forEach(post=>{
                
                const transformedPost = Object.assign({},post)
                const glossaryContent = scanForAllGlossary(transformedPost.content)
                transformedPost.acId = post.id
                transformedPost.content = glossaryContent.text
                transformedPost.glossary = glossaryContent.postGlossaries
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
            })
            
      }

  
  }

exports.onPostBuild = async ({ cache }) => {
    await cache.set(`key`, `value`)
    const cachedValue = await cache.get(`key`)
    console.log(cachedValue) // logs `value`
}



