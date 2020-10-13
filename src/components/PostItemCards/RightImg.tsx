import * as React from 'react';
import Link from '@/components/CustomLink'

import TextSizeTitle from '@/components/PostElements/TextSizeWClamp'
import { ReadOrListenIcon, BookmarksAndViews } from '@/components/PostElements'
import { IPostItem } from '@/types'

import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'

import { PostItemMediaImg } from '@/components/PostElements/PlayButton'

import 'lazysizes';

interface IRightImgNoDes extends IPostItem {
    border?: boolean,
    audioDuration?: boolean
    noDes?: boolean
    withTopics?: boolean
}
const RightImgWDes: React.FC<IRightImgNoDes> = (props) => {

    const {
        title,
        image,
        format,
        excerpt,
        border,
        slug,
        id,
        reading_time,
        authors,
        media,
        date,
        audioDuration,
        duration,
        likes,
        views,
    } = props
    let postAuthors = authors
    let postReadingTime = reading_time?.text

    if (media && media.audio && audioDuration == true) {
        postAuthors = []
        postReadingTime = media.audio.duration
    }

    const topImgClasses = {
        mainClass: 'flex flex-col max-w-lg bg-white text-gray-800 h-full overflow-hidden ',
        imageWrapper: {
            className: "relative block w-full sm:pl-0 flex justify-end",
            /* style: { minWidth: '84px', height: "180px" } */
        },
        imageClass: "w-full h-full pointer-events-none w-auto object-cover g-image",
        postbaseWrapperClass: 'pt-4'

    }


    return (
        <div className={`${border !== false ? 'border-b border-gray-300 last:border-b-1 pb-4' : ''}`}>
            <div className="flex items-start sm:items-stretch w-full cursor-pointer mt-5">
                <div className={`pr-4 flex flex-col w-8/12 sm:w-6/12 md:w-8/12 items-start `}>
                    {format && format[0] && (
                        <div className="pb-2">
                            <span className="text-xxs text-gray-600">{format[0].name}</span>
                        </div>
                    )}

                    <Link to={`/${slug}`} >
                        <TextSizeTitle {...{
                            rawText: title,
                            fontKey: "text-base",
                            clamp: 3,
                            bold: "font-semibold",
                            className: "mb-4 leading-normal"
                        }} />
                        <TextSizeTitle {...{
                            rawText: excerpt,
                            fontKey: "text-base",
                            clamp: 2,
                            className: "mb-4 leading-tight"

                        }} />
                    </Link>
                </div>
                <div className="w-4/12 sm:w-6/12 md:w-4/12 flex justify-center">
                    <PostItemMediaImg
                        className="relative w-full max-h-24 pb-square sm:pb-half mt-4"
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
            <div className="py-4 flex w-full justify-between">
                <ReadOrListenIcon
                    track={media}
                    {...duration}
                />
                <BookmarksAndViews
                    id={id}
                    likes={likes}
                    views={views}
                />
            </div>
            {/*             <div className="w-full justify-between flex">

                <div className="pb-4 flex">
                    <ReadingTimingIcon
                        readingTime={postReadingTime}
                    />
                    <BookmarksAndViews
                        id={id}
                        likes={likes}
                        views={views}
                    />
                </div>
            </div> */}

        </div>

    )
}

export default RightImgWDes;