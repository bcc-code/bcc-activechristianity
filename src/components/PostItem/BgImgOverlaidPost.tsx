import * as React from 'react'
import Link from '@/components/CustomLink'
import { PostTitle, ReadingTimingAuthor } from '@/components/PostItem/PostItemParts'
import { PostItemPlayButton } from '@/components/Buttons/PlayButton'
import { IPostItem } from '@/types'

interface IBgOverlaidPost extends IPostItem {
    type: "sectionHeader" | "postEnd"
}
const BgOverlaidPost: React.FC<IBgOverlaidPost> = (props) => {
    const { title, image, slug, excerpt, media, type, authors, reading_time } = props
    let className = "div1  m-0 relative overflow-hidden rounded-xxl sm:rounded-xl"
    let background = 'linear-gradient(90deg, rgba(33, 34, 54, 0.88) 0%, rgba(33, 34, 54, 0) 100%)'
    let readingTimeAuthorClassName = "text-sm text-gray-600"
    let padding = "z-10 pl-4 pt-10 pb-4 z-10  pl-4 pt-10 "

    if (type === "postEnd") {
        className = "rounded-md border border-gray-300 overflow-hidden hover:shadow-md"
        background = 'linear-gradient(0deg, rgba(56, 65, 86, 0.64), rgba(56, 65, 86, 0.64))'
        readingTimeAuthorClassName = "uppercase text-sm z-30"
        padding = "p-8 md:p-4 max-w-lg "
    }

    let postAuthors = authors
    let postReadingTime = reading_time?.text
    if (media.audio) {
        postAuthors = []
        postReadingTime = media.audio.duration
    }



    return (
        <div className={`relative h-full w-full text-white  select-none ${className}`}>


            <div className={`relative z-10 h-full ${type === "sectionHeader" ? "w-full  " : "w-8/12"}  sm:w-8/12 ${padding} flex flex-col justify-between`}>
                <Link to={`/${slug}`} >
                    <PostTitle
                        rawText={title}
                        bold="font-semibold"
                        fontKey="header-post"
                        clamp={3}
                        className="mb-4"
                    />

                    <span dangerouslySetInnerHTML={{ __html: excerpt }}></span>
                </Link>
                <ReadingTimingAuthor
                    className={readingTimeAuthorClassName}
                    authors={postAuthors}
                    readingTime={postReadingTime}
                />
                {media.audio && (
                    <div id="play-button" className="text-white z-10">
                        <PostItemPlayButton track={media} />
                    </div>
                )}
            </div>
            <div className="z-0 absolute inset-0 overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url(${image.src})` }}></div>
            <div className="z-0 absolute left-0 top-0 bottom-0 right-0 rounded-lg" style={{ background }}></div>
        </div>

    )
}

export default BgOverlaidPost