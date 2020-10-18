import * as React from 'react'
import { Media, Player, controls, utils } from 'react-media-player'
import { PlayPause, VolumeBar } from './ControlElements'
const { CurrentTime, Progress, SeekBar, Duration } = controls

interface IConrolBar {
    audioTitle?: string
    video?: boolean
}
const ControlBar: React.FC<IConrolBar> = ({ audioTitle, video }) => {
    return (
        <div className={` w-full flex py-3 sm:py-8 mx-auto max-w-tablet`}>
            {/*                             */}
            {/* show play button with current time when floating & audio */}
            <div className="text-d4cadet-blue flex items-center text-xs ml-4 sm:ml-0">
                <PlayPause className="border border-d4cadet-blue rounded-lg" />
                <CurrentTime className="ml-4" />
            </div>

            {/* show controls when floating & audio & expanded (not minimized) */}
            <div className={`flex items-center flex-1 text-mp-text text-mini`}>
                <div className="flex items-center">
                    <CurrentTime className="mx-3 my-0 " />
                </div>
                <div className="flex-1 flex flex-col relative">
                    {audioTitle && (
                        <div className="w-full absolute overflow-hidden h-8 text-sm" style={{ top: "-2rem" }}>
                            <div className="mp--title-scrolling mp--title-scrolling-animation">
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
            <div className={`hidden sm:flex items-center`}>
                <div className="media-control-group">
                    <VolumeBar className="mx-3 my-0 media-control--mute-unmute" />
                </div>
            </div>
        </div>

    )
}

export default ControlBar