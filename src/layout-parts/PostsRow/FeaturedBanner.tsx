import React from 'react'
import TopImgPost from '@/components/PostItem/TopImg'
import XScroll from './HorizontalScrollLarge'
import './horizontal-scroll.css';
import { IImage } from '@/types'

interface IFeaturedBanner {
    title: string
    excerpt: string
    slug: string
    image: IImage
}
const FeatureSection: React.FC<{ featured: IFeaturedBanner[] }> = ({ featured }) => {
    return (
        <XScroll items={featured.map(({ title, excerpt, image, slug }) => (
            <TopImgPost
                id=''
                title={title}
                excerpt={excerpt}
                image={image}
                slug={slug}
                media={{ path: slug }}
                date={new Date}
                noBorder={true}
                roundedImage={true}
                hideReadingTime={true}
            />
        ))}
        />
    )
}

export default FeatureSection