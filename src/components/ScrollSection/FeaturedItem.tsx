import * as React from 'react'
import { INavItem, IImage, IEbook, IPostItem, IPlaylist, } from "@/types"
import { fetchEbookFromSlug, fetchPlaylistFromSlug, fetchOneLocalPostFromSlug } from '@/helpers/fetchLocalData'

import DesktopHeaderPost from '@/layout-parts/Home/HeaderPost'
import Playlist from '@/components/ScrollSection/Playlist'

export interface IPageFeaturedPost {
    type: "playlist" | "ebook" | "post"
    id: number
    image: IImage
    slug: string
    sub: string
    title: string
}

export interface IModifiedFields {
    exceprt?: string
    title?: string
    image?: IImage
}

export interface IPageTextComp {
    type: "text"
    data: {
        content: string
    }
}

export interface IPageEmbedComp {
    type: "embed"
    data: {
        url: string
    }
}

export interface IPostItems {
    type: "post_items"
    data: {
        author: string
        id: number
        image: { src: string }
        slug: string
        sub: string
        title: string
        type: "post"
    }[]
}

export interface IPageFeaturedItems {
    type: "featured_items"
    data: IPageFeaturedPost[]
}

export interface IPagePost {
    type: "article_banner"
    data: {
        author: string
        id: number
        image: IImage
        slug: string
        title: string

    }
}

export type IPageCompTypes = IPagePost | IPageFeaturedItems | IPageTextComp | IPostItems | IPageEmbedComp

const FeaturedItem: React.FC<IPageFeaturedPost & { withBg?: boolean }> = ({
    type,
    id,
    image,
    slug,
    sub,
    title
}) => {

    const [loadedEbook, setLoadedEbook] = React.useState<IEbook | undefined>(undefined)
    const [loadedPost, setLoadedPost] = React.useState<IPostItem | undefined>(undefined)
    const [loadedPlaylist, setLoadedPlaylist] = React.useState<IPlaylist | undefined>(undefined)

    React.useEffect(() => {
        setPost()
    }, [slug])

    const setPost = () => {

        let modified: IModifiedFields = {}
        if (title && title.trim() !== "") {
            modified["title"] = title
        }

        if (sub && sub.trim() !== "") {
            modified.exceprt = sub
        }

        /*         if (image) {
                    modified.image = image
                } */
        if (type === "ebook") {
            fetchEbookFromSlug(slug).then(res => {
                if (res) {
                    const toAdd = { ...res, ...modified }
                    setLoadedEbook(toAdd)
                }

            })
        } else if (type === "playlist") {
            fetchPlaylistFromSlug(slug).then(res => {
                if (res) {
                    const toAdd = { ...res, ...modified }
                    setLoadedPlaylist(toAdd)
                }

            })
        } else if (type == "post") {
            fetchOneLocalPostFromSlug(slug).then(res => {
                if (res) {
                    const toAdd = { ...res, ...modified }
                    setLoadedPost(toAdd)
                }
            })
        }
    }

    if (loadedPost) {
        return <DesktopHeaderPost {...loadedPost} />
    } else if (loadedPlaylist) {
        return <Playlist {...loadedPlaylist} />
    } else {
        return null
    }
}

export default FeaturedItem