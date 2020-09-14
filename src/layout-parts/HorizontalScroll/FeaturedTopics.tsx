import React from 'react'
import Link from '@/components/CustomLink'
import XScrollCustomSize from './BaseCustomSize'
import './horizontal-scroll.css';
import { ITopic } from '@/types'
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard'
import { SlateDarkFollowButton } from '@/components/Buttons/ToggleFollowWrapper'
import { getImage } from '@/helpers/imageHelpers'
import TS from '@/strings'
const placeHolderImage = {

}
const FeatureSection: React.FC<{ featured: ITopic[] }> = ({ featured }) => {
    console.log(featured)
    return (
        <XScrollCustomSize
            childeClassName=""
            items={featured.map(({ name, image, slug, id, followed }) => (
                <div className="flex flex-col items-center">
                    <Link to={`${TS.slug_topic}/${slug}`} className="min-h-36 h-36 w-24" >
                        <ImgBgTopicCard name={name} image={image} />

                    </Link>
                    <SlateDarkFollowButton
                        id={id}
                        followed={followed === true}
                        className="w-full"
                    />

                </div>
            ))}
        />
    )
}

export default FeatureSection