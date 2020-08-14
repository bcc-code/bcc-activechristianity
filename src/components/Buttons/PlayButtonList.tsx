import React from 'react'
import { setCurrentMedia, setAutoPlay, addTracks, floatPlayer } from '@/state/action'

import { IMedia } from '@/types'
import { getTrackListFromPlaylist, getTracklistFromPodcast } from '@/helpers'
import { useDispatch } from 'react-redux'

interface IPlayButtonList {
    slug: string
    className?: string
}
const PlayButton: React.FC<IPlayButtonList> = ({ slug, children, className }) => {
    const dispatch = useDispatch()

    const setCurrent = (toAdd: IMedia) => {
        dispatch(floatPlayer())
        dispatch(setCurrentMedia(toAdd))
        dispatch(setAutoPlay(true))
    }

    const handleClick = () => {

        let tracks: IMedia[] = []
        tracks = getTrackListFromPlaylist(slug)

        setCurrent(tracks[0])
        dispatch(addTracks(tracks.slice(1)))

    }

    return (
        <button
            className={`${className ? className : ''}`}
            onClick={handleClick}
            onKeyDown={handleClick}
        >
            {children}
        </button>
    )

}

export default PlayButton