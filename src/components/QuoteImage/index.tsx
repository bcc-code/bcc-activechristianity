import React from 'react'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import { IImage } from '@/types';


const WallPaperAllSizes: React.FC<{ size: string, image: IImage, color: number[], className?: string }> = ({ size, image, color, className }) => {
    const customClassName = className ? className : `rounded-lg`;
    if (size === "square") {
        return (
            <div
                className={`overflow-hidden relative ${customClassName}`}
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
        return <LazysizesFeaturedImage {...image} className={`w-full rounded-lg overflow-hidden ${customClassName}`} />
    }
}

export default WallPaperAllSizes