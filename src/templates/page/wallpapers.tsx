import React from 'react'
import LazyLoad from '@/components/LazyLoad';
import { PostH1 } from '@/components/Headers'
import FetchWallpaper, { fetchWallpaperById } from '@/HOC/FetchWallpaper'
import StaggerChildrenItem from '@/components/Motion/StaggerChildrenItem'
import StaggerChildren from '@/components/Motion/StaggerChildren'
import WallpaperModal from '@/components/CustomizedPageComponent/Gallery/Modal'
import Wallpaper from '@/components/QuoteImage'


const AllWallpapers: React.FC<IQuoteWallpaperProps> = ({ pageContext, path }) => {
    const [activeWallpaperIndex, setActiveWallpaperIndex] = React.useState<any>(null)
    const [isOpen, setIsOpen] = React.useState(false)
    const { quotes } = pageContext
    const sortedQuotes = quotes.filter(q => q.color !== null)
    const arrayData = React.useRef(sortedQuotes)

    const handleClose = () => {
        setIsOpen(false)
        setActiveWallpaperIndex(null)
    }
    const handleOpen = (i: number) => {
        if (arrayData.current) {
            setActiveWallpaperIndex(i)
            setIsOpen(true)
        }
    }
    const updateArray = (w: any, i: number) => {
        if (arrayData.current) {
            arrayData.current[i] = { ...arrayData.current[i], wallpaper: w, index: i }
        }
    }
    const getRandom = () => {
        const randomNumb = Math.floor(Math.random() * quotes.length)

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
        })
    }
    return (
        <div className="relativeh-full pt-4 standard-max-w-px">
            <PostH1 title={"Wallpaper"} />
            <WallpaperModal
                swipeViewArray={arrayData.current ? arrayData.current : []}
                startIndex={activeWallpaperIndex}
                isOpen={isOpen}
                handleClose={handleClose}
            />
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