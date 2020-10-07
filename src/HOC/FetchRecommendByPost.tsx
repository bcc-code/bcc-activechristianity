import * as React from "react"
import { IPostItem, } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import acApi from '@/util/api'
interface IFetchPost {
    postId: number | string,
    render: (data: { postSlugs: string[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ render, postId }) => {
    const [posts, setPosts] = React.useState<string[]>([])
    React.useEffect(() => {
        acApi.recommendedByPost(postId)
            .then(res => {
                const allSlugs: string[] = res.recommendedByPost.map((p: any) => p.slug)
                setPosts(allSlugs)
            })
            .catch(error => {
                console.log(error)
            })
    }, [postId])

    return (

        <Placeholder
            loading={posts.length === 0}
        >
            {render({ postSlugs: posts })}
        </Placeholder>
    )

}

export default FetchPosts