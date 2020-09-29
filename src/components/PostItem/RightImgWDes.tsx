import * as React from 'react';
import Link from '@/components/CustomLink'

import { IPostItem } from '@/types'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import TopicWithIcons from '@/layout-parts/Buttons/TopicWithIcon'
import { PostTitle, PostExcerpt, ReadingTimingAuthor, ReadingTimingIcon, AuthorLink, PostBase, IPostBase } from '@/components/PostItem/PostItemParts'
import { PostItemMediaImg } from '@/layout-parts/Buttons/PlayButton'
import { BookmarksAndViews } from '@/layout-parts'

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
        types,
        topics,
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
        noDes,
        likes,
        views,
        withTopics
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

    const postBaseProps: IPostBase = {
        post: props,
        wrapperClass: topImgClasses.postbaseWrapperClass,
        postTitleProps: {
            rawText: title,
            fontKey: "top-img",
            clamp: 3,
            bold: "font-semibold",
            className: "mb-2"
        },
        postExcerptProps: {
            rawText: excerpt,
            fontKey: "top-img-exceprt",
            clamp: 2,
            className: "flex items-stretch mb-4"
        },

    }

    return (
        <div className={`${border !== false ? 'border-b border-b-1 border-gray-300 last:border-b-1 sm:border-none pb-4' : ''}`}>
            <div className="flex items-start sm:items-stretch w-full cursor-pointer mt-2">
                <div className={`sm:pr-4 flex flex-col w-8/12 sm:w-6/12 md:w-8/12 items-start ${border !== false ? 'sm:border-b sm:border-b-1 sm:border-gray-300 last:sm:border-b-1 mr-4' : ''}`}>
                    {format && format[0] && (
                        <div className="pb-2">
                            <span className="rounded uppercase p-1 text-xxs font-bold bg-gray-100 text-gray-600">{format[0].name}</span>
                        </div>
                    )}
                    {media && media.audio && media.audio.playlistSlug === "podcast" && date && (
                        <span className="text-gray-500 text-xxs">{date.getDate()} {date.toLocaleString('default', { month: 'short' })} {date.getFullYear()}</span>
                    )}
                    <Link to={`/${slug}`} >
                        <PostTitle {...postBaseProps.postTitleProps} />
                        {/* <PostExcerpt {...postBaseProps.postExcerptProps} /> */}
                    </Link>
                    <div className="text-sm text-gray-500 mb-4"> <AuthorLink authors={authors} /></div>
                    <div className="mb-4 flex flex-wrap">
                        {topics && topics.map(item => {
                            return (
                                <TopicWithIcons {...item} />
                            )
                        })}
                    </div>


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
                <ReadingTimingIcon
                    readingTime={postReadingTime}
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