import React from "react";
import LazyLoad from '@/components/LazyLoad';
import loadable from '@loadable/component'
import FeaturedBanner from '@/components/HorizontalScroll/FeaturedBanner'
import { TopImgRowHorizontalScroll } from '@/components/HorizontalScroll'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'
import LatestSection from '@/components/List/PostRow4Col'
import FeatureSectionMobile from '@/layout-parts/Home/Mobile/FeatureSectionMobile'
import FeaturedTopics from '@/components/HorizontalScroll/FeaturedTopics'
import BgImgTopicCard from '@/components/Cards/BgImgTopicCard'
import HomeTopFeaturePost from '@/layout-parts/Home/HeaderPost'
import { PageSectionHeader } from '@/components/Headers'
import MetaTag from '@/components/Meta'
import shortid from 'shortid'
import { getRandomArray } from '@/helpers/normalizers'
// Type
import { IPostItem, IPostRes, ITopicPostItems } from '@/types'

// Helpers
import ac_strings from '@/strings/ac_strings.js'

const HomeContent: React.FC<{
  mixed: IPostItem[] | null
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

const DesktopHomeWrapper: React.FC<IHomePropsContent> = (props) => {
  const {
    featured,
    popularTopics,
    popular,
    latest

  } = props
  const latestPostAsTopic = {
    id: '',
    name: ac_strings.latest,
    slug: ac_strings.slug_latest
  }

  const [mixed, setMixed] = React.useState<null | IPostItem[]>(null)

  React.useEffect(() => {
    const random = getRandomArray(featured, featured.length)
    setMixed(random)
  }, [])

  return (
    <>

      <div className="hidden sm:block">
        <HomeTopFeaturePost mixed={mixed} key={shortid()} />
        <div className="px-4">
          <LatestSectionHeader latestSlug={latestPostAsTopic.slug} />
          <LatestSection posts={latest.slice(0, 4)} />
        </div>
      </div>
      <HomeContent
        mixed={mixed}
        latest={latest}
        popular={popular}
        popularTopicsAll={popularTopics}
      />
    </>
  )
}
const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props
  const {
    featured,
    popularTopics,
    popular,
    latest

  } = pageContext

  return (

    <div className="standard-max-w">
      <MetaTag
        path={path}
        title={`${ac_strings.site_title} - ${ac_strings.tagline}`}
        type="website"
        translatedUrls={[]}
        breadcrumb={[]}
      />

      <div className="sm:hidden w-full pt-8">

        <div>
          <FeaturedBanner featured={featured} />
        </div>
        <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
          <PageSectionHeader title={ac_strings.latest} className="pb-4" />
          <TopImgRowHorizontalScroll posts={latest} />
        </div>
        <LazyLoad>
          <div className="py-6">
            <PageSectionHeader title={ac_strings.recommend_for_you} className="pb-4" />
            <FeatureSectionMobile topicPosts={popularTopics.static} />
          </div>
        </LazyLoad>
        <LazyLoad>
          <div className="pt-6">
            <PageSectionHeader title={ac_strings.topics_for_you} className="pb-4" />
            <FeaturedTopics featured={popularTopics.static} />
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
      <DesktopHomeWrapper {...props.pageContext} />
    </div >

  )
}

export default IndexPage


interface IHomePropsContent {
  featuredPosts: IPostRes[]
  latest: IPostItem[]
  popular: IPostItem[]
  featured: IPostItem[]
  mixedFeaturedPosts: IPostItem[][]
  popularTopics: {
    static: ITopicPostItems[]
    dynamic: ITopicPostItems[]
  }
}

interface IHomeProps {
  path: string
  pageContext: IHomePropsContent

}
