import React from 'react'
import TopImgPost from '@/components/PostItemCards/TopImg'
import XScroll from './BaseLarge'
import './horizontal-scroll.css';
import { IPostItem } from '@/types'


const FeatureSection: React.FC<{ featured: IPostItem[] }> = ({ featured }) => {
    return (
        <XScroll items={featured.map((post) => (
            <TopImgPost
                key={post.slug}
                {...post}
                noBorder
                noBg
                showType
            />
        ))}
        />
    )
}

export default FeatureSection