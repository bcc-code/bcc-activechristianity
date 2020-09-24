
export const loginMutation = (username: string, password: string, remember: boolean) => {
  console.log(username)
  console.log(password)
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
  
        }
      }
    }
  `
}

export const registerMutation = (username: string, email: string, password: string, remember: boolean) => `
    mutation {
      signUp(input:{
      name:"${username}",
      email:"${email},
      password:"${password},
      remember:${remember}
    }) {
      success
      user {
        name
        email

      }
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

export const likePostMutation = (id: string, toggle: boolean) => `
  mutation {
    likePost(postId:${id}, toggle:${toggle}){
      success
      count
    }
  }
`
export const followTopicMutation = (id: number, toggle: boolean) => `
  mutation {
    followTag(tagId: ${id}, toggle: ${toggle}) {
      success
      postViews
      userPostViews
    }
  }
`

export const readingPostMutation = (id: string) => `
  mutation {
    readingPost(postId:${id}){
      success
      timeRead
    }
  }

`

export const visitsPostMutation = (id: string) => `
  mutation {
    visitsPost(postId:${id}){
      success
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
export const likedPostsQuery = `
  query {
    liked {
      id
      slug
    }
  }
`
export const followedTopicsQuery = `
  query {
    following {
      tags {
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
    }
  }
`