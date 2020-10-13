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

    React.useEffect(() => {
        Promise.all(topics
            .map(t => fetchPostslistFromArchivePage(t.slug).then(posts => {
                if (posts) {
                    return ({
                        ...t,
                        posts
                    })
                }
            })))
            .then(res => {
                const toAdd: ITopicPostItems[] = []
                res.forEach(item => {
                    if (item) {
                        toAdd.push(item)
                    }
                })
                setTopicPostItems(toAdd)
            })
            .catch(error => {
                console.log(error)
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