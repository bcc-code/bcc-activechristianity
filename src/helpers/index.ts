import { IPostRes, IPostItem, IAuthor, IAuthorRes, ITranslations, INavItem, IEbook, ITopicRes, IPlaylist, ITrackRes, IMedia, ITopicNavItem, ITopic } from '@/types'

import ac_strings from '@/strings/ac_strings.js'
import languages from '@/strings/languages.json'
import { getImage } from '@/helpers/imageHelpers'
import endpoints from '@/strings/endpoints'
import topicIds from '@/strings/topic-ids'
import { groupAll as topicGroupAll, formatsIds, typeIds } from '@/strings/topic-ids'


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

export function SmoothVerticalScrolling(e: any, time: number, where: string) {
    var eTop = e.getBoundingClientRect().top;
    var eAmt = eTop / 100;
    var curTime = 0;
    while (curTime <= time) {
        window.setTimeout(SVS_B, curTime, eAmt, where);
        curTime += time / 100;
    }
}

export function SVS_B(eAmt: number, where: string) {
    if (where == "center" || where == "")
        window.scrollBy(0, eAmt / 2);
    if (where == "top")
        window.scrollBy(0, eAmt);
}

export function SmoothHorizontalScrolling(e: any, time: number, amount: number, start: number) {
    var eAmt = amount / 100;
    var curTime = 0;
    var scrollCounter = 0;
    while (curTime <= time) {
        window.setTimeout(SHS_B, curTime, e, scrollCounter, eAmt, start);
        curTime += time / 100;
        scrollCounter++;
    }
}

