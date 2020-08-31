import * as React from 'react';

import Link from '@/components/CustomLink'
import ac_strings from '@/strings/ac_strings.json'
import menu from '@/strings/menu'

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


export const ExploreByType: React.FC = () => {
    const [resourceTypeGroup, setResourceTypeGroup] = React.useState<"most-viewed" | "listen" | "read" | "watch" | "general">('most-viewed');

    const option = [
        {
            name: ac_strings.mostView,
            value: "most-viewed",
            icon: <FeatureIcon className="w-4 h-4" />,
        },
        {
            name: menu.all.read.name,
            value: "read",
            icon: <FileIcon className="w-4 h-4" />,

        },
        {
            name: menu.all.watch.name,
            value: "watch",
            icon: <WatchIcon className="w-3 h-3" />,
        },
        {
            name: menu.all.listen.name,
            value: "listen",
            icon: <AudioIcon className="w-4 h-4" />,
        },
        {
            name: ac_strings.general,
            value: "general",
            icon: <ArchiveIcon className="w-4 h-4" />,
            types: general
        },

    ]

    const listMap = {
        "most-viewed": typeList,
        "read": read,
        "watch": watch,
        "listen": listen,
        "general": general
    }


    return (
        <SubSection title="">
            <div className="flex justify-evenly">
                {option.map(item => {

                    const isActive = resourceTypeGroup === item.value
                    return (
                        <div
                            className={`flex-1 flex flex-col justify-start items-center border-b ${isActive ? 'border-d4secondary text-d4secondary' : 'border-d4gray'} pb-4`}
                            onClick={() => setResourceTypeGroup(item.value)}
                        >
                            <div className={`w-8 h-8 rounded-full flex justify-center items-center ${isActive ? 'bg-d4secondary text-white' : 'bg-d4gray-light '} `} >
                                {item.icon}
                            </div>
                            <span className="text-xs pt-2 text-center flex-1 flex justify-center align-middle">{item.name}</span>
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-cols-4 gap-2 pt-6">
                {listMap[resourceTypeGroup].map((item, i) => {
                    return (

                        <Link className="flex flex-col items-center" key={i} to={item.to}>
                            <div className={`${item.color} sm:h-40 sm:w-32 text-center rounded-lg mb-2 flex justify-center items-center`}>
                                <img alt={item.name} src={item.image} className={'pointer-events-none w-full rounded-t-xl object-contain h-12 sm:h-20 px-4'} />

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
    "Edification": {
        "color": "bg-d4primary",
        "image": EdificationImg
    },
    "Testimonies": {
        "color": "bg-d4secondary",
        "image": TestimoniesImg
    },
    "Questions": {
        "color": "bg-pink-500",
        "image": QuestionsImg
    },
    "Commentary": {
        "color": "bg-green-500",
        "image": CommentaryImg
    },
    "Songs": {
        "color": "bg-blue-500",
        "image": SongsImg
    },
    "Podcast": {
        "color": "bg-yellow-500",
        "image": PodcastImg
    },
    "Messages": {
        "color": "bg-d4red",
        "image": MessagesImg
    },
    "Video": {
        "color": "bg-d4green",
        "image": VideoImg
    },
    "Audio Playlists": {
        "color": "bg-d4primary",
        "image": PlaylistImg
    },
    "Other": {
        "color": "bg-gray-500",
        "image": FoldersImg
    }
}

const read = Object.keys(menu.read).map(key => ({
    ...menu.read[key],
    ...typesImageColors[key] || typesImageColors.Other
}))

const watch = Object.keys(menu.watch).map(key => ({
    ...menu.watch[key],
    ...typesImageColors[key] || typesImageColors.Other
}))

const listen = Object.keys(menu.listen).map(key => ({
    ...menu.listen[key],
    ...typesImageColors[key] || typesImageColors.Other
}))

const general = menu.resourceMenu.resource.map(item => ({
    ...item,
    ...typesImageColors[item.name] || typesImageColors.Other
}))

const typeList = [
    {
        parent: 'read',
        name: "E-books"
    },
    {
        parent: 'listen',
        name: "Podcast"
    },
    {
        parent: 'read',
        name: "Edification"
    },
    {
        parent: 'listen',
        name: "Audio Playlists"
    }
].map(item => {
    const img = typesImageColors[item.name] || typesImageColors.Other
    return ({
        ...menu[item.parent][item.name],
        ...img
    })
})


