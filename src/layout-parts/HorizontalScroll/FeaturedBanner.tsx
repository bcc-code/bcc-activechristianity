import React from 'react'
import TopImgPost from '@/components/PostItemCards/TopImg'
import XScroll from './BaseLarge'
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
        <XScroll items={featured.map(({ title, excerpt, image, slug, }) => (
            <TopImgPost
                key={slug}
                id=''
                title={title}
                excerpt={excerpt}
                image={image}
                slug={slug}
                media={{ path: slug }}
                date={new Date}
                noBorder

                noBg
                showType
            />
        ))}
        />
    )
}

export default FeatureSection