
import * as React from 'react';
import Link from '@/components/CustomLink'
import { PostItemPlayButtonSmall } from '@/components/PostElements/PlayButton'
import { IPostItem } from '@/types'
import { ReadingTimingAuthor } from '@/components/PostElements'
import { DescriptionIcon } from '@/components/Icons/MUI/postIcons'
import PostTitle from '@/components/PostElements/TextSizeWClamp'
import ac_strings from '@/strings/ac_strings.js'
import SquareImage from '@/components/Images/Image1to1Rounded'

interface IColorBlockNoImage {
    playIcon?: boolean
}

const ColorBlockNoImage: React.FC<IPostItem & IColorBlockNoImage> = (props) => {
    const {
        image,
        slug,
        title,
        duration,
        media,
        authors,
    } = props
    return (
        <div className="flex py-4" key={slug}>
            <div className="flex">
                <div className="hidden md:flex w-12 h-12 rounded-lg justify-center items-center mt-2">
                    <div className="mx-4 text-gray-300 ">
                        {(media.audio || media.video) ?
                            (
                                <PostItemPlayButtonSmall track={media} />
                            )
                            : (
                                <DescriptionIcon customSize="6" />
                            )}

                    </div>
                </div>
                <Link to={slug} className="h-16 w-16 md:hidden ">
                    <SquareImage
                        className="rounded-lg"
                        {...image}
                    />
                </Link>
            </div>

            <Link to={slug} className="flex-1 mb-4 ml-4">
                <PostTitle
                    rawText={title}
                    fontKey="text-base-lg"
                />

                {media.audio ? (
                    <span>
                        <ReadingTimingAuthor
                            authors={[]}
                            duration={duration?.listen}
                        />

                    </span>
                ) : <ReadingTimingAuthor duration={duration?.listen} authors={authors} />}
            </Link>
        </div>

    )
}

export default ColorBlockNoImage