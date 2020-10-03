import * as React from "react"
import { IPostItem, } from '@/types'
import { useSelector } from "react-redux";
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import { IRootState } from '@/state/types'
interface IFetchPost {
    slugs: string[],
    layout: "row" | "list",
    render: (data: { posts: IPostItem[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ slugs, render }) => {
    console.log(slugs)
    const [posts, setPosts] = React.useState<IPostItem[]>([])
    React.useEffect(() => {
        fetchLocalPostsFromSlugs(slugs)
            .then(res => {
                if (res) {
                    setPosts(res)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [slugs])

    return (

        <Placeholder
            loading={posts.length === 0}
        >
            {render({ posts })}
        </Placeholder>
    )

}

export default FetchPosts