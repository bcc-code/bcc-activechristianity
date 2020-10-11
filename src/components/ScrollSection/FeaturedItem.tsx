import * as React from 'react'
import { INavItem, IImage, IEbook, IPostItem, IPlaylist, } from "@/types"
import { fetchEbookFromSlug, fetchPlaylistFromSlug, fetchOneLocalPostsFromSlug } from '@/helpers/fetchLocalData'
import Ebook from '@/components/ScrollSection/Ebook'
import DesktopHeaderPost from '@/layout-parts/Home/DesktopHeaderPost'
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

export type IPageCompTypes = IPagePost | IPageFeaturedItems | IPageTextComp

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
            fetchOneLocalPostsFromSlug(slug).then(res => {
                if (res) {
                    const toAdd = { ...res, ...modified }
                    setLoadedPost(toAdd)
                }
            })
        }
    }

    if (loadedEbook) {
        return <Ebook {...loadedEbook} />
    } else if (loadedPost) {
        return <DesktopHeaderPost {...loadedPost} />
    } else if (loadedPlaylist) {
        return <Playlist {...loadedPlaylist} />
    } else {
        return null
    }
}

export default FeaturedItem