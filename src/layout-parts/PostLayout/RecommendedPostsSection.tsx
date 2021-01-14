import * as React from 'react'

import { ITopicNavItem, IPostItem } from '@/types'
import { fetchPostsFromOneTopicSlug, fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import Row3ColAndXScroll from '@/layout-parts/List/Combo/Row3Col-HorizontalScroll'

import ac_strings from '@/strings/ac_strings.js'

import { getRandomArray } from "@/helpers"

import acApi from '@/util/api'

const RecommendedPostsSection: React.FC<{ postId: string, readMorePosts: string[], topics?: ITopicNavItem[] }> = ({ postId, readMorePosts, topics }) => {
    const [randomPosts, setRandomPosts] = React.useState<IPostItem[]>([])

    React.useEffect(() => {
        let readMore: string[] = []
        if (readMorePosts.length > 0) {
            const procssedReadMore = readMorePosts.filter(item => typeof item === "string").map(item => item.replace(/^\/|\/$/g, ''))
            readMore = procssedReadMore
        }

        acApi.recommendedByPost(postId)
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

                } else {
                    const allTopics = topics ? topics : []
                    Promise.all(allTopics.map(item => fetchPostsFromOneTopicSlug(item.to)))
                        .then(topicsPosts => {
                            const topicPosts: IPostItem[] = []
                            topicsPosts.forEach(postRes => {

                                if (postRes) {
                                    const getRandomFromTopic = getRandomArray(postRes, 2)
                                    topicPosts.push(...getRandomFromTopic)
                                }
                            })

                            return fetchLocalPostsFromSlugs(readMore).then(res => {
                                if (res) {
                                    let allPosts = [...res, ...topicPosts]
                                    setRandomPosts(allPosts)
                                } else {
                                    setRandomPosts(topicPosts)
                                }
                            })

                        })



                }


            })
            .catch(error => {
                console.log(error)
            })
    }, [postId, readMorePosts])
    return (
        <Row3ColAndXScroll title={`${ac_strings.youMightBeInterestedIn}`} posts={randomPosts} />
    )
}
export default RecommendedPostsSection