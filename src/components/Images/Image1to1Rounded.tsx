import * as React from 'react';
import { IImage } from '@/types'
import LazysizesFeaturedImage from './LazysizesImage'

const SquareRoundedImage: React.SFC<IImage> = (props) => {
    return (
        <div className="relative w-full pb-square sm:pb-wide">
            <LazysizesFeaturedImage {...props} className="absolute w-full h-full inset-0 rounded-lg object-cover g-image" />
        </div>

    )
}

export default SquareRoundedImage;
