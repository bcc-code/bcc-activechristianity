import React from 'react'
import LazyLoad from '@/components/LazyLoad';
import { PostH1 } from '@/components/Headers'

import FetchWallpaper, { fetchWallpaperById } from '@/HOC/FetchWallpaper'
import Link from '@/components/CustomLink'
import StaggerChildrenItem from '@/components/Motion/StaggerChildrenItem'
import StaggerChildren from '@/components/Motion/StaggerChildren'
import WallpaperModal from '@/components/CustomizedPageComponent/Gallery/Modal'
import Wallpaper from '@/components/QuoteImage'
import WallpaperFilter from '@/layout-parts/WallpaperOverview/Filter'
import MetaTag from '@/components/Meta'
import { navigate } from "gatsby"
import Pagination from '@/components/Pagination'
import { trimSlug } from '@/helpers/index-js'
import ac_strings from '@/strings/ac_strings.js'
const AllWallpapers: React.FC<IQuoteWallpaperProps> = ({ pageContext, path }) => {

    const [activeWallpaperIndex, setActiveWallpaperIndex] = React.useState<any>(null)
    const [isOpen, setIsOpen] = React.useState(false)
    const { quotes, isHomePage, byColors, byFeaturedAuthors, byTopics, slug, title, pagePath, breadcrumb, paginate, metaTitle } = pageContext

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
                        arrayData.current[i] = { ...arrayData.current[i], wallpaper: w, index: i }
                        return arrayData.current[i]
                    })
                }
            } else {
            }
        })).then(res => {
            console.log(res)
            setActiveWallpaperIndex(0)
        })
    }


    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    const handleChange = (nr: number) => {
        if (paginate && nr < paginate.totalPages + 1 && nr > -1) {
            const fullPath = getLinkPath(nr)
            scrollToTop()
            navigate(fullPath)
        }
    }

    const getLinkPath = (nr: number) => {
        let activePage = nr
        let toReturnPath = '/'
        if (typeof nr === "string") {
            activePage = parseInt(nr)
        }

        if (paginate && nr < paginate.totalPages + 1 && nr > -1) {
            toReturnPath = activePage > 1 ? `/${trimSlug(paginate.baseUrl)}/${activePage}` : paginate.baseUrl

        }
        return toReturnPath
    }
    const filterProps = { byColors, byFeaturedAuthors, byTopics, slug };

    return (
        <div className="relativeh-full pt-9 sm:pt-4 pb-4 standard-max-w-px">
            <MetaTag
                title={metaTitle || title}
                type="page"
                path={pagePath}
                breadcrumb={breadcrumb}
            />
            <PostH1 title={title} />
            <WallpaperModal
                swipeViewArray={arrayData.current ? arrayData.current : []}
                startIndex={activeWallpaperIndex}
                isOpen={isOpen}
                handleClose={handleClose}
            />
            {isHomePage === true && (
                <WallpaperFilter {...filterProps} />
            )}
            <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pb-12">
                {sortedQuotes.map((q, k) => {
                    const { color, id, size, image } = q
                    /*  size: string, image: IImage, color: number[] */
                    return (
                        <LazyLoad key={id}>
                            <StaggerChildrenItem>
                                <Link
                                    to={`${ac_strings.wallpaper_slug}/${id}?openModal=true`}
                                    className="rounded-lg overflow-hidden"
                                    style={{
                                        backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
                                        paddingBottom: `177%`
                                    }}

                                >
                                    <Wallpaper size={size} image={image} color={color} alt={`${q.content} ${title}`} />
                                </Link>

                            </StaggerChildrenItem>
                        </LazyLoad>

                    )
                })}
            </StaggerChildren>
            {paginate && (
                <div className="flex justify-item py-4">
                    <Pagination
                        currentPage={paginate.currentPage}
                        totalPages={paginate.totalPages}
                        getLinkPath={getLinkPath}
                        onChange={handleChange}
                    />
                </div>
            )}
        </div>
    )
}

export default AllWallpapers

interface IQuoteWallpaperProps {
    path: string
    pageContext: any
}