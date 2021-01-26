import * as React from "react"
import { useSelector } from "react-redux";
import { graphql } from "gatsby";

import MetaTag from '@/components/Meta'
import { getRandomArray } from '@/helpers'
import Image2To1 from '@/components/Images/Image2To1'
import Image1To1 from '@/components/Images/Image1to1Rounded'
// Type
import { IRootState } from '@/state/types'
import { IPostRes, ITopicPostItems, IPostItem, IImage } from '@/types'
import formats from '@/strings/topic-filters.json'
import Link from '@/components/CustomLink'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import { AuthorLink } from '@/components/PostElements'
import { normalizePostRes } from '@/helpers'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
// Helpers
import { HomeTop } from '@/layout-parts/Home/HomeBanners'


import ac_strings from '@/strings/ac_strings.js'
import bgImgBibleStudy from '@/images/demo-image/Take-up-your-cross.jpg'
import onlineServer16to9 from '@/images/landingPage/online-church.jpg'

const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path, data } = props
  const [editorsPickFormat, setEditorsPickFormat] = React.useState<"ed" | "so" | "po" | "audio" | "ani">("so")
  const [testimonies, setTestimonies] = React.useState<string>("victory-over-sin-testimony-collection")
  const {
    featuredPosts: featuredPosts,
    popularTopics: popularTopicsAll,
    popularPosts: popularPostsAll,
    latestPosts
  } = pageContext
  console.log(pageContext)
  console.log(data)

  const latestPostAsTopic = {
    id: '',
    name: ac_strings.latest,
    slug: ac_strings.slug_latest
  }

  const randomFeatured = getRandomArray(featuredPosts, featuredPosts.length)
  const seriesMaps: any = {}
  const playlistMaps: any = {}
  data.ac.series.map(item => {
    seriesMaps[item.slug] = item
  })

  data.ac.playlists.map(item => {
    playlistMaps[item.slug] = item
  })

  console.log(playlistMaps)
  const dataFormat = {
    featuredFormats: [
      {
        key: "ed",
        name: "Edification",
        slug: "/edification",
        id: "1",
        posts: latestPosts
      },
      {
        key: "ani",
        name: "Animation",
        slug: "/animation",
        id: "2",
        posts: latestPosts
      },
      {
        key: "po",
        name: "Podcast",
        slug: "/podcast",
        id: "1",
        posts: latestPosts
      }, {
        key: "so",
        name: "Songs",
        slug: "/songs",
        id: "1",
        posts: latestPosts
      },
      {
        key: "audio",
        name: "Topical Playlists",
        slug: "/playlist",
        id: "1",
        posts: latestPosts
      },
    ]
  }


  return (

    <div >
      <MetaTag
        path={path}
        title={`${ac_strings.site_title} - ${ac_strings.tagline}`}
        type="website"
        translatedUrls={[]}
        breadcrumb={[]}
      />
      <HomeTop
        label="Bible Study"
        bgImg={bgImgBibleStudy}
        title={"Take up your cross"}
        body="What does it mean for a disciple"
        cta={{
          text: 'Start now',
          path: '/preview?type=page&id=78'
        }}

      />
      <SectionWrapperSmall title="Featured Bible Studies" grey>

        <div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
          {bibleStudies.map((item) => {

            return (
              <BibleStudyItemCard
                {...item}
                label="Bible Study"
                start
              />
            )
          })}
        </div>
      </SectionWrapperSmall>
      {/*       <CardListPosts
        title={ac_strings.featured}
        posts={featuredPosts.map(item => normalizePostRes(item))}
      /> */}


      <div>
        <SectionWrapper title="Editor's pick">
          <div className="flex justify-center" style={{ paddingBottom: "26px", fontWeight: 700 }}>
            {dataFormat.featuredFormats.map(item => {
              return (
                <div
                  onClick={() => setEditorsPickFormat(item.key)}
                  style={{ color: "#828282", fontSize: "20px", marginLeft: "20px", marginRight: "20px" }}
                >
                  {item.name}
                </div>
              )
            })}
          </div>
          {editorsPickFormat === "ed" && (
            <FetchPostsFromSlugs
              layout="row"
              slugs={editorsPickEdification}
              render={({ posts }) => {
                return (
                  <div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
                    {posts.map(post => {
                      return (

                        <PostItemCard {...post} />
                      )
                    })}
                  </div>
                )
              }}
            />
          )}
          {
            editorsPickFormat === "so" && (
              <div className="mx-auto standard-max-w w-full grid grid-cols-5 gap-3">
                {songPlaylists.map(item => {
                  const playlist = playlistMaps[item]
                  return (
                    <BibleStudyItemCard
                      title={playlist.title}
                      slug={playlist.slug}
                      image={playlist.image}
                      label="Playlist"
                    />
                  )
                })}
              </div>
            )
          }

          {
            editorsPickFormat === "audio" && (
              <div className="mx-auto standard-max-w w-full grid grid-cols-5 gap-3">
                {topicalPlaylsits.map(item => {
                  const playlist = playlistMaps[item]
                  return (
                    <BibleStudyItemCard
                      title={playlist.title}
                      slug={playlist.slug}
                      image={playlist.image}
                      label="Playlist"
                    />
                  )
                })}
              </div>
            )
          }

          {
            editorsPickFormat === "po" && (
              <div className="mx-auto standard-max-w w-full grid grid-cols-5 gap-3">
                {podcastPlaylists.map(item => {
                  const playlist = playlistMaps[item]
                  return (
                    <BibleStudyItemCard
                      title={playlist.title}
                      slug={playlist.slug}
                      image={playlist.image}
                      label="Playlist"
                    />
                  )
                })}
              </div>
            )
          }

          {
            editorsPickFormat === "ani" && (
              <FetchPostsFromSlugs
                layout="row"
                slugs={animationPosts}
                render={({ posts }) => {
                  return (
                    <div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
                      {posts.map(post => {
                        return (

                          <PostItemCard {...post} />
                        )
                      })}
                    </div>
                  )
                }}
              />
            )
          }
          <div>
            { }
          </div>
          {/*        {articlesFromPillarsCollections.map(item => {
              const serie = seriesMaps[item]
              return (
                <BibleStudyItemCard
                  title={serie.title}
                  slug={serie.slug}
                  image={serie.image}
                  label="Collection"
                />
              )
            })}   <div className="flex justify-center" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
            <button className=" border-2 rounded border-d4slate-dark font-bold" style={{ padding: "12px 25px 12px 25px", fontSize: "21px" }}>View All Podcast</button>

          </div> */}
        </SectionWrapper>
        <HomeTop
          darkbg
          label="Online Meeting: Join us live this sunday"
          bgImg={onlineServer16to9}
          title={"Crucified with Christ"}
          body="Learn about a life in overcoming sin – in Jesus’ footsteps!"
          cta={{
            text: 'Sign up',
            path: '/preview?type=page&id=78'
          }}

        />
        <SectionWrapper title="Testimonies">
          <div className="flex justify-center" style={{ paddingBottom: "26px", fontWeight: 700 }}>
            {testimoniesCollections.map(item => {
              const serie = seriesMaps[item]
              return (
                <div
                  onClick={() => { setTestimonies(item) }}
                  style={{ color: "#828282", fontSize: "20px", marginLeft: "20px", marginRight: "20px" }}
                >
                  {serie.title.replace("- testimony collection", "")}
                </div>
              )
            })}
          </div>

          <FetchPostsFromSlugs
            layout="row"
            slugs={seriesMaps[testimonies].posts.slice(0, 4).map(i => i.slug)}
            render={({ posts }) => {
              return (
                <div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
                  {posts.map(post => {
                    return (

                      <PostItemCard {...post} />
                    )
                  })}
                </div>
              )
            }}
          />

          {/*       <PostItemCard {...item} />    <div className="flex justify-center" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
            <button className=" border-2 rounded border-d4slate-dark font-bold" style={{ padding: "12px 25px 12px 25px", fontSize: "21px" }}>View All Podcast</button>

          </div> */}
        </SectionWrapper>

        <SectionWrapperSmall title="Articles by Our Pillars" grey>

          <div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
            {articlesFromPillarsCollections.map(item => {
              const serie = seriesMaps[item]
              return (
                <BibleStudyItemCard
                  title={serie.title}
                  slug={serie.slug}
                  image={serie.image}
                  label="Collection"
                />
              )
            })}
          </div>
        </SectionWrapperSmall>

      </div>

      <div >
        <div className="standard-max-w px-4 flex flex-col justify-center" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
          <h2 className="text-center" style={{ fontSize: "42px", fontWeight: "bold", paddingBottom: "32px" }}>Latest</h2>
          <div>

          </div>
          <div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
            {latestPosts.slice(0, 4).map((itemRes) => {
              const item = normalizePostRes(itemRes)
              return (
                <PostItemCard {...item} />
              )
            })}
          </div>

        </div>
      </div>
      <div style={{ background: "#f4f4f4" }}>
        <div className="standard-max-w px-4 flex flex-col justify-center" style={{ paddingTop: "70px" }}>
          <h2 className="text-center" style={{ fontSize: "42px", fontWeight: "bold", paddingBottom: "32px" }}>Explore Topics</h2>
          <div>

          </div>
          <div className="mx-auto standard-max-w w-full">
            <div className=" grid grid-cols-6 gap-3">
              {popularTopicsAll.static.slice(0, 6).map(item => {
                return (
                  <div>
                    {item.image && <Image1To1 {...item.image} />}
                    <h3 style={{ fontSize: "20px" }}>
                      {item.name}
                    </h3>
                  </div>


                )
              })}
            </div>
            <div className="flex justify-center" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
              <button className=" border-2 rounded border-d4slate-dark font-bold" style={{ padding: "12px 25px 12px 25px", fontSize: "21px" }}>View All Podcast</button>

            </div>
          </div>

        </div>
      </div>

      <div className="bg-gray-300">
        <div className="standard-max-w" style={{ minHeight: "455px", paddingTop: "122px" }}>
          <div className="px-6 w-7/12">
            <h2 style={{ fontSize: "56px", fontWeight: "bold", paddingBottom: "51px" }}>Bookmark Posts, Follow Topics</h2>
            <button
              className="text-d4slate-dark"
              style={{ background: "#fff", padding: "16px 25px 16px 25px", borderRadius: "7px", fontSize: "18px" }}
            >
              Read More
          </button>
            <p style={{ paddingTop: "20px", paddingBottom: "51px" }} >Already have an account? Log in here</p>
          </div>
        </div>
      </div>
      <div className="mx-auto standard-max-w w-full" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
        <h2 className="text-center" style={{ fontSize: "42px", fontWeight: "bold", paddingBottom: "32px" }}>All Categories</h2>
        <div className=" grid grid-cols-4 gap-3">
          {Object.keys(formats.formatIds).map(item => {
            const format = formats.formatIds[item]
            return (
              <div className="rounded overflow-hidden shadow">
                {format.image && <Image1To1 {...format.image} className="rounded-t-lg" />}
                <h3 className="border-d4slate-dark font-bold text-center" style={{ padding: "12px 25px 12px 25px", fontSize: "21px" }}>
                  {format.name}
                </h3>
              </div>


            )
          })}
        </div>

      </div>
    </div>

  )
}

