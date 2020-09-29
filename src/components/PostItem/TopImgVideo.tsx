
import * as React from 'react';
import { IPostItem } from '@/types'
import { PostBase, IPostBase, PostLabel, PostTitle, PostExcerpt } from '@/components/PostItem/PostItemParts'
import Image16to9 from '@/components/Images/Image16to9'
import { PostItemMediaImg } from '@/layout-parts/Buttons/PlayButton'
import Link from '@/components/CustomLink'
import "./style/leftverticle.css"


interface ITopImgPost {
    isLeftImg?: boolean
    isHeader?: boolean
    noBorder?: boolean
    showType?: boolean
    roundedImage?: boolean
    noBg?: boolean,
    smallTitle?: boolean
}

const TopImgPost: React.FC<IPostItem & ITopImgPost> = (props) => {
    const {
        title,
        excerpt,
        isHeader,
        image,
        media,
        showType,
        format,
        noBg,
        smallTitle
    } = props

    const topImgClasses = {
        mainClass: `flex flex-col max-w-lg text-gray-800 h-full overflow-hidden ${noBg === true ? 'bg-none' : 'bg-white '}`,
        imageWrapper: {
            className: "relative block w-full sm:pl-0 flex justify-end",
        },
        imageClass: "w-full h-full pointer-events-none w-auto object-cover g-image rounded-xl",
        postbaseWrapperClass: 'px-4 pt-4'

    }

    const classConfig = topImgClasses

    const postBaseProps: IPostBase = {
        post: props,
        wrapperClass: classConfig.postbaseWrapperClass,
        postTitleProps: {
            rawText: title,
            fontKey: smallTitle ? "feature-card" : "top-img",
            clamp: isHeader ? 2 : 3,
            bold: "font-semibold",
            className: "mb-2"
        },
        postExcerptProps: {
            rawText: excerpt,
            fontKey: "top-img-exceprt",
            clamp: 3,
            className: "flex items-stretch mb-4"
        },
    }

    return (
        <div
            className={classConfig.mainClass}>
            <PostItemMediaImg
                {...classConfig.imageWrapper}
                track={media}
                slug={props.slug}
            >
                {showType && format && format[0] && (
                    <div className="absolute p-3  top-0 left-0 flex">
                        <PostLabel text={format[0].name}></PostLabel>
                    </div>
                )}

                <Image16to9
                    image={image}
                    imageClassName={classConfig.imageClass}
                    alt={title}
                />
            </PostItemMediaImg>
            <div className={`flex flex-col flex-1 ${postBaseProps.wrapperClass}`}>
                <div className="flex flex-col flex-1 leading-normal">
                    <Link to={`/${props.slug}`} >
                        <PostTitle {...postBaseProps.postTitleProps} />
                    </Link>
                </div>

            </div>
        </div>

    )
}

export default TopImgPost