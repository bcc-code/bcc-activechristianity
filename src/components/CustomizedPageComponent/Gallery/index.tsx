import React from 'react'
import LazyLoad from '@/components/LazyLoad'
import { IGallery } from '../BlockWrapper'
import ShowWallpaperRelatedInfo from './ShowRelatedInfo'
import Wallpaper from '@/components/QuoteImage'
import StaggerChildrenMotion from '@/components/Motion/StaggerChildren'
import StaggerChildrenItemMotion from '@/components/Motion/StaggerChildrenItem'
import SwipeableViews from 'react-swipeable-views';
import Modal from 'react-modal';
import { CloseIcon, KeyboardArrowRightIcon, KeyboardArrowLeftIcon, KeyboardArrowDownIcon } from '@/components/Icons/MUI/arrowIcons'
import WallpaperModal from './Modal'
const mod = (index: number, max: number) => ((index % max) + max) % max

const Gallery: React.FC<IGallery> = ({ data }) => {
    console.log(data)
    const allImages = data

    const [activeWallpaperIndex, setActiveWallpaperIndex] = React.useState<any>(null)
    const [isOpen, setIsOpen] = React.useState(false)

    const swipeViewArray = allImages.map(({ image }) => ({
        image,
        color: image.colors && image.colors[0],
        size: image.size.height / image.size.width === 1 ? 'square' : 'landscape'
    }))
    const handleIndexChange = (direction: number) => {
        const newIndex = mod(
            activeWallpaperIndex + direction,
            swipeViewArray.length
        )
        setActiveWallpaperIndex(newIndex)
    }

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