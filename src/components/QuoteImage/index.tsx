import React from 'react'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import { IImage } from '@/types';


const WallPaperAllSizes: React.FC<{ size: string, image: IImage, color: number[] }> = ({ size, image, color }) => {
    if (size === "square") {
        return (
            <div
                className="rounded-lg overflow-hidden relative"
                style={{
                    backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
                    paddingBottom: `177%`
                }}

            >
                <div className="inset-0 absolute flex items-center">
                    <LazysizesFeaturedImage {...image} className="w-full" />
                </div>
            </div>
        )
    } else {
        return <LazysizesFeaturedImage {...image} className="w-full rounded-lg overflow-hidden" />
    }
}

export default WallPaperAllSizes