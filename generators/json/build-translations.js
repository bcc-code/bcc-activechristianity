const {google} = require('googleapis');
const axios = require(`axios`)
const fs = require('fs')
const path = require('path')
const stringify = require(`json-stringify-safe`)

const translationStrings =  async function() {
  console.log('Loading AC Translations')
  try {
    const sheets = google.sheets({
      version: 'v4',
      auth: 'AIzaSyASDGn4oZErww-RsW6kBPnQz7tCB6x3Fpk'
    });

    return await sheets.spreadsheets.values.get({
      spreadsheetId: '1waay0ca8OdtmJFyMtKzOsje_gocnWwfI2ZUFh5Bg90U',
      range: 'A:Z',
    }, (err, res) => {
      let langs = 0

      if (err) {
        console.error('Could not fetch translations from Google Sheets');
        throw err;
      }
 
      const rows = res.data.values
      if (rows.length === 0) {
        console.log('No data found.');
      } else {
        const headers = rows[0]
        if (headers[0] !== 'key') throw new Error('Translation file seems mulformed')

        const langsObj = {}
        const langsArr = []
        const slugTranslatedUrl={}
        let localeIndex = -1
        let envLocale = process.env.LOCALE
        if (!envLocale) throw new Error('Enviroment LOCALE does not seem to be set')

        headers.forEach((lang, index) => {
          if (lang && lang !== 'key') {
            console.log(`Found ${lang} language`)
            langs++
            langsObj[lang] = {}
            langsArr[index] = langsObj[lang]
            if (lang === envLocale) {
              localeIndex = index
            }
          }
        })

        rows.forEach(cols => {
          let key = cols[0]

          if (localeIndex > -1) {
            if (!cols[localeIndex]) console.log(`string ${key} is not translated`)
              
            langsArr[localeIndex][key] = cols[localeIndex]? cols[localeIndex]:''
            // langsArr[localeIndex][key] = cols[localeIndex] || defaultValue
          } else langsArr.forEach((obj, index) => {
            if (obj) {
              if (!cols[index]) console.log(`string ${key} is not translated`)
              obj[key] = cols[index]?cols[index]:''
              // obj[key] = cols[index] || defaultValue 
            }
          })

          // get slug translated urls
          const match=key.match(new RegExp('slug_','gi'))
          if (Array.isArray(match) && match.length>0){
            slugTranslatedUrl[cols[localeIndex]]=cols.map((c,i)=>{
              const locale_key = headers[i]
              const langSlugKey=locale_slug_map[locale_key]
              return {
                lang:langSlugKey,
                url:cols[i]}
            }).slice(1)

          }
          
        })
/*         console.log(slugTranslatedUrl) */

        if (localeIndex > -1) {
          saveFile('./src/strings', `${envLocale}_ac_strings`, 'json', langsObj[envLocale])
          saveFile('./src/strings',`translated_slugs`,'json',slugTranslatedUrl)
        } else for (let locale in langsObj) {
          saveFile('./src/strings', locale, 'json', langsObj[locale])
        }

      }
      console.log(`Done ${langs} translations loaded`);
      
      return true
    });
  } catch (e) {
    console.log('\nGatsby Source Api Server response error:\n', e.response.data && e.response.data.errors)
  }
}

module.exports.translationStrings = translationStrings
const languageSites = async function() {

  const options = {
      url: `${process.env.API_URL}`,
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

const locale_slug_map={
  "en_US":"en",
  "es_ES":"es",
  "fr_FR":"fr",
  "fi":"fi",
  "hu_HU":"hu",
  "it_IT":"it",
  "nb_NO":"nb",
  "pl_PL":"pl",
  "pt_PT":"pt-pt",
  "ro_RO":"ro",
  "ru_RU":"ru",
  "sv_SE":"sv",
  "de_DE":"de",
  "nl_NL":"nl",
  "da_DK":"da"
}