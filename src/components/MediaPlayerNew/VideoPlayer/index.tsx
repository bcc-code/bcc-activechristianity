import React from 'react'
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player/youtube'
import screenfull from 'screenfull'
const VideoPlayer: React.FC<{ src: string }> = ({ src }) => {
    const playerEl = React.useRef<any>(null);
    return (
        <div>
            <div
                className={`flex justify-center bg-black mp--video`}

            >
                <ReactPlayer
                    url={src}
                    controls={true}
                    ref={playerEl}
                />
            </div>
            {/* 
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
            </div> */}
        </div>
    )
}

export default VideoPlayer