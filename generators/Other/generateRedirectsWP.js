const _C = require('lodash/collection')
const path = require('path')
const csv = require('csv-parser')
const fs = require('fs')
const {google} = require('googleapis');

/* SETUP */
const CSVDATA = 'wordpress-seo-redirects.csv'

const getRedirects=async function() {
  try {
      const sheets = google.sheets({
        version: 'v4',
        auth: 'AIzaSyASDGn4oZErww-RsW6kBPnQz7tCB6x3Fpk'
      });
  
      let envLocale = process.env.LOCALE
          if (!envLocale) throw new Error('Enviroment LOCALE does not seem to be set')

      return await sheets.spreadsheets.values.get({
        spreadsheetId: '1SAyeiuuPiUI_B_UP7Qo7omJ03cw_KkOYahXHSlRyIRM',
        range: `${envLocale}!A:Z`,
      }, (err, res) => {
        const result=[]
        if (err) {
          console.error('Could not fetch translations from Google Sheets');
          throw err;
        }
         const rows = res.data.values
        if (rows.length === 0) {
          
        } else {
          const headers = rows.shift()
          if (!headers[0] || headers[0].toLowerCase()!=='from'){
              throw new Error('To url missing')
          } else {
            const data=rows
            
            data.forEach((entry,index)=>{
              const toPath = entry[0]
              const fromPath = entry[1]
              if (!toPath||!fromPath) {
                  console.log(`To or from url at row ${index+1} is missing`)
              } else {
                result.push({from:fromPath,to:toPath})
                  // fileData += `${encodeURI(toUrl)} ${encodeURI(fromUrl)}\n` 
              }
          })
              
          }
        }
        
        return result
      });
    } catch (e) {
      console.log(e)
      console.log('\nGatsby Source Api Server response error:\n', e.response.data && e.response.data.errors)
    }    
}

/* BUILDER */

module.exports = function generateRedirects(actions) {
  const { createRedirect } = actions

  return new Promise((resolve) => {

    const results = [];

    fs.createReadStream(path.resolve(CSVDATA))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // [Origin,Target,Type,Format]
        let count = 0

        _C.each(results, ({ Origin, Target, Type, Format }) => {
          if (Type*1 === 301) {
            const fromPath = Origin.replace(/\/$/, "");
            const toPath = Target.replace(/\/$/, "");

            if (fromPath && fromPath !== "/" && toPath && toPath !== "/") {
              count++;
              createRedirect({
                fromPath,
                toPath,
                isPermanent: true
              })
            }
          }
        })

        console.log(`Created ${count} WP redirects`)
        resolve(count)
      });

  })
}