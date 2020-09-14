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
        <div>
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
            <div className="hidden sm:flex flex-wrap mx-4">
                {featured.map(({ name, image, slug, id, followed }) => (
                    <div className="flex flex-col items-center  mr-4">
                        <Link to={`${TS.slug_topic}/${slug}`} className="min-h-24 h-24 w-36" >
                            <ImgBgTopicCard name={name} image={image} />

                        </Link>
                        <SlateDarkFollowButton
                            id={id}
                            followed={followed === true}
                            className="w-full"
                        />

                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeatureSection