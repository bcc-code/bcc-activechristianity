import * as React from 'react';
import Link from '@/components/CustomLink'
import SquareImage from '@/components/Images/Image1to1Rounded'
import { INavItem, IPostsByFormat, IPostItem, IPlaylist, INavItemCount, ISubtopicLinks } from '@/types'
import ac_strings from '@/strings/ac_strings.json'
const PlaylistTopImg: React.FC<IPlaylist> = ({ slug, image, title }) => {
    return (
        <Link
            to={`${slug}`}
            className="flex flex-col">
            <SquareImage {...image} />
            <div className="text-xxs py-2">{ac_strings.topic}</div>
            <div className="text-sm pb-2 font-semibold">{title}</div>
        </Link>
    )
}

export default PlaylistTopImg