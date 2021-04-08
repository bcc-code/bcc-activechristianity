import React from 'react'

import { getRandomArray } from '@/helpers/normalizers'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import { IPostItem } from '@/types'
import ac_strings from '@/strings/ac_strings.js'


interface IFetchLatestRecommendFormatPosts {
    slugs: string[]
    layout: "row" | "list" | "one"
    render: (data: { posts: IPostItem[] }) => JSX.Element
}

const RecommendedSectionOne: React.FC<IFetchLatestRecommendFormatPosts> = ({ slugs, render }) => {
    const [posts, setPosts] = React.useState<IPostItem[]>([])

    React.useEffect(() => {
        const formatSlugs: string[] = slugs
        let isSubscribed = true

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
    }, [slugs])

    return render({ posts })

}

export default RecommendedSectionOne