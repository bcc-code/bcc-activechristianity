
import * as React from 'react'
import Link from '@/components/CustomLink'
import { IPostItem } from '@/types'
import TextSizeTitle, { ITextSizeWClamp } from '@/components/PostElements/TextSizeWClamp'
import { PostLabel } from '@/components/PostItem/PostItemParts'
import Image16to9 from '@/components/Images/Image16to9'
import { PostItemMediaImg } from '@/components/PostElements/PlayButton'
import { AuthorLink, ReadingTimingIcon, BookmarksAndViews, ReadOrListenIcon } from '@/components/PostElements'

interface IProps {
    small?: boolean
}
const TopImgPost: React.FC<IPostItem & IProps> = (props) => {
    const {
        title,
        excerpt,
        slug,
        image,
        id,
        views,
        likes,
        small
    } = props

    return (
        <Link to={`${slug}`} className={`flex flex-col max-w-lg text-gray-800 h-full overflow-hidden `}>
            <Image16to9
                image={image}
                alt={title}
                imageClassName="rounded-xl"
            />

            <div className="flex-1 flex justify-between flex-col">
                <TextSizeTitle {...{
                    fontKey: small ? 'text-sm' : 'text-lg',
                    clamp: 3,
                    bold: "font-semibold",
                    className: "mb-2 text-d4slate-dark"
                }} rawText={title} />
                {small !== true && (
                    <div className="pb-4">
                        <BookmarksAndViews
                            id={id}
                            likes={likes}
                            views={views}
                            className="flex justify-start"
                        />
                    </div>
                )}
            </div>
        </Link>

    )
}

export default TopImgPost