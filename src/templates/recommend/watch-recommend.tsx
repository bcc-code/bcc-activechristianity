import * as React from 'react'
import loadable from '@loadable/component'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import { UnderlineLinkViewAll } from '@/components/Button'
import LazyLoad from '@/components/LazyLoad';
import FetchPostList from '@/HOC/FetchPostList'
import FetchPosts from '@/HOC/FetchPosts'
import MetaTag from '@/components/Meta'
import XScroll from '@/layout-parts/HorizontalScroll/BaseLarge'
import HSCardListVideo from '@/layout-parts/HorizontalScroll/HSCardListVideo'
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import VideoTopImg from '@/components/PostItemCards/VideoTopImg'
import VideoRow4Col from '@/layout-parts/List/Combo/VideoRow4Col-HorizontalScroll'
import { PageSectionHeader, LayoutH1Wide } from '@/components/Headers'
import FetchTopicPostItems from '@/HOC/FetchTopicWithPostItems'
import { INavItem, IPostItem, INavItemCount, ISubtopicLinks } from '@/types'

import ac_strings from '@/strings/ac_strings.json'



const Watch: React.FC<IProps> = (props) => {


    const { pageContext, path } = props
    const { title, items, menu, mostPopular } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`


    return (
        <div>
            <MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={[]} path={path} />
            <div className="hidden sm:block bg-white"> <LayoutH1Wide title={title} /></div>
            <div className="hidden sm:block px-4">
                <LazyLoad >
                    <FetchPosts
                        slugs={mostPopular.map(p => p.slug)}
                        layout="list"
                        render={({ posts }) => {
                            return <HeaderSection headerPost={posts[5]} listPosts={posts.slice(0, 5)} />
                        }}
                    >

                    </FetchPosts>
                </LazyLoad>

            </div>
            <div className="sm:hidden">
                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                    <div className="w-full py-6">
                        <PageSectionHeader title={ac_strings.featured} />
                        <FetchPosts
                            slugs={mostPopular.slice(5).map(p => p.slug)}
                            layout="row"
                            render={({ posts }) => (
                                <XScroll
                                    items={posts.map((p) => (<VideoTopImg  {...p} />
                                    ))}
                                />
                            )}
                        />
                    </div>

                </div>
                <div className="w-full py-6">
                    <PageSectionHeader title={ac_strings.popular} />
                    <FetchPosts
                        slugs={mostPopular.slice(0, 5).map(p => p.slug)}
                        layout="row"
                        render={({ posts }) => (
                            <HSCardListVideo posts={posts} />
                        )}
                    />
                </div>


            </div>
            <div className="py-6 overflow-hidden">

                <FetchPostList
                    slug={latestSlug}
                    layout="row" render={({ posts }) => (
                        <VideoRow4Col
                            name={ac_strings.latest}
                            posts={posts}
                            slug={latestSlug}
                        />
                    )}
                />

            </div>

            <FetchTopicPostItems
                topics={items.map(f => ({ name: f.name, slug: `${f.to}`, id: '' }))}
                layout="list"
                render={({ topicPostItems }) => (
                    <div>

                        {topicPostItems.map(item => (
                            <VideoRow4Col
                                {...item}
                            />

                        ))}
                    </div>
                )}

            />
        </div>
    )

}

export default Watch


interface IProps {
    pageContext: {
        title: string
        breadcrumb: INavItem[]
        info: INavItemCount
        items: ISubtopicLinks[]
        menu: INavItemCount[]
        mostPopular: {
            slug: string
            views: number
        }[]
    }
    path: string
}
