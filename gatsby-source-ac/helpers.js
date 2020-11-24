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

`
const postQueryBasic = `
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
`
const postQueryNoPlaylist = `
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
`
module.exports.postQuery = postQuery
module.exports.postQueryNoPlaylist=postQueryNoPlaylist
const multiPostsQuery = (slugsArray,noPlaylists)=>`
{
    posts(ids: [${slugsArray.join(",")}]) {
        data {
            ${noPlaylists? postQueryNoPlaylist:postQuery}
        }
      }
}
`
module.exports.multiPostsQuery = multiPostsQuery;

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

module.exports.getMultiPosts = (idArray,baseUrl,headers,noPlaylists=false)=>{
    console.log(noPlaylists)
    const query = multiPostsQuery(idArray,noPlaylists)
    return sendQuery(query,baseUrl,headers).then(res=>{
        return res.posts.data
    })
}