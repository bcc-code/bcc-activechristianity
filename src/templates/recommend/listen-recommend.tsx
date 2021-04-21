import React from "react"
import loadable from '@loadable/component'
import MetaTag from '@/components/Meta'
import ByCatergories from '@/layout-parts/RecommendLayout/ByCategoriesMobile'
import { FetchLatestPodcast, FetchLatestPlaylists } from '@/HOC/FetchLatest'
import HSPlaylist from '@/components/HorizontalScroll/HSPlaylist'
const HSCardList = loadable(() => import('@/components/HorizontalScroll/HSCardList'))
import { PageSectionHeader } from '@/components/Headers'
import LazyLoad from '@/components/LazyLoad';
const RecommendDesktopLayout = loadable(() => import('@/layouts/RecommendListenDesktopLayout'))
import RightImgWDes from '@/components/PostItemCards/RightImg'
import { UnderlineLinkViewAll } from '@/components/Button'

import { INavItem, INavItemCount, ISubtopicLinks, IPostItem, IRecommendationPage } from '@/types'
import podcastProperties from '@/strings/static/podcastProperties'
import { getRandomArray, getRandomFeatured } from "@/helpers/normalizers"
// helper

import ac_strings from '@/strings/ac_strings.js'
// types'

const Listen: React.FC<IProps> = (props) => {

    const { pageContext, path, } = props

    const { title, items, latest, popular, featured, playlist, podcast } = pageContext

    const allCategories: INavItem[] = [...items.map(t => ({ ...t, to: `${t.typeSlug}/${t.formatSlug}` }))]

    if (playlist && playlist.to) {
        allCategories.push(playlist)
    }

    if (podcast && podcast.to) {
        allCategories.push(podcast)
    }

    const latestSlug = `${path}/${ac_strings.slug_latest}`


    const mixedFeaturedPosts = getRandomFeatured({ latest, popular, featured })

    const hasPlaylist = process.env.LISTEN_SECTION === "all"
    const hasPodcast = process.env.LISTEN_SECTION === "all" || process.env.LISTEN_SECTION === "podcast_only"
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640
    return (
        <div >
            <MetaTag title={title} breadcrumb={[]} type="page" path={path} />

            <div className="sm:hidden">
                {/*                 {hasPodcast && (
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
                )} */}
                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                    <div className="w-full py-6 sm:hidden">

                        <PageSectionHeader title={ac_strings.featured} className="pb-4" />
                        <HSCardList posts={mixedFeaturedPosts} />
                    </div>
                </div>
                {hasPlaylist && (
                    <div className="py-6">
                        <div className="w-full flex justify-between items-center  pb-4 pr-4">
                            <PageSectionHeader title={playlist.name} />
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
                )}



                <LazyLoad>
                    <div className="py-6">
                        <PageSectionHeader title={ac_strings.latest} />
                        <div className=" px-4">
                            {latest.map((p, k) => <RightImgWDes key={k} {...p} />)}
                            <div className="w-full flex justify-center items-center py-4">

                                <UnderlineLinkViewAll to={`${latestSlug}`} />
                            </div>
                        </div>


                    </div>
                    <ByCatergories
                        title={ac_strings.categories}
                        types={allCategories}
                    />
                </LazyLoad>
            </div>
            {isMobile !== true && (
                <RecommendDesktopLayout
                    playlist={playlist}
                    podcast={podcast}
                    latestSlug={latestSlug}
                    popularPosts={popular}
                    topics={allCategories}
                    name={title}
                    latestPosts={latest}
                    featured={mixedFeaturedPosts}
                />
            )}

        </div>
    )
}

export default Listen

interface IPageContext extends IRecommendationPage {
    playlist: INavItemCount
    podcast: INavItemCount
    info: INavItemCount
    items: ISubtopicLinks[]
    menu: INavItemCount[]
}
interface IProps {
    pageContext: IPageContext
    path: string
}
