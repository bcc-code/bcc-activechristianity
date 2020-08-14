import * as React from 'react'
import Link from '@/components/CustomLink'
import { PostTitle, PostExcerpt } from '@/components/PostItem/PostItemParts'
import { IPostItem } from '@/types'
import SquareImg from '@/components/Images/Image1to1Rounded'
import { PostItemPlayButton } from '@/components/Buttons/PlayButton'

interface IPlaylistPostItemProps extends IPostItem {
    tagline?: string
}
const PlaylistPostItem: React.FC<IPlaylistPostItemProps> = ({ title, excerpt, image, slug, media, tagline }) => {
    return (
        <div className="mb-8 flex flex-col sm:flex-row">
            {tagline && <h6 className="font-semibold text-sm sm:text-base mb-6 text-center sm:text-left w-full text-gray-800 sm:hidden">{tagline}</h6>}
            <div className="w-full sm:w-1/3 relative px-8 pt-0 sm:pl-0">
                <div id="play-button" className="absolute p-2 text-white z-10 inset-0 flex justify-center items-center">
                    <PostItemPlayButton track={media} />
                </div>
                <SquareImg {...image} alt={title} />

            </div>
            <Link className="pt-4 sm:py-0 px-4 " to={slug}>
                {tagline && <h6 className="font-semibold text-sm sm:text-base mb-6 text-center sm:text-left w-full text-gray-800 hidden sm:block">{tagline}</h6>}
                <PostTitle
                    fontKey="header-post"
                    rawText={title}
                    clamp={3}
                    bold="font-semibold"
                    className="mb-2 text-center sm:text-left"
                />
                <div className="hidden sm:block" dangerouslySetInnerHTML={{ __html: excerpt }}>

                </div>
            </Link>
        </div>
    )
}

export default PlaylistPostItem