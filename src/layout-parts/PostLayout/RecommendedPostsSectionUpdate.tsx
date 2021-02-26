import * as React from 'react'

import { ITopicPostSlugs, IPostItem } from '@/types'
import { fetchPostslistFromArchivePage, fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import Row3ColAndXScroll from '@/components/List/Combo/Row3Col-HorizontalScroll'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import ac_strings from '@/strings/ac_strings.js'

import { getRandomArray } from "@/helpers"

const acApiModule = import('@/util/api')

const RecommendedPostsSection: React.FC<{ postId: string, readMorePosts: string[], topics?: ITopicPostSlugs[] }> = ({ postId, readMorePosts, topics }) => {
    const [randomPosts, setRandomPosts] = React.useState<IPostItem[]>([])
    React.useEffect(() => {
        let readMore: string[] = []
        if (readMorePosts.length > 0) {
            const procssedReadMore = readMorePosts.filter(item => typeof item === "string").map(item => item.replace(/^\/|\/$/g, ''))
            readMore = procssedReadMore
        }
        acApiModule.then(res => {
            const api = res.default
            console.log(postId)
            api.recommendedByPost(postId)
                .then(res => {
                    console.log(res)
                    /* setPosts(allSlugs) */

                    let randomRecommendPosts: string[] = []

                    if (res.recommendedByPost) {
                        let recommendedPosts = res.recommendedByPost.map((p: any) => p.slug)
                        let randName = [];
                        let recommendPostsSlugs = [...recommendedPosts]
                        if (recommendPostsSlugs.length > 0) {
                            randName = getRandomArray(recommendPostsSlugs, 3)
                            // prepare to remove dupicates in readmores 
                            randomRecommendPosts = randName.map(item => item.replace(/^\/|\/$/g, ''))
                        }
                        let allPosts = [...randomRecommendPosts, ...readMore]
                        readMore = [...new Set(allPosts)]
                        fetchLocalPostsFromSlugs(readMore).then(res => {
                            if (res) {
                                setRandomPosts(res)
                            }
                        })

                    }

                })
                .catch(error => {
                    console.log(error)
                })
        })


    }, [postId, readMorePosts])

    const topicPostSlugs: string[] = []
    topics?.map(t => {
        topicPostSlugs.push(...t.posts)
    })
    return (
        <div className="pt-6">
            <FetchPostsFromSlugs
                layout="row"
                slugs={topicPostSlugs}
                render={({ posts }) => {
                    return (
                        <Row3ColAndXScroll title={`${ac_strings.you_might_be_interested_in}`} posts={posts} />
                    )
                }}
            />
            <Row3ColAndXScroll title={``} posts={randomPosts} />

        </div>
    )
}
export default RecommendedPostsSection