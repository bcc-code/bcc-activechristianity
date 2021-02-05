
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
module.exports = {
        trimSlug,
        validateEmail,
        initials,
        invertHex,
        intToRGB,
        hashCode,
        debounce
}