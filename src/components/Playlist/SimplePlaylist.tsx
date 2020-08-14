import React from 'react'
import Link from '@/components/CustomLink'
import { useDispatch } from 'react-redux'
import { setAutoPlay, setCurrentMedia, addTracks, floatPlayer } from '@/state/action'

import AudioIcon from '@/components/Icons/Speaker';


import TS from '@/strings'

import { IMedia } from '@/types'


interface IPlaylist {
    tracks: IMedia[]
}


const PostAudio: React.SFC<IPlaylist> = ({
    tracks: allTracks

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
                            <li className="w-full px-1 py-2 cursor-pointer flex items-center text-sm justify-between md:text-base border-b last:border-b-0 hover:bg-gray-100" >
                                <button
                                    className="flex justify-center text-gray-600 "
                                    onClick={() => handleTrackClick(media, i)}
                                    onKeyDown={() => handleTrackClick(media, i)}
                                >
                                    <div className="w-8 min-w-8 mr-2 sm:mx-4 flex justify-center">
                                        <AudioIcon customSize={40} />
                                    </div>
                                </button>

                                <Link className="w-full sm:w-auto flex-1 mt-2" to={media.path ? media.path : ''}>
                                    <div className="font-semibold text">{audio.title}</div>
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <div className=" ">{audio.playlist}</div>
                                        <div>
                                            {audio.duration}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    )
                }


            })}

        </div>
    ) : null

}

export default PostAudio
