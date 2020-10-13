import React from "react"
import Image16to9 from '@/components/Images/Image16to9'
import Link from '@/components/CustomLink'
import { IPostItem } from '@/types'
import PostExcerpt from '@/components/PostElements/TextSizeWClamp'


interface IVideoPost extends IPostItem {
    showExcerpt?: boolean
    showCategory?: boolean
    horizontal?: boolean
}
const VideoPost: React.FC<IVideoPost> = ({ slug, image, title, excerpt, types, showExcerpt, showCategory, horizontal }) => {
    return (
        <Link
            to={`${slug}`}
            className={`flex sm:pr-2 h-full mt-2`}
        >

            <div className="relative mr-4" style={{ width: "120px", height: "85px" }}>
                {/*                 <div className="z-30 absolute inset-0 flex justify-center items-center">
                    <PlayIcon />
                </div> */}
                <Image16to9 image={image} />
            </div>
            <div className="flex-1">

                <div className="text-sm font-semibold">
                    {title}
                </div>
                {showCategory && types && (
                    <div className="pb-2">
                        <span className="rounded uppercase p-1 text-mini bg-gray-200 text-gray-600 ">{types.map(cat => cat.name).join(' ')}</span>
                    </div>
                )}

                {showExcerpt && (
                    <PostExcerpt
                        rawText={excerpt}
                        clamp={2}
                        fontKey="top-img-exceprt"
                        className="flex items-stretch pb-8"
                    />
                )}
                {/* <ReadingTimingAuthor
                    className="text-xs text-gray-600"
                    authors={[
                        { name: 'ActiveChristian', slug: `/contributor/activechristianity`, wordpress_id: 0 }
                    ]} readingTime="03:47"
                /> */}
            </div>
        </Link >
    )
}

export default VideoPost
