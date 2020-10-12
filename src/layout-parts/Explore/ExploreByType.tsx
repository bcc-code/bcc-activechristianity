import * as React from 'react';

import { INavItemCount, INavItemWKey } from "@/types"


//"Podcast","Ebook","Edification","Audio Playlists","Messages","Video","Testimonies","Questions"
export const typesImageColors: {
    [key: string]: {
        color: string
    }
} = {
    "edification": {
        "color": "bg-d4primary",
    },
    "testimony": {
        "color": "bg-d4secondary",
    },
    "question": {
        "color": "bg-pink-500",
    },
    "commentary": {
        "color": "bg-green-500",
    },
    "song": {
        "color": "bg-blue-500"
    },
    "podcast": {
        "color": "bg-yellow-500"
    },
    "message": {
        "color": "bg-d4red"
    },
    /*     "podcast": {
            "color": "bg-d4green",
            "image": VideoImg
        }, */
    "playlist": {
        "color": "bg-d4primary"
    },
    "other": {
        "color": "bg-gray-500"
    }
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