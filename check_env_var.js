const core = [
    "TITLE",
    "API_URL",
    "SITE_URL",
/*     "URL", */
    "MEDIA_CDN_URL",
    "LANG",
    "LANG_CODE",
    "LOCALE",
    "MAIN_NAV_ID",
    "TOP_NAV_ID",
    "ALGOLIA_APP_ID",
    "ALGOLIA_SEARCH_KEY",
    "ALGOLIA_ADMIN_KEY",
    "ENABLE_ALGOLIA"
]

const english=[
    "BIBLE_VERSION"
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
