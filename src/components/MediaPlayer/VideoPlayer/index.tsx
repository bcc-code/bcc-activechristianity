// https://github.com/souporserious/react-media-player
import React from 'react'


import MediaPlayer from './VideoMediaController'
import "../style/madia-player.css"

const youtubeRegex = /src=("|')(https:\/\/www\.youtube\.com)([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)("|')/i
const ACVideoPlayer: React.FC<{ src: string, showControl: boolean }> = ({ src, showControl }) => {


    return (
        <div className={`w-full flex bg-mp-background sm:pt-8`}>
            <div className="mx-auto max-w-tablet w-full">
                <MediaPlayer src={src} showControl={showControl} />
            </div>

        </div>
    )
}


export default ACVideoPlayer


