import React from 'react'
import { fetchLocalPostsFromSlugs, fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'

import RightImg from '@/components/PostItemCards/RightImg'
import { getRandomArray } from '@/helpers'
import { ITopic, IPostItem } from '@/types'
import ac_strings from '@/strings/ac_strings.js'
import { OutlineButton } from '@/components/Button'
const acApiModule = import('@/util/api')
interface IFetchPost {
    topics: ITopic[]
}

const RecommendedForYou: React.FC<IFetchPost> = ({ topics }) => {
    const [posts, setPosts] = React.useState<IPostItem[]>([])
    const [pageNumber, setPageNumber] = React.useState<number>(1)
    const postsPerPage = 12
    const [isFetchingMore, setIsFetchingMore] = React.useState(true)
    React.useEffect(() => {

        setIsFetchingMore(true)

        const foundPosts: IPostItem[] = []
        acApiModule.then(api => {
            api.default.recommended().then(async (res) => {

                // get recommended posts
                const recommendSlugs: string[] = res.recommended
                if (recommendSlugs) {
                    const recommendPostsRes = await fetchLocalPostsFromSlugs(recommendSlugs)
                    if (recommendPostsRes) {
                        foundPosts.push(...recommendPostsRes)
                    }
                }

                // get posts from recommended and popular topics
                const randomTopics = getRandomArray(topics, 6).map(t => t.slug)
                Promise.all(randomTopics.map(t => {

                    const url = `${ac_strings.slug_topic}/${t}`
                    return fetchPostslistFromArchivePage(url)
                })).then(async (postArrays) => {

                    const postsFromTopics: IPostItem[] = []
                    if (postArrays) {
                        postArrays.forEach((array => {
                            if (array) {
                                const randomPosts = getRandomArray(array, 6)
                                postsFromTopics.push(...randomPosts)
                            }
                        }))
                    }
                    const mixedTopicPosts = getRandomArray(postsFromTopics, postsFromTopics.length)
                    foundPosts.push(...mixedTopicPosts)
                    setIsFetchingMore(false)
                    setPosts(foundPosts)
                })
            })
        })

    }, [])

    const lastPage = Math.ceil(posts.length / postsPerPage)
    const handlePageChange = () => {
        let scrollTop = 0
        if (typeof window !== 'undefined') {
            scrollTop = window.pageYOffset
        }

        if (pageNumber < lastPage) {

            setPageNumber(pageNumber + 1)
            setTimeout(() => {
                window.scrollTo({
                    top: scrollTop
                })
            }, 200)
        }
    }

    const end = pageNumber * postsPerPage

    return (

        <div className="px-4">
            {posts.slice(0, end).map(p => {

                return p ? (
                    <RightImg {...p} />
                ) : <div></div>
            })}
            {(posts.length > postsPerPage) && (pageNumber < lastPage) && <div className="flex justify-center py-4">
                <OutlineButton name={isFetchingMore ? ac_strings.loading : ac_strings.show_more} onClick={handlePageChange} />
            </div>}
        </div>


    )
}

export default RecommendedForYou