import * as React from "react"
import { useSelector } from 'react-redux'
import { LayoutH1, PageSectionHeader, SectionTitleDesktopAndMobile } from '@/components/Headers'
import { IPostItem, IPostRes, ITopic } from '@/types'
import { IRootState } from '@/state/types'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import { FetchTopics } from '@/HOC/FetchTopicFormatType'
import PostItem from '@/components/PostItemCards/RightImg'
import HSCardListVideo from '@/layout-parts/HorizontalScroll/HSCardListVideo'
import XScrollCustomSize from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard'
import QPopularAndFeaturedPosts from '@/HOC/QPopularAndFeaturedTopics'
import { SlateDarkUnfollowButton } from '@/components/PostElements/TopicToggleFollow'
import FeaturedTopics from '@/layout-parts/HorizontalScroll/FeaturedTopics.tsx'
import { getRandomArray, normalizePostRes, } from '@/helpers'
import ac_strings from '@/strings/ac_strings.js'
import acApi from '@/util/api'
import shortid from 'shortid'
const UserContent = () => {

    const { followedTopics, bookmarkedPosts, followedPlaylists } = useSelector((state: IRootState) => state.userLibrary);
    const [videoPosts, setVideoPosts] = React.useState<IPostItem[]>([])
    const [otherPosts, setOtherPosts] = React.useState<IPostItem[]>([])
    const [topics, setTopics] = React.useState<ITopic[]>([])
    React.useEffect(() => {
        console.log(followedTopics)
        const postsIds = bookmarkedPosts.map(p => p.id)
        const topicsIds = followedTopics.map(p => p.id) //
        console.log(topicsIds)
        acApi.getPostsAndTopicsByIds({ postsIds, topicsIds })
            .then(postResData => {
                console.log(postResData)
                const postRes = postResData.posts.data
                const topicRes = postResData.topics.data
                const video: IPostItem[] = []
                const other: IPostItem[] = []
                setTopics(topicRes)
                postRes.map((p: IPostRes) => {
                    const post = normalizePostRes(p)
                    if (post.media.video) {
                        video.push(post)
                    } else {
                        other.push(post)
                    }
                })
                setVideoPosts(video)
                setOtherPosts(other)
            })


    }, [bookmarkedPosts])
    console.log(videoPosts)
    console.log(otherPosts)
    return (
        <div className="flex flex-col ">

            <div className="py-6">
                {followedTopics.length > 0 ? (
                    <>
                        <SectionTitleDesktopAndMobile name={ac_strings.following} />

                        <div className="hidden sm:grid grid-cols-6 gap-4 px-4">
                            {topics.map(({ name, slug: to, id, image }) => {
                                return (
                                    <div className="flex flex-col items-center" key={shortid()} >
                                        <div style={{ width: "100px", height: "138px" }}>
                                            <ImgBgTopicCard name={name} to={`${ac_strings.slug_topic}/${to}`} image={image} />
                                        </div>
                                        <SlateDarkUnfollowButton
                                            id={id}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <XScrollCustomSize
                            childeClassName=""
                            items={topics.map(({ name, slug, id, image }) => {
                                return (
                                    <div className="flex flex-col items-center" key={shortid()}>
                                        <div style={{ width: "100px", height: "138px" }}>
                                            <ImgBgTopicCard
                                                name={name}
                                                image={image}
                                                to={`${ac_strings.slug_topic}/${slug}`}
                                                rounded="rounded-xxl"

                                            />

                                        </div>
                                        <SlateDarkUnfollowButton
                                            id={id}
                                        />

                                    </div>
                                )
                            })}
                        />
                    </>
                ) : (
                        <div>
                            <SectionTitleDesktopAndMobile name={ac_strings.no_followed_topics} />
                            <QPopularAndFeaturedPosts
                                render={({ topics }) => {
                                    const randomTopics = getRandomArray(topics, 6)
                                    return (
                                        <FeaturedTopics
                                            featured={randomTopics}
                                        />
                                    )
                                }}

                            />
                        </div>
                    )}
            </div>
            {/*             {followedPlaylists.length > 0 && (
                <div>{followedPlaylists.map(p => p.name)}</div>
            )} */}
            {bookmarkedPosts.length > 0 ? (
                <div>
                    {videoPosts.length > 0 && (
                        <div className="py-6">
                            <SectionTitleDesktopAndMobile name={ac_strings.bookmarked_video} />
                            <HSCardListVideo posts={videoPosts} />
                        </div>
                    )}
                    {otherPosts.length > 0 && (
                        <div className="py-6">

                            <SectionTitleDesktopAndMobile name={ac_strings.bookmarked_posts} />
                            <div className="px-4">
                                {otherPosts.map((item, i) => (
                                    <PostItem {...item} key={i} />
                                ))}
                            </div>
                        </div>
                    )}


                </div>
            ) : (
                    <div className="py-6">
                        <PageSectionHeader title={ac_strings.no_bookmark} />
                    </div>
                )}



        </div>
    )
}

export default UserContent