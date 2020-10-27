import * as React from 'react'
import LazyLoad from '@/components/LazyLoad';

import { FetchPostsFromSlugs, FetchPostsFromArchivePage } from '@/HOC/FetchPosts'
import FetchTopicFeatured from '@/HOC/FetchFeaturedPostsForTopic.tsx'

import MetaTag from '@/components/Meta'
import XScroll from '@/layout-parts/HorizontalScroll/BaseLarge'
import HSCardListVideo from '@/layout-parts/HorizontalScroll/HSCardListVideo'
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import VideoTopImg from '@/components/PostItemCards/VideoTopImg'
import VideoRow4Col from '@/layout-parts/List/Combo/VideoRow4Col-HorizontalScroll'
import { PageSectionHeader, LayoutH1Wide, SectionTitleDesktopAndMobile } from '@/components/Headers'
import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'
import { INavItem, INavItemCount, ISubtopicLinks } from '@/types'
import { IRootState } from '@/state/types'

import { getRandomArray } from "@/helpers"
import ac_strings from '@/strings/ac_strings.json'
import { useSelector } from "react-redux";


const Watch: React.FC<IProps> = (props) => {

    const { pageContext, path } = props
    const { title, items, mostPopular, featuredPosts } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`

    return (
        <div>
            <MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={[]} path={path} />
            <div className="hidden sm:block standard-max-w-px">
                <LayoutH1Wide title={title} />
                <LazyLoad >
                    {<FetchPostsFromSlugs
                        slugs={mostPopular}
                        layout="list"
                        render={({ posts }) => {
                            return posts[5] ? <HeaderSection headerPost={posts[5]} listPosts={posts.slice(0, 5)} /> : <div></div>
                        }}
                    />}
                </LazyLoad>
            </div>


            <div className="sm:hidden" style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                <div className="w-full py-6">

                    <SectionTitleDesktopAndMobile
                        name={ac_strings.featured}
                    />
                    <FetchTopicFeatured
                        latestSlug={latestSlug}
                        featuredPosts={featuredPosts}
                        popularPosts={mostPopular.slice(0, 5)}
                        render={({ posts }) => (
                            <XScroll
                                items={posts.map((p) => (<VideoTopImg  {...p} />
                                ))}
                            />
                        )}
                    />
                </div>

            </div>
            <div className="standard-max-w-px">
                <FetchPostsFromArchivePage
                    slug={latestSlug}
                    layout="row" render={({ posts }) => (
                        <VideoRow4Col
                            name={ac_strings.latest}
                            posts={posts}
                            slug={latestSlug}
                        />
                    )}
                />
                <div className="w-full pt-4">
                    <SectionTitleDesktopAndMobile
                        name={ac_strings.popular}
                    />
                    <FetchPostsFromSlugs
                        slugs={mostPopular.slice(0, 5)}
                        layout="row"
                        render={({ posts }) => (
                            <HSCardListVideo posts={posts} />
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
                                    name={item.name}
                                    slug={item.slug}
                                    posts={getRandomArray(item.posts, item.posts.length)}
                                />

                            ))}
                        </div>
                    )}

                />
            </div>

            {/*             {loggedIn !== "success" ? (
                <div className="w-full pt-4">
                    <SectionTitleDesktopAndMobile
                        name={ac_strings.popular}
                    />
                    <FetchPostsFromSlugs
                        slugs={mostPopular.slice(0, 5)}
                        layout="row"
                        render={({ posts }) => (
                            <HSCardListVideo posts={posts} />
                        )}
                    />
                </div>
            ) : (
                    <FetchPostsFromArchivePage
                        slug={latestSlug}
                        layout="row" render={({ posts }) => (
                            <VideoRow4Col
                                name={ac_strings.latest}
                                posts={posts}
                                slug={latestSlug}
                            />
                        )}
                    />

                )} */}




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
        mostPopular: string[]
        featuredPosts: string[]
    }
    path: string
}
