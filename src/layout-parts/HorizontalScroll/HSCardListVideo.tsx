import React from 'react'
import VideoTopImg from '@/components/PostItemCards/VideoTopImg'
import XScroll from './Base'
import { IPostItem } from '@/types'

const HSCardList: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <XScroll items={posts.map((item) => (
            <VideoTopImg
                key={item.slug}
                {...item}
                small
            />
        ))}
        />
    )
}

export default HSCardList