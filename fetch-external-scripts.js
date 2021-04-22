const fs = require('fs')
const https = require('https');
const path = require('path')



/*     hotjar:{
        url:"https://static.hotjar.com/c/hotjar-1076896.js?sv=7",
        fileName:"hotjar.js"
    }, */

const list = {
    facebook: {
        url:"https://connect.facebook.net/en_US/fbevents.js",
        fileName:"fbevents.js"
    },
    refTagger:{
        url:"https://api.reftagger.com/v2/RefTagger.js",
        fileName:"RefTagger.js"
    },
    analytics:{
        url:"https://www.google-analytics.com/analytics.js",
        fileName:"analytics.js"
    },
    adGrantConversion:{
        url:"https://www.googletagmanager.com/gtag/js?id=AW-929434073",
        fileName:"adword-adgrant-conversion.js"
    },
    adwordRemarketing:{
        url:"https://www.googletagmanager.com/gtag/js?id=AW-853531513",
        fileName:"adword-remarketing.js"
    },
    clicky:{
        url:"https://static.getclicky.com/js",
        fileName:"clicky.js"
    }
}

module.exports.scripts = list
module.exports.fetchScripts = function() {
    Object.keys(list).forEach((key)=>{
        const src = list[key] 

        const fileName = path.resolve(`static/scripts/${src.fileName}`) 
        const file = fs.createWriteStream(fileName);
        https.get(src.url,response => {
            console.log(`Wrote file: ${fileName}`)
            response.pipe(file);
          })
    })
}

