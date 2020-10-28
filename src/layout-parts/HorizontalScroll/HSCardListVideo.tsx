import React from 'react'
import VideoTopImg from '@/components/PostItemCards/VideoTopImg'
import XScroll from './Base'
import { IPostItem } from '@/types'

const HSCardList: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <div>
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 standard-max-w-px">
                {posts.slice(0, 4).map((post, i) => {
                    return (
                        <div key={post.slug}>
                            < VideoTopImg {...post} />
                        </div>
                    )
                })}
            </div>
            <XScroll items={posts.map((item) => (
                <VideoTopImg
                    key={item.slug}
                    {...item}

                />
            ))}
            />
        </div>
    )
}

export default HSCardList