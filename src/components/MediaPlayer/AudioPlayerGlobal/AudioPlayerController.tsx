import React from 'react'
import { useDispatch } from 'react-redux'
import { Media, Player, controls, utils } from 'react-media-player'
import { KeyboardArrowDownIcon, DescriptionIcon, VolumeUpRoundedIcon, MoreVertIcon } from '@/components/Icons/MUI/mediaPlayerIcons'
import { CloseIcon } from '@/components/Icons/MUI/navIcons'
import { withMediaProps } from 'react-media-player'
import { setCurrentMedia, setIsPlaying, setIsModalOpen, addTracks } from '@/state/action'
import FetchImage from '@/components/Images/ImageFromPost'
import ac_strings from '@/strings/ac_strings.js'
import { IMedia } from '@/types'
import { PlayPause, VolumeBar, NextTrack, PrevTrack } from '../ControlElements'
import shortid from 'shortid'
import ControlBar from '../ControlBar'
const { CurrentTime, Progress, SeekBar, Duration } = controls

const { keyboardControls } = utils

interface IProps {
    expanded: boolean
    isOnPost: boolean
    floating: boolean
    track: IMedia
    playlist: IMedia[]
    repeatTrack: boolean
    autoPlay: boolean
    onRepeatTrack: () => void
    fullScreenInfo: boolean
    setFullScreenInfo: (status: boolean) => void
}

