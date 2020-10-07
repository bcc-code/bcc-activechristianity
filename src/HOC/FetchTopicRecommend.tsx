import * as React from "react"
import { IPostItem, } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import acApi from '@/util/api'
interface IFetchPost {
    topicId: number,
    render: (data: { posts: IPostItem[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ render, topicId }) => {
    const [posts, setPosts] = React.useState<IPostItem[]>([])
    React.useEffect(() => {
        acApi.topicReommendedPosts(topicId)
            .then(res => {
                console.log(res)

                /* if (res) {
                    setPosts(res)
                } */
            })
            .catch(error => {
                console.log(error)
            })
    }, [topicId])

    return (

        <Placeholder
            loading={posts.length === 0}
        >
            {render({ posts })}
        </Placeholder>
    )

}

export default FetchPosts