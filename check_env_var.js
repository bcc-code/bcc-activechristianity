const core = [
    "TITLE",
    "SITE_URL",
    "URL",
    "LANG",
    "LANG_CODE",
    "LOCALE",
    "ALGOLIA_APP_ID",
    "ALGOLIA_SEARCH_KEY",
    "ALGOLIA_ADMIN_KEY",
    "ENABLE_ALGOLIA",
    "GTM_TAG",
    "ABOUT_PAGE_ID",
    "USER_PAGE_ID"
]

const english=[
    "BIBLE_VERSION",
    "PODCAST_PLAYLIST_SLUG",
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
