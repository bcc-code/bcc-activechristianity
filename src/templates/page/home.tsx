import React from "react";
import LazyLoad from '@/components/LazyLoad';
import loadable from '@loadable/component'
import FeaturedBanner from '@/layout-parts/HorizontalScroll/FeaturedBanner'
import { TopImgRowHorizontalScroll } from '@/layout-parts/HorizontalScroll'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'
import LatestSection from '@/layout-parts/List/PostRow4Col'
import FeatureSectionMobile from '@/layout-parts/Home/Mobile/FeatureSectionMobile'
import FeaturedTopics from '@/layout-parts/HorizontalScroll/FeaturedTopics'
import BgImgTopicCard from '@/components/Cards/BgImgTopicCard'
import HomeTopFeaturePost from '@/layout-parts/Home/HeaderPost'
import { PageSectionHeader } from '@/components/Headers'
import MetaTag from '@/components/Meta'
import shortid from 'shortid'
import { processRecommendationContext, getRandomFeatured } from '@/helpers'

// Type
import { IPostItem, IPostRes, ITopicPostItems } from '@/types'

// Helpers
import ac_strings from '@/strings/ac_strings.js'

const HomeContent: React.FC<{
  mixed: IPostItem[]
  latest: IPostItem[]
  popular: IPostItem[]
  popularTopicsAll: {
    static: ITopicPostItems[]
    dynamic: ITopicPostItems[]
  }
}> = (props) => {


  const [isMobile, setIsMobile] = React.useState(typeof window !== "undefined" && window.innerWidth < 640)

  React.useEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 640)
  }, [])

  if (isMobile) {
    return (
      <div className="sm:hidden">
      </div>
    )
  } else {

    const DesktopHome = loadable(() => import("@/layout-parts/Home/Desktop"));
    return (
      <DesktopHome {...props} />
    );
  };
}
const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props
  const {
    featuredPosts: featuredPosts,
    popularTopics: popularTopicsAll,
    popularPosts: popularPostsAll,
    latestPosts: latestPosts

  } = pageContext
  const popularPosts = popularPostsAll.dynamic && popularPostsAll.dynamic.length > 0 ? popularPostsAll.dynamic : popularPostsAll.static
  const { featured, latest, popular } = processRecommendationContext({ popularPosts, featuredPosts, latestPosts })

  const mixedFeaturedPosts = getRandomFeatured({ latest, popular, featured })
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

      <div className="sm:hidden w-full pb-4 pt-8">

        <div>
          <FeaturedBanner featured={mixedFeaturedPosts} />
        </div>
        <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
          <PageSectionHeader title={ac_strings.latest} className="pb-4" />
          <TopImgRowHorizontalScroll posts={latest} />
        </div>
        <LazyLoad>
          <div className="py-6">
            <PageSectionHeader title={ac_strings.recommend_for_you} className="pb-4" />
            <FeatureSectionMobile topicPosts={popularTopicsAll.static} />
          </div>
        </LazyLoad>
        <LazyLoad>
          <div className="py-6">
            <PageSectionHeader title={ac_strings.topics_for_you} className="pb-4" />
            <FeaturedTopics featured={popularTopicsAll.static} />
            <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
              <PageSectionHeader title={ac_strings.popular} className="pb-4" />
              <TopImgRowHorizontalScroll posts={popular} />
            </div>
            <div className="w-full p-4">
              <div className="w-full h-16">
                <BgImgTopicCard
                  name={ac_strings.browse_resource}
                  to={ac_strings.slug_explore}
                />
              </div>
            </div>
          </div>
        </LazyLoad>
      </div>

      <div className="hidden sm:block">
        <HomeTopFeaturePost {...mixedFeaturedPosts[0]} key={shortid()} />
        <div className="px-4">
          <LatestSectionHeader latestSlug={latestPostAsTopic.slug} />
          <LatestSection posts={latest.slice(0, 4)} />
        </div>
      </div>
      <HomeContent
        mixed={mixedFeaturedPosts}
        latest={latest}
        popular={popular}
        popularTopicsAll={popularTopicsAll}
      />
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
