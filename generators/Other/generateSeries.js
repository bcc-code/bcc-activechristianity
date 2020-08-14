const _ = require('lodash')
const path = require('path')
const TS = require('../../src/strings/index')
const menu = require('../../src/strings/menu')
const templateOverview = 'src/templates/resource-sections/series-overview.tsx'
const templateChild= 'src/templates/single-resource/series-child.tsx'

const queryParent=`{
    allWordpressWpAcEssential (
        filter:{
            wordpress_parent:{
                eq:0
            }
        }
    ){
        edges {
            node {
                wordpress_id
                slug
                title
                excerpt
                content
            }
        }
    }
}

`

const queryChild=(parent)=>`{
    allWordpressWpAcEssential (filter:{
        wordpress_parent:{
            eq:${parent}
        }
    },
    sort:{
        order:ASC,
        fields:menu_order
      }) {
        edges {
            node {
                title
                slug
                wordpress_id
                wordpress_parent
            }
        }
    }
}

`

module.exports = function generateKeyTeachingParents(actions, graphql) {
    const { createPage } = actions

    const allSeries = {}
    
    return graphql(queryParent).then((result) => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()))
            return Promise.reject(result.errors)
        }

        const parents = (result.data.allWordpressWpAcEssential && result.data.allWordpressWpAcEssential.edges) || []

        const queue = parents.map(({ node: p}) => {
            /* createPage({
                path: `/${TS.slug_ac_essential}/${p.slug}`,
                component: path.resolve(templateParent),
                context: {
                    slug: p.slug,
                    wordpressId:p.wordpress_id
                },
            }) */


            allSeries[p.slug]= {
                wordpressId:p.wordpress_id,
                title:p.title,
                excerpt:p.excerpt
            }

            return graphql(queryChild(p.wordpress_id)).then(rc=>{
                if (rc.errors) {
                    rc.errors.forEach(e => console.error(e.toString()))
                    return Promise.reject(rc.errors)
                }

                const children = rc.data.allWordpressWpAcEssential && rc.data.allWordpressWpAcEssential.edges
                allSeries[p.slug]['path'] = `/${TS.slug_ac_essential}/${p.slug}`

                
                createPage({
                    path: `/${TS.slug_ac_essential}/${p.slug}`,
                    component: path.resolve(templateChild),
                    context: {
                        slug: children[0].node.slug,
                        wordpressParent: children[0].node.wordpress_parent,
                        wordpressId: children[0].node.wordpress_id,
                        breadcrumb:[menu.all.explore,menu.all.series]
                    },
                })

                _.each(children, ({node:c}) => {
                    createPage({
                        path: `/${TS.slug_ac_essential}/${p.slug}/${c.slug}`,
                        component: path.resolve(templateChild),
                        context: {
                            slug: c.slug,
                            wordpressParent: c.wordpress_parent,
                            wordpressId: c.wordpress_id,
                            breadcrumb:[menu.all.explore,menu.all.series]
                        },
                    })
                })
            })
        })

        return Promise.all(queue)
    }).then(()=>{
        createPage({
            path: menu.all.series.to,
            component: path.resolve(templateOverview),
            context: {
                title:menu.all.series.name,
                slug: menu.all.series.slug,
                series:Object.keys(allSeries).map(key=>(allSeries[key])),
                breadcrumb:[menu.all.explore,menu.all.series]
            }
        })
    })
}