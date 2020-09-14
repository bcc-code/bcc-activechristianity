import * as React from 'react'
import ToggleBookmark from '@/components/Buttons/ToggleBookmark'

import Link from '@/components/CustomLink'
import Ebook from '@/components/Ebook/EbookItem'
import { IPostItem } from '@/types'
import { PostTitle } from '@/components/PostItem/PostItemParts'
import SquareImg from '@/components/Images/Image1to1Rounded'

import PlayButtonList from '@/components/Buttons/PlayButtonList'
import PlayButtonTrack from '@/components/Buttons/PlayButtonTrack'
import Icon from '@/components/Icons'

export interface IFeaturedCard extends IPostItem {
    showOnMobile?: boolean
    likes: number
    className?: string
    type?: "podcast" | "playlist" | "ebook"
}

const FeaturedCard: React.FC<IFeaturedCard> = ({ type, title, id, authors, likes, image, className, slug, media, showOnMobile }) => {

    const featured_media_url = image.src
    let bgStyle: any = {
        backgroundImage: `url(${featured_media_url})`
    }

    if (type === "podcast" || type === "playlist" || type === "ebook") {
        bgStyle = {
            ...bgStyle,
            filter: 'blur(15px)',
            opacity: '0.9',
            transform: 'scale(1.2)'
            /*             backgroundSize: '120% 120%' */
        }
    }

    let ImgTag: any = Link
    let props: any = { to: slug }
    if (type === "podcast") {
        ImgTag = PlayButtonTrack
        props = { track: media }
    }

    if (type === "playlist") {
        ImgTag = PlayButtonList
        props = { slug }
    }

    //|| type === "playlist"
    return (
        <div

            className={`${className ? className : ''} relative justify-end select-none block rounded-xxl sm:rounded-xl border border-gray-300 hover:shadow-md p-4 max-w-lg h-full w-full text-white overflow-hidden`}

        >
            <div className="absolute inset-0 rounded-xxl sm:rounded-xl overflow-hidden bg-center bg-cover" style={bgStyle}></div>
            <div className=" absolute left-0 top-0 bottom-0 right-0 rounded-lg" style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)' }}></div>
            <div className="flex flex-col rounded-lg h-full">
                <ImgTag className="w-full flex items-center justify-center flex-1 p-2 md:p-4 z-50" {...props}>
                    {(type === "podcast" || type === "playlist") && (
                        <div className="relative w-32 h-32">
                            <div id="play-button" className="absolute p-2 text-white z-10 inset-0 flex justify-center items-center">
                                <Icon name="speaker" size="3xl" />
                            </div>
                            <SquareImg {...image} alt={title} />
                        </div>
                    )}
                    {
                        type === "ebook" && (
                            <div className=" flex flex-col items-center">
                                <div className={`z-10 relative rounded w-28`}>
                                    <div className="absolute h-full w-2" style={{ left: "-3px", background: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.56) 50%, rgba(255, 255, 255, 0) 100%)" }} ></div>
                                    <div className={`absolute h-full w-2`} style={{ left: "5px", background: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.56) 50%, rgba(255, 255, 255, 0) 100%)" }} ></div>
                                    <img src={featured_media_url} alt={title} />
                                </div>
                                <div className={` md:w-40 lg:w-40 -mt-2 relative`} >
                                    <svg className="absolute" style={{ left: "3rem" }} width="27" height="7" viewBox="0 0 27 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.745453 0.436523L26.2727 6.32744V0.436523H0.745453Z" fill="#D4D4D4" />
                                    </svg>

                                    <svg className="w-full" height="13" viewBox="0 0 216 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.7455 0.436523L0 12.2184H216L202.255 0.436523H13.7455Z" fill="white" />
                                        <defs>
                                            <linearGradient id="paint0_linear" x1="108" y1="0.436523" x2="108" y2="12.2184" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#EAEAEA" />
                                                <stop offset="1" stop-color="white" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <svg className="absolute w-full" style={{ top: "12px" }} height="12" viewBox="0 0 216 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0.21875V12.0006H216V0.21875H0Z" fill="#EAEAEA" />
                                    </svg>
                                </div>
                            </div>
                        )
                    }
                </ImgTag>
                <Link to={slug} className="flex flex-col">
                    <div className="flex flex-col justify-center sm:justify-end z-30 h-12 sm:h-15 md:h-18">
                        <PostTitle
                            rawText={title}
                            bold={"font-semibold"}
                            fontKey={showOnMobile ? "feature-card-full" : "feature-card"}
                            clamp={2}
                            className="text-center"
                        />
                    </div>
                    <div className={`block z-30 w-full border-b border-gray-500 my-2 md:my-4`} />
                    <div className={`flex justify-between items-center text-sm z-30`}>
                        {authors && authors[0] && (
                            <div className="">
                                <span>{authors[0].authors.map(item => item.name).join(" ,")}</span>
                            </div>
                        )}
                        <div className="flex">
                            <ToggleBookmark id={id} color="text-white" size={16} />
                            <span className="ml-2">{likes}</span>
                        </div>
                    </div>
                </Link>
            </div >

        </div >
    )
}

export default FeaturedCard