
const podcastProps = require('../../src/strings/static/podcastProperties.js')

const eposideNoteFooter = '<p class=\"p1\">Website: https://activechristianity.org/<br />\nInstagram: https://www.instagram.com/activechristianity/<br />\nFacebook: https://www.facebook.com/activechristianity/</p>\n'
const  siteUrl=process.env.SITE_URL
module.exports = {
    setup:() => ({
        title:podcastProps.title,
        description:podcastProps.description,
        language:'en-US',
        url:process.env.SITE_URL,
        feed_url: `${process.env.SITE_URL}/podcast_feed.xml`,
        site_url: process.env.SITE_URL,
        copyright:'© 2019 ActiveChristianity',
        custom_namespaces: {
          itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
          media:'http://search.yahoo.com/mrss/'
        },
        custom_elements: [
          { 'itunes:explicit': 'clean' },
          {'itunes:subtitle': podcastProps.subtitle},
          {'itunes:author': podcastProps.author},
          {'itunes:summary': podcastProps.description},
          {'itunes:owner': [
            {'itunes:name': podcastProps.title},
            {'itunes:email': podcastProps.email}
          ]},
          {'itunes:image': {
            _attr: {
              href: podcastProps.artworkSrc
            }
          }},
          {'itunes:category': [   
            {_attr: {
                text: podcastProps.ituneTopCatgory
                }
            },
            {'itunes:category': {
              _attr: {
                text: podcastProps.ituneChildCatgory
              }
            }}
          ]}
        ],
      }),
    siteFeed:{
        query: `{
          allSitePage(filter: {context: {pageType: {eq: "post"}}}){
            totalCount
            edges {
                node {
                  context {
                      normalized {
                        image {
            
                        src
                        }
                        title
                        excerpt
                        authors {
                            as 
                          authors {
                            name
                          }
                        }
                        topics {
                          name
                          to
                        }
                      }
                    
                  }
                }
            }
          }
        }`,
          serializer: (props) => {
            console.log(props)
            const { query: { allSitePage } }=props
            const posts = allSitePage.edges.map(({node})=>{
              const {slug, context, updated_at}=node
              const {title,excerpt,image,topics}=context.normalized

          return {
          title,
           description:excerpt,
          url: `${siteUrl}/${slug}`,
          guid:slug,
          date:updated_at,
          image_url: image.src,
    /*       author: (ac_authors ? ac_authors.map(a => a.name).join(', ')  : ''), */
          categories: topics.map(c => c.name),
          custom_elements: [
           {'content:encoded': excerpt},
           ],
          }
            })
            return Array.isArray(posts)?posts:[] 

          }        ,
        output: "/feed.xml",
        title: `${process.env.TITLE} RSS`,
      },
      podcastFeed:{
        query:`{
            podcastList: allWordpressWpAcMedia(filter: {ac_media_categories: {elemMatch: {slug: {eq: "podcast"}}}}) {
              edges {
                node {
                    content
                    title
                    slug
                    date
                    itunes_podcast_info {
                      description
                      episode_notes
                      duration
                      image{
                        source_url
                      }
                    }
                }
              }
            }
          }`
      ,
      serialize:({ query: { podcastList } })=>{
        const siteUrl = `${process.env.SITE_URL}`.replace(/\/$/, '')
        return podcastList.edges.map(({
            node: {
                content,
                title,
                slug,
                date,
                itunes_podcast_info:{description,episode_notes,duration,image}
            }
        })=>{
          const audioSrc = ''

            return ({
              title,
              url: `${siteUrl}/media/${slug}`,
              date,
              description,
              custom_elements: [
                  {'itunes:summary': description},
                  {'itunes:duration': duration},
                  {'itunes:explicit':'no'},
                  {
                    enclosure:{
                      _attr: {
                          url: audioSrc,
                          type:'audio/mpeg',
                          length:'1' 
                        }
                  }},
                  {'media:description':description},
                  {'content:encoded': episode_notes},
                  {'itunes:image': {
                    _attr: {
                      href: image?image:podcastProps.artworkSrc
                    }
                  }}
                ]
              
            })
        })
      },
      output: "/podcast_feed.xml",
      title: `Living The Gospel RSS`,
    }
}