import React from 'react'

import { getRandomArray } from '@/helpers'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import { IPostItem } from '@/types'
import topicFiter from '@/strings/topic-filters.json'
const { formatIds } = topicFiter
import ac_strings from '@/strings/ac_strings.js'


interface IFetchLatestRecommendFormatPosts {
    ids: number[]
    layout: "row" | "list" | "one"
    render: (data: { posts: IPostItem[] }) => JSX.Element
}

const RecommendedSectionOne: React.FC<IFetchLatestRecommendFormatPosts> = ({ ids, render }) => {
    const [posts, setPosts] = React.useState<IPostItem[]>([])

    React.useEffect(() => {
        const formatSlugs: string[] = []
        let isSubscribed = true
        ids.forEach(id => {
            if (formatIds[`${id}`]) {
                formatSlugs.push(formatIds[`${id}`].to)
            }
        })
        Promise.all(formatSlugs.map(slug => fetchPostslistFromArchivePage(`${slug}/${ac_strings.slug_latest}`))).then(res => {
            const allPosts: IPostItem[] = []
            if (res && Array.isArray(res)) {
                res.forEach(array => {
                    if (array) {
                        allPosts.push(...array)

                    }
                })
            }
            if (isSubscribed) {
                const random = getRandomArray(allPosts, 12)
                setPosts(random)
            }
            return () => {
                isSubscribed = false
            }
            /*      */

        })
    }, [ids])

    return render({ posts })

}

export default RecommendedSectionOne