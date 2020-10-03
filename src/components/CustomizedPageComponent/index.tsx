import * as React from 'react'
import RenderFeaturedPost, { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import FetchPost from '@/HOC/FetchPosts'
import Content from '@/components/Content'
import Header from '@/components/PostItem/DesktopHeaderPost'

const CustomizedPage: React.FC<IPageCompTypes & { isFirst?: boolean }> = (item) => {


    if (item.type === "text") {

        return (
            <Content content={item.data.content} />

        )
    } else if (item.type === "article_banner") {
        const post = item.data

        return (
            <FetchPost
                slugs={[post.slug]}
                layout="list"
                render={({ posts }) => {
                    return (
                        <div>
                            {posts.map(item => (
                                <Header {...item} />
                            ))}
                        </div>
                    )
                }}
            />
        )
    } else if (item.type === "featured_items") {
        const childItems = item.data

        return (
            <div>
                {childItems.map((child, k) => {
                    return (
                        <RenderFeaturedPost {...child} withBg={item.isFirst === true && k === 0} />
                    )
                })}
            </div>
        )
    } else {
        return null
    }
}

export default CustomizedPage

