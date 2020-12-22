
import * as React from 'react';
import { IPostItem } from '@/types'
import PostBase, { IPostBase } from '@/components/PostElements/Base'
import { PostLabel } from '@/components/PostElements'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import { PostItemMediaImg } from '@/components/PostElements/PlayButton'
import './leftverticle.css'

const TopImgPost: React.FC<IPostItem> = (props) => {
    const {
        title,
        excerpt,
        image,
        media,
        format,
    } = props

    return (
        <div
            className={`h-full overflow-hidden left-vert w-full  rounded-xxl sm:rounded-xl border`}>
            <PostItemMediaImg
                className="relative flex justify-end left-vert-img "
                track={media}
                slug={props.slug}
            >
                {format && format[0] && (
                    <div className="absolute p-3  top-0 left-0 flex">
                        <PostLabel text={format[0].name}></PostLabel>
                    </div>
                )}

                <LazysizesFeaturedImage
                    {...image}
                    className=" h-full pointer-events-none w-auto object-cover g-image rounded-l-xl"
                    alt={title}
                />
            </PostItemMediaImg>
            <PostBase
                post={props}
                wrapperClass={' pt-4 pr-4 left-vert-content'}

                postTitleProps={{
                    fontKey: 'text-lg-2xl',
                    clamp: 3,
                    className: "mb-2 text-ac-slate-dark"
                }}
                postExcerptProps={{
                    fontKey: 'text-sm',
                    clamp: 3,
                    className: "flex items-stretch mb-4 text-gray-600"
                }}
                audioDuration />
        </div>

    )
}

export default TopImgPost