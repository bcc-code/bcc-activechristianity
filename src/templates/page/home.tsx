import * as React from "react"
import { graphql } from "gatsby";
import loadable from '@loadable/component'
import FollowUs from '@/layout-parts/Home/FollowUs'
import { useSelector } from "react-redux";

const FeatureSection = loadable(() => import('@/layout-parts/Home/FeatureSection'))
import FeaturedCard, { IFeaturedCard } from '@/components/PostItem/FeaturedCard'
import HomeTopFeaturePost from '@/components/PostItem/DesktopHeaderPost'

const LatestSection = loadable(() => import('@/layout-parts/Home/Latest'))
import LazyLoad from '@/components/LazyLoad';
import BibleIcon from '@/components/Icons/Bible'
import { OutlineButton } from '@/components/Buttons'
import LowerSections from '@/layout-parts/Home/LowerSections'
import MetaTag from '@/components/Meta'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
const RightImgWDes = loadable(() => import('@/components/PostItem/RightImgWDes'))
import TopImgPost from '@/components/PostItem/TopImg'

// Type
import { IRootState } from '@/state/types'
import { IPostItem, ITopic, IEbook } from '@/types'
import { INewForYou } from '@/layout-parts/Home/NewForYou'
import { IPostListSection } from '@/layout-parts/Home/PostListSection'

// Helpers
import { blog as blogApi, auth } from '@/util/sdk'
import { normalizePostRes, fetchLocalPostsFromSlugs } from '@/helpers'
import TS from '@/strings'
import languages from '@/strings/languages.json'
import ac_strings from '@/strings/ac_strings.json'
import User from "@/layout-parts/User/UserInitial";



interface IHome {
  path: string
  pageContext: {

  },
  data: {

  }
}

interface IUserContent {
  featuredPostTop: IPostItem[]
  latestPosts: IPostItem[]
  featuredPostRow: IPostItem[]
  listSlotOne: IPostListSection | undefined
  listSlotTwo: IPostListSection | undefined
  newPostsForYou: INewForYou[],
  listSlotThree: IPostListSection | undefined
  listSlotFour: IPostListSection | undefined
  topicsForYou: ITopic[]
  listSlotFive: IPostListSection | undefined
  listSix: IPostListSection | undefined
  listSeven: IPostListSection | undefined
  popularPosts: IPostItem[]
  listEight: IPostListSection | undefined
  listNine: IPostListSection | undefined
  listTen: IPostListSection | undefined
  featuredPodcast: IPostItem | undefined
  featuredEbook: IEbook | undefined
}

const defaultUserContent: IUserContent = {
  featuredPostTop: [],
  latestPosts: [],
  featuredPostRow: [],
  listSlotOne: undefined,
  listSlotTwo: undefined,
  newPostsForYou: [],
  listSlotThree: undefined,
  listSlotFour: undefined,
  topicsForYou: [],
  listSlotFive: undefined,
  listSix: undefined,
  listSeven: undefined,
  popularPosts: [],
  listEight: undefined,
  listNine: undefined,
  listTen: undefined,
  featuredPodcast: undefined,
  featuredEbook: undefined
}

