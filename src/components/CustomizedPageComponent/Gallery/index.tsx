import React from 'react'
import { IGallery } from '../BlockWrapper'
import Wallpaper from '@/components/QuoteImage'
import StaggerChildrenMotion from '@/components/Motion/StaggerChildren'
import StaggerChildrenItemMotion from '@/components/Motion/StaggerChildrenItem'
import WallpaperModal from './Modal'

const Gallery: React.FC<IGallery> = ({ data }) => {
    const allImages = data

    const [activeWallpaperIndex, setActiveWallpaperIndex] = React.useState<any>(null)
    const [isOpen, setIsOpen] = React.useState(false)

    const swipeViewArray = allImages.map(({ image }) => ({
        image,
        color: image.colors && image.colors[0],
        size: image.size.height / image.size.width === 1 ? 'square' : 'landscape'
    }))

    const handleClose = () => {
        setIsOpen(false)
    }


    return (
        <StaggerChildrenMotion className={`grid grid-cols-2 ${allImages.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} gap-4 py-24 w-full`}>
            <WallpaperModal
                swipeViewArray={swipeViewArray}
                handleClose={handleClose}
                isOpen={isOpen}
                startIndex={activeWallpaperIndex}
            />
            {allImages.length === 2 ? <div /> : null}
            {allImages.map(({ image }, k) => {
                const size = image.size.height / image.size.width === 1 ? 'square' : 'landscape';
                const color = image.colors && image.colors[0]
                return (
                    <StaggerChildrenItemMotion
                        onClick={() => { setActiveWallpaperIndex(k); setIsOpen(true) }}
                    >
                        < Wallpaper
                            image={image}
                            size={size}
                            color={color}

                        />
                    </StaggerChildrenItemMotion>
                )
            })}
        </StaggerChildrenMotion >
    )
}

export default Gallery