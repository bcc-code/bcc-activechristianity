
export interface IBreadcrumb {
    items: INavItem[]
    title: string
}


export interface ITaxonomy {
    id?: string
    name: string
    slug: string
    count?: number
}

export interface IApiItem {
    id: string
    slug: string
    ts: string
}
export interface IApiPost {
    id: string
    slug: string
}
export interface IMedia {
    video?: ITrack
    audio?: ITrack
    path: string | undefined
    defaulTrackType?: ITrackType
}
export interface IArticle {
    url: string
    title: string
}
export interface ITrack {
    src: null | string
    title: string
    contributor?: string
    artworkSrc?: string
    duration?: string
    playlist?: string
    playlistSlug?: string
    article?: IArticle
    type: ITrackType
}

export type ITrackType = "audio" | "video"

export interface INavItem {
    name: string
    to: string;
    order?: number
}

export interface IElementNavItem extends INavItem {
    name: string | JSX.Element
}

export interface ITopicNavItem extends INavItem {
    id: string
}

export interface INavItemCount extends INavItem {
    count: number
}

export interface ISubtopicLinks extends INavItemCount {
    key: string
}

export type ScreenSizeType = 'sm' | 'md' | 'lg' | 'xl'

export interface IScreensize {
    screensize: ScreenSizeType,
    height: number,
    width: number
}

export interface IPostAuthors {
    as: string
    authors: IAuthor[]
}

export interface IPostItem {
    id: string
    title: string
    slug: string
    image: IImage
    excerpt: string
    date: Date
    types?: ITopicNavItem[]
    format?: ITopicNavItem[]
    topics?: ITopicNavItem[]
    authors?: IPostAuthors[]
    bookmarked?: boolean,
    reading_time?: {
        text: string
        minutes: number
    }
    media: IMedia
    glossary?: IGlossary[]
}

export interface IPaginate {
    perPage?: number
    totalCount?: number
    currentPage: number
    totalPages: number
    baseUrl: string
    hasRecommendPage?: boolean
}

export interface IPostItemCard extends IPostItem {
    className?: string
}

export interface ISearchHistory {
    searchinput: string
}

export interface ISearchFilter {
    name: string
    color?: string
}

export interface ISearchByTaxonomy {
    name: string
    image: string
    count: number
}

export interface IIconProps {
    customSize?: string | number
    className?: string
}


export interface IOptions {
    gql_api_url: string
}

export interface IConfig extends IOptions {
    authenticated: boolean
    auth_header?: {
        Authorization: string
    }
}

export interface IImageProps {
    imageUrl: string
    alt: string
}


export interface IMenusQuery {
    menus: {
        id: string
        name: string
        slug: string
        menuItems: IMenuItem[]
    }[]
}

export interface IMenuItem {
    id: string
    name: string
    type: string
    value: string
    target: string
    enabled: boolean
    parameters: string
}

export interface ITranslations {
    lang: string
    slug: string
}

export interface IPage {
    id: string
    title: string
    slug: string
    path: string
    langs: ITranslations[]
    label: string
    is_active: Boolean
    content: string
    flexibleContent: string
    meta: {
        post_types: string[]
    }
    parent: IPage
    created_at: string
    updated_at: string
}

export interface IImage {
    id: string
    src: string
    alt: string
    srcset: string
    dataUri: string
    sizes: string
    size: {
        width: number
        height: number
    }
    colors: number[][]
    created_at: string
    updated_at: string
}

export interface ITopicGroup {
    name: string
    slug: string
    icon: string
    topics: ITopic[]
}

export interface ITopic {
    id: string
    name: string
    slug: string
    noOfPosts: number
    excerpt?: string
    image: IImage[]
    group: ITopicGroup
    posts: IPostRes[]
    somePosts: IPaginate
    subTopics: {
        id: string
        name: string
        slug: string
        group_id: number
    }
}

export interface IAuthor extends INavItem {
    as: string
    image?: IImage
    excerpt?: string
}

export interface IAuthorRes {
    id: string
    name: string
    slug: string
    pivot?: {
        as: string
    }
    posts?: IPostRes[]
}

export interface ITrackRes {
    id: string
    post: IPostRes
    title: string
    duration: string
    url: string
}


export interface IPostRes {
    id: string
    title: string
    sub: string
    /*     type: PostType */
    slug: string
    langs: ITranslations[]
    status: number
    excerpt: string
    image: IImage
    video: string
    content: string
    readtime: number
    meta: {
        url: string
    }
    track: ITrackRes
    authors: IAuthorRes[]
    topics: ITopic[]
    published: string
    created_at: string
    updated_at: string
    glossary?: IGlossary[]
}

export interface IUser {
    id: string
    name: string
    email: string
    created_at: string
    updated_at: string
}

export interface IPaginatorInfo {
    count: number
    currentPage: number
    firstItem: number
    hasMorePages: boolean
    lastItem: number
    lastPage: number
    perPage: number
    total: number
}


export interface IPostPaginator {
    paginatorInfo: IPaginatorInfo
    data: IPostRes[]
}

export interface IGlossary {
    id: string
    word: string
    slug: string
    content: string
}
export interface IEbook {
    id: string
    title: string
    sub: string
    slug: string
    sources: string[]
    langs: ITranslations[]
    status: number
    excerpt: string
    image: IImage
    content: string
    authors: IAuthorRes[]
    topics: ITopic[]
}

export interface IPlaylist {
    title: string
    slug: string
    excerpt: string
    image: IImage
    featured: boolean
    tracks: ITrackRes[]
}

export interface ISeries {
    title: string
    slug: string
    excerpt: string
    image: IImage
    posts: IPostRes[]
}

export interface ISite {
    locale: string
    lang: string
    title: string
    url: string
}

export interface IResourceRef {
    id: string
    slug: string
    type: string
    ts: string
    v: number
}


export interface ILiked {
    liked: IResourceRef[]
}

export interface IHistory {
    history: IResourceRef[]
}

export interface IUnfinished {
    unfinishedPosts: IResourceRef[]
}

export interface IFollowing {
    topics: IResourceRef[]
    tags: IResourceRef[]
    authors: IResourceRef[]
}

export interface IPopularPosts {
    popularPosts: IResourceRef[]
}


export interface IBibleBook {
    no: number
    id: number
    name: string
    chapters: number[]
    total: number
}
export interface IBible {
    old: IBibleBook[]
    new: IBibleBook[]
}

export interface IPostsByFormat {
    keyName?: string
    type: {
        name: string | JSX.Element
        to: string
    }
    postsRow: IPostItem[]
}

export interface IPostsByFormatCollection { [key: string]: IPostsByFormat }