import React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByTaxonomies'))
const ExclusiveContent = loadable(() => import('@/layout-parts/Banner/ExclusiveContent'))
const LatestDesktopRow = loadable(() => import('@/layout-parts/List/Latest'))
const PostsByTypes = loadable(() => import('@/layout-parts/RecommendLayout/PostsByTypes'))
import FetchTopicPostItems from '@/layout-parts/HOC/FetchTopicWithPostItems'
import FetchPosts from '@/layout-parts/HOC/FetchPosts'
import FetchPostList from '@/layout-parts/HOC/FetchPostList'
import { LayoutH1Wide } from '@/layout-parts'
import getFormatsDesktopLayout from '@/layout-parts/RecommendLayout/getPostsLayout'

import { ISubtopicLinks } from "@/types"
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'
import '@/styles/react-tabs.css'


interface IRecommandLayout {
    name: string
    latestSlug: string
    popularPosts: string[]
    topics: ISubtopicLinks[]

}

const RecommendLayout: React.FC<IRecommandLayout> = ({
    name,
    popularPosts,
    topics,
    latestSlug
}) => {


    return (
        <div className="hidden sm:block">
            <LayoutH1Wide title={name} />


            <div className="standard-max-w-px">
                <LazyLoad >
                    <FetchPosts
                        slugs={popularPosts}
                        layout="list"
                        render={({ posts }) => {
                            return <HeaderSection headerPost={posts[5]} listPosts={posts.slice(0, 5)} />
                        }}
                    >

                    </FetchPosts>
                </LazyLoad>
            </div>
            <LazyLoad >
                <FetchPostList
                    slug={latestSlug}
                    layout="row" render={({ posts }) => {
                        return (<LatestDesktopRow posts={posts} latestSlug={latestSlug} />)
                    }}
                />
            </LazyLoad>

            <LazyLoad >
                <FetchTopicPostItems
                    topics={topics.map(f => ({ name: f.name, slug: `${TS.slug_topic}/${f.to}`, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => {
                        const { postsByTypesRow1, postsByTypesRow2 } = getFormatsDesktopLayout(topicPostItems)
                        return (
                            (

                                <div className="standard-max-w-px pb-6">
                                    <PostsByTypes types={postsByTypesRow1} />
                                    <ByTaxonomies types={topics} title={ac_strings.exploreType} />
                                    <PostsByTypes types={postsByTypesRow2} />
                                </div>



                            )
                        )
                    }}

                />
            </LazyLoad>
            <ExclusiveContent />

        </div>
    )
}

export default RecommendLayout