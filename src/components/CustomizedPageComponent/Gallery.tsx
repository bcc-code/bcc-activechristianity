import React from 'react'
import { IGallery } from './BlockWrapper'
import Wallpaper from '@/components/QuoteImage'
import StaggerChildrenMotion from '@/components/Motion/StaggerChildren'
import StaggerChildrenItemMotion from '@/components/Motion/StaggerChildrenItem'
import SwipeableViews from 'react-swipeable-views';
import Modal from 'react-modal';
import { CloseIcon, KeyboardArrowRightIcon, KeyboardArrowLeftIcon } from '@/components/Icons/MUI/arrowIcons'


const mod = (index: number, max: number) => ((index % max) + max) % max

const Gallery: React.FC<IGallery> = ({ data }) => {
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
    const download = (e: any, id: number) => {
        e.preventDefault();
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `ActiveChristianity-wallpaper-${id}.png`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    const handleClose = () => {
        setIsOpen(false)
    }

    const modalBackground = () => {
        if (swipeViewArray[activeWallpaperIndex]) {
            const { color } = swipeViewArray[activeWallpaperIndex]
            return `rgba(${color[0]}, ${color[1]}, ${color[2]}`
        }
        return 'rgba(0, 0, 0, 0.5)'
    }

    return (
        <StaggerChildrenMotion className={`grid grid-cols-2 ${allImages.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} gap-4 py-24 w-full`}>
            <Modal
                isOpen={isOpen}
                className="inset-0 h-screen w-screen px-2 flex justify-center items-center overflow-scroll"
                style={{
                    overlay: {
                        backgroundColor: modalBackground(),
                        zIndex: 700,
                        transition: `background-color 1000ms linear`
                    }
                }}
            >
                <div
                    className="absolute top-0 right-0 left-0 z-10 text-white w-full flex justify-end"
                    style={{ background: 'linear-gradient( to top, transparent, rgba(0, 0, 0, 0.5) )' }}

                >
                    <button className="p-2" onClick={handleClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="h-full w-full pt-10 overflow-scroll relative ">
                    <div className="absolute bottom-1/2 right-0 left-0 z-10 text-white w-full flex p-2 justify-between">

                        <button
                            className="sm:bg-gray-300 rounded-full"
                            onClick={() => { handleIndexChange(- 1) }}
                        >
                            <KeyboardArrowLeftIcon />
                        </button>
                        <button
                            className="sm:bg-gray-300 rounded-full"
                            onClick={() => { handleIndexChange(1) }}
                        >
                            <KeyboardArrowRightIcon />
                        </button>
                    </div>
                    <SwipeableViews onChangeIndex={handleIndexChange} index={activeWallpaperIndex}>
                        {swipeViewArray.map(({ image, size, color }, i) => {
                            return (
                                <div className="pb-8 sm:w-3/4 md:w-tablet mx-auto md:grid md:grid-cols-2">
                                    <div className="relative">
                                        <Wallpaper
                                            key={image.id}
                                            image={image}
                                            size={size}
                                            color={color}
                                        />
                                        <div
                                            className=" absolute bottom-0 left-0 right-0 z-10 text-white w-full flex justify-between items-center"
                                            style={{ background: `linear-gradient( to bottom, transparent, ${modalBackground()} )` }}
                                        >
                                            <a
                                                className="p-2 hover:bg-gray-800 font-bold"
                                                target="_blank"
                                                href={swipeViewArray[activeWallpaperIndex] && swipeViewArray[activeWallpaperIndex].image && swipeViewArray[activeWallpaperIndex].image.src}
                                                download

                                            >
                                                Download
                                            </a>

                                            <div className="text-xs">
                                                <button className="p-2 mr-2">
                                                    share
                                                </button>
                                                {/*                             <CustomLink className="p-2" to={`wallpaper/${swipeViewArray.id}`}>
                            Link
                        </CustomLink> */}
                                            </div>

                                        </div>

                                    </div>
                                    <div className="py-6 px-4 bg-white rounded-b-lg md:rounded-r-lg md:rounded-l-none">
                                        More info about the quote
                                    </div>
                                </div>
                            )
                        })}
                    </SwipeableViews>
                </div>
            </Modal>
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