const mod = (num: number, max: number) => ((num % max) + max) % max

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
    const { playlist: queue, track, repeatTrack, autoPlay, fullScreenInfo, setFullScreenInfo } = props
    const [history, setHistory] = React.useState<IMedia[]>([])

    React.useEffect(() => {
        const findIndex = history.findIndex(h => h.path === track.path)
        let toUpdatePlaylist = [...history.slice(-10)]
        if (findIndex > -1) {
            toUpdatePlaylist = [...history.slice(0, findIndex), ...history.slice(findIndex + 1), track]
        } else {
            toUpdatePlaylist.push(track)
        }

        setHistory(toUpdatePlaylist)
    }, [track])

    const dispatch = useDispatch()

    const playTrack = (track: IMedia) => {
        dispatch(setCurrentMedia(track))
        handleQueue(track)
    }
    const toggleInfo = () => {
        dispatch(setIsModalOpen(!fullScreenInfo))
        setFullScreenInfo(!fullScreenInfo)
    }

    const onPrevTrack = () => {
        if (history.length > 1) {
            dispatch(setCurrentMedia(history[history.length - 2]))
            setHistory(history.slice(0, history.length - 2))
            dispatch(addTracks([track, ...queue]))
        }


    }
    const onNextTrack = () => {
        if (queue.length > 0) {
            dispatch(setCurrentMedia(queue[0]))
            const toUpdatePlaylist = queue.slice(1)
            dispatch(addTracks(toUpdatePlaylist))
        }
    }
    const clickOnQueue = (index: number) => {
        dispatch(setCurrentMedia(queue[index]))
        const toUpdatePlaylist = queue.slice(index + 1)
        dispatch(addTracks(toUpdatePlaylist))
    }
    const handleQueue = (updateTrack: IMedia) => {
        let toUpdate = [...queue]
        if (queue.length > 0) {
            const index = queue.findIndex(item => item.audio?.src === updateTrack.audio?.src)
            if (index > -1) {
                toUpdate = [...queue.slice(index), ...queue.slice(0, index)]
            }
            dispatch(addTracks(toUpdate))
        }
    }
    const audioTitle = track.audio?.title

    return (
        <div className="w-full h-full flex flex-col">
            {fullScreenInfo && (
                <div className="flex flex-col bg-white sm:bg-mp-background text-d4cadet-blue flex-1 layout-children">
                    <div className="absolute right-0 top-0 up">
                        close player
                    </div>
                    <div
                        className="flex justify-center py-2"
                        onClick={toggleInfo}
                    >
                        <KeyboardArrowDownIcon
                            customSize="6"
                        />
                    </div>
                    <div className="flex flex-col px-4 py-2">
                        <div className="flex">
                            <div className="w-36">
                                {track.path && <FetchImage
                                    slug={track.path}
                                />}
                            </div>
                            <div className="px-4">
                                <div className="text-base font-semibold sm:text-3xl md:5xl">
                                    {audioTitle}
                                </div>
                                {track.path && (
                                    <a
                                        target="_blank"
                                        href={track.path}
                                        className="flex items-center"
                                    >
                                        <DescriptionIcon
                                            customSize="4"
                                            className="fill-slate-light"
                                        />
                                        <span className="py-2 text-xs">
                                            {ac_strings.read}
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>

                    </div>
                    <h2 className="uppercase py-2 px-4">Playing Next</h2>
                    <div className="text-xs overflow-y-scroll relative flex-1">

                        <div className="absolute inset-0 overflow-y-scroll">
                            {queue.map((p, i) => {
                                return (
                                    <button
                                        className="flex px-4 py-2"
                                        key={shortid()}
                                        onClick={() => { clickOnQueue(i) }}
                                    >
                                        <div className="mr-4">
                                            <VolumeUpRoundedIcon
                                                customSize="4"
                                                className="fill-slate-light"
                                            />
                                        </div>
                                        <span className="text-left sm:text-lg">
                                            {p.audio?.title}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>

                    </div>
                </div>
            )}
            <Media>
                {(mediaProps: IMediaProps) => {
                    return (
                        <div
                            role="application"
                            className="flex flex-col w-full relative"
                            onKeyDown={keyboardControls.bind(null, mediaProps)}
                            tabIndex={0}
                        >
                            <div
                                className={`flex justify-center bg-mp-background`}
                                onClick={() => mediaProps.playPause()}
                            >
                                <Player
                                    src={track.audio?.src}
                                    loop={repeatTrack}
                                    autoPlay={autoPlay}
                                    onEnded={onNextTrack}

                                    onPlay={() => { setIsPlaying(true) }}
                                    onPause={() => { setIsPlaying(false) }}
                                />

                            </div>
                            <div className="sm:hidden ">
                                {fullScreenInfo ? (
                                    <div className="w-full items-center flex flex-col relative text-mp-text">

                                        <div className="flex items-center relative flex-1 w-full py-2">
                                            <Progress className="mp--progress absolute my-0 mx-3 rounded" />
                                            <SeekBar className="mp--seekbar mx-3 my-0" />
                                        </div>
                                        <div className="w-full flex justify-between text-xxs">
                                            <div className="flex items-center">
                                                <CurrentTime className="mx-3 my-0 " />
                                            </div>
                                            <div className="flex items-center media-control-time-wrapper">
                                                <Duration className="mx-3 my-0 media-control--duration" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                        <div className="w-full bg-gray-300">
                                            <div
                                                className="h-1 bg-ac-slate-light"
                                                style={{ width: `${(mediaProps.currentTime / mediaProps.duration) * 100}%` }}>
                                            </div>
                                        </div>
                                    )}
                            </div>

                            <div className="w-full flex flex-row text-d4cadet-blue justify-center">
                                <div className="flex items-center sm:hidden">
                                    {fullScreenInfo && (
                                        <PrevTrack
                                            className="p-3"
                                            onClick={onPrevTrack}
                                        />
                                    )}
                                    <div className={`mx-4 sm:ml-0 ${fullScreenInfo ? 'py-2 sm:py-8' : ''}`}>
                                        <PlayPause className="border border-d4cadet-blue rounded-lg" />
                                        {/*  <CurrentTime className="ml-4" /> */}
                                    </div>
                                    {fullScreenInfo && (
                                        <NextTrack
                                            className="p-3"
                                            onClick={onNextTrack}
                                        />
                                    )}
                                </div>

                                {!fullScreenInfo && (
                                    <div className="flex flex-1">
                                        <div className="relative py-3 sm:py-8 flex-1 sm:hidden">
                                            {audioTitle && (
                                                <div className="text-d4cadet-blue w-full absolute overflow-hidden h-8 text-sm">
                                                    <div className="mp--title-scrolling mp--title-scrolling-animation whitespace-no-wrap">
                                                        {audioTitle}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-full hidden sm:flex">
                                            <ControlBar />
                                        </div>
                                        <button
                                            className="py-3 sm:py-8 px-2"
                                            onClick={toggleInfo}
                                        >
                                            <MoreVertIcon
                                                className="fill-slate-light"
                                            />
                                        </button>
                                        {/*                                         <button className="bg-ac-slate py-3 px-2 sm:py-8" >
                                            <div onClick={handleCloseClickButton}>
                                                <CloseIcon />
                                            </div>

                                        </button> */}
                                    </div>
                                )}

                            </div>


                        </div>
                    )
                }
                }
            </Media>
        </div >
    )
}

export default withMediaProps(MediaControl)