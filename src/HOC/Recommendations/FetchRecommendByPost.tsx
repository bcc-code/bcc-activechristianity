import * as React from "react"
import Placeholder from '@/components/Loader/MainpagePlaceholder'

interface IFetchPost {
    postId: number | string,
    render: (data: { postSlugs: string[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ render, postId }) => {
    const [posts, setPosts] = React.useState<string[]>([])
    React.useEffect(() => {
        import('@/util/api').then(acApi => {
            acApi.recommendedByPost(postId)
                .then(res => {
                    const allSlugs: string[] = res.recommendedByPost.map((p: any) => p.slug)
                    setPosts(allSlugs)
                })
                .catch(error => {
                    console.log(error)
                })
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