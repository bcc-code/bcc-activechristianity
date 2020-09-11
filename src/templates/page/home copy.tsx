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
import { OutlineButton } from '@/components/Buttons'
import LowerSections from '@/layout-parts/Home/LowerSections'
import MetaTag from '@/components/Meta'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
const RightImgWDes = loadable(() => import('@/components/PostItem/RightImgWDes'))
import TopImgPost from '@/components/PostItem/TopImg'

// Type
import { IRootState } from '@/state/types'
import { IPostItem, ITopic, IEbook, INavItem } from '@/types'
import { INewForYou } from '@/layout-parts/Home/NewForYou'
import { IPostListSection } from '@/layout-parts/Home/PostListSection'

// Helpers
import { blog as blogApi, auth } from '@/util/sdk'
import { fetchPostslistFromArchivePage, fetchLocalPostsFromSlugs, fetchLatestEbooks, fetchLatestPlaylists } from '@/helpers/fetchLocalData'
import { ebookResToPost, playlistToPost } from '@/helpers'
import TS from '@/strings'
import languages from '@/strings/languages.json'
import ac_strings from '@/strings/ac_strings.json'
import User from "@/layout-parts/User/UserInitial";




interface IUserContent {
  featuredPostTop: IPostItem | undefined
  featuredPostRow: IFeaturedCard[]
  listSlotOne: IPostListSection | undefined
  listSlotTwo: IPostListSection | undefined
  newPostsForYou: INewForYou[],
  listSlotThree: IPostListSection | undefined
  listSlotFour: IPostListSection | undefined
  topicsForYou: INavItem[]
  listSlotFive: IPostListSection | undefined
  listSlotSix: IPostListSection | undefined
  listSlotSeven: IPostListSection | undefined
  popularPosts: IPostItem[]
  listSlotEight: IPostListSection | undefined
  listSlotNine: IPostListSection | undefined
  listSlotTen: IPostListSection | undefined
  featuredPodcast: IPostItem | undefined
  featuredEbook: IEbook | undefined
}

const defaultUserContent: IUserContent = {
  featuredPostTop: undefined,
  featuredPostRow: [],
  listSlotOne: undefined,
  listSlotTwo: undefined,
  newPostsForYou: [],
  listSlotThree: undefined,
  listSlotFour: undefined,
  topicsForYou: [],
  listSlotFive: undefined,
  listSlotSix: undefined,
  listSlotSeven: undefined,
  popularPosts: [],
  listSlotEight: undefined,
  listSlotNine: undefined,
  listSlotTen: undefined,
  featuredPodcast: undefined,
  featuredEbook: undefined
}

