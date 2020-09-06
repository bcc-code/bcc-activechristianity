import { IPostRes, IPostItem, IAuthor, IAuthorRes, ITranslations, INavItem, IEbook, ITopic, IPlaylist, ITrackRes, IMedia } from '@/types'
import h2p from 'html2plaintext'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
import languages from '@/strings/languages.json'
import { getImage } from '@/helpers/imageHelpers'
import { title } from '@/strings/podcastProperties'

export function trimSlug(slug: string) {
    const regex = /^[/]*/gm
    let updatedTo = slug.replace(regex, '');
    return updatedTo
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

export function initials(name: string) {
    let nameSet = name.indexOf(' ') > 0 || name.length < 2 ? name : name.slice(0, 2).split('').join(' ')
    let initials = nameSet.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
}



export const normalizeAvailableLanguages = (langs: ITranslations[], showAllLanguages: boolean) => {
    let translatedLinks: INavItem[] = []
    languages.forEach(item => {
        const find = langs.find(l => l.lang === item.locale)
        if (find) {
            translatedLinks.push({ to: item.url + find.slug, name: item.lang })
        } else if (showAllLanguages) {
            translatedLinks.push({ to: item.url, name: item.lang })
        }
    })

    translatedLinks = translatedLinks.sort((a, b) => {
        return (a.name < b.name ? -1 : 1)
    })
    return translatedLinks
}

export const normalizeAuthors = (authors: IAuthorRes[]) => {
    const sortedAuthors: { [key: string]: IAuthor[] } = {}
    authors.forEach((a) => {

        const key = a.pivot && typeof a.pivot.as === "string" ? a.pivot.as : TS.by
        const toAdd = { name: a.name, to: a.slug, as: key }

        if (sortedAuthors[key]) {
            sortedAuthors[key].push(toAdd)
        } else {
            sortedAuthors[key] = [toAdd]
        }
    })

    const toReturn = Object.keys(sortedAuthors).map(as => {

        return ({ as, authors: sortedAuthors[as] })
    })

    return toReturn
}

export const normalizeTracks = (tracks: ITrackRes[]) => {
    const toReturn = tracks.map(track => {
        const normalized = track.post.authors ? normalizeAuthors(track.post.authors) : undefined
        const trackPostAuthor = normalized && normalized[0] ? normalized[0].authors.join(" ") : undefined
        const toAdd: IMedia = (
            {
                path: track.post.slug,
                audio: {
                    duration: track.duration,
                    src: `${process.env.API_HOST}${track.url}`,
                    title: track.title,
                    type: "audio",
                    article: {
                        title: track.post.title,
                        url: track.post.slug,

                    },
                    contributor: trackPostAuthor
                },

            }
        )

        return toAdd
    })

    return toReturn
}
export const transformTopicsRes = (topics: ITopic[]) => {
    const types: INavItem[] = []
    const filteredTopics: INavItem[] = []
    const format: INavItem[] = []
    topics.forEach((t) => {
        const toAdd = { id: t.id, name: t.name, to: `${t.slug}` }
        if (t.group.name === 'Type') {
            types.push(toAdd)

        } else if (t.group.name === 'Format') {
            format.push(toAdd)
        } else {
            toAdd.to = `${TS.slug_topic}/${t.slug}`
            filteredTopics.push(toAdd)
        }
    })
    return ({ types, filteredTopics, format })
}

export const sortTopicsByGroups = (topics: ITopic[]) => {
    const sortedTags: {
        [key: string]: {
            info: INavItem
            topics: INavItem[]
        }
    } = {}

    topics.forEach((t) => {
        const toAdd = { id: t.id, name: t.name, to: `${TS.slug_topic}/${t.slug}` }
        if (t.group.name !== 'Type' && t.group.name !== 'Format') {
        }
        if (sortedTags[t.group.name]) {

            sortedTags[t.group.name].topics.push(toAdd)
        } else {
            sortedTags[t.group.name] =
            {
                info: { name: t.group.name, to: t.group.slug },
                topics: [toAdd]
            }

        }

    })
    return sortedTags
}


export const ebookResToPost = (ebook: IEbook) => {
    const { id, authors, title, excerpt, image, slug, topics } = ebook


    const post: IPostItem = {
        id,
        title,
        excerpt: h2p(excerpt),
        authors: normalizeAuthors(authors),
        image: getImage(title, "640x320", image),
        slug,
        topics: [],
        types: [],
        date: new Date(),
        format: [],
        media: {
            path: slug,
        }
    }

    return post
}

export const playlistToPost = (playlist: IPlaylist): IPostItem => {
    const { title, slug, image, excerpt } = playlist
    return (
        {
            id: '',
            title,
            slug: `${ac_strings.slug_playlist}/${slug}`,
            image: getImage(title, "640x320", image),
            excerpt,
            date: new Date(),
            media: {
                path: '',
            }

        }
    )
}

export const normalizePostRes = (post: IPostRes) => {
    const { id, authors, title, excerpt, image, slug, readtime, track, topics, created_at, meta, glossary } = post

    const { filteredTopics, types, format } = transformTopicsRes(topics)

    const readingTimeMinutes = Math.round(readtime / 60);

    const postItem: IPostItem = {
        id,
        title,
        excerpt: h2p(excerpt),
        authors: normalizeAuthors(authors),
        image: getImage(title, "640x320", image),
        slug,
        topics: filteredTopics,
        types,
        format,
        reading_time: { text: `${readingTimeMinutes} mins read`, minutes: readingTimeMinutes },
        date: new Date(created_at),
        media: {
            path: slug,
        },
        glossary

    }

    const { media } = postItem
    if (track) {
        media["audio"] = {
            src: `${process.env.API_HOST}${track.url}`,
            title: track.title,
            type: "audio",
            article: {
                title: track.post.title,
                url: track.post.slug
            }
        }
    }

    if (meta && meta.url) {
        media["video"] = {
            src: meta.url,
            title: title,
            type: "video"
        }
    }

    return postItem
}


export function chunkArray(myArray: INavItem[], chunk_size: number) {
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