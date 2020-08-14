import * as React from 'react';
import { LazysizesFeaturedImage } from './LazysizesImage'
import { IImage } from '@/types'
interface IProps {
    image: IImage
    imageClassName?: string
    roundedTop?: boolean
    alt?: string
}

const TwoToOneImage: React.SFC<IProps> = ({ image, imageClassName, roundedTop, alt }) => {
    return (
        <div className={`pointer-events-none relative w-full pb-half overflow-hidden ${roundedTop ? 'rounded-t-lg' : 'rounded-lg'}`}>
            <LazysizesFeaturedImage {...image} alt={alt ? alt : ''} className={`w-full max-w-full absolute h-auto bg-center bg-cover ${imageClassName ? imageClassName : ''}`} />
        </div>
    )
}

export default TwoToOneImage;
