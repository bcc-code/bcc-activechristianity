// https://github.com/souporserious/react-media-player
import React from 'react'
import { IRootState } from '@/state/types'
import { setMpHeight } from '@/state/action'
import { useSelector, useDispatch } from "react-redux";
import MediaPlayer from './VideoMediaController'
import "./style/madia-player.css"

const youtubeRegex = /src=("|')(https:\/\/www\.youtube\.com)([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)("|')/i
const ACVideoPlayer: React.SFC<{ src: string, showControl: boolean }> = ({ src, showControl }) => {

    const inputEl = React.useRef(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (inputEl !== null && inputEl.current !== null) {
            dispatch(setMpHeight(inputEl.current.offsetHeight))

        } else {
            dispatch(setMpHeight(0))
        }
    }, [inputEl.current && inputEl.current.offsetHeight])

    return (
        <div className={`w-full flex bg-mp-background sm:pt-8`} ref={inputEl}>
            <div className="mx-auto max-w-tablet w-full">
                <MediaPlayer src={src} showControl={showControl} />
            </div>

        </div>
    )
}


export default ACVideoPlayer


