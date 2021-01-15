import React, { Suspense } from "react";
import loadable from '@loadable/component'
import { DesktopFeaturedPostLoader } from '@/layout-parts/Loader/PlaceHolders'
import FeaturedBanner from '@/layout-parts/HorizontalScroll/FeaturedBanner'
import { TopImgRowHorizontalScroll } from '@/layout-parts/HorizontalScroll'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'
import LatestSection from '@/layout-parts/List/PostRow4Col'
import FeatureSectionDesktop from '@/layout-parts/Home/Desktop/FeatureSectionDesktop'
import FeatureSectionMobile from '@/layout-parts/Home/Mobile/FeatureSectionMobile'
import FeaturedTopics from '@/layout-parts/HorizontalScroll/FeaturedTopics'
import BgImgTopicCard from '@/components/Cards/BgImgTopicCard'
import HomeTopFeaturePost from '@/layout-parts/Home/HeaderPost'
import { PageSectionHeader } from '@/components/Headers'
import LowerSections from '@/layout-parts/Home/Desktop/LowerSections'
import ShowMore from '@/layout-parts/ShowMorePosts'
import MetaTag from '@/components/Meta'
import shortid from 'shortid'
import MobileHome from '@/layout-parts/Home/Mobile'
import { processRecommendationContext, getRandomFeatured } from '@/helpers'

import RightImgWDes from '@/components/PostItemCards/RightImg'
// Type
import { IPostItem, IPostRes, ITopicPostItems } from '@/types'

// Helpers
import ac_strings from '@/strings/ac_strings.js'

const HomeContent: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props
  const {
    featuredPosts: featuredPosts,
    popularTopics: popularTopicsAll,
    popularPosts: popularPostsAll,
    latestPosts: latestPosts

  } = pageContext
  const [isMobile, setIsMobile] = React.useState(typeof window !== "undefined" && window.innerWidth < 640)
  const popularPosts = popularPostsAll.dynamic && popularPostsAll.dynamic.length > 0 ? popularPostsAll.dynamic : popularPostsAll.static
  const { featured, latest, popular } = processRecommendationContext({ popularPosts, featuredPosts, latestPosts })

  const mixedFeaturedPosts = getRandomFeatured({ latest, popular, featured })
  const latestPostAsTopic = {
    id: '',
    name: ac_strings.latest,
    slug: ac_strings.slug_latest
  }

  const checkIsMobile = () => {
    console.log('resizing')
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 640)
  }
  React.useEffect(() => {
    document.addEventListener('resize', checkIsMobile);
    return () => {
      document.removeEventListener('resize', checkIsMobile);
    }

  }, [
    typeof window !== "undefined" && window.innerWidth
  ])
  if (isMobile) return (
    <div className="sm:hidden">
      <div className="w-full pb-4 pt-8">
        <FeaturedBanner featured={mixedFeaturedPosts} />
      </div>

      <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
        <PageSectionHeader title={ac_strings.latest} className="pb-4" />
        <TopImgRowHorizontalScroll posts={latest} />
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
          <TopImgRowHorizontalScroll posts={popular} />
        </div>


        <div className="w-full p-4 h-16">
          <BgImgTopicCard
            name={ac_strings.browse_resource}
            to={ac_strings.slug_explore}
          />
        </div>
      </div>

    </div>
  )
  else {

    const DesktopHome = loadable(() => import("@/layout-parts/Home/Desktop"));
    return (
      <DesktopHome
        mixed={mixedFeaturedPosts}
        latest={latest}
        popular={popular}
        popularTopicsAll={popularTopicsAll}
      />
    );
  };
}
const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props


  return (

    <div className="standard-max-w">
      <MetaTag
        path={path}
        title={`${ac_strings.site_title} - ${ac_strings.tagline}`}
        type="website"
        translatedUrls={[]}
        breadcrumb={[]}
      />

      <HomeContent {...props} />
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
