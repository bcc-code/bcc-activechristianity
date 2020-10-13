import * as React from 'react'
import { IPlaylist, INavItem } from '@/types'
import PlaylistLayout from '@/layouts/PlaylistLayout'
import MetaTag from '@/components/Meta'
const Playlist: React.FC<IPlaylistsProps> = (props) => {

    const { playlist, title, breadcrumb } = props.pageContext
    const path = props.path
    return (
        <div>
            <MetaTag
                path={props.path}
                title={title}
                type="article"
                translatedUrls={[]}
                breadcrumb={[...breadcrumb, { name: title, to: path }]}
            />
            <PlaylistLayout
                {...playlist}

            />
        </div>

    )
}

export default Playlist

interface IPlaylistsProps {
    path: string

    pageContext: {
        title: string
        slug: string
        playlist: IPlaylist
        breadcrumb: INavItem[]
    }
}
