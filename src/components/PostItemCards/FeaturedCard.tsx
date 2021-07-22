import * as React from 'react'
import ToggleBookmark from '@/components/PostElements/ToggleBookmark'
import { ToggleFollowPlaylistBookmark } from '@/components/PostElements/TopicToggleFollow'
import Link from '@/components/CustomLink'
import { IPostItem } from '@/types'
import PostTitle from '@/components/PostElements/TextSizeWClamp'
import SquareImg from '@/components/Images/Image1to1Rounded'
import ac_strings from '@/strings/ac_strings.js'
import { VolumeUpRoundedIcon } from '@/components/Icons/MUI/postIcons'
import { PostListItemMotion } from '@/components/Motion/StaggerChildren'
export interface IFeaturedCard extends IPostItem {
    showOnMobile?: boolean
    likes?: number
    className?: string
    type?: "podcast" | "playlist" | "ebook"
}

const FeaturedCard: React.FC<IFeaturedCard> = ({ type, title, id, authors, likes, image, className, slug, showOnMobile }) => {
    let bgStyle: any = {
        backgroundImage: image ? `url(${image.src})` : '',
        backgrond: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)`
    }
    let postSlug = slug

    if (type === "podcast" || type === "playlist" || type === "ebook") {
        bgStyle = {
            ...bgStyle,
            filter: 'blur(10px)',
            opacity: '0.9',
            left: '-10px',
            right: '-10px',
            top: '-10px',
            bottom: '-10px'
        }
    }

    return (
        <PostListItemMotion

            className={`${className ? className : ''} relative justify-end select-none block rounded-xxl sm:rounded-xl border border-gray-300 hover:shadow-md p-2 md:p-4 h-full w-full text-white overflow-hidden`}

        >
            <div className="absolute inset-0 rounded-xxl sm:rounded-xl overflow-hidden bg-center bg-cover" style={bgStyle}></div>
            <div className=" absolute left-0 top-0 bottom-0 right-0 rounded-lg" style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)' }}></div>
            <div className="flex flex-col rounded-lg h-full relative">

                <Link to={postSlug} className="w-full flex items-center justify-center flex-1 p-2 md:p-4 z-50" >
                    {(type === "podcast" || type === "playlist") && (
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
                            <div id="play-button" className="absolute p-2 text-white z-10 inset-0 flex justify-center items-center">
                                <VolumeUpRoundedIcon customSize="12" />
                            </div>
                            <SquareImg rounded {...image} alt={title} />
                        </div>
                    )}
                </Link>
                <Link to={postSlug} className="flex flex-col">
                    <div className="flex flex-col justify-center sm:justify-end z-30 h-12 sm:h-15 md:h-18">
                        {type == "playlist" && <span className="text-xs text-white text-center py-2" >{ac_strings.playlist}  </span>}
                        <PostTitle
                            rawText={title}
                            bold={"font-semibold"}
                            fontKey={'text-lg'}
                            clamp={3}
                            className="text-center leading-tight"

                        />
                    </div>
                    <div className={`${showOnMobile ? 'block' : 'hidden sm:block'} z-30 w-full border-b border-gray-500 my-2 md:my-4`} />

                </Link>
                <div className={`${showOnMobile ? 'block' : 'hidden sm:flex'} justify-between items-center text-sm z-30`}>
                    {authors && authors[0] && (
                        <div className="">
                            <span>{authors[0].authors.map(item => item.name).join(" ,")}</span>
                        </div>
                    )}
                    {type !== "ebook" && type !== "playlist" && (
                        <div className="flex">
                            <ToggleBookmark id={id} color="white" size="6" />

                        </div>
                    )}
                    {
                        type === "playlist" && (
                            <ToggleFollowPlaylistBookmark id={id} color="white" size="6" />
                        )
                    }
                </div>
            </div >

        </PostListItemMotion>
    )
}

export default FeaturedCard