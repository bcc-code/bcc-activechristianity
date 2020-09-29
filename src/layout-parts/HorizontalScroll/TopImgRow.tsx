import React from 'react'
import TopImgPost from '@/components/PostItem/TopImg'
import XScroll from './BaseCustomSize'
import './horizontal-scroll.css';
import { IImage, IPostItem } from '@/types'

interface IFeaturedBanner {
    title: string
    excerpt: string
    slug: string
    image: IImage
}
const FeatureSection: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <XScroll
            childeClassName="w-7/12 min-w-7/12"
            items={posts.map((item, i) => (
                <TopImgPost  {...item} key={i} />
            ))}
        />
    )
}

export default FeatureSection