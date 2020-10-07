import React from "react"
import MetaTag from '@/components/Meta'
import LazyLoad from '@/components/LazyLoad';
import { UnderlineLinkViewAll } from '@/components/Button'
import FetchPosts from '@/HOC/FetchPosts'
import FetchPostList from '@/HOC/FetchPostList'
import loadable from '@loadable/component'
import ac_strings from '@/strings/ac_strings.json'
import { useSelector } from "react-redux";
import { getRandomArray } from "@/helpers"
const HSCardList = loadable(() => import('@/layout-parts/HorizontalScroll/HSCardList'))
const RecommendDesktopLayout = loadable(() => import('@/layouts/RecommendDesktopLayout'))
import ByCatergories from '@/layout-parts/RecommendLayout/ByCategoriesMobile'
import { INavItem, IPostItem, INavItemCount, ISubtopicLinks } from '@/types'
import { IRootState } from '@/state/types'
import FetchTopicPostItems from '@/HOC/FetchTopicWithPostItems'
import ScrollNavTabs from '@/components/Tabs/ScrollNavTabs'
import RightImg from '@/components/PostItemCards/RightImg'
import { PageSectionHeader } from '@/components/Headers'
import { GetFeaturedPostsForTopic } from '@/layout-parts/PostSections'
const Read: React.FC<IProps> = (props) => {
    const { loggedIn } = useSelector((state: IRootState) => state.auth)
    const { pageContext, path } = props
    const { title, menu, info, items, mostPopular, featuredPosts } = pageContext

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

            <div className="sm:hidden">


                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                    <div className="w-full pb-4 pt-8">
                        <PageSectionHeader title={ac_strings.featured} className="pb-4" />
                        <GetFeaturedPostsForTopic
                            latestSlug={latestSlug}
                            featuredPosts={featuredPosts}
                            popularPosts={mostPopular.slice(0, 5)}
                        />


                    </div>
                </div>



                <LazyLoad>
                    <FetchTopicPostItems
                        topics={items.map(f => ({ name: f.name, slug: `${f.to}`, id: '' }))}
                        layout="list"
                        render={({ topicPostItems }) => {
                            return (
                                <ScrollNavTabs tabs={topicPostItems.map(item => ({
                                    name: item.name,
                                    to: item.slug,
                                    content: (
                                        <div>
                                            {getRandomArray(item.posts, 3).map(p => {
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
                            )
                        }}

                    />
                </LazyLoad>
                <LazyLoad>
                    {loggedIn !== "success" ? (
                        <>
                            <div className="bg-d4slate-lighter py-6 overflow-hidden">
                                <PageSectionHeader title={ac_strings.popular} />
                                <FetchPosts
                                    slugs={mostPopular.slice(0, 5)}
                                    layout="row"
                                    render={({ posts }) => {
                                        return (<HSCardList posts={posts} />)
                                    }}
                                />

                            </div>


                            <FetchPostList
                                slug={latestSlug}
                                layout="row" render={({ posts }) => {
                                    return (
                                        <div className="py-6">
                                            <PageSectionHeader title={ac_strings.latest} />
                                            <div className="px-4 ">
                                                {posts.slice(0, 3).map(p => {
                                                    return (
                                                        <RightImg {...p} />
                                                    )
                                                })}
                                            </div>
                                            <div className="w-full flex justify-center py-6">
                                                <UnderlineLinkViewAll to={`${latestSlug}`} />
                                            </div>
                                        </div>
                                    )

                                }}
                            />

                        </>
                    ) : (
                            <>
                                <div className="bg-d4slate-lighter py-6 overflow-hidden">

                                    <div className="w-full flex justify-between items-center py-6 pr-4">
                                        <PageSectionHeader title={ac_strings.latest} />
                                        <UnderlineLinkViewAll to={`${latestSlug}`} />
                                    </div>
                                    <FetchPostList
                                        slug={latestSlug}
                                        layout="row" render={({ posts }) => {
                                            return (<HSCardList posts={posts} />)
                                        }}
                                    />

                                </div>
                                <FetchPosts
                                    slugs={mostPopular.slice(0, 5)}
                                    layout="row"
                                    render={({ posts }) => {
                                        return (
                                            <div className=' py-6'>
                                                <PageSectionHeader title={ac_strings.popular} />
                                                <div className="px-4">

                                                    {posts.slice(0, 3).map(p => {
                                                        return (
                                                            <RightImg {...p} />
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    }}
                                />

                            </>
                        )}

                    <ByCatergories
                        title="By Categories"
                        types={items}
                    />
                </LazyLoad>
            </div>
            <RecommendDesktopLayout
                latestSlug={latestSlug}
                popularPosts={mostPopular}
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
        mostPopular: string[]
        featuredPosts: string[]

    }
    path: string
}
