import React from "react"
import loadable from '@loadable/component'
import MetaTag from '@/components/Meta'
import SquareImage from '@/components/Images/Image1to1Rounded'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import XScroll from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import Link from '@/components/CustomLink'
import { INavItem, IPostsByFormat, IPostItem, IPlaylist, INavItemCount, ISubtopicLinks } from '@/types'
const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBannerVideo'))
const FeaturedBannerPosts = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBanner'))
const FeaturedBannerSmall = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBannerVideoSmall'))
import FetchPosts from '@/HOC/FetchPosts'
const LatestDesktopRow = loadable(() => import('@/layout-parts/List/Combo/Latest'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import { UnderlineLinkViewAll } from '@/components/Button'
import { PageSectionHeader } from '@/components/Headers'
import FetchTopicPostItems from '@/HOC/FetchTopicWithPostItems'

// helper

import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import ac_strings from '@/strings/ac_strings.json'
// types'

const Listen: React.FC<IProps> = (props) => {
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latest, setLatest] = React.useState<IPostItem[]>([])
    const [popular, setPopular] = React.useState<IPostItem[]>([])
    const [podcastEps, setPodcastEps] = React.useState<string[]>([])
    const [playlists, setPlaylist] = React.useState<IPlaylist[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const { pageContext, path, } = props

    const { title, breadcrumb, items, playlist, podcast } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`

    React.useEffect(() => {
        setIsLoading(true)
        Promise.all([
            fetchPostslistFromArchivePage(latestSlug).then(res => {
                if (res) {
                    setLatestPosts(res)
                    setIsLoading(false)
                }
            }),
            fetch(`/page-data/${podcast.to}/page-data.json`)
                .then(res => res.json())
                .then(res => {
                    const posts = res.result.data.ac.topics[0].posts.slice(0, 6).map(item => item.slug)
                    setPodcastEps(posts)
                }),

            fetch(`/page-data/${playlist.to}/page-data.json`)
                .then(res => res.json())
                .then(res => {
                    setPlaylist(res.result.data.ac.playlists)
                })
        ])


    }, [pageContext])


    const setLatestPosts = (posts: IPostItem[]) => {
        setHeaderPost(posts[0])
        setLatest(posts)
        setPopular(posts.slice(5, 10))
    }

    return (
        <div>
            <MetaTag title={title} translatedUrls={[]} breadcrumb={[]} type="page" path={path} />
            <Placeholder loading={isLoading || !headerPost}>
                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                    <div className="w-full pb-4 sm:hidden pt-8">
                        <PageSectionHeader title={ac_strings.featured} />
                        <FeaturedBanner featured={popular} />
                    </div>
                </div>
                <div className="py-6">
                    <FetchPosts

                        slugs={podcastEps}
                        layout="list"
                        render={({ posts }) => {
                            return (
                                <TopImgHorizontalScroll
                                    posts={posts}
                                />
                            )
                        }}

                    />
                </div>
                {/* {headerPost && (
                    <RecommendLayout
                        hideTitleOnMobile={true}
                        latestSlug={latestSlug}
                        name={title}
                        headerPost={headerPost}
                        latestPosts={latest}
                        popularPosts={popular}
                        postsByTypesRow1={desktopRow1}
                        postsByTypesRow2={desktopRow2}
                        postsByTypes={mobilePostRows}
                        postTypes={typeLinks}

                    />
                )} */}
                <PageSectionHeader title={ac_strings.playlist} />
                <XScroll
                    childeClassName="w-3/12 min-w-3/12"
                    items={playlists.map(({ title, excerpt, image, slug, }) => (
                        <Link
                            to={`${playlist.to}/${slug}`}
                            className="flex flex-col">
                            <SquareImage {...image} />
                            <div className="">{title}</div>
                        </Link>
                    ))}
                />
                <FetchTopicPostItems
                    topics={items.map(f => ({ name: f.name, slug: `${f.to}`, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => (
                        <div>

                            {topicPostItems.map(item => (
                                <div>
                                    <div className="w-full flex justify-between pt-6 pr-4">
                                        <PageSectionHeader title={item.name} />
                                        <UnderlineLinkViewAll to={`${item.slug}`} />

                                    </div>
                                    <FeaturedBannerSmall
                                        featured={item.posts.map(p => ({ title: p.title, excerpt: p.excerpt, image: p.image, slug: p.slug }))}
                                        smallTitle
                                    />
                                </div>

                            ))}
                        </div>
                    )}

                />
            </Placeholder>


        </div>
    )
}

export default Listen

interface IProps {
    pageContext: {
        title: string
        breadcrumb: INavItem[]
        playlist: INavItemCount
        podcast: INavItemCount
        info: INavItemCount
        items: ISubtopicLinks[]
        menu: INavItemCount[]

    }
    path: string
}
