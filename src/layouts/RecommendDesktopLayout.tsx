import React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByCategoriesDesktop'))
const ExclusiveContent = loadable(() => import('@/layout-parts/Banner/ExclusiveContent'))
const LatestDesktopRow = loadable(() => import('@/layout-parts/List/Combo/Latest'))
const PostMultiColLayout = loadable(() => import('@/layout-parts/List/PostMultiColLayout'))
import PostRow from '@/layout-parts/List/PostRow4Col'
import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow'
import { FetchLatestPlaylists, FetchLatestPodcast } from '@/HOC/FetchLatest'
import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'
import { UnderlineTitleLink, LayoutH1 } from '@/components/Headers'
import getFormatsDesktopLayout from '@/layout-parts/RecommendLayout/getPostsLayout'
import FeaturedCard from '@/components/PostItemCards/FeaturedCard'
import { ISubtopicLinks, IPlaylist, INavItem, IPostItem } from "@/types"
import { playlistToPost, getRandomArray } from '@/helpers'
import shortId from 'shortid'
import ac_strings from '@/strings/ac_strings.js'
import TS from '@/strings'
import '@/styles/react-tabs.css'


interface IRecommandLayout {
    topicId?: string
    listen?: {
        podcast: INavItem
        playlist: INavItem
    }
    name: string
    latestSlug: string
    featured: IPostItem[]
    latestPosts: IPostItem[]
    popularPosts: IPostItem[]
    topics: ISubtopicLinks[]

}

const RecommendLayout: React.FC<IRecommandLayout> = ({
    topicId,
    name,
    popularPosts,
    topics,
    latestSlug,
    listen,
    latestPosts,
    featured
}) => {
    console.log(topicId)
    return (
        <div className="hidden sm:block">
            <div className="standard-max-w-px flex justify-between items-between">
                <LayoutH1 title={name} />
                {topicId && <ToggleFollowOutlineBtn id={topicId} />}
            </div>
            <div className="standard-max-w-px">
                {featured[0] ? <HeaderSection headerPost={featured[0]} listPosts={popularPosts.slice(0, 5)} /> : <div></div>}
            </div>
            <LatestDesktopRow posts={latestPosts.slice(0, 4)} latestSlug={latestSlug} />
            {listen && listen.playlist && (
                <LazyLoad>
                    <div className="px-4">
                        <UnderlineTitleLink  {...listen.playlist} />
                    </div>
                    <FetchLatestPlaylists
                        layout="row"
                        render={({ playlists }) => {
                            return (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 grid-h pt-8 pb-16 px-4">

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


                </LazyLoad>
            )}
            {listen && listen.podcast && (
                <LazyLoad>
                    <div className="px-4"><UnderlineTitleLink    {...listen.podcast} /></div>
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


                </LazyLoad>
            )}
            <LazyLoad >
                <FetchTopicPostItems
                    topics={topics.map(f => ({ name: f.name, slug: f.to, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => {
                        console.log(topicPostItems)
                        const { postsByTypesRow1, postsByTypesRow2 } = getFormatsDesktopLayout(topicPostItems)

                        return (
                            (

                                <div className="standard-max-w-px pb-6">
                                    <PostMultiColLayout types={postsByTypesRow1} />
                                    <ByTaxonomies types={topics} title={ac_strings.byCategories} />
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