

import { IPostItem, IMedia, IResourceRef, } from '@/types'

import { getImage } from './imageHelpers'

import TS from '@/strings'
import h2p from 'html2plaintext'
export type linkTypes = "post" | "ac_essential" | "ac_media" | "ac_ebook" | "ac_media_category" | "external" | "other_internal"

export const fetchLocalPost = (posts: IResourceRef[]) => {
    return fetchLocalPostsFromSlugs(posts.map(item => item.slug))
}

export const fetchLocalPostsFromSlugs = (slugs: string[]) => {
    return Promise
        .all(slugs.map(item => fetchOneLocalPostsFromSlug(item)))
        .then(list => {
            const toReturn: IPostItem[] = []
            list.map(post => {
                if (post !== undefined) {
                    toReturn.push(post)
                }
            })
            return toReturn
        })
}

export const fetchOneLocalMediaFromSlug = (slug: string) => {
    return fetch(`/page-data/media/${slug}/page-data.json`)
        .then(res => res.json())
        .then(res => {
            if (res.result && res.result.data && res.result.data["media"]) {
                const updatePost = WPItemtoPostItem(res.result.data["media"])
                return updatePost
            }
            return undefined
        })
}

export const fetchOneLocalPostsFromSlug = (slug: string) => {
    return fetch(`/page-data/${slug}/page-data.json`)
        .then(res => res.json())
        .then(res => {
            if (res.result && res.result.data && res.result.data['wordpressPost']) {
                const updatePost = WPItemtoPostItem(res.result.data['wordpressPost'])
                return updatePost
            }
            return undefined
        })
}

export const WPItemtoPostItem = (post: IPost, isMedia: boolean = false) => {
    const { title, excerpt, date, authors, featured_media, slug, categories, ac_media_categories, tags, contributor_with, readingTime, wordpress_id, ac_media_url, mediaType, lyrics, vocals } = post

    const id = typeof wordpress_id === "number" ? wordpress_id.toString() : wordpress_id
    let contributors: ITaxonomy[] = []
    if (authors && authors.length > 0) {
        contributors = authors
    }
    if (lyrics && lyrics.length > 0) {
        contributors = contributors.concat(lyrics)
    }

    if (vocals && vocals.length > 0) {
        contributors = contributors.concat(vocals)
    }

    const postItem: IPostItem = {
        id,
        title,
        excerpt: h2p(excerpt),
        authors: contributors.map(item => ({ ...item, slug: `${TS.slug_ac_author}/${item.slug}` })),
        featured_media_url: getImage(title, '640x320', featured_media),
        slug: isMedia ? `/${TS.slug_ac_media}/${slug}` : `/${slug}`,
        categories: categories || ac_media_categories,
        tags,
        contributor_with,
        reading_time: readingTime ? readingTime : undefined,
        date: new Date(date),
        media: {
            path: slug,
            mediaType: mediaType ? mediaType.value : undefined
        },

    }

    const { media } = postItem
    if (media && audioMedia["audio-posts"][slug]) {
        const audioInfo = audioMedia["audio-posts"][slug]
        media["audio"] = {
            ...audioInfo.audio,
            playlist: audioInfo.playlist.title,
            playlistSlug: audioInfo.playlist.slug,
            type: "audio"
        }
    }

    if (media && audioMedia["podcast"][slug]) {
        const audioInfo = audioMedia["podcast"][slug]
        media["audio"] = {
            ...audioInfo,
            playlist: "Living the Gospel",
            playlistSlug: "podcast",
            type: "audio"
        }
    }

    if (media && ac_media_url) {
        media["video"] = {
            src: ac_media_url,
            title,
            type: "video"
        }
    }

    return postItem
}

export const WPItemtoPostWBookmark = (post: IMixTypePost, bookmarks: IResourceRef[]) => {

    const { wordpress_id } = post
    const id = typeof wordpress_id === "number" ? wordpress_id.toString() : wordpress_id
    const index = bookmarks.findIndex(item => item.id === id)

    const postItem = WPItemtoPostItem(post)
    postItem.bookmarked = index !== -1
    return postItem
}

