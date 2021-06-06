// https://github.com/souporserious/react-media-player
import React from 'react'

import { useSelector } from "react-redux";
import { playlistSelector, isAutoPlaySelector, currentMediaSelector } from '@/state/selectors/other'
import ReactPlayer from 'react-player'
import "../style/madia-player.css"

const mod = (num: number, max: number) => ((num % max) + max) % max
const ACMediaPlayer: React.FC = () => {
    const playlist = useSelector(playlistSelector)
    const currentMedia = useSelector(currentMediaSelector)
    const playPause = useSelector(isAutoPlaySelector)
    const [fullScreenInfo, setFullScreenInfo] = React.useState(false)
    console.log(playPause)
    return currentMedia.audio ? (
        (
            <div className={`fixed pb-14 sm:pb-0 bottom-0 right-0 left-0 mp--bottom ${fullScreenInfo ? 'top-0' : ''}`} style={{ zIndex: 550 }}>

                <div className={`w-full flex  ${fullScreenInfo ? 'h-full bg-mp-background' : 'bg-white sm:bg-ac-slate-lighter'}`}>
                    <div className="mx-auto max-w-tablet w-full flex-1">
                        {currentMedia.audio && currentMedia.audio.src && (
                            <ReactPlayer
                                className='react-player'
                                playing={playPause}
                                url={currentMedia.audio?.src}
                                height="100px"
                                width="100%"
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    ) : null



}


export default React.memo(ACMediaPlayer)




