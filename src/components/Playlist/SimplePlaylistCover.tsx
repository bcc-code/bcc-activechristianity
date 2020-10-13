import * as React from 'react'
import Link from '@/components/CustomLink'
import PostTitle from '@/components/PostElements/TextSizeWClamp'
import { IPostItem } from '@/types'
import SquareImg from '@/components/Images/Image1to1Rounded'
import { PlaylistPlayButton } from '@/components/PostElements/PlayButton'

const PlaylistPostItem: React.FC<IPostItem> = ({ title, excerpt, image, slug, media }) => {
    return (
        <div className="mb-8">
            <div className="w-full relative pt-0">
                <div id="play-button" className="absolute p-2 text-white z-10 inset-0 flex justify-center items-center">
                    <PlaylistPlayButton slug={slug} />
                </div>
                <SquareImg {...image} alt={title} />

            </div>
            <Link className="flex-1 px-4 pt-4" to={slug}>
                <PostTitle
                    fontKey="top-img"
                    rawText={title}
                    clamp={3}
                    bold="font-semibold"
                    className="mb-2 text-center"
                />
            </Link>
        </div>
    )
}

export default PlaylistPostItem