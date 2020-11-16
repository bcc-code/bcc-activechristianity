import * as React from "react"
import { useSelector } from "react-redux";

import MetaTag from '@/components/Meta'
import { getRandomArray } from '@/helpers'
import Image2To1 from '@/components/Images/Image2To1'
import Image1To1 from '@/components/Images/Image1to1Rounded'
// Type
import { IRootState } from '@/state/types'
import { IPostRes, ITopicPostItems, IPostItem } from '@/types'
import formats from '@/strings/topic-filters.json'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import { AuthorLink } from '@/components/PostElements'
import { normalizePostRes } from '@/helpers'
// Helpers
import { HomeTop } from '@/layout-parts/Home/HomeBanners'
import { CardListPosts } from '@/layout-parts/Home/HomeSections'
import TS from '@/strings'

import ac_strings from '@/strings/ac_strings.js'
import helpers from "@/layout-parts/LandingPage/helpers";


const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props
  const { bookmarkedPosts, historyPosts, unfinishedPosts, followedTopics } = useSelector((state: IRootState) => state.userLibrary)
  const {
    featuredPosts: featuredPosts,
    popularTopics: popularTopicsAll,
    popularPosts: popularPostsAll,
    latestPosts
  } = pageContext
  console.log(pageContext)
  const { loggedIn } = useSelector((state: IRootState) => state.auth)

  const latestPostAsTopic = {
    id: '',
    name: ac_strings.latest,
    slug: ac_strings.slug_latest
  }

  const randomFeatured = getRandomArray(featuredPosts, featuredPosts.length)
  const featuredAndPopuloar = [...new Set([...randomFeatured.slice(2), ...popularPostsAll.dynamic.slice(5)])]
  const randomRest = getRandomArray(featuredAndPopuloar, featuredAndPopuloar.length)

  const data = {
    featuredFormats: [
      {
        name: "Podcast",
        slug: "/podcast",
        id: "1",
        posts: latestPosts
      },
      {
        name: "Animation",
        slug: "/animation",
        id: "2",
        posts: latestPosts
      },
      {
        name: "Topical Playlists",
        slug: "/playlist",
        id: "1",
        posts: latestPosts
      },
      {
        name: "Songs",
        slug: "/songs",
        id: "1",
        posts: latestPosts
      }, {
        name: "Edification",
        slug: "/edification",
        id: "1",
        posts: latestPosts
      },
      {
        name: "Testimonies",
        slug: "/testimonies",
        id: "1",
        posts: latestPosts
      }
    ]
  }

  return (

    <div >
      <MetaTag
        path={path}
        title={`${TS.site_title} - ${TS.tagline}`}
        type="website"
        translatedUrls={[]}
        breadcrumb={[]}
      />
      <HomeTop
        title={"What does the Bible say about..."}
        body="Latest Podcast series"
        cta={{
          text: 'Listen now',
          path: ''
        }}

      />
      <CardListPosts
        title={ac_strings.featured}
        posts={featuredPosts.map(item => normalizePostRes(item))}
      />
      <div>
        <div className="standard-max-w px-4 flex flex-col justify-center" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
          <h2 className="text-center" style={{ fontSize: "42px", fontWeight: "bold", paddingBottom: "26px" }}>Editor's pick</h2>
          <div className="flex justify-center" style={{ paddingBottom: "26px", fontWeight: 700 }}>
            {data.featuredFormats.map(item => {
              return (
                <div
                  style={{ color: "#828282", fontSize: "20px", marginLeft: "20px", marginRight: "20px" }}
                >
                  {item.name}
                </div>
              )
            })}
          </div>
          <div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
            {latestPosts.slice(4, 8).map((itemRes) => {
              const item = normalizePostRes(itemRes)
              console.log(item)
              return (
                <PostItemCard {...item} />
              )
            })}
          </div>
          <div className="flex justify-center" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
            <button className=" border-2 rounded border-d4slate-dark font-bold" style={{ padding: "12px 25px 12px 25px", fontSize: "21px" }}>View All Podcast</button>

          </div>

        </div>
      </div>
      <div className="bg-gray-500 text-white">
        <div className="standard-max-w" style={{ minHeight: "455px", paddingTop: "122px" }}>
          <div className="px-4">
            <h2 style={{ fontSize: "56px", fontWeight: "bold", paddingBottom: "51px" }}>New Animation out</h2>
            <p style={{ paddingBottom: "51px" }}>The Secret link between peace and humility</p>
            <button
              className="text-d4slate-dark"
              style={{ background: "#fff", padding: "16px 25px 16px 25px", borderRadius: "7px", fontSize: "18px" }}
            >
              Read More
          </button>
          </div>
        </div>
      </div>
      <div >
        <div className="standard-max-w px-4 flex flex-col justify-center" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
          <h2 className="text-center" style={{ fontSize: "42px", fontWeight: "bold", paddingBottom: "32px" }}>Latest</h2>
          <div>

          </div>
          <div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
            {latestPosts.slice(0, 4).map((itemRes) => {
              const item = normalizePostRes(itemRes)
              console.log(item)
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
                console.log(item)
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
            console.log(format)
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


