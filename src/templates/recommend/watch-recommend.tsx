import * as React from 'react'
import LazyLoad from '@/components/LazyLoad';

import MetaTag from '@/components/Meta'
import XScroll from '@/layout-parts/HorizontalScroll/BaseLarge'
import HSCardListVideo from '@/layout-parts/HorizontalScroll/HSCardListVideo'
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import VideoTopImg from '@/components/PostItemCards/VideoTopImg'
import VideoRow4Col from '@/layout-parts/List/Combo/VideoRow4Col-HorizontalScroll'
import { LayoutH1Wide, SectionTitleDesktopAndMobile } from '@/components/Headers'
import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'
import { INavItemCount, ISubtopicLinks, IRecommendationPage } from '@/types'

import { getRandomArray, processRecommendationContext } from "@/helpers"
import ac_strings from '@/strings/ac_strings.js'


const Watch: React.FC<IProps> = (props) => {

    const { pageContext, path } = props

    const { title, items, popularPosts, featuredPosts, latestPosts } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`
    const { featured, featuredMixed, latest, popular } = processRecommendationContext({ popularPosts, featuredPosts, latestPosts })
    return (
        <div>
            <MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={[]} path={path} />
            <div className="hidden sm:block standard-max-w-px">
                <LayoutH1Wide title={title} />
                <LazyLoad >
                    {featuredMixed[0] && <HeaderSection headerPost={featuredMixed[0]} listPosts={popular.slice(0, 5)} />}
                </LazyLoad>
            </div>
            <div className="sm:hidden" style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>
                <div className="w-full py-6">

                    <SectionTitleDesktopAndMobile
                        name={ac_strings.featured}
                    />
                    <XScroll
                        items={featuredMixed.map((p) => (<VideoTopImg  {...p} />
                        ))}
                    />
                </div>

            </div>
            <div className="">
                <VideoRow4Col
                    name={ac_strings.latest}
                    posts={latest}
                    slug={latestSlug}
                />
                <div className="w-full pt-4">
                    <SectionTitleDesktopAndMobile
                        name={ac_strings.popular}
                    />
                    <HSCardListVideo posts={popular.slice(0, 5)} />
                </div>
                <FetchTopicPostItems
                    topics={items.map(f => ({ name: f.name, slug: `${f.to}`, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => (
                        <div>

                            {topicPostItems.map(item => (
                                <VideoRow4Col
                                    name={item.name}
                                    slug={item.slug}
                                    posts={getRandomArray(item.posts, item.posts.length)}
                                />

                            ))}
                        </div>
                    )}

                />
            </div>

        </div>
    )

}

export default Watch

interface IPageContext extends IRecommendationPage {
    info: INavItemCount
    items: ISubtopicLinks[]
    menu: INavItemCount[]
}

interface IProps {
    pageContext: IPageContext
    path: string
}
