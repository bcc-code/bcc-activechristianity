import * as React from 'react'
import loadable from '@loadable/component'
import Link from '@/components/CustomLink'
import { INavItem, IPostAuthors, ITopicNavItem, IPostItem } from '@/types'
import { PageSectionHeaderUpperCaseGray, PostH1 } from '@/components/Headers'
import { BookmarksAndViews } from '@/components/PostElements'
import Icon from '@/components/Icons/Icon'
const Row2ColAndXScroll = loadable(() => import('@/layout-parts/List/Combo/Row2Col-HorizontalScroll'))
import ShareButton from '@/components/PostElements/SharePopover'
import ToogleBookmark from '@/components/PostElements/ToggleBookmark'
import ac_strings from '@/strings/ac_strings.js'
import TS from '@/strings'
import { FetchPostsFromArchivePage, FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import TopImgHorizontalScrollRow from '@/layout-parts/HorizontalScroll/TopImgRow'
import { getRandomArray } from "@/helpers"
import TopImgPost from '@/components/PostItemCards/TopImg'
import acApi from '@/util/api'
import shortid from 'shortid'

interface IInterestedPosts {
    postId: string
    readMorePosts: string[]
    authors:
}
export const Interest: React.FC<IInterestedPosts> = ({ postId }) => {
    const [recommendedPosts, setRecommendedPosts] = React.useState<IPostItem[]>([])
    const [readMorePosts, setReadMorePosts] = React.useState<IPostItem[]>([])
    const [setTopicPosts, setAuthorPosts] = React.useState<IPostItem[]>([])
    const [animationPost, setAnimationPost] = React.useState<IPostItem[]>([])
    const [podcastPost, setPodcastPost] = React.useState<IPostItem[]>([])

    React.useEffect(() => {
        acApi.recommendedByPost(postId)
            .then(res => {

                /* setPosts(allSlugs) */
                let readMore: string[] = []
                if (readMorePosts.length > 0) {
                    const procssedReadMore = readMorePosts.filter(item => typeof item === "string").map(item => item.replace(/^\/|\/$/g, ''))
                    readMore = procssedReadMore
                }

                let randomRecommendPosts: string[] = []
                if (res.recommendedByPost) {
                    const postStrinsg = res.recommendedByPost.map((p: any) => p.slug)
                }
                let allPosts = [...randomRecommendPosts, ...readMore]


            })
            .catch(error => {
                console.log(error)
            })
    }, [postId, readMorePosts])

    return (
        <div>

        </div>
    )
}
export const RecommendedPostsSection: React.FC<{ postId: string, readMorePosts: string[], topics?: ITopicNavItem[] }> = ({ postId, readMorePosts, topics }) => {
    const [randomPosts, setRandomPosts] = React.useState<string[]>([])

    React.useEffect(() => {
        acApi.recommendedByPost(postId)
            .then(res => {

                /* setPosts(allSlugs) */
                let readMore: string[] = []
                if (readMorePosts.length > 0) {
                    const procssedReadMore = readMorePosts.filter(item => typeof item === "string").map(item => item.replace(/^\/|\/$/g, ''))
                    readMore = procssedReadMore
                }

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
                }
                let allPosts = [...randomRecommendPosts, ...readMore]
                readMore = [...new Set(allPosts)]
                setRandomPosts(readMore)
            })
            .catch(error => {
                console.log(error)
            })
    }, [postId, readMorePosts])
    return (
        <FetchPostsFromSlugs

            slugs={randomPosts}
            layout="row"
            render={({ posts }) => {
                return (
                    <>
                        <PageSectionHeaderUpperCaseGray title={ac_strings.youMightBeInterestedIn} />
                        <div className="hidden sm:block">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 grid-h py-6">
                                {posts.slice(0, 3).map((post, i) => {
                                    return (
                                        <div className={`div${i + 1}`} key={post.slug}>
                                            < TopImgPost {...post} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="sm:hidden -ml-4 -mr-4 py-6">
                            <TopImgHorizontalScrollRow posts={posts} />
                        </div>
                    </>
                )
            }}
        />
    )
}

const PostsFromAurthors: React.FC<{ authors: IPostAuthors[], postId: string }> = ({ authors, postId }) => {
    return <>
        {authors?.map(item => {
            return (

                <div className="pt-6">
                    {item.authors.map(a => (
                        <FetchPostsFromArchivePage
                            slug={`${TS.slug_ac_author}/${a.to}`}
                            layout="list"
                            render={({ posts }) => {
                                const filteredPosts = posts.filter(p => `${p.id}` !== `${postId}`).slice(0, 6)
                                return filteredPosts.length > 0 ? (
                                    <Row2ColAndXScroll
                                        title={`${ac_strings.more_from} ${a.name}`}
                                        posts={filteredPosts}
                                    />
                                ) : <div></div>
                            }}

                        />

                    ))}
                </div>

            )
        })}</>
}