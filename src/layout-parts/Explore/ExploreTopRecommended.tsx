import React from 'react'

import TopImgHorizontalScrollRow from '@/layout-parts/HorizontalScroll/TopImgRow'
import { getRandomArray } from '@/helpers'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import { IPostItem } from '@/types'
import PostRow3Col from '@/layout-parts/List/PostRow3Col'
import topicFiter from '@/strings/topic-filters.json'
const { formatIds } = topicFiter
import ac_strings from '@/strings/ac_strings.js'
import RightImg from '@/components/PostItemCards/RightImg'
import shortid from 'shortid'

interface IFetchPost {
    ids: number[]
}

const RecommendedSectionOne: React.FC<IFetchPost> = ({ ids }) => {
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

    if (posts.length > 3) {
        return (
            <div className="px-4">
                <div className="sm:hidden -ml-4 -mr-4 py-6">

                    <TopImgHorizontalScrollRow posts={posts.slice(0, 3)} />
                </div>
                <div className="hidden sm:block">
                    <PostRow3Col posts={posts.slice(0, 3)} />
                </div>
                <div>
                    {posts.slice(3).map(p => {
                        return (
                            <RightImg {...p} key={shortid()} />
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return null
    }



}

export default RecommendedSectionOne