import React from 'react'
import TopImgPost from '@/components/PostItemCards/TopImg'
import XScroll from './Base'
import { IPostItem } from '@/types'
import shortId from 'shortid'
const HSCardList: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <XScroll items={posts.map((item) => (
            <TopImgPost
                key={shortId.generate()}
                {...item}
                noExcerpt
            />
        ))}
        />
    )
}

export default HSCardList