import * as React from "react"
import { ITopic, ITopicPostItems } from '@/types'
import { getPlaceholder } from '@/layout-parts/Loader/PlaceHolders'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { fetchPostsFromTopics } from '@/helpers/fetchLocalData'
import ac_strings from '@/strings/ac_strings.js'
interface IFetchTopics {
    topics: string[]
    layout: "row" | "list",
    render: (data: { topics: ITopic[] }) => JSX.Element
}
export const FetchTopicsB: React.FC<IFetchTopics> = ({ topics: topicSlugs, render, layout }) => {
    const [topics, setTopics] = React.useState<ITopic[]>([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {

        setLoading(true)
        Promise.all(topicSlugs

            .map(slug => fetch(`/page-data/${ac_strings.slug_topic}/${slug}/page-data.json`)
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
                .catch(error => {
                    console.log(slug)
                    console.log(error.message)
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
                setTopics(toAdd)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }, [topicSlugs])
    const CustomPlaceholder = getPlaceholder[layout]
    return (
        < CustomPlaceholder
            loading={loading}
        >
            {render({ topics })}
        </ CustomPlaceholder>
    )

}

export const FetchTopics = React.memo(FetchTopicsB)
interface IFetchTopicsWithPosts {
    topics: ITopic[]
    layout: "row" | "list"
    render: (data: { topicPostItems: ITopicPostItems[] }) => JSX.Element
}

export const FetchTopicPostItems: React.FC<IFetchTopicsWithPosts> = ({ topics, render, layout }) => {
    const [topicPostItems, setTopicPostItems] = React.useState<ITopicPostItems[]>([])
    const [loading, setLoading] = React.useState(true)
    const CustomPlaceholder = getPlaceholder[layout]

    React.useEffect(() => {
        setLoading(true)

        fetchPostsFromTopics(topics)
            .then(res => {
                if (res) {

                    setLoading(false)
                    setTopicPostItems(res)
                } else {
                    throw Error('No posts found')
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }, [topics])

    return (
        <CustomPlaceholder
            loading={loading}
        >
            {render({ topicPostItems })}
        </CustomPlaceholder>
    )

}

