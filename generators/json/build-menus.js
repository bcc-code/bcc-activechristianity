
const axios = require(`axios`)
const endpoints = require('../../src/strings/static/endpoints')
const {saveFile} = require('./build-translated-strings')

const getMenus = () =>{
  const {menusItems} = require('../../src/strings/static/menu')
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
    const {menusItems,userMenuItems,slug_user} = require('../../src/strings/static/menu')
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