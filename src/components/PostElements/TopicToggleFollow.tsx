import * as React from 'react';
import FetchAndSetFollowedTopics from '@/HOC/SetAndUpdateFollowedTopic'
import FetchAndSetFollowedPlaylists from '@/HOC/SetAndUpdateFollowedPlaylist'
import { CachedIcon, CheckIcon, AddIcon, BookmarkIcon, BookmarkBorderIcon, LocalOfferIcon, IButtonColour } from '@/components/Icons/MUI'
import Link from '@/components/CustomLink'
import { ITopicNavItem } from '@/types'
import { OutlineSmallRounded } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.js'
import shortid from 'shortid'
export const toggleFollowStatusMap = {
    "loading": {
        color: 'bg-slate-lighter text-ac-slate-dark',
        icon: <CachedIcon customSize="4" />,
        text: ac_strings.loading
    },
    "true": {
        color: 'bg-slate-lighter text-ac-slate-dark',
        icon: <CheckIcon customSize="4" />,
        text: ac_strings.unfollow
    },
    "false": {
        color: 'bg-ac-slate-dark text-white',
        icon: <AddIcon customSize="4" />,
        text: ac_strings.follow
    },
}

interface IToggleFollowProps {
    id: string
    text?: string
    color?: IButtonColour
    size?: string
}

export const ToggleBookmarkIconOnly: React.FC<IToggleFollowProps> = ({ id }) => {

    return (
        <FetchAndSetFollowedTopics
            id={id}
            className="p-2"
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]
                return (
                    <button>
                        {followed === "loading" && (
                            <CachedIcon customSize="4" key={shortid()} />
                        )}
                        {followed === "true" && (
                            <CheckIcon customSize="4" key={shortid()} />
                        )}
                        {followed === "false" && (
                            <AddIcon customSize="4" key={shortid()} />
                        )}
                    </button>
                )
            }}
        />

    )
}


export const ToggleFollowOutlineBtn: React.FC<IToggleFollowProps> = ({ id }) => {

    return (
        <FetchAndSetFollowedTopics
            id={id}
            className=""
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]
                return (
                    <OutlineSmallRounded>
                        <div className="flex text-xs">
                            <span className="">{config.text}</span>
                            <span className="pl-2 flex items-center -mr-1">
                                {followed === "loading" && (
                                    <CachedIcon customSize="4" key={shortid()} />


                                )}
                                {followed === "true" && (
                                    <CheckIcon customSize="4" key={shortid()} />
                                )}
                                {followed === "false" && (
                                    <AddIcon customSize="4" key={shortid()} />
                                )}
                            </span>
                        </div>
                    </OutlineSmallRounded>
                )
            }}
        />

    )
}

export const ToggleFollowPlaylistOutlineBtn: React.FC<IToggleFollowProps> = ({ id }) => {

    return (
        <FetchAndSetFollowedPlaylists
            id={id}
            className=""
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]
                return (
                    <OutlineSmallRounded>
                        <div className="flex">
                            <span className="">{config.text}</span>
                            <span className="pl-2 flex items-center">
                                {followed === "loading" && (
                                    <CachedIcon customSize="4" key={shortid()} />
                                )}
                                {followed === "true" && (
                                    <CheckIcon customSize="4" key={shortid()} />
                                )}
                                {followed === "false" && (
                                    <AddIcon customSize="4" key={shortid()} />
                                )}
                            </span>
                        </div>
                    </OutlineSmallRounded>
                )
            }}
        />

    )
}

export const ToggleFollowPlaylistBookmark: React.FC<IToggleFollowProps> = ({ id, color, size }) => {
    const buttonColor = color ? color : "secondary"
    const buttonSize = size ? size : "6"
    return (
        <FetchAndSetFollowedPlaylists
            id={id}
            className=""
            render={({ followed }) => {
                return (
                    <div>
                        {followed === "loading" && (
                            <CachedIcon
                                customSize={buttonSize}
                                className={`fill-${buttonColor}`}
                            />
                        )}
                        {followed === "false" && (
                            <BookmarkBorderIcon
                                customSize={buttonSize}
                                className={`fill-${buttonColor}`}
                            />
                        )}
                        {
                            followed === "true" && (
                                <BookmarkIcon
                                    className={`fill-${buttonColor}`}
                                    customSize={buttonSize}
                                />
                            )
                        }
                    </div>
                )
            }}
        />

    )
}

export const SlateDarkFollowButton: React.FC<IToggleFollowProps> = ({ id, text }) => {

    return (
        <FetchAndSetFollowedTopics
            id={id}
            className="w-full"
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]

                return (
                    <div className={`flex justify-center py-1 px-2 my-2 w-full text-center text-sm rounded-full font-semibold ${config.color}`}>
                        <span>{text ? text : config.text}</span>
                        <span className="pl-2 flex items-center">
                            {followed === "loading" && (
                                <CachedIcon customSize="4" key={shortid()} />
                            )}
                            {followed === "true" && (
                                <CheckIcon customSize="4" key={shortid()} />
                            )}
                            {followed === "false" && (
                                <AddIcon customSize="4" key={shortid()} />
                            )}
                        </span>
                    </div>

                )
            }}
        />

    )
}

export const SlateDarkUnfollowButton: React.FC<IToggleFollowProps> = ({ id, text }) => {

    return (
        <FetchAndSetFollowedTopics
            id={id}
            className="w-full"
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]

                return (
                    <div className={`flex justify-center py-1 px-2 my-2 w-full text-center text-xs rounded-full font-semibold ${config.color}`}>
                        <span>{text ? text : config.text}</span>
                    </div>

                )
            }}
        />

    )
}



export const ToggleFollowWithName: React.FC<ITopicNavItem> = ({ id, name, to }) => {
    return (
        <div className={`flex py-2 px-4 mb-2 mr-2 text-center text-sm rounded-full font-semibold items-center bg-gray-300`}>
            <Link to={to} className="pr-2">{name}</Link>
            <FetchAndSetFollowedTopics
                id={id}
                className=""
                render={({ followed }) => {
                    const config = toggleFollowStatusMap[followed]
                    return (
                        <span className="">
                            {followed === "loading" && (
                                <CachedIcon customSize="4" key={shortid()} />
                            )}
                            {followed === "true" && (
                                <CheckIcon customSize="4" key={shortid()} />
                            )}
                            {followed === "false" && (
                                <AddIcon customSize="4" key={shortid()} />
                            )}
                        </span>
                    )
                }}
            />
        </div>



    )
}


export const TopicWithIcon: React.FC<ITopicNavItem> = ({ name, to }) => {

    return (
        <Link to={`${to}`} className="border border-ac-slate-light rounded-lg px-1 flex items-center mr-2 mb-2 py-1">
            <LocalOfferIcon
                customSize="2"
                className="fill-slate-light"
            />
            <span className="px-1 text-ac-slate-light" style={{ fontSize: "12px" }}>{name}</span>

        </Link>
    )
}

