const _ = require('lodash')
const path = require('path')
const listTemplate = 'src/templates/archive/post-list.tsx'
const ac_strings=require('../src/strings/ac_strings.js')

const allBooksQuery =  `
{
    ac {

        bible {
            old {
                chapters
                id
                no
                total
                name
            }
            new {
                chapters
                id
                no
                total
                name
            }
        }
    }
}
`

const perChapterQuery =  (bookId, ch) => `
    {
        ac {
            biblePosts(id:"${bookId}", ch:${ch}){
                slug
              }
        }
    }

`

module.exports = function generateTaxonomies(actions, graphql) {
    const { createPage } = actions
  
    return graphql(allBooksQuery).then(async (result) => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }
      const {bible} = result.data.ac
      const page = {
        title:ac_strings.scripture,
        slug:ac_strings.slug_scripture,
        label:"scripture"
      }
      const chaptersCounts = []
      console.log("Generating scriptures")
      if (bible.new && bible.old){
        const allChapters=[...bible.old,...bible.new]
        for (let i = 0; i < allChapters.length; i++) {
          console.log(`Generating scripture ${i}/${allChapters.length}`)
          const book=allChapters[i]
          console.log(book)
          for (let j=0;j<book.chapters.length;j++){
            const chapter=book.chapters[j]
            const chapterQuery = perChapterQuery(book.id,chapter)
            const chapterRes = await graphql(chapterQuery).catch(err=>console.log(err))
            const pagePath=`${page.slug}/${book.id}/${chapter}`
            console.log(pagePath)
            if(chapterRes.data.ac.biblePosts){
              const posts=chapterRes.data.ac.biblePosts.map(i=>i.slug)
              chaptersCounts.push({
                ...book,
                count:posts.length
              })
/*               createPage({
                path:pagePath,
                component:path.resolve(listTemplate),
                context: {
                  posts,
                  title:`${book.name} ${chapter}`,
                  slug:pagePath,
                  breadcrumb:[{name:page.title,to:page.slug}]
                }
              }) */
            } else {
              console.log(chapterRes.data.ac)
            }

          }
        }

        const mostPopular=chaptersCounts.sort((a,b)=>b.count-a.count).slice(0,10)

        createPage({
          path: `${page.slug}`,
          component: path.resolve(`./src/templates/page/${page.label}.tsx`),
          context:{
            bible,
            mostPopular,
            title:page.title
          },
        })

        createPage({
          path: `${page.slug}-result`,
          component: path.resolve(`./src/templates/page/${page.label}-result.tsx`),
          context:{
            bible,
            title:page.title
          },
        })
      }
    })
  }