function redirectToAfrica() {
    let key = 'redirect-to-africa-v'
    let tz = new Date().getTimezoneOffset()/-60
    
    let ms7days = 1000*60*60*24*7;

    try {
        if (tz >= -1 && tz < 4) {
            if (window.localStorage) {
                let t = window.localStorage.getItem(key)
                if (t && Date.now() - ms7days < t) {
                    return
                }
                window.localStorage.setItem(key, Date.now().toString())
            }

            fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=3db9e24596c4468cb84fdb1aa86ac2fc")
                .then(function(response) { return response.json()})
                .then(function(result) {
                    if (result && result.continent) {
                        if (result.continent.code == 'AF') {
                            if (window.confirm('Are you interested in viewing our African website?')) {
                                location.href = "https://activechristianity.africa/"
                            } 
                        } else if (window.localStorage) {
                            window.localStorage.setItem(key, (Date.now() + ms7days*12).toString())
                        }
                    }
                })
                .catch(error => console.log('error', error));
        }
    } catch(e) {
        if (window.localStorage) {
            window.localStorage.removeItem(key)
        }
    }
}