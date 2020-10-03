
import * as React from 'react';
import { IPostItem } from '@/types'
import PostBase, { IPostBase } from '@/components/PostElements/Base'
import { PostLabel } from '@/components/PostItem/PostItemParts'
import Image2To1 from '@/components/Images/Image2To1'
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
            className={`h-full overflow-hidden left-vert w-full`}>
            <PostItemMediaImg
                className="relative flex justify-end left-vert-img"
                track={media}
                slug={props.slug}
            >
                {format && format[0] && (
                    <div className="absolute p-3  top-0 left-0 flex">
                        <PostLabel text={format[0].name}></PostLabel>
                    </div>
                )}

                <Image2To1
                    image={image}
                    imageClassName={`relative block w-full sm:pl-0 flex justify-end  rounded-l-xl`}
                    alt={title}
                />
            </PostItemMediaImg>
            <PostBase
                post={props}
                wrapperClass={' pt-4 pr-4 left-vert-content'}
                postTitleProps={{
                    fontKey: 'text-lg',
                    clamp: 3,
                    bold: "font-semibold",
                    className: "mb-2"
                }}
                postExcerptProps={{
                    fontKey: 'text-base',
                    clamp: 3,
                    className: "flex items-stretch mb-4"
                }}
                audioDuration />
        </div>

    )
}

export default TopImgPost