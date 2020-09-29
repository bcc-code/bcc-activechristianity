import React from 'react'
import TopImgPost from '@/components/PostItem/TopImgVideo'
import XScroll from './BaseLarge'
import './horizontal-scroll.css';
import { IImage } from '@/types'

interface IFeaturedBanner {
    title: string
    excerpt: string
    slug: string
    image: IImage

}

const FeatureSection: React.FC<{ featured: IFeaturedBanner[], smallTitle?: boolean }> = ({ featured, smallTitle }) => {
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
                roundedImage
                noBg
                showType
                smallTitle={smallTitle}
            />
        ))}
        />
    )
}

export default FeatureSection