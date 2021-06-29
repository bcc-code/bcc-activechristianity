const _ = require('lodash')
const path = require('path')
const template = 'src/templates/single-resource/quote-wallpaper.tsx'
const overviewTemplate = 'src/templates/page/wallpapers.tsx'
const ac_strings=require('../src/strings/ac_strings.js')
const sortQuotes = require('./color-sort')
const getQuoteQuery = `
  {
    ac {
        quotes {
            author {
              name
              slug
              id
            }
            id
            content
            source
            images {
                size {
                  width
                  height
                }
                src
                srcset
                dataUri
                colors
            }
            topics {
                name
                slug
                id
            }
      }
 
    }
  }
`


/* BUILDER */

function rgbToHsl(c) {
  var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
      h = s = 0; // achromatic
  } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }
  return new Array(h * 360, s * 100, l * 100);
}

function sortArrayByHsl(rgbArr) {

  var sortedRgbArr = rgbArr.map(function (c, i) {
    const color = c.image.colors!==null?c.image.colors[0]:[225,225,225]
      // Convert to HSL and keep track of original indices
      return { color: rgbToHsl(color), index: i };
  }).sort(function (c1, c2) {
      // Sort by hue
      return c1.color[0] - c2.color[0];
  }).map(function (data) {
      // Retrieve original RGB color
      return rgbArr[data.index];
  }).reverse();

  return sortedRgbArr
}


module.exports = function generateTaxonomies(actions, graphql) {
  const { createPage } = actions

  return graphql(getQuoteQuery)
  .then((result) => {
    console.log("Generating backgrounds and quotes")
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    

    if (result.data.ac && result.data.ac.quotes){
        const allQuotes= result.data.ac.quotes
                .filter(q=>q.images && q.images[0])
                .map(q=>{
                  const image=q.images && q.images[0]
                  const color=image.colors && image.colors[0]
                  const size = image.size.height/image.size.width===1?'square':'landscape'
                  return ({
                    ...q,
                    color,
                    size,
                    image:q.images[0],
                  })
                })
        const sortedByColorQuotes=sortArrayByHsl(allQuotes)
        const wallpapersPage = {
          title:'Bible verse and quote wallpapers',
          slug:'wallpaper'
        }


        const navParentItem={name: wallpapersPage.title,to: wallpapersPage.slug}
        
        const sortedQuotes = sortQuotes(allQuotes)

        const homepageContext={
          pagePath:wallpapersPage.slug,
          pageType:"wallpaper",
          byColors:sortedQuotes.byColors.map(item=>({name:item.name,slug:item.name,color:item.leadColor})),
          byFeaturedAuthors:sortedQuotes.byFeaturedAuthors.map(item=>({name:item.name,slug:item.slug, nrOfQuotes:item.nrOfQuotes})),
          byTopics: sortedQuotes.byTopics.map(item=>({name:item.name,slug:item.slug, nrOfQuotes:item.nrOfQuotes})),
          quotes:sortedByColorQuotes.map(item=>{

            return ({
              id:item.id,
              color:item.color,
              size:item.size
            })
        }),
        }

        createPage({
          path:wallpapersPage.slug,
          component:path.resolve(overviewTemplate),
          context: {
            pagePath:wallpapersPage.slug,
            isHomePage:true,
            ...homepageContext,
            ...wallpapersPage
          }
      })
      sortedQuotes.byColors.forEach(color=>{
        const pagePath=`${ wallpapersPage.slug}/${color.name}`
        const {quotes, ...rest}=color
        createPage({
          path:pagePath,
          component:path.resolve(overviewTemplate),
          context: {
              pagePath,
              ...rest,
                title:color.name,
                tag:wallpapersPage.title, 
                breadcrumb:[navParentItem, {name:color.name,to:pagePath}],
                quotes:quotes.map(item=>{

                  return ({
                    id:item.id,
                    color:item.color,
                    size:item.size
                  })
              })
            }

          })
        })
      
        sortedQuotes.byTopics.forEach(topic=>{
          const pagePath=`${ wallpapersPage.slug}/${topic.slug}`
          const {quotes, ...rest}=topic
         
          createPage({
            path:pagePath,
            component:path.resolve(overviewTemplate),
            context: {
                  ...rest,
                  pagePath,
                  title:topic.name,
                  tag:wallpapersPage.title, 
                  breadcrumb:[navParentItem, {name:topic.name,to:pagePath}],
                  quotes:quotes.map(item=>{

                    return ({
                      id:item.id,
                      color:item.color,
                      size:item.size
                    })
                })
              }
            })
          })
      
          sortedQuotes.byFeaturedAuthors.forEach(author=>{
            const pagePath=`${ wallpapersPage.slug}/${author.slug}`
            const {quotes, ...rest}=author
            createPage({
              path:pagePath,
              component:path.resolve(overviewTemplate),
              context: {
                    pagePath,
                    title:author.name,
                    tag:wallpapersPage.title, 
                    ...rest,
                    breadcrumb:[navParentItem, {name:author.name,to:pagePath}],
                    quotes:quotes.map(item=>{

                      return ({
                        id:item.id,
                        color:item.color,
                        size:item.size
                      })
                  })
                }
              })
            })
      allQuotes.forEach(quote=>{
        const pagePath=`${ wallpapersPage.slug}/${quote.id}`
        createPage({
            path:pagePath,
            component:path.resolve(template),
            context: {
              pagePath,
              pageType:"wallpaper",
              quote,
              breadcrumb:[navParentItem],
              id:quote.id
            }
        })
    })
    }

  })
  .catch(err=>{
    console.log(getQuoteQuery)
    console.log(err)
  })
}