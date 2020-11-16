import * as React from "react"
import loadable from '@loadable/component'
import { useSelector } from "react-redux";

const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBanner'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))
import QPopularAndFeaturedTopics from '@/HOC/QPopularAndFeaturedTopics'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'
const LatestSection = loadable(() => import('@/layout-parts/List/PostRow4Col'))
const FeatureSectionDesktop = loadable(() => import('@/layout-parts/Home/FeatureSectionDesktop'))
const FeatureSectionMobile = loadable(() => import('@/layout-parts/Home/FeatureSectionMobile'))
const FeaturedTopics = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedTopics'))
import BgImgTopicCard from '@/components/Cards/BgImgTopicCard'
import HomeTopFeaturePost from '@/layout-parts/Home/DesktopHeaderPost'
import { PageSectionHeader } from '@/components/Headers'
import LowerSections from '@/layout-parts/Home/LowerSections'
import ShowMore from '@/layout-parts/ShowMorePosts'
import MetaTag from '@/components/Meta'

const RightImgWDes = loadable(() => import('@/components/PostItemCards/RightImg'))
import { getRandomArray, normalizePostRes } from '@/helpers'
// Type
import { IPostRes, ITopicPostItems } from '@/types'

// Helpers

import TS from '@/strings'

import ac_strings from '@/strings/ac_strings.js'


const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props

  const {
    featuredPosts: featuredPosts,
    popularTopics: popularTopicsAll,
    popularPosts: popularPostsAll,
    latestPosts: latestPosts

  } = pageContext


  const latestPostAsTopic = {
    id: '',
    name: ac_strings.latest,
    slug: ac_strings.slug_latest
  }

  const featuredPostsAll = featuredPosts.map(p => normalizePostRes(p))
  const randomFeatured = getRandomArray(featuredPostsAll, featuredPostsAll.length)
  const popularDynamic = popularPostsAll.dynamic.map(p => normalizePostRes(p))//.map(p => normalizePostRes(p)
  const featuredAndPopuloar = [...new Set([...randomFeatured.slice(2), ...popularDynamic.slice(5)])]
  const randomRest = getRandomArray(featuredAndPopuloar, featuredAndPopuloar.length)
  const featured = [randomFeatured[0], randomFeatured[1], ...randomRest]
  const latest = latestPosts.map(p => normalizePostRes(p))
  const popular = popularPostsAll.static.map(p => normalizePostRes(p))
  return (

    <div className="standard-max-w">
      <MetaTag
        path={path}
        title={`${TS.site_title} - ${TS.tagline}`}
        type="website"
        translatedUrls={[]}
        breadcrumb={[]}
      />

      <div className="sm:hidden">
        <div className="w-full pb-4 pt-8">

          <FeaturedBanner featured={featured} />
        </div>
        <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
          <PageSectionHeader title={ac_strings.latest} className="pb-4" />
          <TopImgHorizontalScroll posts={latest} />
        </div>

        <div className="py-6">
          <PageSectionHeader title={ac_strings.recommend_for_you} className="pb-4" />
          <FeatureSectionMobile topicPosts={popularTopicsAll.static} />
        </div>
        <div className="py-6">

          <PageSectionHeader title={ac_strings.topics_for_you} className="pb-4" />
          <FeaturedTopics featured={popularTopicsAll.static} />

          <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
            <PageSectionHeader title={ac_strings.popular} className="pb-4" />
            <TopImgHorizontalScroll posts={popular} />
          </div>
          <div className="w-full p-4">
            <div className='w-full h-16'>
              <BgImgTopicCard
                name={ac_strings.browse_resource}
                to={ac_strings.slug_explore}

              />
            </div>
          </div>
        </div>

      </div>
      <div className="hidden sm:block">

        <HomeTopFeaturePost {...featured[0]} />
        <div className="px-4">
          <LatestSectionHeader latestSlug={latestPostAsTopic.slug} />
          <LatestSection posts={latest.slice(0, 4)} />
          <FeatureSectionDesktop
            featuredPosts={[randomRest[1], randomRest[0]]}
          />
          <LowerSections
            lists={popularTopicsAll.static}
            newPostsForYou={[]}
            topicsForYou={popularTopicsAll.static}
            popularPosts={popular}
          />
          <div className="grid grid-cols-4 gap-4 md:gap-6 sm:px-4">
            <div className="col-start-1 col-end-3 lg:col-end-4">
              <div className="">
                {latest.slice(6, 12).map((item, i) => {
                  return (
                    <div className={`mt-6 sm:mt-8 mx-4 sm:mr-10 sm:ml-0 div-post`}>
                      <RightImgWDes key={i} {...item} />
                    </div>
                  )
                })}
              </div>
              <ShowMore
                slug={latestPostAsTopic.slug}
                startNr={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default IndexPage


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
