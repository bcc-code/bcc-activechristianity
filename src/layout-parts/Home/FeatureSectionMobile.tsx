import React from 'react'
import FetchPosts from '@/HOC/FetchPosts'

import RightImg from '@/components/PostItemCards/RightImg'
import { getRandomArray } from '@/helpers'
import { ITopicPostSlugs } from '@/types'
const FeatureSection: React.FC<{ topicPosts: ITopicPostSlugs[] }> = ({ topicPosts }) => {
    console.log(topicPosts)
    let postSlugs: string[] = []
    topicPosts.map(t => {
        postSlugs.push(...t.posts)
    })
    const randomFeaturedFromTopics = getRandomArray(postSlugs, 3)
    return (


        <FetchPosts
            slugs={[randomFeaturedFromTopics[1]]}
            layout="list"
            render={({ posts }) => {
                return (
                    <div className="">
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