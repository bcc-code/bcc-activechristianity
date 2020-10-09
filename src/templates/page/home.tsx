import * as React from "react"
import { graphql } from "gatsby";
import loadable from '@loadable/component'
import FollowUs from '@/layout-parts/Home/FollowUs'
import { useSelector } from "react-redux";
import FetchPosts from '@/HOC/FetchPosts'
import FetchPostList from '@/HOC/FetchPostList'
const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBanner'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))
import QPopularAndFeaturedTopics from '@/HOC/QPopularAndFeaturedTopics'
const LatestSection = loadable(() => import('@/layout-parts/Home/Latest'))
const FeatureSection = loadable(() => import('@/layout-parts/Home/FeatureSection'))
const FeaturedTopics = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedTopics'))
import BgImgTopicCard from '@/components/Cards/BgImgTopicCard'
import HomeTopFeaturePost from '@/components/PostItem/DesktopHeaderPost'
import LazyLoad from '@/components/LazyLoad';
import { PageSectionHeader } from '@/components/Headers'
import LowerSections from '@/layout-parts/Home/LowerSections'
import ShowMore from '@/layout-parts/ShowMorePosts'
import MetaTag from '@/components/Meta'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
const RightImgWDes = loadable(() => import('@/components/PostItemCards/RightImg'))
import { getRandomArray } from '@/helpers'
// Type
import { IRootState } from '@/state/types'
import { ITopicPostSlugs } from '@/types'


// Helpers

import TS from '@/strings'

import ac_strings from '@/strings/ac_strings.json'


const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props
  const { bookmarkedPosts, historyPosts, unfinishedPosts, followedTopics } = useSelector((state: IRootState) => state.userLibrary)
  const {
    featuredPosts: featuredPostSlugs,
    popularTopics: popularTopicsAll,
    popularPosts: popularPostsAll,
    formats
  } = pageContext

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

        <div className="sm:hidden">
          <div className="w-full pb-4 pt-8">
            <PageSectionHeader title={ac_strings.featured} className="pb-4" />
            <FetchPosts
              slugs={featuredPostSlugs}
              layout="row"
              render={
                ({ posts }) => <FeaturedBanner featured={posts} />
              }
            />
          </div>

          <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
            {loggedIn !== "success" ? (
              <>
                <PageSectionHeader title={ac_strings.popular} className="pb-4" />
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
                  <PageSectionHeader title={ac_strings.latest} className="pb-4" />

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



          <LazyLoad>
            <QPopularAndFeaturedTopics
              excludeFollowed
              render={({ topicPostItems }) => {
                const randomTopics = getRandomArray(topicPostItems, 6)
                const randomPostsSlugs: string[] = []
                randomTopics.map(p => {
                  randomPostsSlugs.push(p.)
                })
                return (
                  <>
                    <div className="py-6">
                      <PageSectionHeader title={ac_strings.recommend_for_you} className="pb-4" />
                      <FetchPosts
                        slugs={randomPostsSlugs}
                        layout="row"
                        render={
                          ({ posts }) => <TopImgHorizontalScroll posts={posts} />
                        }
                      />
                    </div>
                    <div className="py-6">

                      <PageSectionHeader title={ac_strings.topics_for_you} className="pb-4" />
                      <FeaturedTopics featured={randomTopics} />
                    </div>
                  </>
                )
              }}
            />
          </LazyLoad>
          {loggedIn !== "success" ? (
            <>
              <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
                <PageSectionHeader title={ac_strings.latest} className="pb-4" />
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
                <PageSectionHeader title={ac_strings.continue} className="pb-4" />
                <FetchPosts
                  slugs={unfinishedPosts.length > 0 ? unfinishedPosts.map(item => item.slug) : historyPosts.map(item => item.slug)}
                  layout="list"
                  render={
                    ({ posts }) => <TopImgHorizontalScroll posts={posts} />
                  }
                />

              </>
            )}

        </div>

        <div className="hidden sm:block">

          <FetchPosts
            slugs={[getRandomArray(featuredPostSlugs, 1)[0]]}
            layout="row"
            render={
              ({ posts }) => <HomeTopFeaturePost {...posts[0]} />
            }
          />

          <FetchPostList
            slug={latestPostAsTopic.slug}
            layout="list"
            render={({ posts }) => {
              return <LatestSection latestPosts={posts.slice(0, 6)} latestSlug={latestPostAsTopic.slug} />

            }}

          />
          <FeatureSection featuredPosts={featuredPostSlugs} topicPosts={popularTopicsAll.static} />
          <LowerSections
            lists={popularTopicsAll.static}
            newPostsForYou={[]}
            topicsForYou={popularTopicsAll.static}
            popularPosts={popularPostsAll.static}
          />

          <LazyLoad >
            <div className="grid grid-cols-4 gap-4 md:gap-6 sm:px-4">
              <div className="col-start-1 col-end-3 lg:col-end-4">
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
            </div>
          </LazyLoad>
        </div>
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


