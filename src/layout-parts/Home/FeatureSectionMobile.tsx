import React from 'react'
import FetchPosts from '@/HOC/FetchPosts'

import RightImg from '@/components/PostItemCards/RightImg'
import { getRandomArray } from '@/helpers'
import { ITopicPostSlugs } from '@/types'
const FeatureSection: React.FC<{ topicPosts: ITopicPostSlugs[] }> = ({ topicPosts }) => {

    let postSlugs: string[] = []
    topicPosts.map(t => {
        postSlugs.push(...t.posts)
    })
    const randomFeaturedFromTopics = getRandomArray(postSlugs, 3)
    return (


        <FetchPosts
            slugs={randomFeaturedFromTopics}
            layout="list"
            render={({ posts }) => {
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
            }
        />


    )
}

export default FeatureSection