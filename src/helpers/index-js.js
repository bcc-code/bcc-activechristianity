
function trimSlug(slug) {
    const regex = /^[/]*/gm
    let updatedTo = slug.replace(regex, '');
    return updatedTo
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function initials(name) {
    let nameSet = name.indexOf(' ') > 0 || name.length < 2 ? name : name.slice(0, 2).split('').join(' ')
    let initials = nameSet.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
}

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  
  function intToRGB(i) {
    var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
  
    return "00000".substring(0, 6 - c.length) + c;
  }
  
  function invertHex(hex){
    return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
  }

  function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

//https://www.sitepoint.com/get-url-parameters-with-javascript/
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url.split('?')[1]
  // we'll store the parameters here
  var obj= {};

  // if query string exists
  if (queryString) {

      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];

      // split our query string into its component parts
      var arr = queryString.split('&');
      for (var i = 0; i < arr.length; i++) {
          // separate the keys and the values
          var a = arr[i].split('=');
          // set parameter name and value (use 'true' if empty)
          var paramName = a[0];
          var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
            
          // (optional) keep case consistent
          paramName = paramName.toLowerCase();
          if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

          // if the paramName ends with square brackets, e.g. colors[] or colors[2]
          if (paramName.match(/\[(\d+)?\]$/)) {

              // create key if it doesn't exist
              var key = paramName.replace(/\[(\d+)?\]/, '');
              if (!obj[key]) obj[key] = [];

              // if it's an indexed array e.g. colors[2]
              if (paramName.match(/\[\d+\]$/)) {
                  // get the index value and add the entry at the appropriate position
                  var index = /\[(\d+)\]/.exec(paramName)[1];
                  obj[key][index] = paramValue;
              } else {
                  // otherwise add the value to the end of the array
                  obj[key].push(paramValue);
              }
          } else {
              // we're dealing with a string
              if (!obj[paramName]) {
                  // if it doesn't exist, create property
                  obj[paramName] = paramValue;
              } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                  // if property does exist and it's a string, convert it to an array
                  obj[paramName] = [obj[paramName]];
                  obj[paramName].push(paramValue);
              } else {
                  // otherwise add the property
                  obj[paramName].push(paramValue);
              }
          }
      }
  }

  return obj;
}

function formatAMPM(date) {

  var hours = date.getHours()

  var minutes = date.getMinutes();
  let minutesString = ''
  var ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  var strTime = hours + ':' + minutesString + ' ' + ampm;
  return strTime;
}

const dateToString = (date) => `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`
const timeToString = (date) => `${formatAMPM(date)} (${Intl.DateTimeFormat().resolvedOptions().timeZone}), ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
const dateToISODateString=(date=>{
    const updated_at_IOS = new Date(date)
    return updated_at_IOS.toISOString().split('T')[0]
})
module.exports = {
        trimSlug,
        validateEmail,
        initials,
        invertHex,
        intToRGB,
        hashCode,
        debounce,
        dateToString,
        timeToString,
        dateToISODateString,
        getAllUrlParams
}