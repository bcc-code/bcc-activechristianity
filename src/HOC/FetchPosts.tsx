import * as React from "react"
import { IPostItem, } from '@/types'
import { useSelector } from "react-redux";
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'

interface IFetchPost {
    slugs: string[],
    layout: "row" | "list",
    render: (data: { posts: IPostItem[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ slugs, render }) => {
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

    return (

        <Placeholder
            loading={loading}
        >
            {render({ posts })}
        </Placeholder>
    )

}

export default FetchPosts