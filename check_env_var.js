const core = [
    "TITLE",
    "SITE_URL",
    "LANG",
    "LANG_CODE",
    "LOCALE",
    "ALGOLIA_APP_ID",
    "ALGOLIA_SEARCH_KEY",
    "ALGOLIA_ADMIN_KEY",
    "LISTEN_SECTION",
    "ADD_TRACKING_CODE"
]

if(process.env.ADD_TRACKING_CODE==="true"){
    core.push("GA_ID","CLICKY_ID")
}

module.exports = function (){
    const missing = []
    core.forEach(item=>{
        if(process["GTM_TAG"]){
            throw new Error('Please remove GTM Tag')
        }
        if (!process.env[item]){
            missing.push(item)
        }
    })

    if (missing.length>0){
        const missing_vars=missing.join(", ")
        throw new Error(`Missing these enviroment variable(s): ${missing_vars}`)
    } else {
        console.log('Checked all enviroment variables')
    }
}
