import * as React from 'react'
import { IPlaylist } from '@/types'
import PlaylistLayout from '@/layouts/PlaylistLayout'
const Playlist: React.FC<IPlaylistsProps> = (props) => {
    const { playlist } = props.pageContext
    return (
        <PlaylistLayout
            {...playlist}

        />
    )
}

export default Playlist

interface IPlaylistsProps {
    path: string

    pageContext: {
        title: string
        playlist: IPlaylist
    }
}
