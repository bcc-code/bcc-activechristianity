import React from 'react'
import Link from '@/components/CustomLink'
import { IMedia } from '@/types'
import MUIcon from '@/components/Icons/Icon'
import PlayButtonTrack from './PlayBtnWrapperByTrackSlug'
import PlayButtonList from './PlayBtnWrapperByPlaylistSlug'
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
    let ImgTag: any = Link
    let props: any = { to: slug }
    if (track && track.audio) {
        ImgTag = PlayButtonTrack
        props = { track }
    }


    return (
        <ImgTag className={className} style={style} {...props}>
            {track && (track.video || track.audio) && (
                <div
                    id="play-button"
                    className="absolute p-3 text-white inset-0 flex justify-center items-center z-10"
                >
                    {track.video ? <MUIcon name="OndemandVideo" size="12" /> : <MUIcon name="Headset" size="12" />}
                </div>
            )}
            {children}
        </ImgTag>
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
        <PlayButtonList slug={slug}>
            <MUIcon name="VolumeUpRounded" size="6" />
        </PlayButtonList>
    )
}

export const PlaylistPlayOutlineButton: React.FC<{ slug: string }> = ({ slug }) => {
    return (
        <PlayButtonList slug={slug}>
            <button className="rounded-full bg-d4slate-dark text-sm text-white font-semibold py-2 px-4">
                {ac_strings.play}
            </button>
        </PlayButtonList>
    )
}
