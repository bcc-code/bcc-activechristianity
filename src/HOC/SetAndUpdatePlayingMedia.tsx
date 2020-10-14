import React from 'react'
import { setCurrentMedia, setAutoPlay, addTracks, floatPlayer } from '@/state/action'
import { IMedia } from '@/types'
import { fetchTracksFromSlug } from '@/helpers/fetchLocalData'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '@/state/types'

export interface IPlayButtonProps {
    track: IMedia
    playlistTracks?: IMedia[]
    className?: string
    style?: any
    clickable?: boolean
    render: (data: { playing: boolean }) => JSX.Element
}
const PlayButton: React.FC<IPlayButtonProps> = ({ track, playlistTracks, className, style, render, clickable }) => {
    const dispatch = useDispatch()
    const { currentMedia } = useSelector((state: IRootState) => ({ currentMedia: state.currentMedia }))
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
        if (playlistTracks) {
            handleTracks(playlistTracks)
        } else if (track.audio && track.audio.playlistSlug) {
            const playlistSlug = track.audio.playlistSlug

            return fetchTracksFromSlug(playlistSlug).then(tracks => {
                handleTracks(tracks)
            })
        }
    }

    const handleTracks = (tracks: IMedia[]) => {
        let toUpdate = [...tracks]
        if (tracks.length > 0) {
            const index = tracks.findIndex(item => item.audio?.src === track.audio?.src)
            if (index > -1) {
                toUpdate = [...tracks.slice(index), ...tracks.slice(0, index)]
            }
            dispatch(addTracks(toUpdate))
        }
    }

    const props = clickable ? {
        onClick: handleClick,
        onKeyDown: handleClick
    } : {}

    return (
        <button
            className={`${className ? className : ''}`}
            {...props}
            style={style}
        >
            {render({ playing: currentMedia.path === track.path })}
        </button>
    )

}

export default PlayButton