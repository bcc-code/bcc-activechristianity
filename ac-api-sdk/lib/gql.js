const types = {
    image: `
{
  src
  srcset
  dataUri
  sizes
  size {
    width
    height
  }
}`,
    user: `
id
name
  `
};
/**
 * AUTH SCOPE
 */
const auth = {
    queries: {
        profile: `
query Profile {
  me {
    ${types.user}
    email
    created_at
  }
}`
    },
    mutations: {
        login: `
mutation ($username: String!, $password: String!, $remember: Boolean) {
  login: signIn( input: {
    username: $username
    password: $password
    remember: $remember
  } ) {
    success
    user {
      ${types.user}
    }
  }
}`,
        register: `
mutation ($name: String!, $email: String!, $password: String!, $remember: Boolean) {
  register: signUp( input: {
    name: $name
    email: $email
    password: $password
    remember: $remember
  } ) {
    success
    user {
      ${types.user}
    }
  }
}`,
        logout: `
mutation Logout {
  logout: signOut {
    status
    message
  }
}`,
        resetPassword: `
mutation ($email: String!) {
  forgotPassword(input: { email: $email }) {
    status
    message
  }
}`
    }
};
/**
 * BLOG SCOPE
 */
const blog = {
    queries: {
        history: `
query ($limit: Int!) {
  history(limit: $limit) {
    id
    slug
    ts
  }
}`,
        unfinishedPosts: `
query {
  unfinishedPosts {
    id
    slug
    ts
  }
}
`,
        following: `
query {
  following {
    topics {
      id
      slug
      ts
    }
  }
}
`,
        liked: `
query {
  liked {
    id
    slug
    ts
  }
}
`
    },
    mutations: {
        visitsPost: `
mutation ($postId: ID!) {
  visitsPost(postId: $postId) {
    success
    postViews
    userPostViews
  }
}`,
        readingPost: `
mutation ($postId: ID!) {
  readingPost(postId: $postId) {
    success
    timeRead
  }
}`,
        followTopic: `
mutation ($topicId: ID!, $toggle: Boolean!) {
  followTopic(topicId: $topicId, toggle: $toggle) {
    success
  }
}`,
        likePost: `
mutation ($postId: ID!, $toggle: Boolean!) {
  likePost(postId: $postId, toggle: $toggle) {
    success
  }
}`
    }
};
const other = {
    queries: {
        bible: `
query {
  bible {
    old {
      no
      name
      total
      chapters
    }
    new {
      no
      name
      total
      chapters
    }
  }
}
`
    }
};
const gql = {
    types,
    queries: Object.assign({}, auth.queries, blog.queries, other.queries),
    mutations: Object.assign({}, auth.mutations, blog.mutations)
};
export default gql;
