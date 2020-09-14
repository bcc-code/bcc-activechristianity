// https://github.com/souporserious/react-media-player
import React from 'react'
import { IRootState } from '@/state/types'
import { setMpHeight, setCurrentMedia } from '@/state/action'
import MainController from './AudioPlayerController'
import { useSelector, useDispatch } from "react-redux";
import Icon from '@/components/Icons'
import "./style/madia-player.css"

type IAllProps = {
    defaultMedia?: "audio" | "video"
}
const mod = (num: number, max: number) => ((num % max) + max) % max
const ACMediaPlayer: React.FC<IAllProps> = ({ defaultMedia }) => {

    const inputEl = React.useRef(null);
    const dispatch = useDispatch();

    const { playlist, isAutoPlay, currentMedia, isFloating } = useSelector((state: IRootState) => ({ currentMedia: state.currentMedia, playlist: state.playlist, isAutoPlay: state.isAutoPlay, isFloating: state.isPlayerFloating }));
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

    const [isOnPost, setIsOnPost] = React.useState<boolean>()

    const [expanded, setExpanded] = React.useState(false)
    const [showLeftArrow, setShowLeftArrow] = React.useState(false)
    const [showRightArrow, setShowRightArrow] = React.useState(false)

    React.useEffect(() => {
        setPlayingType(getInitialPlayingType())

    }, [currentMedia.video, currentMedia.audio, currentMedia.path])

    React.useEffect(() => {
        setIsOnPost(getIsOnPost())

    }, [typeof window !== "undefined" && window.location.pathname, currentMedia.path])

    React.useEffect(() => {
        if (playingType === "audio") {
            setShowLeftArrow(isFloating && !expanded)
            setShowRightArrow(expanded)
        }


    }, [playingType, isFloating, expanded])


    React.useEffect(() => {
        if (inputEl !== null && inputEl.current !== null) {
            dispatch(setMpHeight(inputEl.current.offsetHeight))

        } else {
            dispatch(setMpHeight(0))
        }
    }, [currentMedia.path, inputEl.current && inputEl.current.offsetHeight])

    const audioTitle = audio ? audio.title : undefined
    const [isRepeat, setIsRepeat] = React.useState(false)


    const navigatePlaylist = (direction: number) => {
        if (playlist.length > 0) {
            const index = playlist.findIndex(track => track.audio?.src === currentMedia.audio?.src)
            if (index > -1) {
                const newIndex = mod(
                    index + direction,
                    playlist.length
                )

                dispatch(setCurrentMedia(playlist[newIndex]))

            }
        }
    }

    return (
        <div className={isFloating ? `fixed pb-20 sm:pb-0 ${playingType === "audio" ? 'bottom-0' : "sm:bottom-0"} right-0` : ``} ref={inputEl}>
            <div className={`w-full flex`}>
                {showLeftArrow && (
                    <div className="cursor-pointer w-6 flex items-center" onClick={() => { setExpanded(true) }} onKeyDown={() => { setExpanded(true) }} role="button">
                        <Icon name="chev-left" size="lg" />
                    </div>

                )}
                <div className={`flex-1 bg-mp-background ${isFloating && playingType === "audio" ? 'rounded-xl my-6' : ''}`}>
                    <div className="mx-auto max-w-tablet">
                        <MainController
                            isVideo={playingType === "video"}
                            floating={isFloating}
                            src={currentMedia[playingType]?.src}
                            audioTitle={audioTitle}
                            autoPlay={isAutoPlay}
                            isOnPost={isOnPost}
                            expanded={expanded}
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
                {isFloating && playingType !== "video" && (
                    <div className="w-6 flex items-center">
                        {showRightArrow && (
                            <div className="w-full mx-2 cursor-pointer" onClick={() => { setExpanded(false) }}>
                                <Icon name="chev-right" size="lg" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )



}


export default React.memo(ACMediaPlayer)


