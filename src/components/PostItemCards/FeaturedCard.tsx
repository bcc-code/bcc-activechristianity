import * as React from 'react'
import ToggleBookmark from '@/components/PostElements/ToggleBookmark'

import Link from '@/components/CustomLink'
import Ebook from '@/components/Ebook/EbookItem'
import { IPostItem } from '@/types'
import { PostTitle } from '@/components/PostItem/PostItemParts'
import SquareImg from '@/components/Images/Image1to1Rounded'

import Icon from '@/components/Icons'
export interface IFeaturedCard extends IPostItem {
    showOnMobile?: boolean
    likes?: number
    className?: string
    type?: "podcast" | "playlist" | "ebook"
}

const FeaturedCard: React.FC<IFeaturedCard> = ({ type, title, id, authors, likes, image, className, slug, media, showOnMobile }) => {

    let bgStyle: any = {
        backgroundImage: image ? `url(${image.src})` : '',
        backgrond: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)`
    }

    if (type === "podcast" || type === "playlist" || type === "ebook") {
        bgStyle = {
            ...bgStyle,
            filter: 'blur(10px)',
            opacity: '0.9',
            left: '-10px',
            right: '-10px',
            top: '-10px',
            bottom: '-10px'

            /*             backgroundSize: '120% 120%' */
        }
    }

    let ImgTag: any = Link
    let props: any = { to: slug }

    //|| type === "playlist"
    return (
        <div

            className={`${className ? className : ''} relative justify-end select-none block rounded-xxl sm:rounded-xl border border-gray-300 hover:shadow-md p-2 md:p-4 max-w-lg h-full w-full text-white overflow-hidden`}

        >
            <div className="absolute inset-0 rounded-xxl sm:rounded-xl overflow-hidden bg-center bg-cover" style={bgStyle}></div>
            <div className=" absolute left-0 top-0 bottom-0 right-0 rounded-lg" style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)' }}></div>
            <div className="flex flex-col rounded-lg h-full">
                <ImgTag className="w-full flex items-center justify-center flex-1 p-2 md:p-4 z-50" {...props}>
                    {(type === "podcast" || type === "playlist") && (
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
                            <div id="play-button" className="absolute p-2 text-white z-10 inset-0 flex justify-center items-center">
                                <Icon name="speaker" size="3xl" />
                            </div>
                            <SquareImg {...image} alt={title} />
                        </div>
                    )}
                    {
                        type === "ebook" && (
                            <Ebook image={image} title={title} full={showOnMobile} />
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
                    <div className={`${showOnMobile ? 'block' : 'hidden sm:block'} z-30 w-full border-b border-gray-500 my-2 md:my-4`} />
                    <div className={`${showOnMobile ? 'block' : 'hidden sm:flex'} justify-between items-center text-sm z-30`}>
                        {authors && authors[0] && (
                            <div className="">
                                <span>{authors[0].authors.map(item => item.name).join(" ,")}</span>
                            </div>
                        )}
                        <div className="flex">
                            <ToggleBookmark id={id} color="slate-light" size="4" />
                            <span className="ml-2">{likes}</span>
                        </div>
                    </div>
                </Link>
            </div >

        </div >
    )
}

export default FeaturedCard