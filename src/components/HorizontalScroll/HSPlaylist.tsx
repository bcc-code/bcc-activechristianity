import React from 'react'
import XScroll from '@/components/HorizontalScroll/BaseCustomSize'
import { IPlaylist } from '@/types'
import PodcastTopImg from '@/components/PostItemCards/PlaylistTopImg'
import shortId from 'shortid'
const HSCardList: React.FC<{ playlists: IPlaylist[] }> = ({ playlists }) => {
    return (
        <XScroll
            childeClassName="w-3/12 min-w-3/12"
            items={playlists.map((p) => (
                <PodcastTopImg   {...p} key={shortId.generate()} />
            ))}
        />

    )
}

export default HSCardList