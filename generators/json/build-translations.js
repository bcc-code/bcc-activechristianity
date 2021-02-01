
const axios = require(`axios`)
const fs = require('fs')
const path = require('path')
const stringify = require(`json-stringify-safe`)
const endpoints = require('../../src/strings/static/endpoints')
const {menusItems,userMenuItems,slug_user} = require('../../src/strings/static/menu')
const translationStrings = async function() {
  console.log('Loading AC Translations')
  let envLocale = process.env.LANG_CODE
  if (!envLocale) throw new Error('Enviroment LOCALE does not seem to be set')

  console.log(`getting strings for${envLocale}`)
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
        strings[string.key] = string[envLocale] || string.en // en as fallback
      })
      saveFile('./src/strings/generated', `${process.env.LOCALE}_ac_strings`, 'json', strings)
    }


  })

}

module.exports.translationStrings = translationStrings

const getMenus = () =>{
  const menus = {}

  const desktopMenuOptions = {
    all: ["read", "listen", "watch", "explore"],
    podcast_only: ["read", "podcast", "watch", "explore"],
    other: ["read", "watch", "explore", "about"]
}
  const mobileMenuOptions = {
    all: ["explore", "read", "listen", "watch"],
    podcast_only: ["read", "podcast", "watch", "explore"],
    other: ["explore", "read", "watch", "topic"]
}

const listenSectionKey = process.env.LISTEN_SECTION

  const getDesktopMenu = () => {
      

      const menu = listenSectionKey && desktopMenuOptions[listenSectionKey] ? desktopMenuOptions[listenSectionKey] : desktopMenuOptions.other
      const items= menu.map(item => menusItems[item]);
      menus['desktop']=items
  }
  
  const getMobileMenu = () => {
  
      const menu = listenSectionKey && mobileMenuOptions[listenSectionKey] ?mobileMenuOptions[listenSectionKey] : mobileMenuOptions.other
      const items = [...menu].map(item => ({...menusItems[item],iconName:iconNameMapNav[item]}))
      menus['mobile']={
        loggedIn:[...menu,"my-content"].map(item => ({...menusItems[item],iconName:iconNameMapNav[item]})),
        default:["home",...menu].map(item => ({...menusItems[item],iconName:iconNameMapNav[item]}))
      }
      return items
  }

  const getSideMenu =()=>{
      const items =["about", "contact"].map(item => menusItems[item]);
      menus['side']=items
  }

  const getSideResourceMenu = ()=>{
      const sideResourceMenu= listenSectionKey && mobileMenuOptions[listenSectionKey] ?mobileMenuOptions[listenSectionKey] : mobileMenuOptions.other

      if (process.env.GLOSSARY === "true") {
        sideResourceMenu.push(menusItems.glossary)
      }

      const items =sideResourceMenu.map(item => menusItems[item]);
      menus['sideResource']=items
  }
  getDesktopMenu();
  getMobileMenu();
  getSideMenu();
  getSideResourceMenu();
  return menus
}

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
  const menus=getMenus()
  
  return axios(options)
  .then(res=>{
      const data = res.data.data.sites
      menus["languages"]=data
      menus["menusItems"]=menusItems
      menus["userMenuItems"]=userMenuItems
      menus["slugUser"]=slug_user
      menus["slugUser"]=slug_user
      saveFile('./src/strings/generated', 'menus', 'json',  menus)
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


const iconNameMapNav = {
  'home': 'HomeIcon',
  'explore': 'ExploreIcon',
  'listen': 'HeadsetIcon',
  'podcast': 'HeadsetIcon',
  'read': 'DescriptionIcon',
  'watch': 'PlayCircleOutlineIcon',
  'my-content': 'BookmarksIcon',
  'topic': 'LocalOfferIcon'
}