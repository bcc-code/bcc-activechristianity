
import * as React from 'react';
import Link from '@/components/CustomLink'
import { IPostAuthors, IMedia, IImage } from '@/types'
import { EqualizerIcon, PlayCircleOutlineIcon, AccessTimeIcon, VisibilityIcon, DescriptionIcon } from '@/components/Icons/MUI/postIcons'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import FetchAndSetCurrentMedia from '@/HOC/SetAndUpdatePlayingMedia'
import ac_strings from '@/strings/ac_strings.js'
import SquareImg from '@/components/Images/Image1to1Rounded'
import { PlaylistPlayButton } from '@/components/PostElements/PlayButton'

export const ReadMore: React.FC<{ slug: string, id: string }> = ({ slug, id }) => {
    return (
        <div className="flex justify-between">
            <Link className="block text-indigo-500 text-sm" to={slug}>{ac_strings.read_more}</Link>
            <Bookmark id={id} color="slate-light" size="5" />
        </div>
    )
}

interface IProps {
    className?: string
    duration?: string
    authors?: IPostAuthors[]
}

export const PostLabel: React.FC<{ text: string | JSX.Element }> = ({ text }) => (
    <span className="font-roboto rounded uppercase p-1 text-xxs bg-white opacity-75">{text}</span>
)

export const AuthorLink: React.FC<{ authorGroups?: IPostAuthors[] }> = ({ authorGroups }) => {
    return <span>{authorGroups && authorGroups[0] && authorGroups[0].authors ?
        authorGroups[0].authors.map((item, k) => <Link key={k} className="inline-block post-meta-commar" to={`${ac_strings.slug_ac_author}/${item.to}`}>{item.name}</Link>) : ''}</span>
}
export const ReadingTimingAuthor: React.FC<IProps> = ({ duration, authors, className }) => {

    return (
        <span className={className ? className : 'text-sm text-gray-600'}>
            <span>{duration ? duration : ''}</span>
            {duration && authors && authors?.length > 0 && <span> · </span>}
            <AuthorLink authorGroups={authors} />
        </span>
    )
}

export const ReadingTimingIcon: React.FC<{ read?: string, listen?: string }> = ({ read, listen }) => {

    return (
        <span className={"mr-6 flex items-center"}>
            <AccessTimeIcon
                className="fill-slate-dark"
                customSize="5"
            />
            <span className="text-xs sm:text-sm text-ac-slate-dark pl-2 whitespace-no-wrap">
                {read}
            </span>
        </span>
    )
}

export const ReadIcon: React.FC<{ text?: string }> = ({ text }) => (
    <div className={"flex items-center"}>
        <DescriptionIcon
            className="fill-slate-dark"
            customSize="5"
        />
        <span className="text-xs sm:text-sm text-ac-slate-dark px-2 whitespace-no-wrap">
            {text ? text : ac_strings.read}
        </span>
    </div>
)
export const ListenIcon: React.FC<{ text?: string, playing: boolean }> = ({ text, playing }) => {
    return (
        <div className="">
            {playing ? (
                <div className="flex items-center bg-ac-slate-dark  rounded-full py-1 px-2">
                    <EqualizerIcon
                        customSize="5"
                        className="fill-slate-light"
                    />
                    <span className="text-xs sm:text-sm text-white pl-2 whitespace-no-wrap">
                        {ac_strings.playing}
                    </span>
                </div>
            ) : (

                    <div className="flex items-center rounded-full bg-ac-slate-lighter py-1 px-2">
                        <PlayCircleOutlineIcon
                            className="fill-slate-dark"
                            customSize="5"
                        />
                        <span className="text-xs sm:text-sm text-ac-slate-dark pl-2 whitespace-no-wrap">
                            {text ? text : ac_strings.listen}
                        </span>
                    </div>


                )}

        </div>
    )
}

export const ReadOrListenIcon: React.FC<{ read?: string, listen?: string, track?: IMedia }> = ({ read, listen, track }) => {

    return (
        <span >
            {listen && track ? (
                <FetchAndSetCurrentMedia
                    track={track}
                    clickable
                    render={({ playing }) => {
                        return (
                            <ListenIcon
                                playing={playing}
                                text={listen}
                            />
                        )

                    }} />

            ) : read && <ReadIcon text={read} />}

        </span>
    )
}

export const SimpleSmallListenIcon: React.FC<{ media: IMedia }> = ({ media }) => {
    return (
        <FetchAndSetCurrentMedia
            track={media}
            clickable
            render={({ playing }) => {
                return (
                    <div>
                        {playing ? (
                            <div className="flex items-center rounded-full pr-2">
                                <EqualizerIcon
                                    customSize="5"
                                    className="fill-slate-light"
                                />
                                <span className="text-xs sm:text-sm text-white pl-2 whitespace-no-wrap">
                                    {ac_strings.playing}
                                </span>
                            </div>
                        ) : (

                                <div className="flex items-center rounded-full pr-2">
                                    <PlayCircleOutlineIcon
                                        className="fill-slate-dark"
                                        customSize="5"
                                    />
                                    <span className="text-xs sm:text-sm text-white pl-2 whitespace-no-wrap">
                                        {ac_strings.listen}
                                    </span>
                                </div>


                            )}
                    </div>
                )

            }} />
    )
}

interface ILikesViewsProps {
    id: string
    likes?: number
    views?: string
    className?: string
}

export const Views: React.FC<{ views: string }> = ({ views }) => {
    return (
        <div className="mx-2 flex items-center">
            <VisibilityIcon
                className="fill-slate-dark"
                customSize="5"
            />
            <span className="text-xs sm:text-sm text-ac-slate-dark pl-2 whitespace-no-wrap">
                {views}
            </span>
        </div>
    )
}
export const BookmarksAndViews: React.FC<ILikesViewsProps> = (props) => {
    const { id, views, className } = props
    return (
        <div className={`font-roboto  ${className ? className : 'flex flex-1 mr-2 justify-end items-center'}`}>
            {/*             {typeof views === "string" && (
                <div className="mr-4 flex items-center">
                    <Icon
                        name="Visibility"
                        color="slate-dark"
                        size="5"
                    />
                    <span className="text-xs sm:text-sm text-ac-slate-dark pl-2">
                        {views}
                    </span>
                </div>
            )}
 */}
            <Bookmark
                id={id}
                color="slate-dark"
                size="5"
            />
        </div>
    )
}

export const PlaylistBackground: React.FC<{ slug: string, imageUrl: IImage }> = ({ slug, imageUrl }) => {
    return (
        <div className="w-full relative">
            <div id="play-button" className="absolute p-2 text-white z-10 inset-0 flex justify-center items-center">
                <PlaylistPlayButton slug={slug} />
            </div>
            <SquareImg rounded {...imageUrl} alt='background' />
        </div>
    )
}

