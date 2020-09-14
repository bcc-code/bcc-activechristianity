import * as React from 'react';
import Link from '@/components/CustomLink'

import { IPostItem } from '@/types'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'

import { PostTitle, PostExcerpt, ReadingTimingAuthor } from '@/components/PostItem/PostItemParts'
import { PostItemMediaImg } from '@/components/Buttons/PlayButton'
import { ShareSection } from '@/layout-parts'

import 'lazysizes';

interface IRightImgNoDes extends IPostItem {
    border?: boolean,
    audioDuration?: boolean
    noDes?: boolean
}
const RightImgWDes: React.FC<IRightImgNoDes> = (props) => {

    const {
        title,
        image,
        types,
        format,
        bookmarked,
        excerpt,
        border,
        slug,
        id,
        reading_time,
        authors,
        media,
        date,
        audioDuration,
        noDes
    } = props
    let postAuthors = authors
    let postReadingTime = reading_time?.text

    if (media && media.audio && audioDuration == true) {
        postAuthors = []
        postReadingTime = media.audio.duration
    }

    return (
        <div className={`${border !== false ? 'border-b border-b-1 border-gray-300 last:border-b-1 mr-4 sm:border-none pb-4' : ''}`}>
            <div className="flex items-center sm:items-stretch w-full cursor-pointer mt-2">
                <div className={`sm:pr-4 pb-5 flex flex-col w-8/12 sm:w-6/12 md:w-8/12 items-start ${border !== false ? 'sm:border-b sm:border-b-1 sm:border-gray-300 last:sm:border-b-1 mr-4' : ''}`}>
                    {format && format[0] && (
                        <div className="pb-2">
                            <span className="rounded uppercase p-1 text-xxs font-bold bg-gray-100 text-gray-600">{format[0].name}</span>
                        </div>
                    )}
                    {media && media.audio && media.audio.playlistSlug === "podcast" && date && (
                        <span className="text-gray-500 text-xxs">{date.getDate()} {date.toLocaleString('default', { month: 'short' })} {date.getFullYear()}</span>
                    )}
                    <Link to={`${slug}`} className="w-full">
                        <PostTitle
                            rawText={title}
                            fontKey="right-img"
                            bold="font-semibold"
                            className="block mb-2 sm:mb-4 mt-1"
                        />
                        {noDes !== true && (
                            <PostExcerpt
                                rawText={excerpt}
                                clamp={2}
                                fontKey="top-img-exceprt"
                                className="block mb-2 mx max-w-full sm:whitespace-normal sm:overflow-visible"
                            />
                        )}
                    </Link>

                    <div className="items-center w-full hidden sm:flex  sm:mt-12">

                        <ReadingTimingAuthor className="w-full text-sm text-d4gray-dark hidden md:block" readingTime={postReadingTime} authors={postAuthors} />
                        <ShareSection
                            shareSlug={slug}
                            text={title}
                            bookmarked={bookmarked}
                            id={id}
                            simple
                            size={16}

                        />

                    </div>
                </div>
                <div className="w-4/12 sm:w-6/12 md:w-4/12 flex justify-center">
                    <PostItemMediaImg
                        className="relative w-full max-h-24 pb-square sm:pb-half"
                        track={media}
                        slug={slug}

                    >
                        <LazysizesFeaturedImage
                            {...image}
                            className="absolute w-full h-full inset-0 rounded-xxl sm:rounded-xl object-cover g-image"
                            alt={title}
                        />

                    </PostItemMediaImg>

                </div>

            </div>
            <div className="items-center w-full flex sm:hidden  sm:mt-12">

                <ReadingTimingAuthor className="w-full text-sm text-d4gray-dark lg:block" readingTime={reading_time?.text} authors={authors} />
                <ShareSection
                    shareSlug={slug}
                    text={title}
                    bookmarked={bookmarked}
                    id={id}
                    simple
                    size={16}

                />

            </div>
        </div>

    )
}

export default RightImgWDes;