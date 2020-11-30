import * as React from "react"
import loadable from '@loadable/component'
import { useSelector } from "react-redux";
import { DesktopFeaturedPostLoader } from '@/layout-parts/Loader/PlaceHolders'
const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBanner'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))
import Loader from '@/layout-parts/Loader/MainpagePlaceholder'
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
import shortid from 'shortid'
import { processRecommendationContext, getRandomFeatured } from '@/helpers'
const RightImgWDes = loadable(() => import('@/components/PostItemCards/RightImg'))
// Type
import { IPostItem, IPostRes, ITopicPostItems } from '@/types'

// Helpers
import ac_strings from '@/strings/ac_strings.js'


const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props

  const {
    featuredPosts: featuredPosts,
    popularTopics: popularTopicsAll,
    popularPosts: popularPostsAll,
    latestPosts: latestPosts

  } = pageContext

  const popularPosts = popularPostsAll.dynamic.length > 0 ? popularPostsAll.dynamic : popularPostsAll.static
  const { featured, latest, popular } = processRecommendationContext({ popularPosts, featuredPosts, latestPosts })
  const [mixedFeaturedPosts, setMixedFeaturedPosts] = React.useState<IPostItem[]>([])
  React.useEffect(() => {

    const mixed = getRandomFeatured({ latest, popular, featured })
    setMixedFeaturedPosts(mixed)
  }, [])

  const latestPostAsTopic = {
    id: '',
    name: ac_strings.latest,
    slug: ac_strings.slug_latest
  }

  return (

    <div className="standard-max-w">
      <MetaTag
        path={path}
        title={`${ac_strings.site_title} - ${ac_strings.tagline}`}
        type="website"
        translatedUrls={[]}
        breadcrumb={[]}
      />

      <div className="sm:hidden">
        <div className="w-full pb-4 pt-8">

          <FeaturedBanner featured={mixedFeaturedPosts} />
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
        <DesktopFeaturedPostLoader loading={typeof mixedFeaturedPosts[0] === "undefined"}>
          <HomeTopFeaturePost {...mixedFeaturedPosts[0]} key={shortid()} />
        </DesktopFeaturedPostLoader>

        <div className="px-4">
          <LatestSectionHeader latestSlug={latestPostAsTopic.slug} />
          <LatestSection posts={latest.slice(0, 4)} />
          <FeatureSectionDesktop
            featuredPosts={mixedFeaturedPosts.slice(2)}
          />
          <LowerSections
            lists={popularTopicsAll.static}
            newPostsForYou={[]}
            topicsForYou={popularTopicsAll.static}
            popularPosts={popular}
          />
          <div className="grid grid-cols-4 gap-4 md:gap-6 sm:px-4">
            <div className="col-start-1 col-end-3 lg:col-end-4">
              {latest.slice(6, 12).map((item, i) => {
                return (
                  <div className={`mt-6 sm:mt-8 mx-4 sm:mr-10 sm:ml-0 div-post`}>
                    <RightImgWDes key={i} {...item} />
                  </div>
                )
              })}
              <ShowMore
                slug={latestPostAsTopic.slug}
                startNr={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div >

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
