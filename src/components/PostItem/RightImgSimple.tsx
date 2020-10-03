import * as React from 'react';
import Link from '@/components/CustomLink'

import { IPostItem } from '@/types'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import { PostTitle, ReadingTimingAuthor } from '@/components/PostItem/PostItemParts'
import PlayButtonTrack from '@/components/PostElements/PlayBtnWrapperByTrackSlug'
import Icon from '@/components/Icons'
import 'lazysizes';
const RightImgNoDes: React.FC<IPostItem & { border?: boolean }> = (props) => {
    const { title, image, types, bookmarked, excerpt, border, slug, id, reading_time, authors, media, date } = props

    return (
        <div className="flex items-start sm:items-stretch w-full cursor-pointer mt-2">

            <div className={`sm:pr-4  flex-1 flex flex-col sm:min-h-24 items-start ${border !== false ? 'pb-2 border-b border-b-1 border-gray-300 last:border-b-1 mr-4' : ''}`}>
                <div className="flex w-full">
                    {media && (media.audio || media.video) && (
                        <div className="pt-2 text-gray-600">
                            <PlayButtonTrack track={media}>
                                <Icon name="speaker" size="2xl" />
                            </PlayButtonTrack>
                        </div>
                    )}
                    <div className="flex-1">
                        <Link to={`${slug}`}>
                            <PostTitle
                                rawText={title}
                                fontKey="feature-card"
                                bold="font-semibold"
                                className="block mb-2 sm:mb-4 mt-1"
                                clamp={3}
                            />
                        </Link>
                        <ReadingTimingAuthor className="text-xs text-gray-600" readingTime={reading_time?.text} authors={authors} />
                    </div>
                </div>

            </div>
            <div className="flex justify-center pt-2">
                <Link to={`${slug}`} className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                    <LazysizesFeaturedImage
                        {...image}
                        className="absolute w-full h-full inset-0 rounded-xl object-cover g-image"
                        alt={title}
                    />

                </Link>
            </div>
        </div>
    )
}

export default RightImgNoDes;