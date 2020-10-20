import React from 'react'
import { FetchOnePost } from '@/HOC/FetchPosts'
import FeaturedCard, { IFeaturedCard } from '@/components/PostItemCards/FeaturedCard'

import TopImg from '@/components/PostItemCards/TopImg'
import ac_strings from '@/strings/ac_strings.json'
import { FetchLatestPlaylists, FetchLatestPodcast } from '@/HOC/FetchLatest'
import { playlistToPost, getRandomArray } from '@/helpers'
import { ITopicPostSlugs } from '@/types'
import shortid from 'shortid'
const FeatureSection: React.FC<{ featuredPosts: string[], topicPosts: ITopicPostSlugs[] }> = ({ topicPosts }) => {

    let postSlugs: string[] = []
    topicPosts.map(t => {
        postSlugs.push(...t.posts)
    })
    const randomFeaturedFromTopics = getRandomArray(postSlugs, 2)
    return (
        <div>
            <h3 className="relative mt-8 sm:mt-16 mx-4 mb-2 sm:mb-8 pb-2 text-d4dark text-base sm:border-b">
                <div className="flex items-center ">
                    <span className="block mx-2">{ac_strings.featured}</span>
                </div>
            </h3>
            <div className=" mx-4 my-4 grid gap-4 md:gap-6 grid-cols-4">
                <FetchLatestPodcast
                    key={shortid()}
                    layout="one"
                    render={({ podcastEps }) => <FeaturedCard  {...podcastEps[0]} type="podcast"
                    />}

                />
                <FetchLatestPlaylists
                    layout="one"
                    key={shortid()}
                    render={({ playlists }) => {
                        const random = getRandomArray(playlists, 1)
                        const post = random.length ? random[0] : undefined
                        return <FeaturedCard {...post} type="playlist" />
                    }}
                />
                <FetchOnePost
                    key={shortid()}
                    slug={randomFeaturedFromTopics[0]}
                    render={({ post }) => {
                        return post ? <TopImg {...post} /> : <div></div>
                    }
                    }
                />
                <FetchOnePost

                    slug={randomFeaturedFromTopics[1]}
                    render={({ post }) => {
                        return post ? <TopImg {...post} /> : <div></div>
                    }
                    }
                />

            </div>

        </div>
    )
}

export default FeatureSection