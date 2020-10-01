import { IPostItem, INavItem, IEbook, IPlaylist, ITopicNavItem } from '@/types'
import { trimSlug, normalizePostRes } from './index'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'



export const fetchLocalPostsFromSlugs = (slugs: string[]) => {
    const filteredSlugs = slugs.filter(s => typeof s === "string" && s.trim() !== "")
    return Promise
        .all(filteredSlugs.map(item => fetchOneLocalPostsFromSlug(item)))
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
    let processSlug = trimSlug(slug)

    return fetch(`/page-data/${processSlug}/page-data.json`)
        .then(res => res.json())
        .then(res => {
            if (res.result && res.result && res.result.pageContext.posts) {
                const posts: string[] = res.result.pageContext.posts

                return fetchLocalPostsFromSlugs(posts)

            }
            return undefined
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
    return fetch(`/page-data/${TS.slug_topic}/${processSlug}/page-data.json`)
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

export const fetchOneLocalPostsFromSlug = (slug: string) => {
    let processSlug = trimSlug(slug)
    return fetch(`/page-data/${processSlug}/page-data.json`)
        .then(res => res.json())
        .then(res => {
            if (res.result && res.result.data && res.result.data['acNodePost']) {
                const updatePost = normalizePostRes(res.result.data['acNodePost'])
                return updatePost
            }
            return undefined
        })
        .catch(error => {
            console.log(error)
            return undefined
        })
}

