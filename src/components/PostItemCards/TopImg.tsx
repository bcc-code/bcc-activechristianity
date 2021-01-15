
import * as React from 'react';
import { IPostItem } from '@/types'
import PostBase from '@/components/PostElements/Base'
import { PostLabel } from '@/components/PostElements'
import Image2To1 from '@/components/Images/Image2To1'
import { PostItemMediaImg } from '@/components/PostElements/PlayButton'
import LazysizesImage from '@/components/Images/LazysizesImage'

interface ITopImgPost {
    fixedImageHeight?: boolean
    noBorder?: boolean
    showType?: boolean
    noExcerpt?: boolean
    noBg?: boolean
}

const TopImgPost: React.FC<IPostItem & ITopImgPost> = (props) => {
    const {
        title,
        excerpt,
        image,
        noBorder,
        noExcerpt,
        media,
        showType,
        format,
        noBg,
        fixedImageHeight
    } = props
    return (
        <div
            className={`sm:hover:shadow-md flex flex-col max-w-lg text-gray-800 h-full overflow-hidden ${noBg === true ? 'bg-none' : 'bg-white '} ${noBorder !== true ? ' rounded-xxl sm:rounded-lg border ' : ''} `}>
            <PostItemMediaImg
                className={`relative w-full sm:pl-0 flex justify-end overflow-hidden ${noBorder === true ? 'rounded-lg' : 'rounded-lg rounded-b-none'}`}
                /* track={media} */
                slug={props.slug}
            >
                {showType && format && format[0] && (
                    <div className="absolute p-3  top-0 left-0 flex z-10">
                        <PostLabel text={format[0].name}></PostLabel>
                    </div>
                )}

                {fixedImageHeight ? (
                    <LazysizesImage
                        {...image}
                        className={`w-full pointer-events-none object-cover g-image ${noBorder === true ? 'rounded-lg' : 'rounded-lg rounded-b-none'}`}
                        alt={title}
                        style={{ minWidth: '84px', height: "180px" }}
                    />
                ) : (
                        <Image2To1
                            image={image}
                            imageClassName={` h-full pointer-events-none w-auto object-cover g-image ${noBorder === true ? 'rounded-lg' : 'rounded-lg rounded-b-none'}`}
                            alt={title}
                        />
                    )}
            </PostItemMediaImg>
            <PostBase
                post={props}
                wrapperClass={noBorder === true ? ' pt-4' : 'px-4 pt-4'}
                postTitleProps={{
                    fontKey: 'text-lg-2xl',
                    clamp: 2,
                    className: "mb-2 text-ac-slate-dark"
                }}
                postExcerptProps={noExcerpt ? undefined : {
                    fontKey: 'text-sm',
                    clamp: 3,
                    className: "flex items-stretch mb-4 text-gray-600"
                }}
                audioDuration
                noBorder={noBorder}
            />
        </div>

    )
}

export default TopImgPost