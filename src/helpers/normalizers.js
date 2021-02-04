const ac_strings = require('../strings/ac_strings.js')
const {languages} = require('../strings/generated/menus.json')
const  endpoints = require('../strings/static/endpoints')

const  { groupAll: topicGroupAll, formatsIds, typeIds } = require('../strings/static/topic-ids')
const BaseUrl = endpoints.dummy_image_api

function stringToImage(str, size, bg, fc){
    const IN = initials(str)
    const BG = bg || intToRGB(hashCode(str))
    const FC = fc || invertHex(BG)
  
    return `${BaseUrl}/${size}/${BG}/${FC}&text=${IN}`
  }

  
function getImage(title, size, image) {

    let toReturn = {
      id: "",
      src: "",
      alt: "",
      srcset: "",
      dataUri: "",
      sizes: "",
      size: {
        width: 0,
        height: 0,
      },
      colors: [[0]],
      created_at: '',
      updated_at: ''
    }
    if (image) {
      return image
    } else {
      toReturn.src = stringToImage(title, size, '384156', 'F1AD2C')
      return toReturn
    }
  
  
  }
  
const normalizeAvailableLanguages = (langs, showAllLanguages) => {
    let translatedLinks = []
    languages.forEach(item => {
        const find = langs.find(l => l.lang === item.locale)
        if (find) {
            translatedLinks.push({ to: item.to + find.slug, name: item.lang })
        } else if (showAllLanguages) {
            translatedLinks.push({ to: item.to, name: item.name })
        }
    })

    translatedLinks = translatedLinks.sort((a, b) => {
        return (a.name < b.name ? -1 : 1)
    })
    return translatedLinks
}


const authorMap = {
    "wr": ac_strings.author,
    "vo": ac_strings.vocals,
    "ly": ac_strings.lyrics,
    "sp": ac_strings.speaker,
    "co": ac_strings.with,
    "ho": ac_strings.hosts

}
const normalizeAuthors = (authors) => {
    const sortedAuthors = {}
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

const normalizeTracks = (tracks) => {

    const toReturn = tracks.map(track => {

        const src = track.url.startsWith('http') ? track.url : `${endpoints.api_host}${track.url}`

        const toAdd = (
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

const filterTopics = (props) => {
    const { topics, returnSlugs } = props
    console.log(topics)
    const allTopics= []
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


const transformTopicsRes = (topics) => {
    const types = []
    const filteredTopics = []
    const format = []
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

const secondesToMinutes = (seconds) => `${Math.round(seconds / 60)} ${ac_strings.mins}`
const normalizePostRes = (post) => {

    const { id, authors, title, excerpt, image, slug, readtime, track, topics, published, meta, glossary, views, likes,acId } = post

    const { filteredTopics, types, format } = transformTopicsRes(topics)

    const readingTimeMinutes = secondesToMinutes(readtime)
    const postItem = {
        id,
        acId,
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

const processRecommendationContext = (data) => {
    const { featuredPosts, popularPosts, latestPosts } = data

    const featured = featuredPosts.map(p => normalizePostRes(p))
    const popular = popularPosts.map(p => normalizePostRes(p))
    const latest = latestPosts.slice(0, 6).map(p => normalizePostRes(p))


    return ({
        featured,
        popular,
        latest
    })

}

const getRandomArray = (pickFromArray, length) => {
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

module.exports = {
    normalizePostRes,
    processRecommendationContext,
    filterTopics,
    normalizeAvailableLanguages,
    getRandomArray
}