import axios from 'axios'
/* https://github.com/kennethjiang/js-file-download/blob/master/file-download.js */

export const API_URL = `${process.env.API_URL}`;

function saveFile(data: any, filename: string, mime?: string) {
  /* Only download on browser */
  if (typeof window !== 'undefined') {
    var blob = new Blob([data], {type: mime || 'application/octet-stream'});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);

        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
  }
}

export default function(url: string, filename: string) {
  return axios({
    url,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    if (response.headers['content-disposition']) {
        let disposition = response.headers['content-disposition']
        disposition = disposition.substring(disposition.indexOf("filename=") + 10, disposition.length - 1)
        if (disposition) filename = disposition
    }
    saveFile(response.data, filename, response.headers['content-type'])
    return true
  }).catch((error) => {
    return false
  })
}