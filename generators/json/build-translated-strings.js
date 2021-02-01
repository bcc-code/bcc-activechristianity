
const axios = require(`axios`)
const fs = require('fs')
const path = require('path')
const stringify = require(`json-stringify-safe`)
const endpoints = require('../../src/strings/static/endpoints')

const translationStrings = async function() {
  console.log('Loading AC Translations')
  let envLocale = process.env.LANG_CODE
  if (!envLocale) throw new Error('Enviroment LOCALE does not seem to be set')

  console.log(`getting strings for${envLocale}`)
  await axios({
    url: `${endpoints.slug_translation}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(({data})=>{
    if (data){
      const strings = {}
      data.forEach(string => {
        strings[string.key] = string[envLocale] || string.en // en as fallback
      })
      saveFile('./src/strings/generated', `${process.env.LOCALE}_ac_strings`, 'json', strings)
    }


  })

}

module.exports.translationStrings = translationStrings

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



