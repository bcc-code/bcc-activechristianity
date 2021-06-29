import * as React from 'react'
import { Link } from 'gatsby'
import { IGalleryImage, IQuote } from '@/types'
import ShowWallpaperRelatedInfo from './ShowRelatedInfo'
import Wallpaper from '@/components/QuoteImage'
import SwipeableViews from 'react-swipeable-views';
import Modal from 'react-modal';
import { CloseIcon, KeyboardArrowRightIcon, KeyboardArrowLeftIcon, KeyboardArrowDownIcon } from '@/components/Icons/MUI/arrowIcons'
import FetchWallpaper from '@/HOC/FetchWallpaper'
import WallpaperInfo from '@/components/QuoteImage/WallpaperInfo'
interface IWallpaperModal {
    startIndex?: number
    isOpen: boolean
    handleClose: (e: any) => void
    swipeViewArray: ISwipeViewContent[]
}
interface ISwipeViewContent {
    id?: string | number
    image?: IGalleryImage
    wallpaper?: IQuote
    color: number[]
    size: string
}
const mod = (index: number, max: number) => ((index % max) + max) % max

const WallpaperModal: React.FC<IWallpaperModal> = ({ isOpen, handleClose, swipeViewArray, startIndex }) => {
    const [activeWallpaperIndex, setActiveWallpaperIndex] = React.useState<any>(null)
    React.useEffect(() => {
        setActiveWallpaperIndex(startIndex)
    }, [startIndex])
    const modalBackground = () => {
        if (swipeViewArray[activeWallpaperIndex]) {
            const { color } = swipeViewArray[activeWallpaperIndex]
            return `rgba(${color[0]}, ${color[1]}, ${color[2]}`
        }
        return 'rgba(0, 0, 0, 0.5)'
    }

    const handleIndexChange = (direction: number) => {
        const newIndex = mod(
            activeWallpaperIndex + direction,
            swipeViewArray.length
        )
        const newNesIndex = mod(
            newIndex + direction,
            swipeViewArray.length
        )
        setActiveWallpaperIndex(newIndex)
        if (typeof swipeViewArray[newNesIndex].wallpaper === "undefined") {

        }
    }

    return (
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
                        className=""
                        onClick={() => { handleIndexChange(- 1) }}
                    >
                        <KeyboardArrowLeftIcon />
                    </button>
                    <button
                        className=""
                        onClick={() => { handleIndexChange(1) }}
                    >
                        <KeyboardArrowRightIcon />
                    </button>
                </div>
                <SwipeableViews onChangeIndex={handleIndexChange} index={activeWallpaperIndex}>
                    {swipeViewArray.map((w, i) => {
                        const isActive = activeWallpaperIndex === i || activeWallpaperIndex + 1 === i || activeWallpaperIndex - 1 === i
                        return w.image || w.wallpaper ? (
                            <WallpaperModalContent
                                key={i}
                                isActive={isActive}
                                {...w}
                            />
                        ) : w.id ? (
                            <FetchWallpaper
                                id={w.id}
                                render={({ wallpaper }) => {
                                    return (
                                        <WallpaperModalContent
                                            key={i}
                                            isActive={isActive}
                                            {...w}
                                            wallpaper={wallpaper}
                                        />
                                    )
                                }}

                            />
                        ) : null

                    })}
                </SwipeableViews>
            </div>
        </Modal>
    )
}

export default WallpaperModal

export const WallpaperModalContent: React.FC<ISwipeViewContent & { isActive?: boolean, background?: string }> = ({ image, color, size, wallpaper, isActive, background, id }) => {
    const findImage = wallpaper && wallpaper.images && wallpaper.images[0] || image
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
    return (
        <div className="pb-8 sm:w-3/4 md:w-tablet mx-auto md:grid md:grid-cols-2">
            <div className="relative">
                {findImage && isActive && (
                    <Wallpaper
                        className="rounded-t-lg rounded-b-none md:rounded-l-lg md:rounded-r-none"
                        key={findImage.id}
                        image={findImage}
                        size={size}
                        color={color}
                    />
                )}

                <div
                    className=" absolute bottom-0 left-0 right-0 z-10 h-12 text-white w-full flex justify-center items-center"
                    style={{ background: `linear-gradient( to bottom, transparent, ${background} )` }}
                >
                    <KeyboardArrowDownIcon />
                </div>
            </div>
            <div className="py-6 px-4 bg-white rounded-b-lg md:rounded-r-lg md:rounded-l-none">
                {isActive && (
                    < div >
                        <div className="flex justify-end">
                            <a className="rounded-lg bg-ac-slate-dark text-white text-lg px-4 py-2 font-semibold" href={findImage && findImage.src} onClick={(e) => download(e, findImage && findImage.id ? findImage.id : 1)}>Download</a>
                            <div className="px-4 py-2 font-semibold ml-4">Share</div>
                            {/* <a href={`/wallpaper/${id || image?.quote_id}`}>link</a> */}
                        </div>
                        {image && <ShowWallpaperRelatedInfo image={image} />}
                        {wallpaper && <WallpaperInfo  {...wallpaper} />}
                    </div>
                )}
            </div>
        </div>
    )
}