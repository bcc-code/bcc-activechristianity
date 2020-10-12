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

export default FetchPosts