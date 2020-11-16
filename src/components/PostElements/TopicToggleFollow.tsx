import * as React from 'react';
import FetchAndSetFollowedTopics from '@/HOC/SetAndUpdateFollowedTopic'
import FetchAndSetFollowedPlaylists from '@/HOC/SetAndUpdateFollowedPlaylist'
import Icon, { IButtonColour } from "@/components/Icons/Icon"
import Link from '@/components/CustomLink'
import { ITopicNavItem } from '@/types'
import { OutlineSmallRounded } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.json'
import shortid from 'shortid'
export const toggleFollowStatusMap = {
    "loading": {
        color: 'bg-slate-lighter text-d4slate-dark',
        icon: <Icon name="Cached" size="4" />,
        text: ac_strings.loading
    },
    "true": {
        color: 'bg-slate-lighter text-d4slate-dark',
        icon: <Icon name="Check" size="4" />,
        text: ac_strings.unfollow
    },
    "false": {
        color: 'bg-d4slate-dark text-white',
        icon: <Icon name="Add" size="4" />,
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
                            <Icon name="Cached" size="4" key={shortid()} />
                        )}
                        {followed === "true" && (
                            <Icon name="Check" size="4" key={shortid()} />
                        )}
                        {followed === "false" && (
                            <Icon name="Add" size="4" key={shortid()} />
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
                        <div className="flex">
                            <span className="">{config.text}</span>
                            <span className="pl-2 flex items-center">
                                {followed === "loading" && (
                                    <Icon name="Cached" size="4" key={shortid()} />
                                )}
                                {followed === "true" && (
                                    <Icon name="Check" size="4" key={shortid()} />
                                )}
                                {followed === "false" && (
                                    <Icon name="Add" size="4" key={shortid()} />
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
                                    <Icon name="Cached" size="4" key={shortid()} />
                                )}
                                {followed === "true" && (
                                    <Icon name="Check" size="4" key={shortid()} />
                                )}
                                {followed === "false" && (
                                    <Icon name="Add" size="4" key={shortid()} />
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
                            <Icon
                                name="Cached"
                                color={buttonColor}
                                size={buttonSize}
                            />
                        )}
                        {followed === "false" && (
                            <Icon
                                name="BookmarkBorder"
                                color={buttonColor}
                                size={buttonSize}
                            />
                        )}
                        {
                            followed === "true" && (
                                <Icon
                                    name="Bookmark"
                                    color={buttonColor}
                                    size={buttonSize}
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
                                <Icon name="Cached" size="4" key={shortid()} />
                            )}
                            {followed === "true" && (
                                <Icon name="Check" size="4" key={shortid()} />
                            )}
                            {followed === "false" && (
                                <Icon name="Add" size="4" key={shortid()} />
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
                    <div className={`flex justify-center py-1 px-2 my-2 w-full text-center text-sm rounded-full font-semibold ${config.color}`}>
                        <span>{text ? text : config.text}</span>
                    </div>

                )
            }}
        />

    )
}

export const ToggleFollowWithName: React.FC<ITopicNavItem> = ({ id, name, to }) => {

    return (


        <div className={`flex py-2 px-4 pr-0 mb-2 mr-2 text-center text-sm rounded-full font-semibold items-center bg-gray-300`}>
            <Link to={to} className="">{name}</Link>
            <FetchAndSetFollowedTopics
                id={id}
                className=""
                render={({ followed }) => {
                    const config = toggleFollowStatusMap[followed]
                    return (
                        <span className="py-2 px-4">
                            {followed === "loading" && (
                                <Icon name="Cached" size="4" key={shortid()} />
                            )}
                            {followed === "true" && (
                                <Icon name="Check" size="4" key={shortid()} />
                            )}
                            {followed === "false" && (
                                <Icon name="Add" size="4" key={shortid()} />
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
        <Link to={`${to}`} className="border border-d4slate-light rounded-lg px-1 flex items-center mr-2 mb-2 py-1">
            <Icon
                size="2"
                color="slate-light"
                name="LocalOffer"
            />
            <span className="px-1 text-d4slate-light" style={{ fontSize: "12px" }}>{name}</span>

        </Link>
    )
}

