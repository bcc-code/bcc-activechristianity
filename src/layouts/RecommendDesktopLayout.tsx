import React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByCategoriesDesktop'))
const ExclusiveContent = loadable(() => import('@/layout-parts/Banner/ExclusiveContent'))
const LatestDesktopRow = loadable(() => import('@/layout-parts/List/Combo/Latest'))
const PostMultiColLayout = loadable(() => import('@/layout-parts/List/PostMultiColLayout'))
import PostRow from '@/layout-parts/List/PostRow4Col'
import FetctLatestPlaylists from '@/HOC/FetctLatestPlaylists'
import FetchLatestPodcast from '@/HOC/FetchLatestPodcast'
import FetchTopicPostItems from '@/HOC/FetchTopicWithPostItems'
import FetchPosts from '@/HOC/FetchPosts'
import FetchPostList from '@/HOC/FetchPostList'
import { LayoutH1Wide, UnderlineTitleLink } from '@/components/Headers'
import getFormatsDesktopLayout from '@/layout-parts/RecommendLayout/getPostsLayout'
import FeaturedCard from '@/components/PostItemCards/FeaturedCard'
import { ISubtopicLinks, IPlaylist, INavItem } from "@/types"
import { playlistToPost, getRandomArray } from '@/helpers'
import shortId from 'shortid'
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'
import '@/styles/react-tabs.css'


interface IRecommandLayout {
    listen?: {
        podcast: INavItem
        playlist: INavItem
    }
    name: string
    latestSlug: string
    popularPosts: string[]
    topics: ISubtopicLinks[]

}

const RecommendLayout: React.FC<IRecommandLayout> = ({
    name,
    popularPosts,
    topics,
    latestSlug,
    listen
}) => {

    return (
        <div className="hidden sm:block">
            <LayoutH1Wide title={name} />


            <div className="standard-max-w-px">
                <FetchPosts
                    slugs={popularPosts}
                    layout="list"
                    render={({ posts }) => {
                        const randomHeaderPost = getRandomArray(posts.slice(5), 1)
                        return randomHeaderPost[0] ? <HeaderSection headerPost={randomHeaderPost[0]} listPosts={posts.slice(0, 5)} /> : <div></div>
                    }}
                >

                </FetchPosts>
            </div>
            <FetchPostList
                slug={latestSlug}
                layout="row" render={({ posts }) => {
                    return (<LatestDesktopRow posts={posts} latestSlug={latestSlug} />)
                }}
            />
            {listen && listen.playlist && (
                <LazyLoad>
                    <div className="px-4"><UnderlineTitleLink    {...listen.playlist} /></div>
                    <FetctLatestPlaylists
                        slug={listen.playlist.to}
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
                        slug={listen.podcast.to}
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