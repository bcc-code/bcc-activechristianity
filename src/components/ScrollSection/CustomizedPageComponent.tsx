import * as React from 'react'
import RenderFeaturedPost, { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import FetchPost from '@/HOC/FetchPosts'
import Content from '@/components/Content'
import RightImgPostItem from '@/components/PostItemCards/RightImg'
import { computeStyles } from '@popperjs/core'
import Video16to9 from '@/components/Images/Video16to9'
const CustomizedPage: React.FC<{ items: IPageCompTypes[] }> = ({ items }) => {

    const comps: React.ReactNode[] = []
    items.map(c => {
        if (c.type === "text") {

            comps.push(<Content content={c.data.content} />)

        } else if (c.type === "article_banner") {
            const post = c.data

            comps.push(<FetchPost
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
                <div className="max-w-tablet">
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
                <FetchPost
                    slugs={c.data.map(p => p.slug)}
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

                />

            )
        }
    })

    return (
        <div>
            {comps.map(c => c)}
        </div>
    )
}

export default CustomizedPage