const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props
  console.log(pageContext)
  const {
    featuredPosts: featuredPostsSlug,
    popularTopics: popularTopics,
    popularPosts: popularPostsSlug
  } = pageContext
  const [latestPageNr, setLatestPageNr] = React.useState(1)
  const { bookmarkedPosts, historyPosts } = useSelector((state: IRootState) => state.userLibrary)
  const { loggedIn } = useSelector((state: IRootState) => state.auth)
  const [infinitePosts, setInfinitePosts] = React.useState<IPostItem[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isFetchingMore, setIsFetchingMore] = React.useState(false)
  const [userContent, setUserContent] = React.useState<IUserContent>({ ...defaultUserContent })

  const latestSlug = `${ac_strings.slug_latest}`
  React.useEffect(() => {
    setIsLoading(true)
    Promise.all([
      fetchPostslistFromArchivePage(latestSlug),
      fetchPostslistFromArchivePage(`${latestSlug}/${latestPageNr + 1}`),
      fetchLocalPostsFromSlugs(featuredPostsSlug),
      fetchLocalPostsFromSlugs(popularPostsSlug.slice(0, 8)),
      Promise.all(popularTopics
        .map(t => fetchLocalPostsFromSlugs(t.posts)
          .then(res => {
            if (res) {
              return (
                ({ name: t.name, to: t.to, posts: res })
              )
            }
          })
        )),
      fetchLatestEbooks(), //6
      fetchLatestPlaylists(), // 7
    ],

    ).then(res => {
      const content = {
        ...userContent
      }
      const latest1 = res[0]
      const latest2 = res[1]
      const featured = res[2]
      const popular = res[3]
      const topics = res[4]
      const ebooks = res[5]
      const playlists = res[6]

      let latest: IPostItem[] = []
      const featuredRowMix: IFeaturedCard[] = []
      if (latest1) {
        latest = [...latest1]
      }

      if (latest2) {
        latest.push(...latest2)
      }
      if (featured) {
        content.featuredPostTop = featured[0]
        /* content.featuredPostRow = featured.slice(1, 6) */
        featuredRowMix.push({ ...featured[1], likes: 23 }, { ...featured[2], likes: 23 })
      }
      if (popular) {
        content.popularPosts = popular
      }

      if (ebooks) {
        featuredRowMix.push({ ...ebookResToPost(ebooks[0]), likes: 23, type: "ebook" })
      }

      if (playlists) {
        featuredRowMix.push({ ...playlistToPost(playlists[0]), likes: 23, type: "playlist" })
      }
      if (topics) {
        const toAddTopics: INavItem[] = []
        topics.forEach(t => {
          if (t) {
            toAddTopics.push({ name: t.name, to: t.to })
          }
        })
        content.topicsForYou = toAddTopics
        const row1 = topics[0]
        const row2 = topics[1]
        const row3 = topics[2]
        const row4 = topics[3]
        const row5 = topics[4]
        const row6 = topics[5]
        const row7 = topics[6]
        const row8 = topics[7]
        const row9 = topics[8]
        const row10 = topics[9]
        if (row1) { content.listSlotOne = getPopularTopic(row1) }
        if (row2) { content.listSlotTwo = getPopularTopic(row2) }
        if (row3) { content.listSlotThree = getPopularTopic(row3) }
        if (row4) { content.listSlotFour = getPopularTopic(row4) }
        if (row5) { content.listSlotFive = getPopularTopic(row5) }
        if (row6) { content.listSlotSix = getPopularTopic(row6) }
        if (row7) { content.listSlotSeven = getPopularTopic(row7) }
        if (row8) { content.listSlotEight = getPopularTopic(row8) }
        if (row9) { content.listSlotNine = getPopularTopic(row9) }
        if (row10) { content.listSlotTen = getPopularTopic(row10) }
      }
      content.featuredPostRow = featuredRowMix
      setLatestPageNr(latestPageNr + 1)
      setInfinitePosts(latest)
      setUserContent(content)
      setIsLoading(false)
    })
  }, [loggedIn, path])

  const showMorePosts = () => {

    if (latestPageNr > 0) {
      setIsFetchingMore(true)
      const nextPage = latestPageNr + 1
      setLatestPageNr(latestPageNr + 1)
      fetchPostslistFromArchivePage(`${latestSlug}/${nextPage}`)
        .then(res => {
          if (res) {

            setInfinitePosts([...infinitePosts, ...res])
            setIsFetchingMore(false)
          }
        })
    }

  }

  /*   React.useEffect(() => {
      console.log(path)
      console.log('updating user')
      getUserContent()
    }, [loggedIn, path, featuredPostsSlug, popularPosts])
  
   */

  const {
    featuredPostTop,
    featuredPostRow,
    popularPosts,
    listSlotOne,
    listSlotTwo,
    newPostsForYou,
    listSlotThree,
    listSlotFour,
    listSlotFive,
    listSlotSix,
    topicsForYou } = userContent

  const latest1 = infinitePosts.slice(0, 6)
  const latest2 = infinitePosts.slice(6, 12)
  const latest3 = infinitePosts.slice(12)
  return (

    <div className="standard-max-w">
      <MetaTag
        path={path}
        title={`${TS.site_title} - ${TS.tagline}`}
        type="website"
        translatedUrls={[]}
        breadcrumb={[]}
      />
      <Placeholder loading={loggedIn == "loading" || isLoading === true}>
        {featuredPostTop !== undefined && (
          <div className="hidden sm:block">
            <HomeTopFeaturePost {...featuredPostTop} />
          </div>
        )}
        {featuredPostTop !== undefined && (
          <div className="w-full sm:hidden">
            <TopImgPost noBorder  {...featuredPostTop} showType />
          </div>
        )}
        <LatestSection latestPosts={latest1} latestSlug={ac_strings.slug_latest} />
        {featuredPostRow && <FeatureSection featuredPosts={featuredPostRow.map(item => ({ ...item, likes: 23 }))} />}
        <LowerSections
          lists={[
            listSlotOne,
            listSlotTwo,
            listSlotThree,
            listSlotFour,
            listSlotFive,

          ]}
          newPostsForYou={newPostsForYou}
          topicsForYou={topicsForYou}
          popularPosts={popularPosts}
        />
        <LazyLoad>
          <div className="grid-2 my-4 mx-4 hidden sm:grid">
            {latest2.map((item, i) => {
              return (
                <div className={`div${i + 1}`}>
                  < TopImgPost {...item} showType />
                </div>
              )
            })}

          </div>
        </LazyLoad>
        <LazyLoad >
          <div className="grid-home-end sm:mx-4">
            <div className="div1">
              {latest3.map((item, i) => {
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
          <OutlineButton name={isFetchingMore ? ac_strings.loading : ac_strings.showMore} onClick={showMorePosts} />

        </div>

      </Placeholder>

    </div>

  )
}

export default IndexPage

const getPopularTopic = (topic: IPopularTopic) => {
  return ({
    posts: topic.posts.slice(0, 1),
    header: topic.name,
    subHeader: ac_strings.popularTopic

  })
}

interface IHomeProps {
  path: string
  pageContext: {

    featuredPosts: string[]
    popularPosts: string[]
    popularTopics: IPopularTopicContext[]

  }

}

interface IPopularTopicContext {
  name: string
  to: string
  posts: string[]
}

interface IPopularTopic {
  name: string
  to: string
  posts: IPostItem[]
}