import React from "react"
import { IPostItem } from '@/types'
import { UnderlineTitleLink } from '@/components/Headers'
import TopImgPost from '@/components/PostItemCards/TopImg'
import FeaturedCard from '@/components/PostItemCards/FeaturedCard'
import PostRow from '@/layout-parts/List/PostRow4Col'
import './horizontal-scroll.css';

interface IPostHorizontalScroll {
    postThumnailType: 'video' | 'topImage' | 'ebook' | 'playlist'
    posts: IPostItem[]
    postProps?: any
}

export const PostlistHorizontalSimple: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
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
            <PostRow posts={rest.posts} />

        </div>
    )
}
export default HorizontalScrollSection

import React from "react"
import { IPostItem } from '@/types'
import TopImgPost from '@/components/PostItemCards/TopImg'


import shortId from 'shortid'
import './horizontal-scroll.css';

interface IPostHorizontalScroll {
    postThumnailType: 'video' | 'topImage' | 'ebook' | 'playlist'
    posts: IPostItem[]
    postProps?: any
}


import shortid from 'shortid'
import './horizontal-scroll.css';


interface IXScrollItem {
    items: JSX.Element[]
    childeClassName?: string
}
export const HScrollBaseCustomSize: React.FC<IXScrollItem> = ({ items, childeClassName }) => {
    return (
        <div className="scroll-snap-x-container scroll-snap-x-container-start overflow-scroll mb-4 sm:hidden w-full" key={shortid()}>
            {items.map((c, i) => {

                return (
                    <div key={shortid()} className={`scroll-snap-x-child-start ml-4 ${childeClassName}`}>
                        {c}
                    </div>
                )

            })}
            <div className="min-w-4">

            </div>
        </div>

    )
}

export const TopImgRowHorizontalScroll: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <HScrollBaseCustomSize
            childeClassName="w-7/12 min-w-7/12"
            items={posts.map((item, i) => (
                <TopImgPost  {...item} key={shortid()} noExcerpt showType />
            ))}
        />
    )
}

export const TopImgRowHorizontalScrollLarge: React.FC<{ featured: IPostItem[] }> = ({ featured }) => {

    return (
        <HScrollBaseLarge items={featured.map((post, i) => (
            <TopImgPost
                key={shortid()}
                {...post}
                noBorder
                noBg
                showType
            />
        ))} />
    )
}


import { IPlaylist } from '@/types'
import PodcastTopImg from '@/components/PostItemCards/PlaylistTopImg'
export const HSPlaylist: React.FC<{ playlists: IPlaylist[] }> = ({ playlists }) => {
    return (
        <HScrollBaseCustomSize
            childeClassName="w-3/12 min-w-3/12"
            items={playlists.map((p) => (
                <PodcastTopImg   {...p} key={shortId.generate()} />
            ))}
        />

    )
}

export const HScrollBase: React.FC<IXScrollItem> = ({ items }) => {
    return (
        <div className="scroll-snap-x-container overflow-scroll mb-4 sm:hidden w-full">
            {items.map((c, i) => {

                return (
                    <div key={shortid()} className="scroll-snap-x-child w-8/12 min-w-8/12 ml-4">
                        {c}
                    </div>
                )

            })}
            <div className="min-w-4">

            </div>
        </div>

    )
}

export const HScrollBaseLarge: React.FC<IXScrollItem> = ({ items }) => {

    return (
        <div className="scroll-snap-x-container overflow-scroll mb-4 sm:hidden w-full">
            {items.map((c, i) => {
                const postEl = (
                    <div key={shortid()} className="scroll-snap-x-child ml-4" style={{ width: "88%", minWidth: "88%" }}>
                        {c}
                    </div>
                )
                return postEl
            })}
            <div className="min-w-4">
            </div>
        </div>

    )
}

import VideoTopImg from '@/components/PostItemCards/VideoTopImg'
export const HSCardListVideo: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <div>
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 standard-max-w-px">
                {posts.slice(0, 4).map((post, i) => {
                    return (
                        <div key={post.slug} key={shortId()}>
                            < VideoTopImg {...post} />
                        </div>
                    )
                })}
            </div>
            <HScrollBase items={posts.map((item) => (
                <VideoTopImg
                    key={shortId()}
                    key={item.slug}
                    {...item}

                />
            ))}
            />
        </div>
    )
}

export const HSCardList: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <HScrollBase items={posts.map((item) => (
            <TopImgPost
                key={shortId.generate()}
                {...item}
                noExcerpt
            />
        ))}
        />
    )
}

export const FeaturedBanner: React.FC<{ featured: IPostItem[] }> = ({ featured }) => {

    return (
        <HScrollBaseLarge items={featured.map((post, i) => (
            <TopImgPost
                key={shortid()}
                {...post}
                noBorder
                noBg
                showType
            />
        ))} />
    )
}
