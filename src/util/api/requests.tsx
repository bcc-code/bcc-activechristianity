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

export interface IGetPostsAndTopics {
  postsIds: string[]
  topicsIds: string[]
}

export const loginMutation = (username: string, password: string, remember: boolean) => {
  return `
  mutation {
      signIn(input:{
        username:"${username}"
        password:"${password}"
        remember:${remember}
      }){
        success
        user {
          name
          email
          meta {
            consented
            notify
          }
  
        }
      }
    }
  `
}

export const registerMutation = (email: string, password: string, remember: boolean) => `
  mutation {
      signUp(input:{
      name:"${email}",
      email:"${email}",
      password:"${password}",
      remember:${remember}
    }) {
      success
      user {
        name
        email
        meta {
          consented
          notify
        }

      }
    }
  }
`

export const forgotPasswordMutation = (email: string) => `
  mutation {
    forgotPassword(input:{email:"${email}"}) {
      success
      message
    } 
  }
`

export const toggleNotifyAndGiveConsent = (agree: boolean) => `
mutation ToggleNotify {
  notifications(allow: ${agree}) {
    success
    message
  }

  consent(agreed: true) {
    success
    message
  }
}


`
export const toggleNotify = (agree: boolean) => `
  mutation ToggleNotify {
    notifications(allow: ${agree}) {
      success
      message
    }

  }

`

export const giveConsent = `
  mutation {
    consent(agreed: true) {
      success
      message
    }
  }
`

export const logoutMutation = `
  mutation {
    signOut {
      status
    }
  }
`

export const bookmarkPostMutation = (id: string, toggle: boolean) => `
  mutation {
    bookmarkPost(postId:${id}, toggle:${toggle}){
      success
      message
    }
  }
`
export const followTopicMutation = (id: number, toggle: boolean) => `
  mutation {
    follow (type:TOPIC,id:${id},toggle:${toggle}){
      success
      message
    }
  }
`

export const followPlaylistMutation = (id: number, toggle: boolean) => `
  mutation {
    follow (type:PLAYLIST,id:${id},toggle:${toggle}){
      success
      message
    }
  }
`


export const readingPostMutation = (id: string) => `
  mutation {
    readingPost(postId:${id}){
      success
      timeRead
      message
    }
  }

`

export const visitsPostMutation = (id: string) => `
  mutation {
    visitsPost(postId:${id}){
      success
      message
    }
  }
`
export const biblePostsQuery = (bookId: number, ch: number) => `
query {
    biblePosts(id:"${bookId}", ch:${ch}){
      slug
    }
  }

`

export const recommendedByPostQuery = (postId: number | string) => `
  query { 
    
    recommendedByPost(postId:${postId}){
      slug
    }
  }  
`

export const recommendedPostsAndPopularTopic = () => `
  query { 
    
    recommended(count:10){
      slug
    }
    popularTopics{
      slug
      id
      
    }
    featuredTopics:topics(featured:true) {
      slug
      id
    }
  }  
`
export const topicReommendedPostsQuery = (topicId: number) => `
query {
  rankingTopicPosts(topicId:${topicId}){
    slug
  }
}  
`

export const bookmarkedPostQuery = `
  query {
    bookmarked {
      id
      slug
    }
  }
`
export const followingQuery = `
  query {
    following {
      topics {
        id
        slug
      }
      playlists {
        id
        slug
      }
      authors {
        id
        slug
      }
    }
  }
`
export const latestHistoryQuery = `
  query {
    history(limit:10) {
      id
      slug
    }
  }
`

export const unfinishedQuery = `
  query {
    unfinishedPosts {
      id
      slug
    }
  }
`

export const profileQuery = `
  query {
    me {
      name
      email
      id
      meta {
        consented
        notify
      }
    }
  }
`

export const getOnePostByIdQuery = (id: string) => {
  return `
    query {
      post(id: ${id}) {
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
          updated_at
        }
        

  }
  `
}

export const getOnePreviewPostByIdQuery = (id: string) => {
  return `
    query {
      previewPost(id: ${id}) {
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
          updated_at
        }
        

  }
  `
}
export const getOnePageByIdQuery = (id: string) => {
  return `
    query {
      page(id:${id}){
        title
        slug
        flexibleContent
      }
    }
  `
}

export const getOnePreviewPageByIdQuery = (id: string) => {
  return `
    query {
      previewPage(id:${id}){
        title
        slug
        flexibleContent
      }
    }
  `
}

export const getPostsByIds = (ids: IGetPostsAndTopics) => {
  const { postsIds, topicsIds } = ids
  return `
    query {
      posts(ids: [${postsIds.join(",")}]) {
          data {
              ${postQuery}
          }
        }

        topics(ids:[${topicsIds.join(",")}]){
          ${topicQuery}
        }
  }
  `
}

export const getScriptChapterPostsQuery = (bookId: string, ch: string) => `
  query  {
    biblePosts(id:"${bookId}", ch:${ch}){
        slug
      }
  }

`

export const getPostsPerPageQuery = (id: string, page: number) => `{
  topic(id:${id}) {	
  
    somePosts(first:12,page:${page}){
      data{
        ${postQuery}
      }
    }
  }
}`

export const getPostsPerPageBySubtopicId = (id: string, subtopicId: string, page: number) => `{
  topic(id:${id}) {
    id
    name
    somePosts (hasTopics: { value: ${subtopicId}, column: ID },first:12,page:${page}){
      data {
        ${postQuery}
      }
    }
  }
}

`


/* getSubTopicPosts=(id1,id2) =>`{
  ac {
      topic(id: ${id1}) {
          id
          name
          posts (hasTopics: { value: ${id2}, column: ID }){
            ${languagePostQuery}
          }
        }
  }
}` */