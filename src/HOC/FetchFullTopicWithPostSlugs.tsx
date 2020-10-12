import * as React from "react"
import { ITopic } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import TS from '@/strings'
interface IFetchPost {
    topics: string[]
    layout: "row" | "list",
    render: (data: { topicPostItems: ITopic[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ topics, render }) => {
    const [topicPostItems, setTopicPostItems] = React.useState<ITopic[]>([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        setLoading(true)
        Promise.all(topics

            .map(slug => fetch(`/page-data/${TS.slug_topic}/${slug}/page-data.json`)
                .then(res => res.json())
                .then(topicRes => {
                    const data = topicRes.result.pageContext
                    const topic = {
                        id: data.id,
                        name: data.title,
                        slug,
                        image: data.image
                    }

                    return topic
                })

            ))
            .then(res => {
                setLoading(false)
                const toAdd: ITopic[] = []
                res.forEach(item => {
                    if (item) {
                        toAdd.push(item)
                    }
                })
                setTopicPostItems(toAdd)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }, [topics])

    return (
        <Placeholder
            loading={loading}
        >
            {render({ topicPostItems })}
        </Placeholder>
    )

}

export default FetchPosts