import * as React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import FollowUs from '@/layout-parts/Home/FollowUs'
import { ITopic, ITopicPostSlugs } from '@/types'
import ac_strings from '@/strings/ac_strings.json'

const PostListSection = loadable(() => import('@/layout-parts/Home/PostListSection'))
const TopicsForYouSection = loadable(() => import('@/layout-parts/Home/TopicsForYou'))

const PopularPostVertical = loadable(() => import('@/layout-parts/PopularPosts'))

interface IHomeLowerSection {
    lists: ITopicPostSlugs[]
    newPostsForYou: ITopic[]
    topicsForYou: ITopic[]
    popularPosts: string[]
}
const HomeLowerSections: React.FC<IHomeLowerSection> = ({ lists, popularPosts }) => {
    return (
        <div className="grid grid-cols-4 gap-4 md:gap-6 sm:px-4">
            <div className="col-start-1 col-end-3 lg:col-end-4">
                {lists.slice(0, 4).map((slot, i) => {

                    return (
                        slot && (
                            <div key={i} className={`div${1 + i} mt-4 mx-4 sm:mr-10 sm:ml-0`}>
                                <LazyLoad>
                                    <PostListSection {...slot} />

                                </LazyLoad>

                            </div>
                        )
                    )
                })}

            </div>

            <div className="col-start-3 lg:col-start-4 col-end-5 bg-gray-200 sm:bg-transparent py-6 overflow-hidden hidden sm:block">
                <LazyLoad>
                    <FetchPostsFromSlugs
                        slugs={popularPosts}
                        layout="list"
                        render={({ posts }) => {
                            return (
                                <div className="hidden sm:flex">
                                    <PopularPostVertical title={ac_strings.popularOnAC} posts={posts} small />
                                </div>
                            )
                        }}

                    />


                </LazyLoad>
                <FollowUs />


            </div>
            < TopicsForYouSection />



        </div>

    )
}

export default React.memo(HomeLowerSections)