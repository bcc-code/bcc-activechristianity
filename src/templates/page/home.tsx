import * as React from "react"
import { graphql } from "gatsby";
import loadable from '@loadable/component'
import FollowUs from '@/layout-parts/Home/FollowUs'
import { useSelector } from "react-redux";
import FetchPosts from '@/layout-parts/HOC/FetchPosts'
import FetchPostList from '@/layout-parts/HOC/FetchPostList'
const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBanner'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))
const LatestSection = loadable(() => import('@/layout-parts/Home/Latest'))
const FeaturedTopics = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedTopics'))
import BgImgTopicCard from '@/components/Cards/BgImgTopicCard'
import HomeTopFeaturePost from '@/components/PostItem/DesktopHeaderPost'
import LazyLoad from '@/components/LazyLoad';

import LowerSections from '@/layout-parts/Home/LowerSections'
import ShowMore from '@/layout-parts/ShowMorePosts'
import MetaTag from '@/components/Meta'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
const RightImgWDes = loadable(() => import('@/components/PostItem/RightImgWDes'))

// Type
import { IRootState } from '@/state/types'
import { ITopicPostSlugs } from '@/types'


// Helpers

import TS from '@/strings'

import ac_strings from '@/strings/ac_strings.json'

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="font-semibold pb-4 px-4 font-sm">{title}</div>
)


const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props
  const { bookmarkedPosts, historyPosts } = useSelector((state: IRootState) => state.userLibrary)
  const {
    featuredPosts: featuredPostSlugs,
    popularTopics: popularTopicsAll,
    popularPosts: popularPostsAll,
    formats
  } = pageContext

  console.log(historyPosts)
  const { loggedIn } = useSelector((state: IRootState) => state.auth)

  const latestPostAsTopic = {
    id: '',
    name: ac_strings.latest,
    slug: ac_strings.slug_latest
  }
  const tabs = [latestPostAsTopic, ...formats.map(f => ({ ...f, slug: `${f.slug}/${ac_strings.slug_latest}` }))]

  return (

    <div className="standard-max-w">
      <MetaTag
        path={path}
        title={`${TS.site_title} - ${TS.tagline}`}
        type="website"
        translatedUrls={[]}
        breadcrumb={[]}
      />
      <Placeholder loading={loggedIn == "loading"}>
        <div className="hidden sm:block">
          <FetchPosts
            slugs={[featuredPostSlugs[0]]}
            layout="row"
            render={
              ({ posts }) => <HomeTopFeaturePost {...posts[0]} />
            }
          />
        </div>
        <div className="w-full pb-4 sm:hidden pt-8">
          <SectionTitle title={ac_strings.featured} />
          <FetchPosts
            slugs={featuredPostSlugs}
            layout="row"
            render={
              ({ posts }) => <FeaturedBanner featured={posts} />
            }
          />
        </div>

        <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden sm:hidden">
          {loggedIn !== "success" ? (
            <>
              <SectionTitle title={ac_strings.popular} />
              <FetchPosts
                slugs={popularPostsAll.static}
                layout="row"
                render={
                  ({ posts }) => <TopImgHorizontalScroll posts={posts} />
                }
              />
            </>
          ) : (
              <>
                <SectionTitle title={ac_strings.latest} />

                <FetchPostList
                  slug={latestPostAsTopic.slug}
                  layout="row"
                  render={
                    ({ posts }) => <TopImgHorizontalScroll posts={posts} />
                  }
                />
              </>
            )}

        </div>

        <div className="sm:hidden py-6">
          <SectionTitle title={ac_strings.recommend_for_you} />
          <FetchPostList
            slug={latestPostAsTopic.slug}
            layout="list"
            render={({ posts }) => {
              return (
                <div className="">
                  {posts.slice(0, 3).map((item, i) => {
                    return (
                      <div className={`mt-6 sm:mt-8 mx-4 sm:mr-10 sm:ml-0 div-post`} key={i} >
                        <RightImgWDes {...item} noDes withTopics />
                      </div>
                    )
                  })}
                </div>
              )

            }}

          />
        </div>

        {/*         <LazyLoad>
          <FetchTopicPostItems
            topics={tabs}
            layout="list"
            render={({ topicPostItems }) => (
              <div>
                <div className="sm:hidden">
                  <ScrollNavTabs tabs={topicPostItems} />
                </div>
                <div className="hidden sm:block">
                  <ScrollNavTabsDesktop tabs={topicPostItems} />
                </div>

              </div>
            )}

          />
        </LazyLoad> */}
        <LazyLoad>
          <div className="py-6">
            <SectionTitle title={ac_strings.topics_for_you} />
            <FeaturedTopics featured={popularTopicsAll.static} />
          </div>
        </LazyLoad>
        <div className="hidden sm:block">
          <LowerSections
            lists={popularTopicsAll.static}
            newPostsForYou={[]}
            topicsForYou={popularTopicsAll.static}
            popularPosts={popularPostsAll.static}
          />
        </div>

        {loggedIn !== "success" ? (
          <>
            <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden sm:hidden">
              <SectionTitle title={ac_strings.latest} />
              <FetchPostList
                slug={latestPostAsTopic.slug}
                layout="row"
                render={
                  ({ posts }) => <TopImgHorizontalScroll posts={posts} />
                }
              />
            </div>
            <div className="w-full p-4">
              <div className='w-full'>
                <BgImgTopicCard
                  name={ac_strings.browse_resource}
                  to={ac_strings.slug_explore}
                />
              </div>
            </div>
          </>
        ) : (
            <>
              <SectionTitle title={ac_strings.continue} />
              <FetchPosts
                slugs={historyPosts.map(item => item.slug)}
                layout="list"
                render={
                  ({ posts }) => <TopImgHorizontalScroll posts={posts} />
                }

              />

            </>
          )}


        <LazyLoad >
          <div className="grid-home-end sm:mx-4 hidden sm:grid">
            <div className="div1">
              <FetchPostList
                slug={latestPostAsTopic.slug}
                layout="list"
                render={({ posts }) => {
                  return (
                    <div className="">
                      {posts.slice(6, 12).map((item, i) => {
                        return (
                          <div className={`mt-6 sm:mt-8 mx-4 sm:mr-10 sm:ml-0 div-post`}>
                            <RightImgWDes key={i} {...item} />
                          </div>
                        )
                      })}
                    </div>
                  )

                }}

              />
              <ShowMore
                slug={latestPostAsTopic.slug}
                startNr={2}
              />
            </div>
            <div className="div2 overflow-hidden mt-12 hidden sm:block">
              <FollowUs />
            </div>
          </div>
        </LazyLoad>
      </Placeholder>
    </div>

  )
}

export default IndexPage


interface IHomeProps {
  path: string
  pageContext: {

    featuredPosts: string[]
    popularPosts: {
      static: string[]
      dynamic: string[]
    }
    popularTopics: {
      static: ITopicPostSlugs[]
      dynamic: ITopicPostSlugs[]
    }
    formats: ITopicPostSlugs[]
  }

}


