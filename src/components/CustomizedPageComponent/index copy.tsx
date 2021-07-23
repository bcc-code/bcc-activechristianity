import * as React from 'react'
import RenderFeaturedPost, { IPageCompTypes } from './FeaturedItem'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import Content from '@/components/Content'
import RightImgPostItem from '@/components/PostItemCards/RightImg'
import PostRow2Col from '@/components/List/PostRow2Col'
import PostRow3Col from '@/components/List/PostRow3Col'
import PostRow4Col from '@/components/List/PostRow4Col'
import DesktopHeaderPost from '@/layout-parts/Home/HeaderPost'
import Wallpaper from '@/components/QuoteImage'
import Video16to9 from '@/components/Images/Video16to9'

const CustomizedPage: React.FC<{ items: IPageCompTypes[], slug: string, title: string }> = ({ items, slug, title }) => {
    const comps: React.ReactNode[] = []
    items.map(c => {

        if (c.type === "text") {

            comps.push(
                <div className="standard-max-w-px mx-auto  py-6">
                    <Content content={c.data.content} />
                </div>
            )

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
                <div className="standard-max-w-px mx-auto  py-6">
                    <Video16to9
                        src={c.data.url}
                        className={`rounded-xxl sm:rounded-xl overflow-hidden`}
                    />
                </div>
            )
        } else if (c.type === "post_items") {
            const slugs = c.data.map(p => p.slug)
            comps.push(
                <FetchPostsFromSlugs
                    slugs={slugs}
                    layout="list"
                    render={({ posts }) => {
                        if (posts.length === 1) {

                            return <DesktopHeaderPost {...posts[0]} />
                        } else if (posts.length === 2) {
                            return (
                                <div className="standard-max-w-px mx-auto py-6">
                                    <PostRow2Col posts={posts} />
                                </div>
                            )
                        } else if (posts.length === 3) {
                            return (
                                <div className="standard-max-w-px mx-auto py-6">
                                    <PostRow3Col posts={posts} />
                                </div>
                            )
                        } else if (posts.length === 4) {
                            return (
                                <div className="standard-max-w-px mx-auto py-6">
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
                                <div className="standard-max-w-px mx-auto">
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
        } else if (c.type === "quote_block") {
            comps.push(
                <div className="bg-white px-4 py-12 standard-max-w-px mx-auto ">
                    <div className="text-center italic rounded-lg py-6 text-ac-slate-dark">
                        <span className="leading-loose text-2xl font-bold pb-8 block">{c.data.content}</span>
                        <span className="block">{c.data.source}</span>
                    </div>
                </div>
            )
        } else if (c.type === "gallery") {
            comps.push(
                (
                    <div className="standard-max-w-px grid grid-cols-2 sm:grid-cols-4 gap-4 py-24">
                        {c.data.map(({ image }) => {
                            const size = image.size.height / image.size.width === 1 ? 'square' : 'landscape';
                            const color = image.colors && image.colors[0]
                            return (
                                < Wallpaper
                                    image={image}
                                    size={size}
                                    color={color}
                                />
                            )
                        })}
                    </div>
                )
            )
        }
    })

    return (
        <div>
            <div className="bg-ac-slate-dark w-full text-white">
                <h1 className="standard-max-w-px  px-4 text-3xl font-bold leading-snug mx-auto w-full pt-8">{title}</h1>
            </div>
            {comps.map((section, k) => {
                return (
                    <div className={`${k % 2 == 1 ? 'bg-ac-slate-lighter' : ''}`}>
                        {section}
                    </div>
                )
            })}
        </div>
    )
}

export default CustomizedPage

