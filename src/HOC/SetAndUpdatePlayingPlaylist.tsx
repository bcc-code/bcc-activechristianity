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
            console.log(tracks)
            if (tracks.length > 0) {
                const tracksToAdd = tracks.map(at => {
                    const atToAdd = { ...at }
                    if (atToAdd.audio) {
                        atToAdd.audio.playlistSlug = slug
                    }
                    return atToAdd
                })
                setCurrent(tracksToAdd[0])
                dispatch(addTracks(tracksToAdd))
            }
        })
    }
    const props = clickable ? {
        onClick: handleClick,
        onKeyDown: handleClick
    } : {}
    /*     console.log(`playing`)
        console.log(currentMedia.audio?.playlistSlug)
        console.log(slug) */
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