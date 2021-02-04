import React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByCategoriesDesktop'))
const LatestDesktopRow = loadable(() => import('@/components/List/Combo/Latest'))
const PostMultiColLayout = loadable(() => import('@/components/List/PostMultiColLayout'))
import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow'
import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'
import { LayoutH1 } from '@/components/Headers'
import getFormatsDesktopLayout from '@/layout-parts/RecommendLayout/getPostsLayout'

import { ISubtopicLinks, INavItem, IPostItem } from "@/types"

import ac_strings from '@/strings/ac_strings.js'

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

            <LazyLoad >
                <FetchTopicPostItems
                    topics={topics.map(f => ({ name: f.name, slug: f.to, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => {
                        const { postsByTypesRow1, postsByTypesRow2 } = getFormatsDesktopLayout(topicPostItems)
                        return topics.length > 1 ? (


                            <div className="standard-max-w-px pb-6">

                                <PostMultiColLayout types={postsByTypesRow1} />
                                <ByTaxonomies types={topics} title={ac_strings.categories} />
                                <PostMultiColLayout types={postsByTypesRow2} />
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