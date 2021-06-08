import React from 'react'
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player'
import { PlayPauseControl, FullScreenIcon } from '../Elements/Buttons'
import Seekbar from '../Elements/Seekbar'
import DurationFormat from '../Elements/Duration'
import screenfull from 'screenfull'
const VideoPlayer: React.FC<{ src: string }> = ({ src }) => {
    const playerEl = React.useRef<any>(null);
    const [playPause, setPlayPause] = React.useState(false)
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

    const handlePlayPause = () => {
        setPlayPause(!playPause)
    }

    const handleDuration = (duration: any) => {
        setDuration(duration)
    }

    const handleClickFullscreen = () => {
        if (playerEl.current) {
            screenfull.request(findDOMNode(playerEl.current))
        }

    }
    const {
        played,
        loaded
    } = progressBarState

    return (
        <div>
            <div
                className={`flex justify-center bg-mp-background mp--video`}

            >
                <ReactPlayer
                    url={src}
                    ref={playerEl}
                    playing={playPause}
                    fullScreen={false}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    han
                />
            </div>

            <div className="text-mp-text flex w-full py-3 sm:py-8 mx-auto max-w-tablet items-center">
                <PlayPauseControl
                    fullScreenInfo={false}
                    playPause={playPause}
                    border={true}
                    handleClick={handlePlayPause}
                />
                <div className="flex flex-col flex-1">
                    <Seekbar
                        className="mt-2 -mb-1"
                        loaded={loaded}
                        played={played}
                        handleSeekChange={handleSeekChange}
                    />
                    <div className="w-full flex justify-between pl-4 pr-2">
                        <DurationFormat className="text-mini sm:text-xxs pt-2" seconds={duration * played} />
                        <DurationFormat className="text-mini sm:text-xxs pt-2" seconds={duration} />
                    </div>
                </div>
                <button className="px-4 flex items-center" onClick={handleClickFullscreen}>
                    <FullScreenIcon />
                </button>
            </div>
        </div>
    )
}

export default VideoPlayer