import * as React from "react"
import { IPostItem, } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
const FetchPosts: React.FC<{ slugs: string[], layout: "row" | "list", component: any }> = ({ children, slugs, component: Component }) => {
    const [posts, setPosts] = React.useState<IPostItem>([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        fetchLocalPostsFromSlugs(slugs)
            .then(res => {
                if (res) {
                    setLoading(false)
                    setPosts(res)
                }
            })
    }, slugs)
    return (
        <Placeholder loading={loading}>
            <Component posts={posts} />
        </Placeholder >
    )

}