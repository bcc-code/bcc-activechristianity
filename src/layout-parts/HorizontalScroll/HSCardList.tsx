import React from 'react'
import TopImgPost from '@/components/PostItemCards/TopImg'
import XScroll from './Base'
import { IPostItem } from '@/types'

const HSCardList: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <XScroll items={posts.map((item) => (
            <TopImgPost
                key={item.slug}
                {...item}
                noExcerpt
            />
        ))}
        />
    )
}

export default HSCardList