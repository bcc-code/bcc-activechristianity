import React from 'react'
import loadable from '@loadable/component'
import MetaTag from '@/components/Meta'
import LazyLoad from '@/components/LazyLoad';
import FetchTopicPostItems from '@/HOC/FetchTopicWithPostItems'
import FetchPosts from '@/HOC/FetchPosts'
import FetchPostList from '@/HOC/FetchPostList'
const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBanner'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))
const RecommendDesktopLayout = loadable(() => import('@/layouts/RecommendDesktopLayout'))
import ScrollNavTabs from '@/components/Tabs/ScrollNavTabs'
import RightImgPostItem from '@/components/PostItemCards/RightImg'
import { LayoutH1Wide, PageSectionHeader } from '@/components/Headers'

import { UnderlineLinkViewAll } from '@/components/Button'

import { INavItem, ISubtopicLinks } from '@/types'

// Types 
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'

const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {

    const { pageContext, path } = props
    const {
        title,
        formats,
        breadcrumb,
        mostPopular
    } = pageContext


    const latestSlug = `${path}/1`

    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]} type="page"
                breadcrumb={breadcrumb}
                path={path}
            />

            <div className="sm:hidden">
                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>
                    <LayoutH1Wide
                        title={title}
                    />
                </div>
                <div className="w-full pb-4 pt-8">
                    <PageSectionHeader title={ac_strings.featured} />
                    <FetchPosts
                        slugs={mostPopular.slice(5)}
                        layout="row"
                        render={({ posts }) => {
                            return <FeaturedBanner featured={posts} />
                        }}
                    />
                </div>
                <div className="bg-d4slate-lighter sm:bg-transparent py-6 overflow-hidden">
                    <PageSectionHeader title={ac_strings.popular} />
                    <FetchPosts
                        slugs={mostPopular.slice(0, 5)}
                        layout="row"
                        render={({ posts }) => {
                            return (<TopImgHorizontalScroll posts={posts} />)
                        }}
                    />

                </div>


                <div className="sm:bg-transparent py-6 overflow-hidden">
                    <PageSectionHeader title={ac_strings.latest} />

                    <FetchPostList
                        slug={latestSlug}
                        layout="row" render={({ posts }) => {
                            return (<TopImgHorizontalScroll posts={posts} />)
                        }}
                    />

                </div>

                <LazyLoad>
                    <FetchTopicPostItems
                        topics={formats.map(f => ({ name: f.name, slug: `${TS.slug_topic}/${f.to}`, id: '' }))}
                        layout="list"
                        render={({ topicPostItems }) => (
                            <ScrollNavTabs tabs={topicPostItems.map(item => ({
                                name: item.name,
                                to: item.slug,
                                content: (
                                    <div>
                                        {item.posts.slice(0, 6).map(p => {
                                            return (
                                                <RightImgPostItem {...p} />
                                            )
                                        })}
                                        <div className="w-full flex justify-center py-6">
                                            <UnderlineLinkViewAll to={`${item.slug}`} />
                                        </div>
                                    </div>
                                )
                            }))} />
                        )}

                    />
                </LazyLoad>
            </div>
            <RecommendDesktopLayout
                latestSlug={latestSlug}
                popularPosts={mostPopular}
                topics={formats.map(f => ({ ...f, to: `${TS.slug_topic}/${f.to}` }))}
                name={title}


            />

        </div>
    )

}

export default TaxonomyPage
interface ITaxonomyPageProps {
    pageContext: {
        slug: string
        title: string
        breadcrumb: INavItem[]
        types: ISubtopicLinks[]
        formats: ISubtopicLinks[]
        mostPopular: string[]
    }
    path: string
}