const IndexPage: React.FC<IHome> = (props) => {
  const { pageContext, data: initialData, path } = props
  const { bookmarkedPosts, historyPosts } = useSelector((state: IRootState) => state.userLibrary)
  const { loggedIn } = useSelector((state: IRootState) => state.auth)
  const [infinitePosts, setInfinitePosts] = React.useState<IPostItem[]>([])
  const [popularPosts, setPopularPosts] = React.useState<IPostItem[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [userContent, setUserContent] = React.useState<IUserContent>({
    ...defaultUserContent
  })

  React.useEffect(() => {
    setInfinitePosts(userContent.popularPosts)
  }, [userContent.popularPosts])

  const showMorePosts = () => {
    setInfinitePosts([...infinitePosts, ...userContent.latestPosts])
  }




  React.useEffect(() => {

    getUserContent()
  }, [loggedIn, path])

  const getPopularContent = () => {
    blogApi
      .popularPosts(5)
      .then((res: any) => {

        if (Array.isArray(res.popularPosts)) {
          const slugArray = res.popularPosts.map(item => item.slug)
          return fetchLocalPostsFromSlugs(slugArray).then(res => {
            console.log(res)
            setPopularPosts(res)

          })

        }
      })
  }

  const getUserContent = () => {
    setIsLoading(true)
    getPopularContent()
    if (loggedIn === "success") {
      /*       setUserContent({
              ...userContent,
              featuredPostTop: [{
                ...WPItemtoPostWBookmark(pageContext.featuredPosts[0], bookmarkedPosts),
                palette: pageContext.featuredPosts[0].palette
              }],
              latestPosts: initialData.latestPosts.edges.slice(0, 6).map(item => convertPosts(item.node)),
              featuredPostRow: initialData.featuredPosts.edges.map(item => WPItemtoPostItem(item)),
              listSlotOne: initialData.popularPosts.edges[0] ? getTopicFromPost(initialData.popularPosts.edges[0], 'Popular Topic') : defaultUserContent.listSlotOne,
              listSlotTwo: initialData.popularPosts.edges[1] ? getTopicFromPost(initialData.popularPosts.edges[1], 'Popular Topic') : defaultUserContent.listSlotTwo,
              newPostsForYou: getNewForYou(initialData.latestPosts.edges.slice(6, 10).map(item => item.node)),
              listSlotThree: initialData.popularPosts.edges[2] ? getTopicFromPost(initialData.popularPosts.edges[2], 'Popular Topic') : defaultUserContent.listSlotThree,
              listSlotFour: initialData.popularPosts.edges[3] ? getTopicFromPost(initialData.popularPosts.edges[3], 'Popular Topic') : defaultUserContent.listSlotFour,
              listSlotFive: initialData.popularPosts.edges[3] ? getTopicFromPost(initialData.popularPosts.edges[3], 'Popular Topic') : defaultUserContent.listSlotFive,
              topicsForYou: initialData.featuredTopics.edges
            })
            setIsLoading(false) */
    } else if (loggedIn === "notLoggedIn") {
      /*       setUserContent({
              ...userContent,
              featuredPostTop: [{
                ...WPItemtoPostWBookmark(pageContext.featuredPosts[0], bookmarkedPosts),
                palette: pageContext.featuredPosts[0].palette
              }],
              latestPosts: initialData.latestPosts.edges.slice(0, 6).map(item => convertPosts(item.node)),
              featuredPostRow: initialData.featuredPosts.edges.map(item => WPItemtoPostItem(item)),
              listSlotOne: initialData.popularPosts.edges[0] ? getTopicFromPost(initialData.popularPosts.edges[0], ac_strings.popularTopic) : defaultUserContent.listSlotOne,
              listSlotTwo: initialData.popularPosts.edges[1] ? getTopicFromPost(initialData.popularPosts.edges[1], ac_strings.popularTopic) : defaultUserContent.listSlotTwo,
              newPostsForYou: getNewForYou(initialData.latestPosts.edges.slice(6, 10).map(item => item.node)),
              listSlotThree: initialData.popularPosts.edges[2] ? getTopicFromPost(initialData.popularPosts.edges[2], ac_strings.popularTopic) : defaultUserContent.listSlotThree,
              listSlotFour: initialData.popularPosts.edges[3] ? getTopicFromPost(initialData.popularPosts.edges[3], ac_strings.popularTopic) : defaultUserContent.listSlotFour,
              listSlotFive: initialData.popularPosts.edges[3] ? getTopicFromPost(initialData.popularPosts.edges[3], ac_strings.popularTopic) : defaultUserContent.listSlotFive,
              topicsForYou: initialData.featuredTopics.edges,
              popularPosts: initialData.popularPosts.edges.map(item => convertPosts(item))
            }) */


    }
  }

  const {
    featuredPostTop,
    latestPosts,
    featuredPostRow,
    listSlotOne,
    listSlotTwo,
    newPostsForYou,
    listSlotThree,
    listSlotFour,
    listSlotFive,
    topicsForYou } = userContent



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
        {userContent.latestPosts.length > 0 && (
          <div className="hidden sm:block">
            <HomeTopFeaturePost {...userContent.latestPosts[0]} />
          </div>
        )}
        {userContent.latestPosts.length > 0 && (
          <div className="w-full sm:hidden">
            <TopImgPost noBorder {...userContent.latestPosts[0]} showType />
          </div>
        )}
        <LatestSection latestPosts={latestPosts} latestSlug={ac_strings.slug_latest} />
        {userContent.featuredPostRow && <FeatureSection featuredPosts={userContent.featuredPostRow.map(item => ({ ...item, likes: 23 }))} />}
        <LowerSections
          lists={[
            listSlotOne,
            listSlotTwo,
            listSlotThree,
            listSlotFour,
            listSlotFive
          ]}
          newPostsForYou={newPostsForYou}
          topicsForYou={topicsForYou}
          popularPosts={popularPosts}
        />
        <LazyLoad>
          <div className="grid-2 my-4 mx-4 hidden sm:grid">
            {latestPosts.slice(1).map((item, i) => {
              return (
                <div className={`div${i + 1}`}>
                  < TopImgPost {...item} showType />
                </div>
              )
            })}
            <FeaturedCard className="bg-blue-800" {...latestPosts[0]} likes={99} />
          </div>
        </LazyLoad>
        <LazyLoad >
          <div className="grid-home-end sm:mx-4">
            <div className="div1">
              {infinitePosts.map((item, i) => {
                return (
                  <div className={`mt-6 sm:mt-8 mx-4 sm:mr-10 sm:ml-0 div-post`}>
                    <RightImgWDes key={i} {...item} />
                  </div>
                )
              })}
            </div>


            <div className="div2 overflow-hidden mt-12 hidden sm:block">
              <FollowUs />
            </div>
          </div>
        </LazyLoad>
        <div className="w-full flex justify-center py-16">
          <OutlineButton name={ac_strings.showMore} onClick={showMorePosts} />

        </div>

      </Placeholder>

    </div>

  )
}

export default IndexPage

export const pageQuery = graphql`{
    allAcNodeSetting {
      nodes {
        popular_posts
        featured_posts
        about
      }
    }
  
  }
`
