import * as React from "react"
import { IPostItem, } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
interface IFetchPost {
    slugs: string[],
    layout: "row" | "list",
    render: (data: { posts: IPostItem[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ slugs, render }) => {
    const [posts, setPosts] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        fetchLocalPostsFromSlugs(slugs)
            .then(res => {
                if (res) {
                    setPosts(res)
                }
            })
    }, [])
    return (

        <Placeholder
            loading={posts.length === 0}
        >
            {render({ posts })}
        </Placeholder>
    )

}

export default FetchPosts