export function SHS_B(e: any, sc: number, eAmt: number, start: number) {
    e.scrollLeft = (eAmt * sc) + start;
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


const authorMap: { [key: string]: string } = {
    "wr": ac_strings.author,
    "vo": ac_strings.vocals,
    "ly": ac_strings.lyrics,
    "sp": ac_strings.speaker,
    "co": ac_strings.with,
    "ho": ac_strings.hosts

}
export const normalizeAuthors = (authors: IAuthorRes[]) => {
    const sortedAuthors: { [key: string]: IAuthor[] } = {}
    authors.forEach((a) => {

        const key = a.pivot && typeof a.pivot.as === "string" ? authorMap[a.pivot.as] ? authorMap[a.pivot.as] : ac_strings.by : ac_strings.by
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

        const src = track.url.startsWith('http') ? track.url : `${endpoints.api_host}${track.url}`

        const toAdd: IMedia = (
            {
                path: '',
                audio: {
                    duration: secondesToMinutes(track.duration),
                    src,
                    title: track.title,
                    type: "audio",

                    playlists: track.playlists,

                },

            }
        )

        if (track.post) {
            toAdd.path = track.post.slug
            if (toAdd.audio) {

                const normalized = track.post && track.post.authors ? normalizeAuthors(track.post.authors) : undefined
                const trackPostAuthor = normalized && normalized[0] ? normalized[0].authors.join(" ") : undefined
                toAdd.audio.article = {
                    title: track.post.title,
                    url: track.post.slug,
                }
                toAdd.audio.contributor = trackPostAuthor
            }


        }

        return toAdd
    })

    return toReturn
}

export const transformTopicsRes = (topics: ITopicRes[]) => {
    const types: ITopicNavItem[] = []
    const filteredTopics: ITopicNavItem[] = []
    const format: ITopicNavItem[] = []
    topics.forEach((t) => {

        if (t.noOfPosts !== 0) {
            const toAdd = { id: t.id, name: t.name, to: `${t.slug}` }
            if (t.group && `${t.group.id}` === `${topicGroupAll.type}`) {
                types.push(toAdd)

            } else if (t.group && `${t.group.id}` === `${topicGroupAll.format}`) {
                format.push(toAdd)
            } else {
                toAdd.to = `${ac_strings.slug_topic}/${t.slug}`
                filteredTopics.push(toAdd)
            }
        }
    })
    return ({ types, filteredTopics, format })
}

export const sortTopicsByGroups = (topics: ITopicRes[]) => {
    const sortedTags: {
        [key: string]: {
            info: INavItem
            topics: ITopicNavItem[]
        }
    } = {}
    topics.forEach((t) => {

        if (t.noOfPosts > 0) {
            const toAdd = { id: t.id, name: `${t.name} (${t.noOfPosts})`, to: `${ac_strings.slug_topic}/${t.slug}` }
            if (t.group) {
                if (t.group.id !== topicGroupAll.type && t.group.id !== topicGroupAll.format) {
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
            } else {
                sortedTags['Unknown'] =
                {
                    info: { name: '', to: '' },
                    topics: [toAdd]
                }
            }
        }


    })

    return sortedTags
}

type ITopicMixed = ITopic | ITopicRes
interface IFilteredTopics {
    topics: ITopicMixed[][]
    returnSlugs: boolean
}
export const filterTopics = (props: IFilteredTopics) => {
    const { topics, returnSlugs } = props
    const allTopics: ITopicMixed[] = []
    topics.forEach(t => {
        if (t) {
            allTopics.push(...t)
        }
    })

    const filteredTopics = allTopics.filter(item => {
        return !formatsIds[item.id] && !typeIds[item.id] && item.noOfPosts !== 0
    })

    if (returnSlugs === true) {
        return [...new Set([...filteredTopics.map(item => item.slug)])]
    } else {
        return filteredTopics
    }

}


export const ebookResToPost = (ebook: IEbook) => {
    const { id, authors, title, excerpt, image, slug, topics } = ebook


    const post: IPostItem = {
        id,
        title,
        excerpt,
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
    const { title, slug, image, excerpt, id } = playlist
    const post: IPostItem = {
        id,
        title,
        slug: `${ac_strings.slug_playlist}/${slug}`,
        image: getImage(title, "640x320", image),
        excerpt,
        date: new Date(),
        media: {
            path: '',
        },


    }
    return post
}

export const getRandomArray = (pickFromArray: any[], length: number) => {
    if (pickFromArray.length > 0) {
        const returnArrayLength = length > pickFromArray.length ? pickFromArray.length : length

        let randName = [];
        let processArray = [...pickFromArray]
        do {
            randName[randName.length] = processArray.splice(
                Math.floor(Math.random() * processArray.length)
                , 1)[0];
        } while (randName.length < returnArrayLength);

        return randName
    } else {
        return []
    }

}
const secondesToMinutes = (seconds: number) => `${Math.round(seconds / 60)} ${ac_strings.mins}`

export const normalizePostRes = (post: IPostRes) => {

    const { id, authors, title, excerpt, image, slug, readtime, track, topics, published, meta, glossary, views, likes } = post

    const { filteredTopics, types, format } = transformTopicsRes(topics)

    const readingTimeMinutes = secondesToMinutes(readtime)
    const postItem: IPostItem = {
        id,
        title,
        excerpt,
        authors: normalizeAuthors(authors),
        image: getImage(title, "640x320", image),
        slug,
        topics: filteredTopics.sort((a, b) => a.name.length - b.name.length),
        types,
        format,
        duration: {
            read: readingTimeMinutes
        },
        reading_time: { text: readingTimeMinutes, minutes: 0 },
        date: new Date(published),
        media: {
            path: slug,
        },
        glossary,//Math.round(num * 100) / 100
        views: views > 999 ? `${(views / 1000).toFixed(1)}K` : `${views}`,
        likes

    }

    const { media } = postItem
    if (track) {
        if (postItem.duration) {
            postItem.duration["listen"] = secondesToMinutes(track.duration)
        } else {
            postItem.duration = { listen: secondesToMinutes(track.duration) }
        }
        media["audio"] = {
            src: track.url.startsWith('http') ? track.url : `${endpoints.api_host}${track.url}`,
            title: track.title,
            type: "audio",
            article: {
                title: track.post.title,
                url: track.post.slug
            },
            playlists: track.playlists
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


export function chunkArray(myArray: INavItem[] | ITopicNavItem[], chunk_size: number) {
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

function formatAMPM(date: Date) {

    var hours = date.getHours()

    var minutes = date.getMinutes();
    let minutesString = ''
    var ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    var strTime = hours + ':' + minutesString + ' ' + ampm;
    return strTime;
}

export const dateToString = (date: Date) => `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`
export const timeToString = (date: Date) => `${formatAMPM(date)} (${Intl.DateTimeFormat().resolvedOptions().timeZone}), ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`

export const processRecommendationContext = (data: {
    featuredPosts: IPostRes[],
    popularPosts: IPostRes[],
    latestPosts: IPostRes[]
}) => {
    const { featuredPosts, popularPosts, latestPosts } = data

    const featured = featuredPosts.map(p => normalizePostRes(p))
    const popular = popularPosts.map(p => normalizePostRes(p))
    const latest = latestPosts.map(p => normalizePostRes(p))


    return ({
        featured,
        popular,
        latest
    })

}

export const getRandomFeatured = (data: {
    featured: IPostItem[],
    latest: IPostItem[],
    popular: IPostItem[]
}) => {
    const { latest, featured, popular } = data
    let toCheck = [...new Set([...popular, ...latest.slice(6)])]
    const fixedPopularLatest = getRandomArray(toCheck, 6)
    toCheck = [...new Set([...featured, ...fixedPopularLatest])]
    const featuredMixed = getRandomArray(toCheck.slice(0, 6), 6)
    return featuredMixed
}