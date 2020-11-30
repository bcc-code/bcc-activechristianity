import React from 'react'
import { FetchPostsFromSlugs, FetchOnePost } from '@/HOC/FetchPosts'
import api from '@/util/api'
import RightImg from '@/components/PostItemCards/RightImg'
import { getRandomArray } from '@/helpers'
import { ITopicPostItems, IPostItem, ITopic } from '@/types'
import topicFiter from '@/strings/topic-filters.json'
const { formatIds, typeIds } = topicFiter
import ac_strings from '@/strings/ac_strings.js'
import { OutlineButton } from '@/components/Button'
interface IFetchPost {
    topics?: ITopic[]
}

const RecommendedForYou: React.FC<IFetchPost> = () => {
    const [posts, setPosts] = React.useState<string[]>([])
    const [showingPosts, setShowingPosts] = React.useState<string[]>([])
    const [pageNumber, setPageNumber] = React.useState<number>(0)
    const postsPerPage = 12
    const [isFetchingMore, setIsFetchingMore] = React.useState(true)
    React.useEffect(() => {
        api.recommended().then(res => {

            const popularSlugs = res.popularTopics.filter(item => !formatIds[item.id] && !typeIds[item.id]).map(item => item.slug)
            const featuredSlugs = res.featuredTopics.filter(item => !formatIds[item.id] && !typeIds[item.id]).map(item => item.slug)
            const recommendSlugs = res.recommended
            const allTopics = [...new Set([...featuredSlugs, ...popularSlugs])]
            const randomTopics = getRandomArray(allTopics, 6)
            setIsFetchingMore(true)
            Promise.all(randomTopics.map(t => {

                const url = `${ac_strings.slug_topic}/${t}/1`
                return fetch(`/page-data/${url}/page-data.json`)
                    .then(res => res.json())
                    .then(res => {
                        if (res.result && res.result && res.result.pageContext.posts) {
                            const posts: string[] = res.result.pageContext.posts.filter(p => typeof p === "string")
                            return getRandomArray(posts, 4)

                        }
                        return undefined
                    }).catch(error => {
                        console.log(error)
                    })
            })).then(async (postArrays) => {
                let allPostSlugs: string[] = recommendSlugs ? recommendSlugs.map(p => p.slug).filter(p => typeof p === "string") : []
                postArrays.forEach((array => {
                    if (array) {

                        allPostSlugs.push(...array)
                    }
                }))
                const randomPostSlugs = getRandomArray(allPostSlugs, allPostSlugs.length)
                setIsFetchingMore(false)
                handlePageChange()
                setPosts(randomPostSlugs)
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
            const start = (pageNumber) * postsPerPage
            const end = (pageNumber + 1) * postsPerPage
            const postToAdd = posts.slice(start, end)
            setShowingPosts([...showingPosts, ...postToAdd])
            setPageNumber(pageNumber + 1)
            setTimeout(() => {
                window.scrollTo({
                    top: scrollTop
                })
            }, 200)
        }
    }


    return (

        <div className="px-4">
            {showingPosts.map(p => {

                return p ? (
                    <FetchOnePost
                        slug={p}
                        render={({ post }) => {
                            if (post) {
                                return <RightImg {...post} />
                            } else {
                                return <></>
                            }
                        }}
                    />
                ) : <div></div>
                /* return */
                // return
            })}
            <div className="flex justify-center py-4">
                <OutlineButton name={isFetchingMore ? ac_strings.loading : ac_strings.showMore} onClick={handlePageChange} />
            </div>
        </div>


    )
}

export default React.memo(RecommendedForYou)