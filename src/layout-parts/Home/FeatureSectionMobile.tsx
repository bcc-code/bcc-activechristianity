import React from 'react'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'

import RightImg from '@/components/PostItemCards/RightImg'
import { getRandomArray } from '@/helpers'
import { ITopicPostItems, IPostItem } from '@/types'

const FeatureSection: React.FC<{ topicPosts: ITopicPostItems[] }> = ({ topicPosts }) => {

    let postSlugs: IPostItem[] = []
    topicPosts.map(t => {
        postSlugs.push(...t.posts)
    })
    const posts = getRandomArray(postSlugs, 3)
    React.useEffect(() => {

    }, [])
    return (

        <div className="px-4">
            {posts.map(item => {
                return (
                    <RightImg {...item} />
                )
            })}
        </div>


    )
}

export default FeatureSection