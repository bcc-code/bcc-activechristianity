import * as React from 'react';

import Link from '@/components/CustomLink'
import ac_strings from '@/strings/ac_strings.json'
import menu from '@/strings/menu'
import { INavItemCount } from "@/types"

export const SubSection: React.FC<{ title: string, to?: string, className?: string, icon?: JSX.Element }> = ({ title, children, to, className, icon }) => {
    return (
        <div className={`p-4 pb-8 bg-white border-b mb-4 sm:shadow ${className ? className : ''}`}>
            <div className="font-semibold text-xs sm:text-base py-2 flex justify-between">
                <h5 className="text-d4secondary flex items-center">{icon && <span className="pr-2">{icon}</span>} <div className="inline-block">{title}</div></h5>
                {to && (
                    <Link className="text-xxs text-d4secondary" to={to}>{ac_strings.more} </Link>
                )}
            </div>

            {children}
        </div>
    )
}

import ArchiveIcon from '@/components/Icons/Archive';
import WatchIcon from '@/components/Icons/Screen';
import AudioIcon from '@/components/Icons/Audio';
import FileIcon from '@/components/Icons/File'
import FeatureIcon from '@/components/Icons/Feature'


export const ExploreByType: React.FC<{ resource: IResourceOverview }> = ({ resource }) => {
    const [resourceTypeGroup, setResourceTypeGroup] = React.useState<"types" | "listen" | "read" | "watch" | "general">('types');

    const listMap = {
        "types": {
            icon: <FeatureIcon className="w-4 h-4" />,
            name: resource.format ? resource.format.name : "",
            menu: resource.format ? resource.format.items : []
        },
        "read": {
            icon: <FileIcon className="w-4 h-4" />,
            name: resource.read ? resource.read.name : "",
            menu: resource.read ? resource.read.menu : []
        },
        "watch": {
            icon: <WatchIcon className="w-3 h-3" />,
            name: resource.watch ? resource.watch.name : "",
            menu: resource.watch ? resource.watch.menu : []
        },
        "listen": {
            icon: <AudioIcon className="w-4 h-4" />,
            name: resource.listen ? resource.listen.name : "",
            menu: resource.listen ? resource.listen.menu : []
        },
        "general": {
            icon: <ArchiveIcon className="w-4 h-4" />,
            name: resource.general ? resource.general.name : "",
            menu: resource.general ? resource.general.items : []
        }
    }

    const activeList = listMap[resourceTypeGroup]

    return (
        <SubSection title="">
            <div className="flex justify-evenly">
                {Object.keys(listMap).map(item => {
                    const isActive = resourceTypeGroup === item
                    const name = listMap[item] ? listMap[item].name : ""
                    const icon = listMap[item].icon ? listMap[item].icon : ""
                    return (
                        <div
                            className={`flex-1 flex flex-col justify-start items-center border-b ${isActive ? 'border-d4secondary text-d4secondary' : 'border-d4gray'} pb-4`}
                            onClick={() => setResourceTypeGroup(item)}
                        >
                            <div className={`w-8 h-8 rounded-full flex justify-center items-center ${isActive ? 'bg-d4secondary text-white' : 'bg-d4gray-light '} `} >
                                {icon}
                            </div>
                            <span className="text-xs pt-2 text-center flex-1 flex justify-center align-middle">{name}</span>
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-cols-4 gap-2 pt-6">
                {activeList && activeList.menu.map((item, i) => {

                    const imgSettings = typesImageColors[item.key] || typesImageColors["other"]

                    return (

                        <Link className="flex flex-col items-center" key={item.key} to={item.to}>
                            <div className={`${imgSettings.color} py-4 text-center rounded-lg mb-2 flex justify-center items-center`}>
                                <img alt={item.name} src={imgSettings.image} className={'pointer-events-none w-full rounded-t-xl object-contain h-12 px-4'} />

                            </div>
                            <span className={`text-sm leading-none text-center py-2`}>{item.name}</span>
                        </Link>
                    )
                })}
            </div>

        </SubSection>
    )
}

export default ExploreByType;

import FoldersImg from '@/images/Explore/Folders.png'
import CommentaryImg from '@/images/Explore/Commentary.png'
import EdificationImg from '@/images/Explore/Edification.png'
import MessagesImg from '@/images/Explore/Messages.png'
import PlaylistImg from '@/images/Explore/Playlist.png'
import PodcastImg from '@/images/Explore/Podcast.png'
import QuestionsImg from '@/images/Explore/Questions.png'
import SongsImg from '@/images/Explore/Songs.png'
import TestimoniesImg from '@/images/Explore/Testimonies.png'
import VideoImg from '@/images/Explore/Videos.png'

//"Podcast","Ebook","Edification","Audio Playlists","Messages","Video","Testimonies","Questions"
export const typesImageColors: {
    [key: string]: {
        color: string
        image: string
    }
} = {
    "edification": {
        "color": "bg-d4primary",
        "image": EdificationImg
    },
    "testimony": {
        "color": "bg-d4secondary",
        "image": TestimoniesImg
    },
    "question": {
        "color": "bg-pink-500",
        "image": QuestionsImg
    },
    "commentary": {
        "color": "bg-green-500",
        "image": CommentaryImg
    },
    "song": {
        "color": "bg-blue-500",
        "image": SongsImg
    },
    "podcast": {
        "color": "bg-yellow-500",
        "image": PodcastImg
    },
    "message": {
        "color": "bg-d4red",
        "image": MessagesImg
    },
    /*     "podcast": {
            "color": "bg-d4green",
            "image": VideoImg
        }, */
    "playlist": {
        "color": "bg-d4primary",
        "image": PlaylistImg
    },
    "other": {
        "color": "bg-gray-500",
        "image": FoldersImg
    }
}

interface INavItemWKey {
    key: string
    count: number
    name: string
    to: string
}

export interface IResourceOverview {
    format: {
        name: string
        info: INavItemWKey
        menu: INavItemWKey[]
        items: INavItemWKey[]
    }
    general: {
        name: string
        info: INavItemWKey

        items: INavItemCount[]
    }
    read: {
        name: string
        slug: string
        info: INavItemWKey
        ebook?: INavItemCount
        menu: INavItemWKey[]
        items: INavItemWKey[]
    }
    listen?: {
        name: string
        slug: string
        info: INavItemWKey
        menu: INavItemWKey[]
        items: INavItemWKey[]
    }
    watch?: {
        name: string
        slug: string
        info: INavItemWKey
        menu: INavItemWKey[]
        items: INavItemWKey[]
    }
}