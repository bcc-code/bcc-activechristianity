// https://github.com/souporserious/react-media-player
import React from 'react'
import { IRootState } from '@/state/types'
import { setCurrentMedia } from '@/state/action'
import MainController from './AudioPlayerController'
import { useSelector, useDispatch } from "react-redux";
import Icon from '@/components/Icons/Icon'
import "./style/madia-player.css"

type IAllProps = {
    defaultMedia?: "audio" | "video"
}
const mod = (num: number, max: number) => ((num % max) + max) % max
const ACMediaPlayer: React.FC<IAllProps> = ({ defaultMedia }) => {

    const inputEl = React.useRef(null);
    const dispatch = useDispatch();

    const { playlist, isAutoPlay, currentMedia } = useSelector((state: IRootState) => ({ currentMedia: state.currentMedia, playlist: state.playlist, isAutoPlay: state.isAutoPlay }));
    const { video, audio, path } = currentMedia

    const getInitialPlayingType = () => {
        if (defaultMedia && currentMedia[defaultMedia]) {
            return defaultMedia
        } else {
            return video !== undefined ? "video" : "audio"
        }
    }

    const getIsOnPost = () => {
        return path && path !== "" && typeof window !== "undefined" && window.location.pathname.indexOf(path) > -1 ? true : false
    }
    const [playingType, setPlayingType] = React.useState<"audio" | "video">(getInitialPlayingType())


    React.useEffect(() => {
        setPlayingType(getInitialPlayingType())

    }, [currentMedia.video, currentMedia.audio, currentMedia.path])


    const audioTitle = audio ? audio.title : undefined
    const [isRepeat, setIsRepeat] = React.useState(false)


    const navigatePlaylist = (direction: number) => {
        if (playlist.length > 0) {
            const index = playlist.findIndex(track => track.path === currentMedia.path)
            console.log(index)
            if (index > -1) {
                const newIndex = mod(
                    index + direction,
                    playlist.length
                )

                dispatch(setCurrentMedia(playlist[newIndex]))

            } else {
                dispatch(setCurrentMedia(playlist[0]))
            }
        }
    }

    return (
        <div className={`fixed pb-14 sm:pb-0 bottom-0 right-0 left-0 mp--bottom`} ref={inputEl} style={{ zIndex: 3000 }}>
            <div className={`w-full flex bg-mp-background`}>
                <div className="mx-auto max-w-tablet w-full">
                    <MainController
                        isVideo={playingType === "video"}
                        src={currentMedia[playingType]?.src}
                        audioTitle={audioTitle}
                        autoPlay={isAutoPlay}

                        expanded={true}
                        repeatTrack={isRepeat}
                        onPrevTrack={() => {
                            navigatePlaylist(-1)
                        }}
                        onNextTrack={() => {
                            navigatePlaylist(1)
                        }}
                        onRepeatTrack={() => {
                            setIsRepeat(!isRepeat)
                        }}
                    />
                </div>
            </div>
        </div>
    )



}


export default React.memo(ACMediaPlayer)