export const getTracklistFromOnePodcastEpisode = (slug: string) => {
    const allTracks = getTracklistFromPodcast()
    let toAdd: IMedia[] = []
    const index = allTracks.findIndex(item => item.path && item.path?.indexOf(slug) > -1)

    if (index > -1) {

        toAdd = [...allTracks.slice(index), ...allTracks.slice(0, index)]
    }

    return toAdd
}

export const getTrackListFromPlaylist = (slug: string) => {
    if (slug === "podcast") {
        return getTracklistFromPodcast()
    } else {
        const strings = slug.split("/")

        const playlistSlug = strings[strings.length - 1]
        const playlist = audioMedia.playlists[playlistSlug]
        if (playlist) {
            const tracks: IMedia[] = playlist.map((track => {
                return ({
                    path: `${TS.slug_ac_media}/${slug}`,
                    audio: track
                })
            }))

            return tracks
        } else return []
    }
}

export const getTracklistFromPodcast = () => {
    const tracks: IMedia[] = Object.keys(audioMedia.podcast)
        .map((slug) => {
            return ({
                path: `${TS.slug_ac_media}/${slug}`,
                audio: audioMedia.podcast[slug]
            })
        })
    return tracks
}

export const getTracklistFromPlaylistSlug = (slug: string) => {
    let tracks: IMedia[] = []
    if (audioMedia.playlists && audioMedia.playlists[slug]) {
        tracks = audioMedia.playlists[slug].map((track => {
            return ({
                path: `${TS.slug_ac_media}/${slug}`,
                audio: track
            })
        }))
    }
    return tracks
}

export function initials(name: string) {
    let nameSet = name.indexOf(' ') > 0 || name.length < 2 ? name : name.slice(0, 2).split('').join(' ')
    let initials = nameSet.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
}


export function debounce(fn: Function, ms: number) {
    let timer: any
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}


export function chunkArray(myArray: ITaxonomy[], chunk_size: number) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        const myChunk = myArray.slice(index, index + chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}


export const getApi = (url: string) => {

    let type: linkTypes = "external"
    let dataKey: string = "wordpressPost"
    let trimmedUrl = url


    if (process.env.SITE_URL) {
        trimmedUrl = trimmedUrl.replace(process.env.SITE_URL, '');
    }

    if (url.startsWith("/")) {
        trimmedUrl = trimmedUrl.substring(1)
    }
    if (url.endsWith("/")) {
        trimmedUrl = trimmedUrl.substring(0, trimmedUrl.length - 1)
    }
    const splitted = trimmedUrl.split('/')
    const length = splitted.length

    if (length > 0) {
        if (trimmedUrl.startsWith('http')) {
            type = "external"
        } else if (length === 1) {
            type = "post"
        } else if (trimmedUrl.startsWith(TS.slug_ac_ebook)) {
            type = "ac_ebook"
            dataKey = "ebook"
        } else if (trimmedUrl.startsWith(TS.slug_ac_media_category)) {
            type = "ac_media_category"

        } else if (trimmedUrl.startsWith(TS.slug_ac_media)) {
            type = "ac_media"
            dataKey = "media"
        } else if (trimmedUrl.startsWith(TS.slug_ac_essential) && length === 2) {
            type = "ac_essential"
            dataKey = "parent"
        } else if (trimmedUrl.startsWith(TS.slug_ac_essential) && length === 2) {
            type = "ac_essential"
            dataKey = "post"
        } else {
            type = "other_internal"
        }

    } else {
        type = "post"
    }

    if (type !== "external") {

        const localData = `/page-data/${trimmedUrl}/page-data.json`

        trimmedUrl = localData
    } else {
        trimmedUrl = url
    }

    const result = {
        type,
        url: trimmedUrl,
        slug: url,
        dataKey
    }

    return result
}
