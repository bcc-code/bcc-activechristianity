import React from 'react'
import { setIsPlaying, setCurrentMedia } from '@/state/action'
import { useSelector, useDispatch } from "react-redux";
import { Media, controls, utils } from 'react-media-player'
import Player from '../lib/Player'
import { withMediaProps } from 'react-media-player'
import ControlBar from '../ControlBar'

const { keyboardControls } = utils

export interface IWithMediaProps {
    showControl: boolean
    expanded: boolean
    isVideo: boolean
    isOnPost: boolean
    floating: boolean
    src: string | null
    audioTitle: string | undefined
    repeatTrack: boolean
    autoPlay: boolean
    onPrevTrack: () => void
    onNextTrack: () => void
    onRepeatTrack: () => void
    setMobileFullMode: (status: boolean) => void
    setShowingPlaylist: (status: boolean) => void
}

export interface IMediaProps {

    isFullscreen: boolean
    isPlaying: boolean
    play: () => void
    playPause: () => void
    fullscreen: () => void
    currentTime: number
    duration: number

    isMuted: boolean
    volume: number
    muteUnmute: () => void
    setVolume: (v: number) => void
}
const MediaControl: React.FC<IWithMediaProps> = (props) => {
    const { src, repeatTrack, autoPlay, isVideo } = props
    const dispatch = useDispatch()
    const handlePlay = () => {
        dispatch(setCurrentMedia({ path: '' }))
    }
    return (
        <Media>
            {(mediaProps: IMediaProps) => {

                return (
                    <div
                        role="application"
                        className="flex flex-col w-full relative"
                        onKeyDown={keyboardControls.bind(null, mediaProps)}
                        tabIndex={0}
                    >

                        {/* extra margin top if it is showing video at the top (not floating) */}
                        <div
                            className={`flex justify-center bg-mp-background mp--video`}
                            onClick={() => mediaProps.playPause()}
                        >
                            <Player
                                src={src}
                                loop={repeatTrack}
                                autoPlay={autoPlay}
                                onEnded={props.onNextTrack}
                                fullScreen={false}
                                onPlay={handlePlay}
                            />
                        </div>

                        <ControlBar


                            video={true}
                        />
                    </div>
                )
            }
            }
        </Media>
    )
}

export default withMediaProps(MediaControl)