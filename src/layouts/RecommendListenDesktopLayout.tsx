import React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByCategoriesDesktop'))
const ExclusiveContent = loadable(() => import('@/layout-parts/Banner/ExclusiveContent'))
const LatestDesktopRow = loadable(() => import('@/layout-parts/List/Combo/Latest'))
const PostMultiColLayout = loadable(() => import('@/layout-parts/List/PostMultiColLayout'))
import getFormatsDesktopLayout from '@/layout-parts/RecommendLayout/getPostsLayout'
import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'
import PostRow from '@/layout-parts/List/PostRow4Col'

import { FetchLatestPodcast, FetchLatestPlaylists } from '@/HOC/FetchLatest'

import { LayoutH1Wide, UnderlineTitleLink } from '@/components/Headers'
import FeaturedCard from '@/components/PostItemCards/FeaturedCard'
import { ISubtopicLinks, IPlaylist, INavItem, IPostItem } from "@/types"
import { playlistToPost, getRandomArray } from '@/helpers'
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

    return (
        <div className="hidden sm:block">
            <LayoutH1Wide title={name} />


            <div className="standard-max-w-px">
                {featured[0] ? <HeaderSection headerPost={featured[0]} listPosts={popularPosts.slice(0, 5)} /> : <div></div>}

            </div>

            {playlist && (
                <LazyLoad>
                    <div className="standard-max-w-px">
                        <UnderlineTitleLink    {...playlist} />
                        <FetchLatestPlaylists
                            layout="row"
                            render={({ playlists }) => {
                                return (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 grid-h pt-8 pb-16">

                                        {getRandomArray(playlists, 4).map((p, i) => {
                                            const post = playlistToPost(p)
                                            return (
                                                <div className={`div${i + 1}`} key={shortId()}>
                                                    < FeaturedCard {...post} type="playlist" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }}

                        />

                    </div>
                </LazyLoad>
            )}
            {podcast && (
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
                    topics={topics.map(f => ({ name: f.name, slug: f.to, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => {
                        const { postsByTypesRow1, postsByTypesRow2 } = getFormatsDesktopLayout(topicPostItems)
                        return (
                            (

                                <div className="standard-max-w-px pb-6">
                                    <ByTaxonomies types={topics} title={ac_strings.byCategories} />
                                    <PostMultiColLayout types={postsByTypesRow1} />
                                    <PostMultiColLayout types={postsByTypesRow2} />
                                </div>



                            )
                        )
                    }}

                />
            </LazyLoad>
            {/*             <ExclusiveContent /> */}

        </div>
    )
}

export default RecommendLayout