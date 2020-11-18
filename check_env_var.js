const core = [
    "TITLE",
    "API_HOST",
    "API_URL",
    "SITE_URL",
  
    "LANG",
    "LANG_CODE",
    "LOCALE",
    "PODCAST_PLAYLIST_SLUG",
    "ALGOLIA_APP_ID",
    "ALGOLIA_SEARCH_KEY",
    "ALGOLIA_ADMIN_KEY",
    "ENABLE_ALGOLIA",

    "READ_POSTS_FILTER_ID",
    "LISTEN_POSTS_FILTER_ID",
    "WATCH_POSTS_FILTER_ID",

    "FORMAT_GROUP_ID",
    "TYPE_GROUP_ID",
    "EDIFICATION_FILTER_ID",
    "TESTIMONY_FILTER_ID",
    "QUESTION_FILTER_ID",
    "COMMENTARY_FILTER_ID",
    "MESSAGE_FILTER_ID",
    "SONG_FILTER_ID",
    "INTERVIEW_FILTER_ID",
    "ANIMATION_FILTER_ID",
    "PLAYLIST_PAGE_ID",
    "EXPLORE_PAGE_ID",
    "GLOSSARY_PAGE_ID",
    "ABOUT_PAGE_ID",
    "SCRIPTURE_PAGE_ID",
    "USER_PAGE_ID",
    "DESKTOP_NAV_slug",
    "SIDE__NAV_slug"
]
const english=[
    "BIBLE_VERSION",
    "PODCAST_PLAYLIST_SLUG",
    "PODCAST_PAGE_ID",
    "PODCAST_FILTER_ID",
    "POCAST_INTRO_POST_ID"
    
]

module.exports = function (){
    const missing = []
    core.forEach(item=>{
        if (!process.env[item]){
            missing.push(item)
        }
    })

    if (process.env.LANG_CODE==="en"){
        english.forEach(item=>{
            if (!process.env[item]){
                missing.push(item)
            }
        })
    }

    if (missing.length>0){
        const missing_vars=missing.join(", ")
        throw new Error(`Missing these enviroment variable(s): ${missing_vars}`)
    } else {
        console.log('Checked all enviroment variables')
    }
}
