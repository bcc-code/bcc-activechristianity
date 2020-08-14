const _C = require('lodash/collection')
const {google} = require('googleapis');

/* BUILDER */

module.exports = async function generateRedirects(actions) {
  try {
    const {createRedirect} = actions
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
            const fromPath = entry[0]
            const toPath = entry[1]
            if (!toPath||!fromPath) {
                console.log(`To or from url at row ${index+1} is missing`)
            } else {
              result.push({from:fromPath,to:toPath})
            }
        })
            
        }
      }

      let count = 0
      _C.each(result,({from,to})=>{
        const fromPath = from.replace(/\/$/, "");
          const toPath = to.replace(/\/$/, "");
        if (fromPath && fromPath !== "/" && toPath) {
          count++;
          createRedirect({
            fromPath,
            toPath,
            isPermanent: true
          })
        }
      })
      console.log(`created ${count} redirects from Google Sheet`)
      return result
    });
  } catch (e) {
    console.log(e)
    console.log('\nGatsby Source Api Server response error:\n', e.response.data && e.response.data.errors)
  }    
}