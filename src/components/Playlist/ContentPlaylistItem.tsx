import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAutoPlay, setCurrentMedia, addTracks, togglePlayMedia } from '@/state/action'
import { ReadIcon, ListenIcon, ReadingTimingIcon } from '@/components/PostElements'
import { currentMediaSelector } from '@/state/selectors/other'
import { IMedia } from '@/types'

interface IPlaylist {
    slug: string
    tracks: IMedia[]
    hideRead?: boolean
}

const PostAudio: React.FC<IPlaylist> = ({
    tracks: allTracks,
    hideRead,
    slug
}) => {
    const dispatch = useDispatch()
    const currentMedia = useSelector(currentMediaSelector)
    const handleTrackClick = (t: IMedia, index: number) => {
        const audioToAdd = { ...t }
        if (audioToAdd.audio) {
            audioToAdd.audio.playlistSlug = slug
        }

        dispatch(setAutoPlay(true))
        dispatch(setCurrentMedia(audioToAdd))
        dispatch(togglePlayMedia())
        let tracksToAdd: IMedia[] = []
        if (allTracks.length > 1) {
            tracksToAdd = [...allTracks.map(at => {
                const atToAdd = { ...at }
                if (atToAdd.audio) {
                    atToAdd.audio.playlistSlug = slug
                }
                return atToAdd
            })]
        }

        if (index > -1) {

            const toAdd = [...tracksToAdd.slice(index), ...tracksToAdd.slice(0, index)]
            dispatch(addTracks(toAdd))
        }
    }

    return allTracks.length > 0 ? (
        <div className="flex flex-col">
            {allTracks.map((media, i) => {
                const audio = media.audio
                if (audio) {
                    return (
                        (
                            <li className="w-full px-1 py-2 cursor-pointer flex flex-col sm:flex-row text-sm md:text-base border-b last:border-b-0 hover:bg-gray-100" >
                                <button
                                    className="flex items-start font-semibold  flex-1 mt-4 mb-2"
                                    onClick={() => handleTrackClick(media, i)}
                                    onKeyDown={() => handleTrackClick(media, i)}
                                >
                                    <span className="text-left">{audio.title}</span>
                                </button>
                                <div className="w-full sm:w-auto flex text-gray-600 text-sm mt-4 mb-2">
                                    <button
                                        className="flex justify-center items-center mr-4"
                                        onClick={() => handleTrackClick(media, i)}
                                        onKeyDown={() => handleTrackClick(media, i)}
                                    >
                                        <ListenIcon playing={currentMedia.path === media.path} />
                                    </button>
                                    {audio.article && hideRead !== true && (
                                        <a className="flex justify-center mr-4" href={`/${audio.article.url}`} target="_blank">
                                            <ReadIcon />
                                        </a>


                                    )}
                                    <ReadingTimingIcon
                                        read={media.audio?.duration}
                                    />
                                </div>

                            </li>
                        )
                    )
                }


            })}

        </div>
    ) : null

}

export default PostAudio
