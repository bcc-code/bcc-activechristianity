import React from "react"
import loadable from '@loadable/component'
import MetaTag from '@/components/Meta'

import { FetchPostsFromArchivePage } from '@/HOC/FetchPosts'
import ByCatergories from '@/layout-parts/RecommendLayout/ByCategoriesMobile'
import FetchTopicFeatured from '@/HOC/FetchFeaturedPostsForTopic.tsx'
import { FetchLatestPodcast, FetchLatestPlaylists } from '@/HOC/FetchLatest'
import HSPlaylist from '@/layout-parts/HorizontalScroll/HSPlaylist'
const HSCardList = loadable(() => import('@/layout-parts/HorizontalScroll/HSCardList'))
import { PageSectionHeader } from '@/components/Headers'
import LazyLoad from '@/components/LazyLoad';
const RecommendDesktopLayout = loadable(() => import('@/layouts/RecommendListenDesktopLayout'))
import RightImgWDes from '@/components/PostItemCards/RightImg'
import { UnderlineLinkViewAll } from '@/components/Button'

import { INavItem, INavItemCount, ISubtopicLinks } from '@/types'
import podcastProperties from '@/strings/podcastProperties'
import { getRandomArray } from "@/helpers"

// helper

import ac_strings from '@/strings/ac_strings.json'
// types'

const Listen: React.FC<IProps> = (props) => {

    const { pageContext, path, } = props
    const { title, items, playlist, podcast, mostPopular, featuredPosts } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`

    return (
        <div >
            <MetaTag title={title} translatedUrls={[]} breadcrumb={[]} type="page" path={path} />

            <div className="sm:hidden">
                <div className="py-6">
                    <div className="w-full flex justify-between items-center pb-4 pr-4">
                        <PageSectionHeader title={podcastProperties.title} />
                        <UnderlineLinkViewAll to={`${podcast.to}`} />
                    </div>
                    <FetchLatestPodcast
                        layout="row"
                        render={({ podcastEps }) => <HSCardList posts={podcastEps} />}

                    />
                </div>
                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                    <div className="w-full py-6 sm:hidden">

                        <PageSectionHeader title={ac_strings.featured} className="pb-4" />
                        <FetchTopicFeatured
                            latestSlug={latestSlug}
                            featuredPosts={featuredPosts}
                            popularPosts={mostPopular.slice(0, 5)}
                            render={({ posts }) => (
                                <HSCardList posts={posts} />
                            )}

                        />
                    </div>
                </div>
                <div className="py-6">
                    <div className="w-full flex justify-between items-center  pb-4 pr-4">
                        <PageSectionHeader title={ac_strings.playlist} />
                        <UnderlineLinkViewAll to={`${playlist.to}`} />
                    </div>

                    <FetchLatestPlaylists
                        layout="row"
                        render={({ playlists }) => {
                            const randomPlaylist = getRandomArray(playlists, playlists.length > 6 ? 6 : playlists.length)
                            return (<HSPlaylist playlists={randomPlaylist.map(p => ({ ...p, slug: `${playlist.to}/${p.slug}` }))} />)
                        }}
                    />
                </div>



                <LazyLoad>
                    <div className="py-6 px-4">
                        <PageSectionHeader title={ac_strings.latest} />
                        <FetchPostsFromArchivePage
                            slug={latestSlug}
                            layout="row" render={({ posts }) => {
                                return (
                                    <div className="px-4">
                                        {posts.map((p, k) => <RightImgWDes key={k} {...p} />)}
                                    </div>
                                )
                            }}
                        />
                        <div className="w-full flex justify-center items-center py-4">

                            <UnderlineLinkViewAll to={`${latestSlug}`} />
                        </div>

                    </div>
                    <ByCatergories
                        title={ac_strings.byCategories}
                        types={items}
                    />
                </LazyLoad>
            </div>
            <RecommendDesktopLayout
                playlist={playlist}
                podcast={podcast}
                latestSlug={latestSlug}
                popularPosts={mostPopular}
                topics={[playlist, podcast, ...items]}
                name={title}
            />

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
        mostPopular: string[]
        featuredPosts: string[]

    }
    path: string
}
