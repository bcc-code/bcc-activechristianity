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
import Bookshop from '@/layout-parts/Banner/BookShop'
import shortid from 'shortid'
import { SectionTitleDesktopAndMobile } from '@/components/Headers'
import SquareCard from '@/components/Cards/SquareCategoryCard'
import Categories from '@/layout-parts/Home/Desktop/Categories'
import { getRandomArray } from '@/helpers/normalizers'
// Type
import { IPostItem, IPostRes, ITopicPostItems, ITopic } from '@/types'

// Helpers
import ac_strings from '@/strings/ac_strings.js'

const HomeContent: React.FC<{
  mixed: IPostItem[] | null
  latest: IPostItem[]
  popular: IPostItem[]
  formats: ITopic[]
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
    mixedFeaturedPosts,
    popular,
    latest,
    formats
  } = props
  const latestPostAsTopic = {
    id: '',
    name: ac_strings.latest,
    slug: ac_strings.slug_latest
  }

  const [mixed, setMixed] = React.useState<null | IPostItem[]>(null)

  React.useEffect(() => {
    const getPosts = featured.length > 5 ? featured : mixedFeaturedPosts[0]
    const random = getRandomArray(getPosts, 6)
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
        mixed={mixed && mixed.length > 0 ? mixed?.slice(1) : []}
        latest={latest}
        popular={popular}
        formats={formats}
        popularTopicsAll={popularTopics}
      />
    </>
  )
}
const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext } = props
  const {
    pagePath,
    featured,
    popularTopics,
    popular,
    formats,
    latest
  } = pageContext
  console.log(props)
  return (

    <div className="standard-max-w">
      <MetaTag
        path={pagePath}
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
          <div className="pt-6">
            <SectionTitleDesktopAndMobile
              name={ac_strings.categories}

            />
            <Categories formats={formats} />


          </div>
        </LazyLoad>
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
            <div className="w-full px-4 py-12">
              <div className="w-full h-16">
                <BgImgTopicCard
                  name={ac_strings.browse_resource}
                  to={ac_strings.slug_explore}
                />
              </div>
            </div>
            {process.env.LANG_CODE === "en" && (
              <div className="px-4">
                <Bookshop />
              </div>
            )}

          </div>
        </LazyLoad>
      </div>
      <DesktopHomeWrapper {...props.pageContext} />
    </div >

  )
}

export default IndexPage


interface IHomePropsContent {
  pagePath: string
  featuredPosts: IPostRes[]
  latest: IPostItem[]
  popular: IPostItem[]
  featured: IPostItem[]
  formats: ITopic[]
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
