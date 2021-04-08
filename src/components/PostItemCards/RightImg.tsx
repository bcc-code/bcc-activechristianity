import * as React from 'react';
import Link from '@/components/CustomLink'

import TextSizeTitle from '@/components/PostElements/TextSizeWClamp'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import { AuthorLink, Views, ReadOrListenIcon } from '@/components/PostElements'
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
        audioDuration,
        duration,
    } = props
    let postAuthors = authors
    let postReadingTime = reading_time?.text

    if (media && media.audio && audioDuration == true) {
        postAuthors = []
        postReadingTime = media.audio.duration
    }


    return (
        <div className={`${border !== false ? 'border-b border-gray-300 last:border-b-1 pb-4' : ''}`}>
            <div className="flex items-start sm:items-stretch w-full cursor-pointer mt-5">
                <div className={`pr-4 flex flex-col w-8/12 sm:w-6/12 md:w-8/12 items-start `}>
                    {format && format[0] && (
                        <Link className="pb-2" to={`${format[0].to}`}>
                            <span className="text-xxs text-gray-600">{format[0].name}</span>
                        </Link>
                    )}

                    <Link to={`/${slug}`} >
                        <TextSizeTitle {...{
                            rawText: title,
                            fontKey: 'text-lg-2xl',
                            clamp: 3,
                            className: "mb-2 text-ac-slate-dark"
                        }} />
                        {excerpt && <TextSizeTitle {...{
                            rawText: excerpt,
                            fontKey: "text-sm",
                            clamp: 2,
                            className: "mb-4 leading-tight text-gray-600"

                        }} />}
                    </Link>
                    {authors && <div className="text-xs text-ac-slate-dark sm:text-ac-slate-light mb-4"> <AuthorLink authorGroups={authors} /></div>}
                </div>
                <div className="w-24 sm:w-64 md:w-64 flex justify-center">
                    <PostItemMediaImg
                        className="relative w-full max-h-24 pb-square sm:pb-half rounded-xxl sm:rounded-xl overflow-hidden "
                        track={media}
                        slug={slug}

                    >
                        <LazysizesFeaturedImage
                            {...image}
                            className="absolute w-full h-full inset-0 rounded-xxl sm:rounded-xl overflow-hidden object-cover g-image"
                            alt={title}
                        />

                    </PostItemMediaImg>
                </div>
            </div>
            <div className="pt-4 flex w-full justify-between">
                <ReadOrListenIcon
                    track={media}
                    {...duration}
                />
                <div className="flex">
                    {/*  {views ? <Views views={views} /> : null} */}
                    <Bookmark id={id} color="slate-dark" size="5" />
                </div>
            </div>
        </div>

    )
}

export default RightImgWDes;