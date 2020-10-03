import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentMedia, setAutoPlay, addTracks, floatPlayer } from '@/state/action'
import { IRootState } from '@/state/types'
import { IMedia } from '@/types'
import { fetchTracksFromSlug } from '@/helpers/fetchLocalData'

interface IPlaylistList {
    slug: string
    className?: string
    clickable?: boolean
    render: (data: { playing: boolean }) => JSX.Element
}
const PlaylistPlay: React.FC<IPlaylistList> = ({ slug, className, render, clickable }) => {
    const { currentMedia } = useSelector((state: IRootState) => ({ currentMedia: state.currentMedia }))
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
    const props = clickable ? {
        onClick: handleClick,
        onKeyDown: handleClick
    } : {}
    return (
        <button
            className={`${className ? className : ''}`}
            {...props}
        >
            {render({ playing: currentMedia.audio?.playlistSlug === slug })}
        </button>
    )

}

export default PlaylistPlay