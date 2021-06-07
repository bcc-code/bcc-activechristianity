import React from 'react'
import { PlayButton, PauseButton, PrevTrack, NextTrack, Playlist as PlaylistIcon } from '../Buttons'
import { isAutoPlaySelector, currentMediaSelector } from '@/state/selectors/other'
import ReactPlayer from 'react-player'
import { setIsModalOpen } from '@/state/action'
import { useSelector, useDispatch } from "react-redux";
import { setAutoPlay } from '@/state/action'
import { ITrack } from '@/types'
import Duration from './Duration'


interface IProps {
    track: ITrack
    onPrevTrack: () => void
    onNextTrack: () => void
    fullScreenInfo: boolean
    setFullScreenInfo: (status: boolean) => void

}
const Controller: React.FC<IProps> = ({ track, onPrevTrack, onNextTrack, fullScreenInfo, setFullScreenInfo }) => {
    const dispatch = useDispatch()
    const playerEl = React.useRef<any>(null);

    const playPause = useSelector(isAutoPlaySelector)
    const [duration, setDuration] = React.useState(0)
    const [progressBarState, setProgressBarState] = React.useState(
        {
            playedSeconds: 0,
            played: 0,
            loadedSeconds: 0,
            loaded: 0
        }
    )

    const handleSeekChange = (e: any) => {
        setProgressBarState({ ...progressBarState, played: parseFloat(e.target.value) })
        playerEl.current.seekTo(parseFloat(e.target.value))
    }
    const handleProgress = (state: any) => {

        // We only want to update time slider if we are not currently seeking
        setProgressBarState(state)
    }

    const handleDuration = (duration: any) => {
        console.log('onDuration', duration)
        setDuration(duration)
    }
    const {
        playedSeconds,
        played,
        loadedSeconds,
        loaded } = progressBarState

    const handlePlayPause = () => {
        dispatch(setAutoPlay(!playPause))
    }

    const toggleInfo = () => {
        dispatch(setIsModalOpen(!fullScreenInfo))
        setFullScreenInfo(!fullScreenInfo)
    }


    const audioTitle = track.title

    const seekBar = (
        <div className="w-full items-center flex flex-col relative text-mp-text">

            <div className="flex items-center relative flex-1 w-full pt-2 sm:py-2">
                <progress
                    max="100"
                    className="mp--progress absolute my-0 mx-4 rounded"
                    value={loaded * 100}
                >
                </progress>
                <input
                    type="range"
                    step="any"
                    value={played}
                    max={0.999999}
                    className="mp--seekbar mx-4 my-0"
                    style={{
                        backgroundSize: `${(played) * 100}% 100%`
                    }}
                    onChange={handleSeekChange}
                />

            </div>
        </div>
    )

    const playPauseControl = (
        <div className={`flex items-center mx-4 ${fullScreenInfo ? 'py-2 sm:py-8' : ''}`}>
            <button onClick={handlePlayPause}>{playPause ? <PauseButton border={!fullScreenInfo} /> : <PlayButton border={!fullScreenInfo} />}</button>
        </div>
    )
    return track.src ? (
        <>
            <ReactPlayer
                ref={playerEl}
                className='react-player hidden'
                playing={playPause}
                url={track.src}
                height="100px"
                width="100%"
                onProgress={handleProgress}
                onDuration={handleDuration}
            />
            <div className="flex flex-col w-full relative">
                <div className="sm:hidden ">
                    {fullScreenInfo ? (
                        <div className="w-full items-center flex flex-col relative text-mp-text">

                            <div className="flex items-center relative flex-1 w-full pt-2">
                                <progress
                                    max="100"
                                    className="mp--progress absolute my-0 mx-4 rounded"
                                    value={loaded * 100}
                                >
                                </progress>
                                <input
                                    type="range"
                                    step="any"
                                    value={played}
                                    max={0.999999}
                                    className="mp--seekbar mx-4 my-0"
                                    style={{
                                        backgroundSize: `${(played) * 100}% 100%`
                                    }}
                                    onChange={handleSeekChange}
                                />

                            </div>
                        </div>
                    ) : (
                        <div className="w-full bg-gray-300">
                            <div
                                className="h-1 bg-ac-slate-light"
                                style={{ width: `${(played) * 100}%` }}>
                            </div>
                        </div>
                    )
                    }
                </div>
                <div className="w-full flex item-center flex-row text-d4cadet-blue justify-center py-2">
                    {fullScreenInfo ? (
                        <div className="sm:hidden flex">
                            <button className="flex items-center">
                                <PrevTrack
                                    className="p-3"
                                    onClick={onPrevTrack}
                                />
                            </button>
                            {playPauseControl}
                            <button className="flex items-center">
                                <NextTrack
                                    className="p-3"
                                    onClick={onNextTrack}
                                />
                            </button>
                        </div>
                    ) : (
                        <div className="flex max-w-tablet mx-auto items-center w-full">
                            <div className="sm:hidden">
                                {playPauseControl}
                            </div>
                            <div className="hidden sm:flex mr-4">
                                <button className="flex items-center">
                                    <PrevTrack
                                        className="p-3"
                                        onClick={onPrevTrack}
                                    />
                                </button>
                                {playPauseControl}
                                <button className="flex items-center">
                                    <NextTrack
                                        className="p-3"
                                        onClick={onNextTrack}
                                    />
                                </button>
                            </div>
                            <div className="relative flex-1">
                                <div className="text-d4cadet-blue w-full absolute overflow-hidden h-8 text-sm -mt-4 sm:hidden">
                                    <div className="mp--title-scrolling mp--title-scrolling-animation whitespace-no-wrap ">
                                        {audioTitle}
                                    </div>
                                </div>
                                <div className="text-d4cadet-blue w-full absolute text-center hidden sm:block -mt-6">
                                    {audioTitle}
                                </div>
                                <div className="w-full hidden sm:flex items-center">

                                    <Duration className="text-mini sm:text-xxs" seconds={duration * played} />
                                    {seekBar}
                                    <Duration className="text-mini sm:text-xxs" seconds={duration} />
                                </div>
                            </div>
                            <button className="sm:py-8 px-2 ml-4" >
                                <PlaylistIcon
                                    width={30}
                                    height={30}
                                    onClick={toggleInfo}
                                    className="fill-slate-light"
                                />
                            </button>
                        </div>
                    )}



                </div>

            </div>
        </>
    ) : null
}

export default Controller