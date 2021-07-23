// https://github.com/souporserious/react-media-player
import React from 'react'
import { IMedia } from '@/types'
import PlayMedia from '@/HOC/SetAndUpdatePlayingMedia'
import { PlayButton, PauseButton } from '../Elements/Buttons'
import "../style/madia-player.css"

type IAllProps = {
    media: IMedia
    duration?: string
    stopScrollingTitle: boolean
}
const mod = (num: number, max: number) => ((num % max) + max) % max
const ACMediaPlayer: React.FC<IAllProps> = ({ media, duration, stopScrollingTitle }) => {

    return (


        <PlayMedia
            clickable
            className="w-full bg-mp-background"
            track={media}
            render={({ playing }) => {
                return (
                    <div className={`w-full flex mx-auto sm:px-4 standard-max-w py-6`}>

                        <div className="text-d4cadet-blue flex items-center text-xs mx-4 sm:ml-0">

                            {playing ? (
                                <PauseButton border />
                            ) : (
                                <PlayButton border />
                            )}

                        </div>

                        <div className="flex-1 flex flex-col relative overflow-hidden  justify-center text-mp-text max-w-sm">
                            <div className={`mp--title-scrolling flex justify-start whitespace-no-wrap ${stopScrollingTitle ? '' : 'mp--title-scrolling-animation '}`}>
                                <span className="font-semibold text-left">{media.audio?.title}</span>
                            </div>

                            <span className="text-sm pt-6 text-left">{duration}
                            </ span>


                        </div>
                    </div>
                )
            }}
        />

    )



}


export default React.memo(ACMediaPlayer)


