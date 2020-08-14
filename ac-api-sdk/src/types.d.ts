type Alphanumeric<T> = {
  [P in keyof T]: T[P]
};

interface ISDK {
  auth: any
  blog: any
  other: any
}

interface Igql {
  types: {
    image: string
    user: string
  }
  queries: {
    // Auth
    profile: string
    // Blog
    popularPosts: string
    recommendedByPost: string
    recommended: string
    history: string
    unfinishedPosts: string
    following: string
    liked: string
    // Other
    bible: string
    biblePosts: string
  }
  mutations: {
    // Auth
    login: string
    register: string
    logout: string
    resetPassword: string
    // Blog
    visitsPost: string
    readingPost: string
    followTopic: string
    followTag: string
    likePost: string
  }
}

interface IgqlResponse {
  errors: [IgqlError]
  data: any
}

interface IgqlError {
  message: [string] | string
  extensions?: {
    validation: any
  }
}

interface IApp {
  $config: IConfig
  $fetch: FFetch,
  gql: Igql
}

interface IOptions {
  gql_api_url: string
  debug?: boolean
}

interface IConfig extends IOptions {
  authenticated: boolean
  auth_header?: {
    Authorization: string
  }
}

interface FFetch {
  (query: string, variables?: any): Promise<any>
}

interface IUser {
  id: string
  name: string
  email: string
}

interface ResourceRef {
  id: number
  slug: string
  type: string
  ts: string
}

interface IBibleState {
  new: IBible
  old: IBible
}

interface IBible {
  no: number
  name: string
  total: number
  chapters: [number]
}