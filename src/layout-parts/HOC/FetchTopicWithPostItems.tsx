import * as React from "react"
import { ITopic, ITopicPostItems } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
interface IFetchPost {
    topics: ITopic[]
    layout: "row" | "list",
    render: (data: { topicPostItems: ITopicPostItems[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ topics, render }) => {
    const [topicPostItems, setTopicPostItems] = React.useState<ITopicPostItems[]>([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {

        Promise.all(topics
            .map(t => {
                return fetchPostslistFromArchivePage(t.slug).then(posts => {
                    if (posts) {
                        return ({
                            ...t,
                            posts
                        })
                    }
                })

            }))
            .then(res => {
                const toAdd: ITopicPostItems[] = []
                res.forEach(item => {
                    if (item) {
                        toAdd.push(item)
                    }
                })
                setTopicPostItems(toAdd)
            })
            .catch(res => {
                console.log(res)
            })
    }, [])

    return (
        <Placeholder
            loading={topicPostItems.length === 0}
        >
            {render({ topicPostItems })}
        </Placeholder>
    )

}

export default FetchPosts