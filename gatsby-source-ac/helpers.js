const fetch = require('node-fetch');

const topicQuery = `
    id
    name
    slug
    noOfPosts
    group {
        id
        name
    }
    image {
        src
        srcset
        dataUri
    }
`
const postQuery = `
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
    track {
        url
        title
        duration
        post {
            title
            slug
        }
        playlists {
            slug
            title
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
    likes
    views
    meta {
      url
  }
`

module.exports.allPostQueries=[]
module.exports.postQuery = postQuery

const multiPostsQuery = (slugsArray)=>`
{
    posts(ids: [${slugsArray.join(",")}]) {
        data {
            ${postQuery}
        }
      }
}
`
module.exports.multiPostsQuery = multiPostsQuery;


module.exports.getPostsQuery = (pageNr)=>`
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

module.exports.totalPostQueryCounts=0
function strArr(sa, delimiter = ', ') {
    if (!sa)
        return '';
    if (typeof sa === 'object') {
        return Object.keys(sa).map((k) => `${k}: ${strArr(sa[k])}`).join(delimiter);
    }
    return Array.isArray(sa) ? sa.join(delimiter) : sa;
}

function errorMessage(gqlError){
    let msg = strArr(gqlError.message)
    if (gqlError.extensions) {
      if (gqlError.extensions.validation) {
        msg = strArr(gqlError.extensions.validation)
      }
    }
    return msg
  }
const sendQuery = (query, baseUrl,headers) => {
    const options = {
        method: 'POST',
        'credentials': 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify({ query })
    }

    return fetch(baseUrl, options)
        .then(response => response.json())
        .then((gqlResponse) => {
            if (gqlResponse.errors) {
                console.error(gqlResponse.errors.map(errorMessage).join(' & '));
                throw new Error (gqlResponse.errors.map(errorMessage))
            }
            else {
                return Promise.resolve(gqlResponse.data);
                
            }
        })
        .catch((error)=>{
            console.log(error)
        })
}

module.exports.sendQuery = sendQuery

module.exports.topicQuery=topicQuery

module.exports.getMultiPosts = (idArray,baseUrl,headers)=>{
    const query = multiPostsQuery(idArray)
    return sendQuery(query,baseUrl,headers).then(res=>{
        return res.posts.data
    })
}

const queries =[]
module.exports.getIndexPostQuery=async (baseUrl)=>{
    const getCount = `
    query {
        posts {
            paginatorInfo {
              total
              count
            }
          }
    }
  `
    const countRes = await sendQuery(getCount,baseUrl,{})
    const {total,count} = countRes.posts.paginatorInfo
    const pageCount = Math.ceil(total/count)

    console.log('getting indext query')
  
    
    // const queries = [
    //   {
    //     query: postQuery ,
    //     transformer: ({ data }) => data.ac && data.ac.allPosts.map((node) => {
    //       return { ...node, type: 'post' }
    //     }), // (optional)
    //     //index: ''// (optional) override default
    //   }
    //   ];
  
      for (let i = 1; i <=pageCount ; i++){
        const postQuery = `{
          ac {
            posts(page:${i}) {
              data {
                objectID: id
                title
                slug
                excerpt
                authors {
                    name
                    slug
                    id
                    pivot {
                        as
                    }
                }
                topics {
                    name
                    slug
                    id
                    group {
                        name
                        slug
                    }
                }
                published
      
              }
            }
          }
        }`
  
        queries.push(
          {
            query: postQuery,
            transformer: ({ data }) => data.ac && data.ac.posts.data.map((node) => {
              return { ...node, type: 'post' }
            }), // (optional)
            //index: ''// (optional) override default
          }
        )
  
      }
    
    if(process.env.LOCALE==="en"){
      queries.push(
        {
          query: `{
            ac {
              playlists {  
                id  
                objectID: slug
                title
                slug
                excerpt
                image {
                  src
                  srcset
                  dataUri
      
              }
              }
            }
          }`,
          transformer: ({ data }) => data.ac && data.ac.playlists.map((node) => {
            return { ...node, type: 'playlist' }
          }), // (optional)
          //index: ''// (optional) override default
        }
      )
    }
  
    return queries
  }


module.exports.allPostQueries=queries