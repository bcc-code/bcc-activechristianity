import React from "react"
import { IPostItem } from '@/types'
import { UnderlineTitleLink } from '@/layout-parts'
import TopImgPost from '@/components/PostItem/TopImg'
import FeaturedCard from '@/components/PostItem/FeaturedCardNew'
import PostsRow from '.'
import './horizontal-scroll.css';

interface IPostHorizontalScroll {
    postThumnailType: 'video' | 'topImage' | 'ebook' | 'playlist'
    posts: IPostItem[]
    postProps?: any
}

export const PostlistHorizontalSimple: React.SFC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <div className="scroll-snap-x-container h-full">
            {posts.map(item => (
                <div key={item.slug} className="scroll-snap-x-child w-10/12 min-w-10/12 ml-4 h-full">
                    <TopImgPost  {...item} />
                </div>
            ))}
        </div>
    )
}

export const PostHorizontalScrollTypes: React.FC<IPostHorizontalScroll> = ({ posts, postThumnailType, postProps }) => {
    const map = {
        'video': TopImgPost,
        'topImage': TopImgPost,
        'ebook': FeaturedCard,
        'playlist': FeaturedCard
    }
    const PostComponent = map[postThumnailType]
    let isFeature = postThumnailType === 'ebook' || postThumnailType === 'playlist'
    return (
        <div className="scroll-snap-x-container">
            {posts.map(post => (
                <div className={`scroll-snap-x-child min-w-10/12 md:min-w-4/12 lg:min-w-3/12 ml-4 md:ml-0 md:pl-4`}>
                    <PostComponent {...post} type={postThumnailType} {...postProps} />
                </div>
            ))}
            <div className="min-w-4">

            </div>
        </div>
    )
}

interface IProps extends IPostHorizontalScroll {
    name: string | JSX.Element
    slug: string
    video?: boolean
}
export const HorizontalScrollSection: React.FC<IProps> = ({ name, slug, ...rest }) => {

    return (
        <div className="standard-max-w pb-8">
            <div className="px-4"><UnderlineTitleLink name={name} to={slug} /></div>
            <PostHorizontalScrollTypes {...rest} />
            <div className="hidden sm:block">
                <PostsRow {...rest} />
            </div>

        </div>
    )
}
export default HorizontalScrollSection