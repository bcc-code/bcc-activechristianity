import React from 'react'
import TopImgPost from '@/components/PostItem/TopImg'
import XScroll from './BaseLarge'
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
        <XScroll items={posts.map((item) => (
            <TopImgPost  {...item} />
        ))}
        />
    )
}

export default FeatureSection