export default IndexPage

const SectionWrapper: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="standard-max-w px-4 flex flex-col justify-center" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
      <h2 className="text-center" style={{ fontSize: "42px", fontWeight: "bold", paddingBottom: "26px" }}>{title}</h2>
      {children}
    </div>
  )
}

const BibleStudyItemCard: React.FC<{ image: IImage, title: string, slug: string, excerpt?: string, start?: boolean, label: string, squareImge?: boolean }> = (item) => {
  return (
    <Link to={item.slug} className="flex flex-col shadow rounded-lg overflow-hidden">

      {item.label === "Playlist" ? <Image1To1
        className="rounded-t-lg"
        {...item.image}
      /> : <Image2To1
          className="rounded-t-lg"
          image={item.image}
        />}
      <div style={{ overflow: "hidden", padding: "25px 14px 14px 14px", backgroundColor: "#fff" }}>
        <div style={{ paddingBottom: "20px" }}>
          <div className="uppercase font-bold" style={{ fontSize: '12px', color: '#828282', paddingBottom: '5px' }}>{item.label}</div>
          <h3 className="leading-normal"
            style={{
              fontSize: "18px",
              paddingBottom: "18px",
              fontWeight: 800,
              display: "-webkit-box",
              textOverflow: 'ellipsis',
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}>
            {item.title}
          </h3>
          <span
            className="leading-normal"
            style={{
              fontSize: "14px",
              color: "#4F4F4F",
              WebkitLineClamp: 2,
              display: "-webkit-box",
              textOverflow: 'ellipsis',
              height: "42px",
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {item.excerpt}
          </span>
        </div>

        {item.start && (
          <button className="bg-ac-secondary rounded px-4 py-2 text-white">
            Start
          </button>
        )}

      </div>
    </Link>
  )
}

const PostItemCard: React.FC<IPostItem> = (item) => {
  return (
    <div className="flex flex-col shadow rounded-lg overflow-hidden">

      <Image2To1
        className="rounded-t-lg"
        image={item.image}
      />
      <div style={{ overflow: "hidden", padding: "25px 14px 14px 14px", backgroundColor: "#fff" }}>
        <div className="uppercase font-bold" style={{ fontSize: '12px', color: '#828282', paddingBottom: '5px' }}>{item.reading_time?.minutes ? item.reading_time?.minutes : '2 mins read'}</div>
        <div style={{ paddingBottom: "20px" }}>
          <h3 className="leading-normal"
            style={{
              fontSize: "18px",
              paddingBottom: "18px",
              fontWeight: 800,
              WebkitLineClamp: 3,
              display: "-webkit-box",
              textOverflow: 'ellipsis',
              height: "81px",
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}>
            {item.title}
          </h3>
          <span
            className="leading-normal"
            style={{
              fontSize: "14px",
              color: "#4F4F4F",
              WebkitLineClamp: 2,
              display: "-webkit-box",
              textOverflow: 'ellipsis',
              height: "42px",
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {item.excerpt}
          </span>

        </div>
        <div className="w-full flex justify-between items-center text-d4slate-dark" >
          <div style={{ fontSize: "12px" }}>
            {item.authors && (
              <AuthorLink
                authorGroups={item.authors}
              />
            )}
          </div>
          <Bookmark id={item.id} color="slate-dark" />
        </div>

      </div>
    </div>
  )
}

interface IHomeProps {
  path: string
  pageContext: {
    featuredPosts: IPostRes[]
    latestPosts: IPostRes[]
    popularPosts: {
      static: IPostRes[]
      dynamic: IPostRes[]
    }
    popularTopics: {
      static: ITopicPostItems[]
      dynamic: ITopicPostItems[]
    }
  }

}

export const CardListPosts: React.FC<{ posts: IPostItem[], title: string }> = ({ posts, title }) => {
  return (
    <SectionWrapperSmall title={title}>
      <div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
        {posts.map((item) => {

          return (
            <PostItemCard {...item} />
          )
        })}
      </div>

    </SectionWrapperSmall>
  )
}
export const SectionWrapperSmall: React.FC<{ title: string, grey?: boolean }> = ({ title, children, grey }) => {
  return (
    <div style={{ background: grey ? "#f4f4f4" : '#fff' }}>
      <div className="standard-max-w px-4 flex flex-col justify-center py-18">
        <h2 className="text-center font-bold text-4-7xl pb-8">{title}</h2>
        {children}
      </div>
    </div>
  )
}
const playlists = [
  {
    title: "Songs",
    playlists: [
      "a-new-start-songs",
      "fight-the-good-fight-songs",
      "praise-worship-songs",
      "do-not-worry-songs",
      "disciple-life-songs"
    ]
  },
  {
    title: "Audio Posts",
    playlists: [
      "becoming-a-disciple-audio-articles-playlist",
      "the-battle-against-sin-audio-articles-playlist",
      "youth-audio-articles-playlist",
      "prayer-audio-articles-playlist",
      "people-in-the-bible-audio-articles-playlist"

    ]
  },
  {
    title: "Podcast Series",
    playlists: [
      "armor-of-god-series-podcast",
      "parables-series-podcast",
      "what-does-the-bible-say-podcast",
      "philippians-series-podcast"

    ]
  }
]

const animationPosts = ["bible-words-explained-what-is-the-lust-of-the-flesh-video", "bible-quotes-explained-the-temple-old-testament-vs-new-testament", "bible-quotes-explained-put-off-the-old-man-put-on-the-new-man", "being-humble-an-important-reason-to-pursue-humility"]

const articlesFromPillarsCollections = ["johan-o-smith-article", "elias-aslaksen-articles", "aksel-j-smith-articles", "sigurd-bratlie-articles"]

const testimoniesCollections = [
  "everyday-christiantiy-testimonies",
  "victory-over-sin-testimony-collection",
  "parenting-testimonies",
  "in-the-face-of-tragedy",


]

const songPlaylists = ["fight-the-good-fight-songs", "a-new-start-songs", "wake-up-call-songs", "do-not-worry-songs", "disciple-life-songs"]
const podcastPlaylists = ["philippians-series-podcast", "armor-of-god-series-podcast", "parables-series-podcast", "what-does-the-bible-say-podcast", "living-the-gospel-podcast-playlist"]
const topicalPlaylsits = ["becoming-a-disciple-audio-articles-playlist", "faith-audio-articles-playlist", "youth-audio-articles-playlist", "freedom-from-sin-audio-articles-playlist", "important-concepts-audio-articles-playlist"]

const editorsPickEdification = [
  "spirit-faith-take-promised-land",
  "no-one-can-serve-two-masters",
  "without-exception",

  "the-message-of-the-cross-practical-christianity",
]
const bibleStudies = [
  {
    title: "Overcoming sin",
    image: {
      "src": "https://cdn.activechristianity.org/image/upload/c_thumb,h_300,w_600,g_center/v1607548187/en/vTglXNPS8rXCAeOgjxo0DmUvA3HNSdmlKBxyIS32.jpg",
      "srcset": "https://cdn.activechristianity.org/image/upload/c_thumb,h_300,w_600,g_center/v1607548187/en/vTglXNPS8rXCAeOgjxo0DmUvA3HNSdmlKBxyIS32.jpg 600w, https://cdn.activechristianity.org/image/upload/c_thumb,h_400,w_800,g_center/v1607548187/en/vTglXNPS8rXCAeOgjxo0DmUvA3HNSdmlKBxyIS32.jpg 800w",
      "dataUri": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMSEBASEx0VFhUWFR0sHCAcHCAcLCcvJiQmLydGNzExN0ZRREBEUWJYWGJ8dnyiotkBCAgICAkICQoKCQ0ODA4NExIQEBITHRUWFRYVHSwcIBwcIBwsJy8mJCYvJ0Y3MTE3RlFEQERRYlhYYnx2fKKi2f/AABEIAB4APAMBIgACEQEDEQH/xABiAAEAAwADAAAAAAAAAAAAAAAFAAQGAgMHEAACAwEBAQEBAQAAAAAAAAAAAQIDBBESMRMhIgEAAwEBAAAAAAAAAAAAAAAAAQIEAwARAQEBAQEAAAAAAAAAAAAAAAECABED/9oADAMBAAIRAxEAPwDw2l/0VqYRWJ531pHXOEVx5koC+TP+kJMmTCrIJ9G82R1xaTIrs1cjsxdHzJopTZp7sCcm2zO7avzk0hpRctCYu1hkn/pl6x/Q+X0sieGluuukBTKm2gqtoTz2+X8HeJk4lbTZ7ZwSXR3Jo9Rl1mNjpl3hZhtsh3hNcS6ibTM36H6kvQJqn662VL9U+9KNmqTQ0+ZhV7jaUn9JZazoc2bnA2HFd//Z"
    },
    slug: '/preview?type=page&id=79',
    excerpt: 'Learn what it really means to battle against sin and overcome!'
  },

  {
    title: "Our calling",
    image: {
      "src": "https://cdn.activechristianity.org/image/upload/c_thumb,h_300,w_600,g_center/v1607534473/en/d131774a3e2c8b051fafd03bfa983c50.jpg",
      "srcset": "https://cdn.activechristianity.org/image/upload/c_thumb,h_300,w_600,g_center/v1607534473/en/d131774a3e2c8b051fafd03bfa983c50.jpg 600w, https://cdn.activechristianity.org/image/upload/c_thumb,h_400,w_800,g_center/v1607534473/en/d131774a3e2c8b051fafd03bfa983c50.jpg 800w",
      "dataUri": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMSEBASEx0VFhUWFR0sHCAcHCAcLCcvJiQmLydGNzExN0ZRREBEUWJYWGJ8dnyiotkBCAgICAkICQoKCQ0ODA4NExIQEBITHRUWFRYVHSwcIBwcIBwsJy8mJCYvJ0Y3MTE3RlFEQERRYlhYYnx2fKKi2f/AABEIAB4APAMBIgACEQEDEQH/xABpAAEBAAMBAAAAAAAAAAAAAAAFBAADBgIQAAICAgIDAQEAAAAAAAAAAAECAAMRIQQSEzFRBUEBAAMBAQAAAAAAAAAAAAAAAAIDBQEAEQADAAIDAQEBAAAAAAAAAAAAAQIDEQQSIUETQv/aAAwDAQACEQMRAD8A6Om5c6l4shPGUdtxlFqUbMPuyZNNm1HQygBSMyJmq6kgydefSq9C25zyMZO2xQhPsnsuVdAzyhSxQ3ae/DXM/RmtV8DbL1kLXjMR5VdYBxBWxmF3YmqpM3VvLaw1moMluJvXnOjYAiq38CwrF/bYy9HSpt/ycJymtXkNs+51z85jX6gVqrZZ2IiKtp+l7i8aHHaEtMW/Ovs8QDRE3N9hfEfOFxKbj0BMZNSyXyePnx3Xvhlj5zkyBrEydzDaXBkLJkncaie979P/2Q=="
    },
    slug: '/preview?type=page&id=80'


  },
  {
    title: "Holy Spirit - The Helper",
    image: {
      "src": "https://cdn.activechristianity.org/image/upload/c_thumb,h_300,w_600,g_center/v1607533736/en/2a566fc39c320779597690b80d92f1be.jpg",
      "srcset": "https://cdn.activechristianity.org/image/upload/c_thumb,h_300,w_600,g_center/v1607533736/en/2a566fc39c320779597690b80d92f1be.jpg 600w, https://cdn.activechristianity.org/image/upload/c_thumb,h_400,w_800,g_center/v1607533736/en/2a566fc39c320779597690b80d92f1be.jpg 800w",
      "dataUri": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYGBgYHBgcICAcKCwoLCg8ODAwODxYQERAREBYiFRkVFRkVIh4kHhweJB42KiYmKjY+NDI0PkxERExfWl98fKcBBgYGBgcGBwgIBwoLCgsKDw4MDA4PFhAREBEQFiIVGRUVGRUiHiQeHB4kHjYqJiYqNj40MjQ+TERETF9aX3x8p//AABEIAB4APAMBIgACEQEDEQH/xABdAAACAwEBAAAAAAAAAAAAAAAAAQIDBQQIEAACAgICAQUAAAAAAAAAAAAAAQIDBBEFMRITISJRUgEBAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A89DQjoqq9RpbAobEab49rXyQT46UVvyQGYSRow49yW/JFV2G6lvYHCA2IALIya90EdE1r6ATyLf0xvItfcmVzSTIAXLItXUmJ2zn2yol0gExAAH/2Q=="
    },
    slug: '/preview?type=page&id=80'
  },
  {
    title: "The armor of God",
    image: {
      "src": "https://cdn.activechristianity.org/image/upload/c_thumb,h_300,w_600,g_center/v1607547482/en/IRsMdjaM0s7rTjYfbgzhiGDzmylriJkqU5uIFmho.jpg",
      "srcset": "https://cdn.activechristianity.org/image/upload/c_thumb,h_300,w_600,g_center/v1607547482/en/IRsMdjaM0s7rTjYfbgzhiGDzmylriJkqU5uIFmho.jpg 600w, https://cdn.activechristianity.org/image/upload/c_thumb,h_400,w_800,g_center/v1607547482/en/IRsMdjaM0s7rTjYfbgzhiGDzmylriJkqU5uIFmho.jpg 800w",
      "dataUri": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMSEBASEx0VFhUWFR0sHCAcHCAcLCcvJiQmLydGNzExN0ZRREBEUWJYWGJ8dnyiotkBCAgICAkICQoKCQ0ODA4NExIQEBITHRUWFRYVHSwcIBwcIBwsJy8mJCYvJ0Y3MTE3RlFEQERRYlhYYnx2fKKi2f/AABEIAB4APAMBIgACEQEDEQH/xABoAAEAAwEBAAAAAAAAAAAAAAAFAgQGAwAQAAICAwACAgMAAAAAAAAAAAECABEDBBIFEyFBIiMxAQEBAQEBAAAAAAAAAAAAAAADBAUAAREAAwADAQEBAAAAAAAAAAAAAAECAwQRISIS/9oADAMBAAIRAxEAPwCzp6pzCIronoLc94fF2pPVRj0U19Syn6zHrGnKfA46JVgCZHNqnELiDdl1+ZbOp7VotBomrCn1JGcE6pVi4q+giqxuCrmVc/BgtdDxazrNM0XXC/UhOzcVK3Q+jCuDzd1HF9hfLKfiWpT+VRjE5ZyOpjNfO6CgZfxbOQGwZp1PrNGq4kanYpU6B+YcN7MP40POzkcUTJ4h0wENz4RZKbr58Lp28zAi4RkQ+32E1UZ5XHQqAebLKECmrgUV6WNvI6b60jvs7366Qz2tlyNiBMB1eveEY2JqUQKoAnJoXZ2JxV+XPT//2Q=="
    }
    ,
    slug: '/preview?type=page&id=46'
  }

]

export const pageQuery = graphql`
    query homeBeta {
        ac {
          series {
            slug
            image {
              src
              srcset
              dataUri
            }
            title
            posts {
              slug
            }
          }

          playlists{
            title
            image {
              src
              srcset
              dataUri
            }
            slug
          }
        }
    }
`