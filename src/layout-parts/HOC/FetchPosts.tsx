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
    const [posts, setPosts] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(false)
    const { bookmarkedPosts } = useSelector((state: IRootState) => state.userLibrary)
    React.useEffect(() => {
        fetchLocalPostsFromSlugs(slugs)
            .then(res => {
                if (res) {
                    /*  const found = bookmarkedPosts.find(item=) */
                    const posts = res.map(item => {
                        const bookmarkedIndex = bookmarkedPosts.findIndex(p => p.id === item.id)
                        return ({ ...item, bookmarked: bookmarkedIndex > -1 })
                    })
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