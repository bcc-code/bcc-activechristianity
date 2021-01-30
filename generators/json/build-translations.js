
const axios = require(`axios`)
const fs = require('fs')
const path = require('path')
const stringify = require(`json-stringify-safe`)
const endpoints = require('../../src/strings/static/endpoints')

const translationStrings = async function() {
  console.log('Loading AC Translations')
  let envLocale = process.env.LOCALE
  if (!envLocale) throw new Error('Enviroment LOCALE does not seem to be set')

  axios({
    url: `${endpoints.slug_translation}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(({data})=>{
    if (data){
      const strings = {}
      data.forEach(string => {
        strings[string.key] = string[process.env.LOCALE] || string.en // en as fallback
      })
      saveFile('./src/strings/generated', `${envLocale}_ac_strings`, 'json', strings)
    }


  })

}

module.exports.translationStrings = translationStrings
const languageSites = async function() {

  const options = {
        url: `${endpoints.api_url}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({ query:`
        {
          sites {
            lang
            locale
            title
            url
          }
        }
      ` })
  }

  return axios(options)
  .then(res=>{
      const data = res.data.data.sites
      saveFile('./src/strings', 'languages', 'json',  data)
  })
}
function saveFile(folder, name, extension, data) {
  const filename = path.resolve(`${folder}/${name}.${extension}`)
  try {
    fs.writeFileSync(filename, stringify(data, null, 2))
  } catch(err) {
    console.error(`AC Translations could not save the file. Please make sure the folder structure is already in place.`, err)
  }

  console.log(`File ${filename} – saved`)
}
module.exports.saveFile=saveFile
module.exports.languageSites = languageSites