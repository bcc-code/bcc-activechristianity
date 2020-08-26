import React from 'react'

import { useDispatch } from 'react-redux'
import { setAutoPlay, setCurrentMedia, addTracks, floatPlayer } from '@/state/action'

import AudioIcon from '@/components/Icons/Audio';
import FileIcon from '@/components/Icons/File'

import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
import { IMedia } from '@/types'


interface IPlaylist {
    tracks: IMedia[]
    hideRead?: boolean
}


const PostAudio: React.SFC<IPlaylist> = ({
    tracks: allTracks,
    hideRead
}) => {
    const dispatch = useDispatch()

    const handleTrackClick = (t: IMedia, index: number) => {

        dispatch(setAutoPlay(true))
        dispatch(setCurrentMedia(t))
        dispatch(floatPlayer())
        let tracksToAdd: IMedia[] = []
        if (allTracks.length > 1) {
            tracksToAdd = [...allTracks]
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
                            <li className="w-full \px-1 py-2 cursor-pointer flex flex-col sm:flex-row items-center text-sm justify-between md:text-base border-b last:border-b-0 hover:bg-gray-100" >
                                <div className="w-full sm:w-auto flex-1 mt-2"
                                    onClick={() => handleTrackClick(media, i)}
                                    onKeyDown={() => handleTrackClick(media, i)}
                                >
                                    <div className="font-semibold text">{audio.title}</div>
                                    <div className="text-gray-600 text-sm">{TS.by} {audio.contributor}</div>
                                </div>
                                <div className="w-full sm:w-auto flex text-gray-600 text-sm mt-4 mb-2">
                                    <button
                                        className="flex justify-center mr-4"
                                        onClick={() => handleTrackClick(media, i)}
                                        onKeyDown={() => handleTrackClick(media, i)}
                                    >
                                        <div className="w-8 min-w-8 mr-2 sm:mx-4 flex justify-center">
                                            <AudioIcon />
                                        </div>
                                        <span className="uppercase ">{ac_strings.listen}</span>
                                    </button>
                                    {audio.article && hideRead !== true && (
                                        <a className="flex justify-center mr-4" href={`/${audio.article.url}`} target="_blank">
                                            <div className="w-8 min-w-8 mr-2 sm:mx-4 flex justify-center">
                                                <FileIcon />
                                            </div>

                                            <span className="uppercase ">{ac_strings.read}</span>
                                        </a>
                                    )}
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
