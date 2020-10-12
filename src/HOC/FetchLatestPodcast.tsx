import * as React from "react"
import { IPostItem } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
interface IFetchPost {
    slug: string,
    render: (data: { podcastEps: IPostItem[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ slug, render }) => {
    const [podcastEps, setPodcastEps] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        setLoading(true)
        fetch(`/page-data/${slug}/page-data.json`)
            .then(res => res.json())
            .then(res => {

                const postSlugs = res.result.data.ac.topics[0].posts.slice(0, 12).map(p => p.slug)
                return fetchLocalPostsFromSlugs(postSlugs).then(res => {
                    if (res) {
                        setPodcastEps(res)
                    }
                    setLoading(false)
                })

            })
    }, [slug])

    return (

        <Placeholder
            loading={podcastEps.length === 0}
        >
            {render({ podcastEps })}
        </Placeholder>
    )

}

export default FetchPosts