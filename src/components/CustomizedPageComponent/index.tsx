import * as React from 'react'
import RenderFeaturedPost, { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import Content from '@/components/Content'
import RightImgPostItem from '@/components/PostItemCards/RightImg'
import PostRow2Col from '@/layout-parts/List/PostRow2Col'
import PostRow3Col from '@/layout-parts/List/PostRow3Col'
import PostRow4Col from '@/layout-parts/List/PostRow4Col'
import DesktopHeaderPost from '@/layout-parts/Home/HeaderPost'

import Video16to9 from '@/components/Images/Video16to9'
const CustomizedPage: React.FC<{ items: IPageCompTypes[], slug: string, title: string }> = ({ items, slug, title }) => {

    const comps: React.ReactNode[] = []
    items.map(c => {

        if (c.type === "text") {

            comps.push(<Content content={c.data.content} />)

        } else if (c.type === "article_banner") {
            const post = c.data

            comps.push(<FetchPostsFromSlugs
                slugs={[post.slug]}
                layout="list"
                render={({ posts }) => {
                    return (
                        <div>
                            {posts.map(p => {
                                return (
                                    <RightImgPostItem {...p} />
                                )
                            })}
                        </div>
                    )
                }}

            />)
        } else if (c.type === "featured_items") {
            const childItems = c.data

            comps.push(
                <div className="">
                    {childItems.map((child, k) => {
                        return (
                            <RenderFeaturedPost {...child} />
                        )
                    })}
                </div>
            )
        } else if (c.type === "embed") {
            comps.push(
                <div>
                    <Video16to9
                        src={c.data.url}
                        className={`rounded-xxl sm:rounded-xl overflow-hidden mt-8`}
                    />
                </div>
            )
        } else if (c.type === "post_items") {
            comps.push(
                <FetchPostsFromSlugs
                    slugs={c.data.map(p => p.slug)}
                    layout="list"
                    render={({ posts }) => {
                        if (posts.length === 1) {
                            return <DesktopHeaderPost {...posts[0]} />
                        } else if (posts.length === 2) {
                            return <PostRow2Col posts={posts} />
                        } else if (posts.length === 3) {
                            return <PostRow3Col posts={posts} />
                        } else if (posts.length === 4) {
                            return (
                                <div className="">
                                    <div className="hidden sm:block">
                                        <PostRow4Col posts={posts} />
                                    </div>
                                    <div className="sm:hidden">

                                        {posts.map(p => {
                                            return (
                                                <RightImgPostItem {...p} />
                                            )
                                        })}

                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    {posts.map(p => {
                                        return (
                                            <RightImgPostItem {...p} />
                                        )
                                    })}
                                </div>
                            )
                        }

                    }}

                />

            )
        }
    })

    return (
        <div>
            {comps.map((section, k) => {
                return (
                    <div className={`standard-max-w-px py-6 ${k % 2 == 1 ? 'bg-ac-slate-lighter' : ''}`}>
                        {section}
                    </div>
                )
            })}
        </div>
    )
}

export default CustomizedPage

