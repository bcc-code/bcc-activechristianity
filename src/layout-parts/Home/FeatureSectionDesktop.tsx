import React from 'react'
import FetchPosts from '@/HOC/FetchPosts'
import FeaturedCard, { IFeaturedCard } from '@/components/PostItemCards/FeaturedCard'
import TopImg from '@/components/PostItemCards/TopImg'
import ac_strings from '@/strings/ac_strings.json'
import FetchLatestPodcast from '@/HOC/FetchLatestPodcast'
import FetctLatestPlaylists from '@/HOC/FetctLatestPlaylists'
import { playlistToPost, getRandomArray } from '@/helpers'
import { ITopicPostSlugs } from '@/types'
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
                    slug={"podcast"}
                    render={({ podcastEps }) => <FeaturedCard  {...podcastEps[0]} type="playlist" />}

                />
                <FetctLatestPlaylists

                    slug={"playlist"}
                    render={({ playlists }) => {
                        const random = getRandomArray(playlists, 1)
                        const post = random.length ? random[0] : undefined
                        return <FeaturedCard {...post} type="playlist" />
                    }}
                />
                <FetchPosts
                    slugs={[randomFeaturedFromTopics[0]]}
                    layout="list"
                    render={({ posts }) => {
                        return <TopImg {...posts[0]} />
                    }
                    }
                />
                <FetchPosts
                    slugs={[randomFeaturedFromTopics[1]]}
                    layout="list"
                    render={({ posts }) => {
                        return <TopImg {...posts[0]} />
                    }
                    }
                />

            </div>

        </div>
    )
}

export default FeatureSection