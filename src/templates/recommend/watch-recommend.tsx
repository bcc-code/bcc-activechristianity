import * as React from 'react'
import LazyLoad from '@/components/LazyLoad';

import MetaTag from '@/components/Meta'
import XScroll from '@/components/HorizontalScroll/BaseLarge'
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import VideoTopImg from '@/components/PostItemCards/VideoTopImg'
import VideoRow4Col from '@/components/List/Combo/VideoRow4Col-HorizontalScroll'
import { LayoutH1Wide, SectionTitleDesktopAndMobile } from '@/components/Headers'
import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'
import { INavItemCount, ISubtopicLinks, IRecommendationPage, IPostItem } from '@/types'

import { getRandomArray, getRandomFeatured } from "@/helpers/normalizers"
import ac_strings from '@/strings/ac_strings.js'


const Watch: React.FC<IProps> = (props) => {

    const { pageContext } = props

    const { title, items, latest, popular, featured, pagePath } = pageContext

    const latestSlug = `${pagePath}/${ac_strings.slug_latest}`
    const mixedFeaturedPosts = getRandomFeatured({ latest, popular, featured })

    return (
        <div>
            <MetaTag title={title} type="page" breadcrumb={[]} path={pagePath} />
            <div className="hidden sm:block standard-max-w">
                <LayoutH1Wide title={title} />
                <div className="px-4">
                    <LazyLoad >
                        {mixedFeaturedPosts[0] && <HeaderSection headerPost={mixedFeaturedPosts[0]} listPosts={popular.slice(0, 5)} />}
                    </LazyLoad>
                </div>
            </div>
            <div className="sm:hidden" style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>
                <div className="w-full py-6">

                    <SectionTitleDesktopAndMobile
                        name={ac_strings.featured}
                    />
                    <XScroll
                        items={mixedFeaturedPosts.map((p) => (<VideoTopImg  {...p} />
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
                {/*                 <div className="w-full pt-4">
                    <SectionTitleDesktopAndMobile
                        name={ac_strings.popular}
                    />
                    <HSCardListVideo posts={popular.slice(0, 5)} />
                </div> */}
                <FetchTopicPostItems
                    topics={items.map(f => ({ name: f.name, slug: `${f.typeSlug}/${f.formatSlug}`, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => {
                        return (
                            <div>

                                {topicPostItems.map(item => (
                                    <VideoRow4Col
                                        key={item.slug}
                                        name={item.name}
                                        slug={item.slug}
                                        posts={getRandomArray(item.posts, item.posts.length)}
                                    />

                                ))}
                            </div>
                        )
                    }}
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
