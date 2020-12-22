// https://github.com/souporserious/react-media-player
import React from 'react'
import { IRootState } from '@/state/types'
import { setCurrentMedia } from '@/state/action'
import MainController from './AudioPlayerController'
import { useSelector, useDispatch } from "react-redux";
import { IMedia } from '@/types'

import "../style/madia-player.css"


const mod = (num: number, max: number) => ((num % max) + max) % max
const ACMediaPlayer: React.FC = () => {

    const inputEl = React.useRef(null);

    const { playlist, isAutoPlay, currentMedia } = useSelector((state: IRootState) => ({ currentMedia: state.currentMedia, playlist: state.playlist, isAutoPlay: state.isAutoPlay }));

    const [isRepeat, setIsRepeat] = React.useState(false)
    const [fullScreenInfo, setFullScreenInfo] = React.useState(false)

    return currentMedia.audio ? (
        (
            <div className={`fixed pb-14 sm:pb-0 bottom-0 right-0 left-0 mp--bottom ${fullScreenInfo ? 'top-0' : ''}`} ref={inputEl}>

                <div className={`w-full flex  ${fullScreenInfo ? 'h-full bg-mp-background' : 'bg-ac-slate-lighter'}`}>
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


