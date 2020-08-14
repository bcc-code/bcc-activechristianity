import React from "react"
import { IPostItem } from '@/types'
import { UnderlineTitleLink } from '@/layout-parts'
import TopImgPost from '@/components/PostItem/TopImg'
import FeaturedCard from '@/components/PostItem/FeaturedCardNew'

interface IPostHorizontalScroll {
    postThumnailType: 'video' | 'topImage' | 'ebook' | 'playlist'
    posts: IPostItem[]
    postProps?: any
}
export const PostHorizontalScroll: React.FC<IPostHorizontalScroll> = ({ posts, postThumnailType, postProps }) => {
    const map = {
        'video': TopImgPost,
        'topImage': TopImgPost,
        'ebook': FeaturedCard,
        'playlist': FeaturedCard
    }
    const PostComponent = map[postThumnailType]
    let isFeature = postThumnailType === 'ebook' || postThumnailType === 'playlist'
    return (
        <div className="flex overflow-scroll w-full scroll-x-snap">
            {posts.map(post => (
                <div className={`scroll-x-snap-child min-w-10/12 md:min-w-4/12 lg:min-w-3/12 ml-4 md:ml-0 md:pl-4`}>
                    <PostComponent {...post} type={postThumnailType} {...postProps} />
                </div>
            ))}
            <div className="min-w-4">

            </div>
        </div>
    )
}

interface IProps extends IPostHorizontalScroll {
    name: string
    slug: string
}
export const HorizontalScrollSection: React.FC<IProps> = ({ name, slug, ...rest }) => {
    return (
        <div className="standard-max-w pb-8">
            <div className="px-4">
                <UnderlineTitleLink name={name} to={slug} />
            </div>
            <PostHorizontalScroll {...rest} />
        </div>
    )
}
