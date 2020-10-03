
import * as React from 'react';
import Link from '@/components/CustomLink'
import { IPostAuthors, IMedia } from '@/types'
import Icon from '@/components/Icons/Icon'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import FetchAndSetCurrentMedia from '@/HOC/FetchPlayingMedia'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'

export const ReadMore: React.FC<{ slug: string, id: string }> = ({ slug, id }) => {
    return (
        <div className="flex justify-between">
            <Link className="block text-indigo-500 text-sm" to={slug}>{TS.read_more}</Link>
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
    return <span>{authorGroups && authorGroups[0] ? authorGroups[0].authors.map((item, k) => <Link key={k} className="inline-block post-meta-commar" to={item.to}>{item.name}</Link>) : ''}</span>
}
export const ReadingTimingAuthor: React.FC<IProps> = ({ duration, authors, className }) => {

    return (
        <span className={className ? className : 'text-sm text-gray-600'}>
            <span>{duration ? duration : ''}</span>
            {duration && authors && <span> · </span>}
            <AuthorLink authorGroups={authors} />
        </span>
    )
}

export const ReadingTimingIcon: React.FC<{ read?: string, listen?: string }> = ({ read, listen }) => {

    return (
        <span className={"mr-6 flex items-center"}>
            <Icon
                name="AccessTime"
                color="slate-dark"
                size="5"
            />
            <span className="text-xs text-d4slate-dark pl-2 whitespace-no-wrap mt-1">
                {read}
            </span>
        </span>
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
                            <div className="">
                                {playing ? (
                                    <div className="mr-4 flex items-center bg-d4slate-dark  rounded-full p-1">
                                        <Icon
                                            name="Equalizer"
                                            size="4"
                                        />
                                        <span className="text-xs text-white pl-2 whitespace-no-wrap">
                                            {ac_strings.playing}
                                        </span>
                                    </div>
                                ) : (

                                        <div className="mr-4 flex items-center rounded-full bg-d4slate-lighter p-1">
                                            <Icon
                                                name="PlayCircleOutline"
                                                color="slate-dark"
                                                size="4"
                                            />
                                            <span className="text-xs text-d4slate-dark pl-2 whitespace-no-wrap">
                                                {listen}
                                            </span>
                                        </div>


                                    )}

                            </div>
                        )

                    }} />
            ) : (
                    <div className={"mr-4 flex items-center"}>
                        <Icon
                            name="Description"
                            color="slate-dark"
                            size="4"
                        />
                        <span className="text-xs text-d4slate-dark pl-2 whitespace-no-wrap mt-1">
                            {read}
                        </span>
                    </div>
                )}
        </span>
    )
}


interface ILikesViewsProps {
    id: string
    likes?: number
    views?: number
}

export const BookmarksAndViews: React.FC<ILikesViewsProps> = (props) => {
    const { id, views } = props
    return (
        <div className="font-roboto flex">
            <div className="mr-2 flex items-center">
                {typeof views === "string" && (
                    <div className="mr-4 flex items-center">
                        <Icon
                            name="Visibility"
                            color="slate-dark"
                            size="5"
                        />
                        <span className="text-xs text-d4slate-dark pl-2 mt-1">
                            {views}
                        </span>
                    </div>
                )}

                <Bookmark
                    id={id}
                    color="slate-dark"
                    size="5"
                />
            </div>


        </div>
    )
}
