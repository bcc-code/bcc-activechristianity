
const podcastProps = require('../../src/strings/static/podcastProperties.js')

const eposideNoteFooter = '<p class=\"p1\">Website: https://activechristianity.org/<br />\nInstagram: https://www.instagram.com/activechristianity/<br />\nFacebook: https://www.facebook.com/activechristianity/</p>\n'
const mainFeedOptions = {
  query: `
  {
    site {
      siteMetadata {
        title
        description
        siteUrl
        site_url: siteUrl
      }
    }
  }
`,
feeds: [
  {
    serialize: (props) => {
      const { query: { site, allAcNodePost } } = props
      const posts=[]
      allAcNodePost.edges.map(edge => {
        const {node}=edge
        const {
          acId,
          slug,
          excerpt,
          content,
          image,
          updated_at,
          title,
          authors
        }=node
        if(acId!=="dummy-content"){
          posts.push({
            title,
            description:excerpt,
            url: site.siteMetadata.siteUrl + slug,
            guid:acId,
            date:updated_at,
            image_url: image.src,
            author: (authors ? authors.map(a => a.name).join(', ')  : ''),
            custom_elements: [
              {'content:encoded': content}],
        
          })
        }
      })
      return posts
    },
    query: `
      {
        allAcNodePost {
          edges {
            node {
              acId
              title
              slug
              excerpt
              content
              image {
                src
              }
              updated_at
            }
          }
        }
      }
    `,
    output: "/feed.xml",
    title: `${process.env.TITLE} RSS`,
  },
],
}
const podcastAdditionalOptions = {
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
}
module.exports = {
    mainFeedOptions,
    podcastAdditionalOptions,
      podcastFeed:{
        ...podcastAdditionalOptions,
        query:`{
          allAcNodePost(filter: {topics: {elemMatch: {id: {eq: "108205"}}}}) {
              edges {
                node {
                  acId
                  title
                  slug
                  excerpt
                  content
                  image {
                    src
                  }
                  
                  updated_at
                  track {
                    url
                    duration
                  }
                }
              }
            }
          }`
      ,
      serialize:(props)=>{
        const { query: { site, allAcNodePost } } = props
        return allAcNodePost.edges.map(({
            node: {
                excerpt,
                title,
                slug,
                updated_at,
                track
            }
        })=>{

            return ({
              title,
              url: site.siteMetadata.siteUrl + slug,
              date:updated_at,
              description:excerpt,
              custom_elements: [
                  {'itunes:summary': excerpt},
                  {'itunes:duration': track.duration},
                  {'itunes:explicit':'no'},
                  {
                    enclosure:{
                      _attr: {
                          url: track.url,
                          type:'audio/mpeg',
                          length:'1' 
                        }
                  }},
                  {'media:description':excerpt},
                  {'content:encoded': eposideNoteFooter},
                  {'itunes:image': {
                    _attr: {
                      href: podcastProps.artworkSrc
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