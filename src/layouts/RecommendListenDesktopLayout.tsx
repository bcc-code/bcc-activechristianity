import React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByCategoriesDesktop'))
const LatestDesktopRow = loadable(() => import('@/layout-parts/List/Combo/Latest'))
const PostMultiColLayout = loadable(() => import('@/layout-parts/List/PostMultiColLayout'))
import getFormatsDesktopLayout from '@/layout-parts/RecommendLayout/getPostsLayout'
import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'
import PostRow from '@/layout-parts/List/PostRow4Col'
import TopImgPost from '@/components/PostItemCards/TopImg'
import PodcastTopImg from '@/components/PostItemCards/PlaylistTopImg'
import { FetchLatestPodcast, FetchLatestPlaylists } from '@/HOC/FetchLatest'

import { LayoutH1Wide, UnderlineTitleLink } from '@/components/Headers'
import { ISubtopicLinks, INavItem, IPostItem } from "@/types"
import { getRandomArray } from '@/helpers'
import shortId from 'shortid'
import ac_strings from '@/strings/ac_strings.js'

import '@/styles/react-tabs.css'


interface IRecommandLayout {

    name: string
    latestSlug: string
    podcast: INavItem
    playlist: INavItem
    topics: ISubtopicLinks[]
    featured: IPostItem[]
    latestPosts: IPostItem[]
    popularPosts: IPostItem[]

}

const RecommendLayout: React.FC<IRecommandLayout> = ({
    name,
    popularPosts,
    topics,
    latestSlug,
    playlist,
    podcast,
    latestPosts,
    featured
}) => {


    const hasPlaylist = process.env.LISTEN_SECTION === "all"
    const hasPodcast = process.env.LISTEN_SECTION === "all" || process.env.LISTEN_SECTION === "podcast_only"
    return (
        <div className="hidden sm:block">
            <LayoutH1Wide title={name} />


            <div className="standard-max-w-px">
                {featured[0] ? <HeaderSection headerPost={featured[0]} listPosts={popularPosts.slice(0, 5)} /> : <div></div>}

            </div>

            {hasPlaylist && (
                <LazyLoad>
                    <div className="standard-max-w-px">
                        <UnderlineTitleLink    {...playlist} />
                        <FetchLatestPlaylists
                            layout="row"
                            render={({ playlists }) => {
                                return (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 grid-h pb-16">

                                        {getRandomArray(playlists, 5).map((p, i) => {

                                            return (

                                                <PodcastTopImg
                                                    key={shortId()}
                                                    {...p}
                                                    slug={`${ac_strings.slug_playlist}/${p.slug}`}
                                                />
                                            )
                                        })}
                                    </div>
                                )
                            }}
                        />

                    </div>
                </LazyLoad>
            )}
            {hasPodcast && (
                <LazyLoad>
                    <div className="standard-max-w-px">
                        <UnderlineTitleLink {...podcast} />
                        <FetchLatestPodcast
                            layout="row"
                            render={({ podcastEps }) => {
                                return (
                                    <PostRow
                                        posts={podcastEps.slice(0, 4)}
                                    />
                                )
                            }}

                        />
                    </div>
                </LazyLoad>
            )}
            <LatestDesktopRow posts={latestPosts.slice(0, 4)} latestSlug={latestSlug} />
            <LazyLoad >
                <FetchTopicPostItems
                    topics={topics.map(f => ({ name: f.name, slug: `${f.typeSlug}/${f.formatSlug}`, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => {
                        const { postsByTypesRow1, postsByTypesRow2 } = getFormatsDesktopLayout(topicPostItems)
                        return topics.length > 1 ? (


                            <div className="standard-max-w-px pb-6">

                                <PostMultiColLayout types={postsByTypesRow1} />
                                {<ByTaxonomies types={topics} title={ac_strings.categories} />}
                                <PostMultiColLayout types={postsByTypesRow2} />
                            </div>
                        ) : topicPostItems[0] ? (
                            <div className="standard-max-w-px grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-6 pb-6">
                                {topicPostItems[0].posts.map(p => {
                                    return (
                                        <TopImgPost {...p} key={p.slug} />
                                    )
                                })}
                            </div>
                        ) : <div></div>

                    }}

                />
            </LazyLoad>
            {/*             <ExclusiveContent /> */}

        </div>
    )
}

export default RecommendLayout