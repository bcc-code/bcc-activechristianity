import React from 'react'
import Link from '@/components/CustomLink'
import { IMedia } from '@/types'
import MUIcon from '@/components/Icons/Icon'
import PlayButtonTrack from './PlayBtnWrapperByTrackSlug'
import PlayPlaylistFromSlug from '@/HOC/SetAndUpdatePlayingPlaylist'
import ac_strings from '@/strings/ac_strings.json'
export interface IPlayButtonProps {
    track: IMedia

}

export interface IPostItemMediaImg {
    track: IMedia
    slug: string
    className?: string
    style?: any
}

export const PostItemMediaImg: React.FC<IPostItemMediaImg> = ({ track, slug, className, children, style }) => {

    return (
        <Link className={className} style={style} to={slug}>
            {track && (track.video || track.audio) && (
                <div
                    id="play-button"
                    className="absolute p-3 text-white inset-0 flex justify-center items-center z-10"


                >
                    <div className="z-20">
                        {track.video ? <MUIcon name="PlayCircleOutline" size="12" color="white" /> : <MUIcon name="Headset" size="12" color="white" />}
                    </div>
                    <div
                        style={{ background: "#020203", opacity: "0.3" }}
                        className="absolute inset-0"
                    >

                    </div>
                </div>
            )}
            {children}
        </Link>
    )
}

export const PostItemPlayButton: React.FC<IPlayButtonProps> = ({ track }) => {
    if (track.audio || track.video) {

        return (
            <PlayButtonTrack track={track}>
                {track.video ? <MUIcon name="PlayArrowRounded" size="12" /> : <MUIcon name="VolumeUpRounded" size="12" />}
            </PlayButtonTrack>
        )
    } else {
        return null
    }
}

export const PostItemPlayButtonSmall: React.FC<IPlayButtonProps> = ({ track }) => {
    if (track.audio || track.video) {

        return (
            <PlayButtonTrack track={track}>
                {track.video ? <MUIcon name="PlayArrowRounded" size="6" /> : <MUIcon name="VolumeUpRounded" size="6" />}
            </PlayButtonTrack>
        )
    } else {
        return null
    }
}

export const PlaylistPlayButton: React.FC<{ slug: string }> = ({ slug }) => {
    return (
        <PlayPlaylistFromSlug
            slug={slug}
            clickable
            render={({ playing }) => {
                return playing ? <MUIcon name="Equalizer" size="12" /> : <MUIcon name="VolumeUpRounded" size="12" />
            }}

        />


    )
}

