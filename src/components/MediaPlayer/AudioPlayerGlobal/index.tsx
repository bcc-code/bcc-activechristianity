// https://github.com/souporserious/react-media-player
import React from 'react'
import MainController from './AudioPlayerController'
import { useSelector, useDispatch } from "react-redux";
import { playlistSelector, isAutoPlaySelector, currentMediaSelector } from '@/state/selectors/other'


import "../style/madia-player.css"


const mod = (num: number, max: number) => ((num % max) + max) % max
const ACMediaPlayer: React.FC = () => {
    const playlist = useSelector(playlistSelector)
    const isAutoPlay = useSelector(isAutoPlaySelector)
    const currentMedia = useSelector(currentMediaSelector)

    const [isRepeat, setIsRepeat] = React.useState(false)
    const [fullScreenInfo, setFullScreenInfo] = React.useState(false)
    console.log('render playe index')
    return currentMedia.audio ? (
        (
            <div className={`fixed pb-14 sm:pb-0 bottom-0 right-0 left-0 mp--bottom ${fullScreenInfo ? 'top-0' : ''}`} style={{ zIndex: 550 }}>

                <div className={`w-full flex  ${fullScreenInfo ? 'h-full bg-mp-background' : 'bg-white sm:bg-ac-slate-lighter'}`}>
                    <div className="mx-auto max-w-tablet w-full flex-1">
                        <MainController
                            playlist={playlist}
                            track={currentMedia}
                            autoPlay={isAutoPlay}
                            repeatTrack={isRepeat}
                            fullScreenInfo={fullScreenInfo}
                            setFullScreenInfo={setFullScreenInfo}
                        />
                    </div>
                </div>
            </div>
        )
    ) : null



}


export default React.memo(ACMediaPlayer)




