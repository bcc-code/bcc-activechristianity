import React from 'react'
import { useDispatch } from 'react-redux'
import { Media, Player, controls, utils } from 'react-media-player'

import { withMediaProps } from 'react-media-player'
import { setCurrentMedia, setMpHeight } from '@/state/action'
import ControlBar from './ControlBar'
import CloseButton from '@/components/Buttons/CloseButtonRound'
import isPlayerFloating from '@/state/reducer/mp_floating'

const { keyboardControls } = utils

interface IProps {
    expanded: boolean
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
const MediaControl: React.SFC<IProps> = (props) => {
    const { src, audioTitle, repeatTrack, autoPlay, floating, expanded } = props

    const minimized = !expanded && floating
    const dispatch = useDispatch()

    const handleCloseClickButton = () => {
        dispatch(setCurrentMedia({ path: undefined }))
        dispatch(setMpHeight(0))
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
                        {floating && (
                            <div
                                className="absolute right-0"
                                style={{ top: "-2rem" }}
                            >
                                <CloseButton onClick={handleCloseClickButton} />
                            </div>
                        )}
                        <div
                            className={`flex justify-center bg-mp-background`}
                            onClick={() => mediaProps.playPause()}
                        >
                            <Player
                                src={src}
                                loop={repeatTrack}
                                autoPlay={autoPlay}
                                onEnded={props.onNextTrack}
                                fullScreen={false}
                            />

                        </div>
                        <ControlBar
                            floating={floating}
                            minimized={minimized}
                            audioTitle={audioTitle}
                        />
                    </div>
                )
            }
            }
        </Media>
    )
}

export default withMediaProps(MediaControl)