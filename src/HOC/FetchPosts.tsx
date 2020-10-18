import * as React from "react"
import { IPostItem, IPlaylist } from '@/types'
import { getPlaceholder } from '@/layout-parts/Loader/PlaceHolders'
import { fetchLocalPostsFromSlugs, fetchOneLocalPostsFromSlug, fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import ac_strings from '@/strings/ac_strings.json'


interface IFetchPost {
    slugs: string[],
    layout: "row" | "list" | "one",
    render: (data: { posts: IPostItem[] }) => JSX.Element
}
export const FetchPostsFromSlugs: React.FC<IFetchPost> = ({ slugs, render, layout }) => {
    const [posts, setPosts] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        setLoading(true)
        fetchLocalPostsFromSlugs(slugs)
            .then(res => {
                setLoading(false)
                if (res) {
                    setPosts(res)
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }, [slugs])

    const CustomPlaceholder = getPlaceholder[layout]
    return (

        <CustomPlaceholder
            loading={loading}
        >
            {render({ posts })}
        </CustomPlaceholder>
    )

}
interface IFetchPostsFromArchivePage {
    slug: string
    layout: "row" | "list" | "one",
    render: (data: { posts: IPostItem[] }) => JSX.Element
}

export const FetchPostsFromArchivePage: React.FC<IFetchPostsFromArchivePage> = ({ slug, render }) => {
    const [postItems, setPostItems] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {

        fetchPostslistFromArchivePage(slug)
            .then(res => {
                setLoading(false)
                if (res) {

                    setPostItems(res)
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }, [])

    return (
        <Placeholder
            loading={loading}
        >
            {render({ posts: postItems })}
        </Placeholder>
    )

}


interface IFetchOnePost {
    slug: string,
    render: (data: { post: IPostItem | null }) => JSX.Element
}
export const FetchOnePost: React.FC<IFetchOnePost> = ({ slug, render }) => {
    const [post, setPost] = React.useState<IPostItem | null>(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        setLoading(true)
        fetchOneLocalPostsFromSlug(slug)
            .then(res => {
                setLoading(false)
                if (res) {
                    setPost(res)
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }, [slug])


    const CustomPlaceholder = getPlaceholder["one"]
    return (

        <CustomPlaceholder
            loading={loading}
        >
            {render({ post })}
        </CustomPlaceholder>
    )

}

interface IFetchOnePlaylist {
    slug: string
    render: (data: { post: IPlaylist | null }) => JSX.Element
}

export const FetchOnePlaylist: React.FC<IFetchOnePlaylist> = ({ slug, render }) => {
    const [post, setPost] = React.useState<IPlaylist | null>(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        setLoading(true)
        fetch(`/page-data/${ac_strings.slug_playlist}/${slug}/page-data.json`)
            .then(res => res.json())
            .then(res => {
                if (res.result && res.result.pageContext && res.result.pageContext['playlist']) {
                    const updatePost = res.result.pageContext && res.result.pageContext['playlist']
                    return updatePost
                }
                return undefined
            })
            .then(res => {

                setLoading(false)
                if (res) {
                    setPost(res)
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }, [slug])


    const CustomPlaceholder = getPlaceholder["one"]
    return (

        <CustomPlaceholder
            loading={loading}
        >
            {render({ post })}
        </CustomPlaceholder>
    )

}
