// https://github.com/souporserious/react-media-player
import React from 'react'
import { IMedia } from '@/types'
import PlayMedia from '@/HOC/SetAndUpdatePlayingMedia'
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
                    <div className={`w-full flex mx-auto standard-max-w py-6`}>

                        <div className="text-d4cadet-blue flex items-center text-xs mx-4 sm:ml-0">

                            <svg
                                role="button"
                                width="36px"
                                height="36px"
                                viewBox="0 0 36 36"
                                className={`border border-d4cadet-blue rounded-lg fill-current`}

                            >
                                {playing ?
                                    <g key="pause" style={{ transformOrigin: '0% 50%' }}>
                                        <rect x="12" y="11" width="4" height="14" />
                                        <rect x="20" y="11" width="4" height="14" />
                                    </g> :
                                    <polygon
                                        key="play"
                                        points="14,11 26,18 14,25"
                                        style={{ transformOrigin: '100% 50%' }}
                                    />
                                }

                            </svg>

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


