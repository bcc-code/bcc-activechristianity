import React from 'react'
import TopImgPost from '@/components/PostItemCards/TopImg'
import XScroll from './Base'
import { IImage, IPostItem } from '@/types'

interface IFeaturedBanner {
    title: string
    excerpt: string
    slug: string
    image: IImage

}
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