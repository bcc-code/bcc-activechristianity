import * as React from "react"
import { ITopic, IPostItem } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
interface IFetchPost {
    slug: string
    layout: "row" | "list",
    render: (data: { posts: IPostItem[] }) => JSX.Element | null
}
const FetchPosts: React.FC<IFetchPost> = ({ slug, render }) => {
    const [postItems, setPostItems] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {

        fetchPostslistFromArchivePage(slug)
            .then(res => {
                if (res) {
                    setPostItems(res)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <Placeholder
            loading={postItems.length === 0}
        >
            {render({ posts: postItems })}
        </Placeholder>
    )

}

export default FetchPosts