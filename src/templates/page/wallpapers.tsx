import React from 'react'
import LazyLoad from '@/components/LazyLoad';
import CustomLink from '@/components/CustomLink'
import { PostH1 } from '@/components/Headers'
import FetchWallpaper, { fetchWallpaperById } from '@/HOC/FetchWallpaper'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import StaggerChildrenItem from '@/components/Motion/StaggerChildrenItem'
import StaggerChildren from '@/components/Motion/StaggerChildren'
import SwipeableViews from 'react-swipeable-views';
import Wallpaper from '@/components/QuoteImage'
import Modal from 'react-modal';
import { CloseIcon, KeyboardArrowRightIcon, KeyboardArrowLeftIcon } from '@/components/Icons/MUI/arrowIcons'

import { IImage } from '@/types';


const AllWallpapers: React.FC<IQuoteWallpaperProps> = ({ pageContext, path }) => {
    const [activeWallpaperIndex, setActiveWallpaperIndex] = React.useState<any>(null)
    const [swipeViewArray, setSwipeViewArray] = React.useState<any[]>([])
    const [isOpen, setIsOpen] = React.useState(false)
    const { quotes } = pageContext
    const sortedQuotes = quotes.filter(q => q.color !== null)

    const arrayData = React.useRef(sortedQuotes)
    const handleClose = () => {
        setIsOpen(false)
        setActiveWallpaperIndex(null)
        setSwipeViewArray([])
    }
    const handleOpen = (i: number) => {
        if (arrayData.current) {
            setActiveWallpaperIndex(0)
            setSwipeViewArray(arrayData.current.slice(i, i + 3))
            setIsOpen(true)
        }
    }
    const updateArray = (w: any, i: number) => {
        if (arrayData.current) {
            arrayData.current[i] = { ...arrayData.current[i], wallpaper: w, index: i }

        }
    }

    const handleRight = () => {
        setActiveWallpaperIndex(activeWallpaperIndex + 1)
        updateActiveArray()

    }

    const updateActiveArray = () => {
        const lastIndex = swipeViewArray[swipeViewArray.length - 1].index
        if (arrayData.current[lastIndex + 1] && arrayData.current[lastIndex + 1].wallpaper) {
            setSwipeViewArray([...swipeViewArray, arrayData.current[lastIndex + 1]])
        } else {
            fetchWallpaperById(arrayData.current[lastIndex + 1].id).then(w => {
                if (arrayData.current) {
                    const toAdd = { ...arrayData.current[lastIndex + 1], wallpaper: w, index: lastIndex + 1 }
                    arrayData.current[lastIndex + 1] = toAdd
                    setSwipeViewArray([...swipeViewArray, toAdd])
                }
            })
        }
    }
    const handleIndexChange = (index: number) => {
        setActiveWallpaperIndex(index)
        updateActiveArray()
    }

    const download = (e: any, id: number) => {
        console.log(e.target.href)
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

    const getRandom = () => {
        const randomNumb = Math.floor(Math.random() * quotes.length)
        console.log(randomNumb)
        let indexs: number[] = []
        if (randomNumb < quotes.length - 3) {
            indexs = [randomNumb, randomNumb + 1, randomNumb + 2]
        } else if (randomNumb === quotes.length - 2) {
            indexs = [randomNumb, randomNumb + 1, 1]
        } else if (randomNumb === quotes.length - 1) {
            indexs = [randomNumb, randomNumb + 1, 1, 2]
        }
        return Promise.all(indexs.map(i => {
            if (arrayData.current) {
                if (arrayData.current[i].wallpaper) {
                    return new Promise(() => arrayData.current[i])
                } else {
                    return fetchWallpaperById(arrayData.current[i].id).then(w => {
                        console.log(arrayData.current[i])
                        console.log(w)
                        arrayData.current[i] = { ...arrayData.current[i], wallpaper: w, index: i }
                        return arrayData.current[i]
                    })
                }
            } else {
                console.log(indexs)
            }
        })).then(res => {
            console.log(res)
            setActiveWallpaperIndex(0)
            setSwipeViewArray(res)
        })
    }
    return (
        <div className="relativeh-full pt-4 standard-max-w-px">
            <PostH1 title={"Wallpaper"} />
            <Modal
                isOpen={isOpen}
                className="inset-0 h-screen w-screen p-2 flex justify-center items-center overflow-scroll"
                style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 700 } }}
            >
                {swipeViewArray[activeWallpaperIndex] && <div
                    className="relative flex flex-col bg-white text-grey-500 rounded-lg shadow-md w-full sm:w-3/4 md:w-mobile max-h-full overflow-hidden"
                >
                    <div
                        className="absolute top-0 right-0 left-0 z-10 text-white w-full flex justify-end"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}

                    >
                        <button className="p-2" onClick={handleClose}>
                            <CloseIcon />
                        </button>

                    </div>

                    <SwipeableViews onChangeIndex={handleIndexChange} index={activeWallpaperIndex}>
                        {swipeViewArray.map((w, i) => {
                            console.log(w)
                            const data = w.wallpaper
                            return (
                                <Wallpaper
                                    key={w.id}
                                    image={data.images[0]}
                                    size={w.size}
                                    color={w.color}
                                />
                            )
                        })}
                    </SwipeableViews>

                    <div className="absolute bottom-1/2 right-0 left-0 z-10 text-white w-full flex p-2 justify-between"
                    /*             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} */

                    >

                        <button
                            className="sm:bg-gray-300 rounded-full"
                            onClick={() => { setActiveWallpaperIndex(activeWallpaperIndex - 1) }}
                        >
                            <KeyboardArrowLeftIcon />
                        </button>
                        {/*                         <button>
                            Download
                        </button> */}
                        <button
                            className="sm:bg-gray-300 rounded-full"
                            onClick={handleRight}
                        >
                            <KeyboardArrowRightIcon />
                        </button>
                    </div>
                    <div className="absolute bottom-0 right-0 left-0 z-10 text-white w-full flex justify-between items-center"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}

                    >

                        <a
                            className="p-2 hover:bg-gray-800"
                            target="_blank"
                            href={swipeViewArray[activeWallpaperIndex].wallpaper.images[0].src}
                            download
                            onClick={e => download(e, swipeViewArray[activeWallpaperIndex].id)}
                        >
                            Download
                        </a>
                        <button onClick={getRandom}>
                            Random
                        </button>
                        <div className="text-xs">
                            <button className="p-2 mr-2">
                                share
                            </button>
                            <CustomLink className="p-2" to={`wallpaper/${swipeViewArray[activeWallpaperIndex].id}`}>
                                Link
                            </CustomLink>
                        </div>
                    </div>
                </div>}
            </Modal>
            <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {sortedQuotes.map((q, k) => {

                    const { color, size, id } = q

                    return (
                        <LazyLoad key={id}>
                            <StaggerChildrenItem>
                                <FetchWallpaper
                                    id={id}
                                    render={(({ wallpaper }) => {
                                        if (wallpaper) {
                                            updateArray(wallpaper, k)
                                        }
                                        return (

                                            < div onClick={() => handleOpen(k)} key={id}>
                                                {wallpaper ? (
                                                    <Wallpaper
                                                        image={wallpaper.images[0]}
                                                        size={size}
                                                        color={color}
                                                    />
                                                ) : <div
                                                    className="rounded-lg overflow-hidden"
                                                    style={{
                                                        backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
                                                        paddingBottom: `177%`
                                                    }}

                                                >
                                                </div>}
                                            </div>
                                        )
                                    })}
                                />
                            </StaggerChildrenItem>
                        </LazyLoad>

                    )
                })}
            </StaggerChildren>
        </div>
    )
}

export default AllWallpapers
interface IQuoteWallpaperProps {
    path: string
    pageContext: any
}