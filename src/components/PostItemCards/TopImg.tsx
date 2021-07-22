import React, { Profiler } from 'react'
import { IPostItem } from '@/types'
import PostBase from '@/components/PostElements/Base'
import { PostLabel } from '@/components/PostElements'
import Image2To1 from '@/components/Images/Image2To1'
import { PostItemMediaImg } from '@/components/PostElements/PlayButton'
import LazysizesImage from '@/components/Images/LazysizesImage'
import { m as motion } from 'framer-motion'
interface ITopImgPost {
    fixedImageHeight?: boolean
    noBorder?: boolean
    showType?: boolean
    noExcerpt?: boolean
    noBg?: boolean
}

function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
) {
    /*     console.log(id)
        console.log(actualDuration) */
    // Aggregate or log render timings...
}

const TopImgPost: React.FC<IPostItem & ITopImgPost> = (props) => {
    const {
        title,
        slug,
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

        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
            }}
            className={`sm:hover:shadow-md flex flex-col max-w-lg text-gray-800 h-full overflow-hidden ${noBg === true ? 'bg-none' : 'bg-white '} ${noBorder !== true ? ' rounded-xxl sm:rounded-lg border ' : ''} `}
        >
            <PostItemMediaImg
                className={`relative w-full sm:pl-0 flex justify-end overflow-hidden ${noBorder === true ? 'rounded-lg' : 'rounded-lg rounded-b-none'}`}
                track={media}
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
                    fontKey: 'text-base-lg',
                    clamp: 2,
                    className: "mb-2 text-ac-slate-dark font-semibold"
                }}
                postExcerptProps={noExcerpt ? undefined : {
                    fontKey: 'text-sm',
                    clamp: 3,
                    className: "flex items-stretch mb-4 text-gray-600"
                }}
                audioDuration
                noBorder={noBorder}
            />
        </motion.div>


    )
}

export default TopImgPost