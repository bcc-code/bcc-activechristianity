import * as React from 'react';
import Link from '@/components/CustomLink'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import VideoHeader from '@/components/Images/Video16to9'
import { IPostItem } from '@/types'
import PostMeta from '@/components/PostMeta/PostMeta'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import TextSizeWClamp from '@/components/PostElements/TextSizeWClamp'

import { ReadingTimingAuthor, PostLabel } from '@/components/PostElements'
const rbgToString = (colors: number[], alpha?: number) => {
    if (alpha) {
        return "rgba(" + colors.join(", ") + ", " + alpha + ")";
    } else {
        return "rgb(" + colors.join(", ") + ")";
    }
}

const HeaderPost: React.FC<IPostItem> = ({ format, duration, image, title, excerpt, authors, reading_time, id, slug, media }) => {
    /* const {  muted } = palette; */



    return (
        <div>
            <div
                className="absolute inset-x-0 top-0 h-64 z-minus"
            >
            </div>
            <div className="z-10 grid grid-cols-8 gap-12 standard-max-w-px relative pt-8 sm:pt-16 md:pt-20 lg:pt-24">
                <Link to={`/${slug}`} className="col-start-1 col-end-6 relative">


                    {media && media.video && media.video.src ? (
                        <VideoHeader
                            src={media.video.src}
                            className={`rounded-xxl sm:rounded-xl overflow-hidden`}
                        />

                    ) : (
                            <div className="m-0 relative w-full pb-square sm:pb-half">
                                <LazysizesFeaturedImage

                                    {...image}
                                    className="absolute w-full h-full inset-0 rounded-xxl sm:rounded-xl object-cover g-image"
                                />
                            </div>
                        )
                    }

                </Link>
                <div className="col-start-6 col-end-9 ml-5 flex flex-col justify-center pt-0">
                    <Link
                        to={`/${slug}`}

                    >
                        {format && format[0] && (
                            <PostLabel text={format[0].name} />
                        )}
                        <TextSizeWClamp
                            rawText={title}
                            bold="font-semibold"
                            fontKey="header-post"
                            clamp={3}
                            className="sm:py-3 py-1"

                        />
                    </Link>
                    <span className="leading-normal hidden sm:block  mt-4">{excerpt}</span>
                    {authors && (
                        <span className="text-d4gray-dark lg:hidden sm:py-3 py-1 text-sm">
                            <PostMeta authors={authors} />
                        </span>
                    )}
                    <div className="flex items-center sm:py-3 py-1">
                        <span className="pr-2">
                            <Bookmark id={id} size={"6"} />
                        </span>
                        {reading_time && <p className="ml-1 text-sm text-d4gray-dark lg:hidden">{reading_time.text}</p>}
                        <ReadingTimingAuthor className="w-full text-sm text-d4gray-dark hidden lg:block" duration={duration?.listen} authors={authors} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HeaderPost