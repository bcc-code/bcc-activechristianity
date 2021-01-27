const core = [
    "TITLE",
    "SITE_URL",
    "LANG",
    "LANG_CODE",
    "LOCALE",
    "ALGOLIA_APP_ID",
    "ALGOLIA_SEARCH_KEY",
    "ALGOLIA_ADMIN_KEY",
    "GA_ID",
    "CLICKY_ID",
    "LISTEN_SECTION"
]


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
