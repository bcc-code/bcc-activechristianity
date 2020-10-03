import * as React from 'react';
import Link from '@/components/CustomLink'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import VideoHeader from '@/components/Images/Video16to9'
import { IPostItem } from '@/types'
import PostMeta from '@/components/PostMeta/PostMeta'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import { PostTitle, ReadingTimingAuthor, PostLabel } from '@/components/PostItem/PostItemParts'


const rbgToString = (colors: number[], alpha?: number) => {
    if (alpha) {
        return "rgba(" + colors.join(", ") + ", " + alpha + ")";
    } else {
        return "rgb(" + colors.join(", ") + ")";
    }
}

const HeaderPost: React.FC<IPostItem> = ({ format, bookmarked, image, title, excerpt, authors, reading_time, id, slug, media }) => {
    /* const {  muted } = palette; */
    const bgGradientStyle = { 'backgroundImage': '' }
    if (image) {
        const darkMuted = image.colors && image.colors[0]
        const vibrant = image.colors && image.colors[1]
        const muted = image.colors && image.colors[2]
        if (darkMuted && vibrant && muted) {
            bgGradientStyle.backgroundImage = `linear-gradient(0, #fff 30%, rgba(255,255,255,0.5) 70%, rgba(255,255,255,0) 100%), linear-gradient(90deg, ${rbgToString(darkMuted, .5)}, ${rbgToString(vibrant, .5)} 50%, ${rbgToString(muted, .5)} 100%)`
        }
    }



    return (
        <div>
            <div
                className="absolute inset-x-0 top-0 h-64 z-minus"
                style={bgGradientStyle}
            >
            </div>
            <div className="z-10 grid-home-header-5-3 standard-max-w-px relative pt-8 sm:pt-16 md:pt-20 lg:pt-24">
                <Link to={`/${slug}`} className="div1 relative sm:pr-12">


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
                <div className="div2 ml-5 flex flex-col justify-center pt-0">
                    <Link
                        to={`/${slug}`}

                    >
                        {format && format[0] && (
                            <PostLabel text={format[0].name} />
                        )}
                        <PostTitle
                            rawText={title}
                            bold="font-semibold"
                            fontKey="header-post"
                            clamp={3}
                            className="sm:py-3 py-1"

                        />
                    </Link>
                    <span className="font-medium hidden sm:block lg:text-xl mt-4">{excerpt}</span>
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
                        <ReadingTimingAuthor className="w-full text-sm text-d4gray-dark hidden lg:block" readingTime={reading_time?.text} authors={authors} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HeaderPost