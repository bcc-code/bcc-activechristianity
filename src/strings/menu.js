const TS = require('./index')

const readChildren ={
    "Edification":{
        name: "Edification",
        to: `${TS.slug_category}/edification`,
    },
    "Testimonies":{
        name: "Testimonies",
        to: `${TS.slug_category}/testimonies`,
    },
    "Questions":{
        "name": "Questions",
        "to": "questions-answers"
    },
    "Commentary":{
        name: "Commentary",
        to: `${TS.slug_category}/commentary`,
    },
    "E-books":{
        name: "E-books",
        to: `${TS.slug_ac_ebook}`,
    },
    "Series":{
        "name": "Series",
        "to": "series"
    },
}

const userChildren = {
    history: {
        to: 'history',
        name: 'History'
    },
    bookmarked:{
        to: 'bookmarked',
        name: 'Bookmarked'
    },
    followed:{
        to: 'followed',
        name: 'Followed'
    },
    ebooks:{
        to: 'ebooks',
        name: TS["downloaded_e-books"]
    },
    password:{
        to: 'password',
        name: TS.change_password
    },
    delete:{
        to: 'delete',
        name: TS.delete_account
    }
}

const listenChildren = {
    'Audio Playlists':{
        name: 'Audio Playlists',
        to: `${TS.slug_ac_media_category}/audio-playlists`
    },
    'Podcast':{
        name: 'Podcast',
        to: `${TS.slug_ac_media_category}/podcast`
    },
    'Audio posts':{
        name: 'Audio posts',
        to: `audio-posts`
    }, 
    'Songs':{
        name: 'Songs',
        to: `${TS.slug_ac_media_category}/songs`
    }
}

const watchChildren = {
    "Songs":{
        name: "Songs",
        to: `${TS.slug_ac_media_category}/songs`,
    },
    "Messages":{
        name: "Messages",
        to: `${TS.slug_ac_media_category}/messages`,
    },
    "Video":{
        name: "Video",
        to: `${TS.slug_ac_media_category}/video`,
    },
    "Bible words explained":{
        name: "Bible words explained",
        to: `${TS.slug_ac_media_category}/bible-words-explained`,
    }
}
const all = {
    user:{
        to: 'user',
        name: "User"
    },
    home:{
        "name": "Home",
        "to": "/"
    },
    topic: {
        "name": "Topics",
        "to": "topic"
    },
    question:{
        "name": "Questions",
        "to": "questions-answers"
    },
    series:{
        "name": "Series",
        "to": "series"
    },
    scripture:{
        "name": "Scripture",
        "to": "scripture"
    },
    glossary:{
        "name": "Glossary",
        "to": "glossary"
    },
    read:{
        "name": "Read",
        "to": "read",
        "children":Object.keys(readChildren).map(key=>readChildren[key])
    },
    readLatest:{
        name:'Latest Articles',
        to:`read/latest`,
    },
    watch:{
        "name": "Watch",
        "to": "watch",
        "children":Object.keys(watchChildren).map(key=>watchChildren[key])
    },
    watchLatest:{
        "name":'Latest Videos',
        "to":`watch/latest`    
    },
    listen:{
        "name": "Listen",
        "to": "listen",
        "children":Object.keys(listenChildren).map(key=>listenChildren[key])
    },
    listenLatest:{
        "name":'Latest Audio',
        "to":`listen/latest`
    },
    resource:{
        name: 'Resources',
        to: `resource`
    },
    resourceLatest:{
        name:'Latest Resource',
        to: 'latest'
    },about:{
        name: 'About Us',
        to: `${TS.slug_about}`
    },
    contact:{
        name: 'Contact',
        to: `${TS.slug_contact}`
    },
    explore:{
        name: 'Explore',
        to:'explore'
    }
}

const userLinks = [
    
    {
        to: all.user.to,
        name: "Profile"
    },
    ...Object.keys(userChildren).map((key)=>{
        const item=userChildren[key];
        return ({name:item.name, to:`${all.user.to}/${item.to}`})
    })
]


module.exports.all = all
module.exports.userChildren=userChildren
module.exports.watch=watchChildren
module.exports.read=readChildren
module.exports.listen=listenChildren
module.exports.userLinks=userLinks
module.exports.topMenuDesktop = [

    all.listen,
    all.read,
    all.watch,
    all.topic,
    all.explore
]

module.exports.bottomMenuMobile = [
    all.home,
    all.explore,
    all.listen,
    all.read,
    all.watch,
]

module.exports.sideMenu = [
    all.resource,
    all.about,
    all.contact
]


module.exports.resourceMenu = {

    "resource": [
        all.topic,
        all.question,
        all.series,
        all.scripture,
        all.glossary,
        all.about
    ],
    sections: [
        {
            "name": "Listen",
            "to": "/listen"
        },
        {
            "name": "Watch",
            "to": "/watch"
        },
        {
            "name": "Read",
            "to": "/read"
        }
    ],
    "read": all.read.children,
    "watch": all.watch.children,
    "listen": all.listen.children,
    "links": [
        {
            name: 'All Resource',
            to: `/resource`
        },
        {
            name: 'About Us',
            to: `${TS.slug_about}`
        },
        {
            name: 'Contact',
            to: `${TS.slug_contact}`
        }

    ]
}