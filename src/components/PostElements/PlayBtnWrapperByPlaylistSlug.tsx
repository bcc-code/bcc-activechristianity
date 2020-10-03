import React from 'react'
import { setCurrentMedia, setAutoPlay, addTracks, floatPlayer } from '@/state/action'

import { IMedia } from '@/types'
import { normalizeTracks } from '@/helpers/'
import { fetchTracksFromSlug } from '@/helpers/fetchLocalData'
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
        fetchTracksFromSlug(slug).then(tracks => {

            if (tracks.length > 0) {
                setCurrent(tracks[0])
                dispatch(addTracks(tracks.slice(1)))
            }
        })
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