import { IPostItem, IMedia, IEbook, IPlaylist, ITopicNavItem, ITopic, ITopicPostItems, IPostRes } from '@/types'
import { trimSlug } from './index-js'
import { normalizeTracks } from '@/helpers/normalizers'
import ac_strings from '@/strings/ac_strings.js'



export const fetchLocalPostsFromSlugs = (slugs: string[]) => {
    const filteredSlugs = slugs.filter(s => typeof s === "string" && s.trim() !== "")
    return Promise
        .all(filteredSlugs.map(item => fetchOneLocalPostFromSlug(item)))
        .then(list => {
            const toReturn: IPostItem[] = []
            list.map(post => {
                if (post !== undefined) {
                    toReturn.push(post)
                }
            })

            return toReturn
        })
        .catch(error => {
            console.log(error.message)
        })
}

export const fetchPostslistFromArchivePage = (slug: string) => {
    const foundPosts: IPostItem[] = []
    return fetch(`/page-data/${slug}/page-data.json`)
        .then(res => res.json())
        .then(async (res) => {
            if (res.result && res.result && res.result.pageContext.posts) {
                const posts: IPostItem[] = []
                const postsRes: IPostItem[] | string[] = res.result.pageContext.posts
                for (let i = 0; i < postsRes.length; i++) {
                    const onePostRes = postsRes[i]
                    if (typeof onePostRes === "string") {
                        const fullPost = await fetchOneLocalPostFromSlug(onePostRes)
                        if (fullPost) {
                            posts.push(fullPost)
                        }
                    } else if (typeof onePostRes === "object") {
                        posts.push(onePostRes)
                    }
                }
                /* const posts: IPostItem[]|string[] = res.result.pageContext.posts.map( p=>) */
                foundPosts.push(...posts)
            }
            return foundPosts
        }).catch(error => {

            console.log(error)
        })
}

export const fetchPlaylistFromSlug = (slug: string) => {
    let processSlug = trimSlug(slug)
    return fetch(`/page-data/${ac_strings.slug_playlist}/${processSlug}/page-data.json`)
        .then(res => res.json())
        .then(res => {
            if (res.result && res.result && res.result.pageContext) {
                const playlist: IPlaylist = res.result.pageContext.playlist

                return playlist

            }
            return undefined
        })
}

export const fetchTracksFromSlug = (slug: string) => {

    return fetchPlaylistFromSlug(slug).then(res => {
        let tracks: IMedia[] = []
        if (res && res.tracks) {
            tracks = normalizeTracks(res.tracks)
        }
        return tracks

    })
}


export const fetchEbookFromSlug = (slug: string) => {
    let processSlug = trimSlug(slug)
    return fetch(`/page-data/${ac_strings.slug_ebook}/${processSlug}/page-data.json`)
        .then(res => res.json())
        .then(res => {
            if (res.result && res.result && res.result.pageContext) {
                const ebook: IEbook = res.result.pageContext.ebook

                return ebook

            }
            return undefined
        })
}

export const fetchLatestEbooks = () => {
    return fetch(`/page-data/${ac_strings.slug_ebook}/page-data.json`)
        .then(res => res.json())
        .then(res => {
            if (res.result && res.result && res.result && res.result.data.ac) {
                const ebooks: IEbook[] = res.result.data.ac.ebooks
                return ebooks

            }
            return undefined
        })
}

export const fetchLatestPlaylists = () => {
    return fetch(`/page-data/${ac_strings.slug_playlist}/page-data.json`)
        .then(res => res.json())
        .then(res => {
            if (res.result && res.result && res.result.data.ac.playlists) {
                const playlists: IPlaylist[] = res.result.data.ac.playlists
                return playlists

            }
            return undefined
        })
}


export const fetchTopicFromSlug = (slug: string) => {
    let processSlug = trimSlug(slug)
    return fetch(`/page-data/${ac_strings.slug_topic}/${processSlug}/page-data.json`)
        .then(res => res.json())
        .then(res => {
            if (res.result && res.result && res.result.pageContext) {
                const topicContext = res.result.pageContext
                const topicNav: ITopicNavItem = {
                    id: topicContext.id,
                    name: topicContext.title,
                    to: processSlug
                }

                return topicNav

            }
            return undefined
        })
}

export const fetchOneLocalPostFromSlug = (slug: string) => {
    let processSlug = trimSlug(slug)
    return fetch(`/page-data/${processSlug}/page-data.json`)
        .then(res => res.json())
        .then(res => {
            if (res.result && res.result.data && res.result.pageContext && res.result.pageContext.normalized) {
                const updatePost = res.result.pageContext.normalized
                return updatePost
            }
            return undefined
        })
        .catch(error => {
            console.log(error)
            return undefined
        })
}

export const fetchPostsFromTopics = (topics: ITopic[]) => {

    return Promise.all(topics
        .map(t => {

            return fetchPostslistFromArchivePage(t.slug)
                .then(posts => {

                    if (posts) {

                        return ({
                            ...t,
                            posts
                        })
                    }
                }).catch(error => {
                    console.log(error)
                    return null

                })
        }))

        .then(res => {

            const toAdd: ITopicPostItems[] = []

            res.forEach(item => {
                if (item) {
                    toAdd.push(item)
                }

            })
            return toAdd
        })

}