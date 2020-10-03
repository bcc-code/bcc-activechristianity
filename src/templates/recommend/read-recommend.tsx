import React from "react"
import MetaTag from '@/components/Meta'
import LazyLoad from '@/components/LazyLoad';
import { UnderlineLinkViewAll } from '@/components/Button'
import FetchPosts from '@/HOC/FetchPosts'
import FetchPostList from '@/HOC/FetchPostList'
import loadable from '@loadable/component'
import ac_strings from '@/strings/ac_strings.json'

const HSCardList = loadable(() => import('@/layout-parts/HorizontalScroll/HSCardList'))
const RecommendDesktopLayout = loadable(() => import('@/layouts/RecommendDesktopLayout'))

import { INavItem, IPostItem, INavItemCount, ISubtopicLinks } from '@/types'

import FetchTopicPostItems from '@/HOC/FetchTopicWithPostItems'
import ScrollNavTabs from '@/components/Tabs/ScrollNavTabs'
import RightImg from '@/components/PostItemCards/RightImg'
import { PageSectionHeader } from '@/components/Headers'

const Read: React.FC<IProps> = (props) => {
    console.log(props)

    const { pageContext, path } = props

    const { title, menu, info, items, mostPopular } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`

    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]}
                type="page"
                breadcrumb={[]}
                path={path}
            />



            <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                <div className="w-full pb-4 sm:hidden pt-8">
                    <PageSectionHeader title={ac_strings.featured} />
                    <FetchPosts
                        slugs={mostPopular.slice(5).map(p => p.slug)}
                        layout="row"
                        render={({ posts }) => {
                            return <HSCardList posts={posts} />
                        }}
                    />

                </div>
            </div>
            <div className="sm:bg-transparent py-6 overflow-hidden sm:hidden">
                <PageSectionHeader title={ac_strings.popular} />
                <FetchPosts
                    slugs={mostPopular.slice(0, 5).map(p => p.slug)}
                    layout="row"
                    render={({ posts }) => {
                        return <HSCardList posts={posts} />
                    }}
                />
            </div>
            <div className="sm:bg-transparent py-6 overflow-hidden">
                <PageSectionHeader title={ac_strings.latest} />

                <FetchPostList
                    slug={latestSlug}
                    layout="row" render={({ posts }) => {
                        return (<HSCardList posts={posts} />)
                    }}
                />

            </div>
            <LazyLoad>
                <FetchTopicPostItems
                    topics={items.map(f => ({ name: f.name, slug: `${f.to}`, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => {
                        console.log(topicPostItems)
                        return (
                            <div>
                                <div className="sm:hidden">
                                    <ScrollNavTabs tabs={topicPostItems.map(item => ({
                                        name: item.name,
                                        to: item.slug,
                                        content: (
                                            <div>
                                                {item.posts.slice(0, 6).map(p => {
                                                    return (
                                                        <RightImg {...p} />
                                                    )
                                                })}
                                                <div className="w-full flex justify-center py-6">
                                                    <UnderlineLinkViewAll to={`${item.slug}`} />
                                                </div>
                                            </div>
                                        )
                                    }))} />
                                </div>

                            </div>
                        )
                    }}

                />
            </LazyLoad>
            <RecommendDesktopLayout
                latestSlug={latestSlug}
                popularPosts={mostPopular.map(item => item.slug)}
                topics={items}
                name={title}


            />

        </div>
    )
}

export default Read


interface IProps {
    pageContext: {
        title: string
        breadcrumb: INavItem[]
        info: INavItemCount
        items: ISubtopicLinks[]
        menu: INavItemCount[]
        ebook: INavItemCount
        mostPopular: {
            slug: string
            views: number
        }[]

    }
    path: string
}
