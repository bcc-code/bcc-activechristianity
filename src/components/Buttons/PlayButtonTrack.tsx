import React from 'react'
import { setCurrentMedia, setAutoPlay, addTracks, floatPlayer } from '@/state/action'

import { IMedia } from '@/types'
import { getTrackListFromPlaylist } from '@/helpers'
import { useDispatch } from 'react-redux'

export interface IPlayButtonProps {
    track: IMedia
    className?: string
    style?: any
}
const PlayButton: React.FC<IPlayButtonProps> = ({ track, children, className, style }) => {
    const dispatch = useDispatch()

    const setCurrent = (toAdd: IMedia) => {
        dispatch(floatPlayer())
        dispatch(setCurrentMedia(toAdd))
        dispatch(setAutoPlay(true))
    }
    const handleClick = () => {
        setCurrent(track)
        handlePlaylist()
    }

    const handlePlaylist = () => {
        let tracks: IMedia[] = []
        if (track.audio && track.audio.playlistSlug) {
            const playlistSlug = track.audio.playlistSlug

            tracks = getTrackListFromPlaylist(playlistSlug)
        }

        const index = tracks.findIndex(item => item.audio?.src === track.audio?.src)

        if (index > -1) {

            tracks = [...tracks.slice(index), ...tracks.slice(0, index)]

        }

        dispatch(addTracks(tracks))

    }
    return (
        <button
            className={`${className ? className : ''}`}
            onClick={handleClick}
            onKeyDown={handleClick}
            style={style}
        >
            {children}
        </button>
    )

}

export default PlayButton