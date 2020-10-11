import * as React from "react"
import { useSelector } from 'react-redux'
import { LayoutH1, PageSectionHeader } from '@/components/Headers'
import { IPostItem, ITopicNavItem } from '@/types'
import { IRootState } from '@/state/types'
import FetchPosts from '@/HOC/FetchPosts'
import FetchTopics from '@/HOC/FetchFullTopicWithPostSlugs'
import PostItem from '@/components/PostItemCards/RightImg'
import HSCardListVideo from '@/layout-parts/HorizontalScroll/HSCardListVideo'
import XScrollCustomSize from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard'
import TS from '@/strings'
const UserHistory = () => {

    const [likedPosts, setLikePosts] = React.useState<IPostItem[]>([])
    const { followedTopics, bookmarkedPosts, unfinishedPosts, historyPosts } = useSelector((state: IRootState) => state.userLibrary);


    return (
        <div className="flex flex-col ">


            <FetchTopics
                topics={followedTopics.map(p => p.slug)}
                layout="row"
                render={({ topicPostItems }) => {
                    return (
                        <div className="py-6">
                            <PageSectionHeader title={"Following Topics"} className="pb-4" />
                            <div className="hidden sm:grid grid-cols-6 gap-4 px-4">
                                {topicPostItems.map(({ name, slug: to }) => {
                                    return (
                                        <ImgBgTopicCard name={name} to={`${TS.slug_topic}/${to}`} />
                                    )
                                })}
                            </div>
                            <XScrollCustomSize
                                childeClassName=""
                                items={topicPostItems.map(({ name, slug: to }) => {
                                    return (
                                        <div className="flex flex-col items-center">
                                            <div className="min-h-24 h-24 w-18" >
                                                <ImgBgTopicCard name={name} to={`${TS.slug_topic}/${to}`} />
                                            </div>
                                        </div>
                                    )
                                })}
                            />
                        </div>
                    )
                }}
            />
            <FetchPosts
                slugs={bookmarkedPosts.slice(0, 6).map(p => p.slug)}
                layout="list"
                render={({ posts }) => {
                    const video: IPostItem[] = []
                    const other: IPostItem[] = []
                    posts.map(p => {
                        if (p.media.video) {
                            video.push(p)
                        } else {
                            other.push(p)
                        }
                    })
                    return (
                        <div>
                            <div className="py-6">
                                <PageSectionHeader title={"Saved Videos"} className="pb-4" />
                                <HSCardListVideo posts={video} />
                            </div>
                            <div className="py-6">

                                <PageSectionHeader title={"Bookmarked"} className="" />
                                <div className="px-4">
                                    {other.map((item, i) => (
                                        <PostItem {...item} key={i} />
                                    ))}
                                </div>       </div>


                        </div>
                    )
                }}

            />



        </div>
    )
}

export default UserHistory