import * as React from 'react';
import Link from '@/components/CustomLink'
import SquareImage from '@/components/Images/Image1to1Rounded'
import TextSizeTitle, { ITextSizeWClamp } from '@/components/PostElements/TextSizeWClamp'
import { IPlaylist, } from '@/types'
import ac_strings from '@/strings/ac_strings.js'
const PlaylistTopImg: React.FC<IPlaylist> = ({ slug, image, title, excerpt }) => {
    return (
        <Link
            to={`${slug}`}
            className="flex flex-col">
            <SquareImage {...image} rounded />
            <div className="text-xxs py-2">{ac_strings.topic}</div>
            < TextSizeTitle
                rawText={title}
                fontKey={'text-sm-base-lg'}
                clamp={3}
                className="mb-2 text-ac-slate-dark"
            />
            <TextSizeTitle {...{
                rawText: excerpt,
                fontKey: "text-sm",
                clamp: 2,
                className: "mb-4 leading-tight text-gray-600"

            }} />
        </Link>
    )
}

export default PlaylistTopImg