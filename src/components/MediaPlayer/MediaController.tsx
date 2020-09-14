import React from 'react'
import { useDispatch } from 'react-redux'
import { Media, Player, controls, utils } from 'react-media-player'
import { PlayPause, VolumeBar } from './ControlElements'
import { withMediaProps } from 'react-media-player'
import { setCurrentMedia, fixPlayer } from '@/state/action'
import CloseButton from '@/components/Buttons/CloseButtonRound'
const { CurrentTime, Progress, SeekBar, Duration } = controls
const { keyboardControls } = utils

interface IProps {
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
const MediaControl: React.FC<IProps> = (props) => {
    const { src, audioTitle, repeatTrack, autoPlay, floating, isVideo, expanded, isOnPost } = props

    const minimized = !expanded && floating
    const dispatch = useDispatch()

    const handleCloseClickButton = () => {
        if (isOnPost) {
            dispatch(fixPlayer())
        } else {
            dispatch(setCurrentMedia({ path: undefined }))
        }
    }

    const modifiedScr = (youtubeSrc: string) => {
        return youtubeSrc.replace("allowfullscreen", "")
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
                        {/* extra margin top if it is showing video at the top (not floating) */}
                        <div
                            className={`flex justify-center bg-mp-background ${isVideo ? `mp--video ${floating ? 'w-screen sm:w-64 mt-0 sm:bm-6' : 'sm:mt-10'}` : ''} `}
                            onClick={() => mediaProps.playPause()}
                        >
                            <Player
                                src={isVideo && src ? modifiedScr(src) : src}
                                loop={repeatTrack}
                                autoPlay={autoPlay}
                                onEnded={props.onNextTrack}
                                fullScreen={false}
                            />
                        </div>

                        {/* hide controls if floating + isVideo */}
                        <div className={`${floating && isVideo ? 'hidden' : ''} w-full flex ${floating ? 'p-3' : 'py-8'} mx-auto max-w-tablet`}>
                            {/*                             */}
                            {/* show play button with current time when floating & audio */}
                            <div className="text-d4cadet-blue flex items-center text-xs ml-4 sm:ml-0">
                                <PlayPause className="border border-d4cadet-blue rounded-lg" />
                                {minimized && <CurrentTime className="ml-4" />}
                            </div>

                            {/* show controls when floating & audio & expanded (not minimized) */}
                            <div className={`${!minimized ? 'flex' : 'hidden'} items-center flex-1 text-mp-text text-mini`}>
                                <div className="flex items-center">
                                    <CurrentTime className="mx-3 my-0 " />
                                </div>
                                <div className="flex-1 flex flex-col relative">
                                    {audioTitle && (
                                        <div className="w-full absolute overflow-hidden h-8 text-sm" style={{ top: "-2rem" }}>
                                            <div className="mp--title-scrolling">
                                                {audioTitle}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center relative flex-1 w-full">
                                        <Progress className="mp--progress absolute my-0 mx-3 rounded" />
                                        <SeekBar className="mp--seekbar mx-3 my-0" />
                                    </div>
                                </div>

                                <div className="media-control-group media-control-time-wrapper">
                                    <Duration className="mx-3 my-0 media-control--duration" />
                                </div>
                            </div>

                            {/* show volumen bar when floating & audio & expanded (not minimized)  */}
                            <div className={`hidden ${!minimized ? 'sm:flex' : ''} items-center`}>
                                <div className="media-control-group">
                                    <VolumeBar className="mx-3 my-0 media-control--mute-unmute" />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            }
        </Media>
    )
}

export default withMediaProps(MediaControl)