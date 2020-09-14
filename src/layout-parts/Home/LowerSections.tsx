import * as React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import FetchPosts from '@/layout-parts/HOC/FetchPosts'
import FetchTopicPostItems from '@/layout-parts/HOC/FetchTopicWithPostItems'
import { IPostListSection } from '@/layout-parts/Home/PostListSection'
import { IPostItem, ITopicPostItems, INavItem, ITopic, ITopicPostSlugs } from '@/types'
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'
const NewForYou = loadable(() => import('@/layout-parts/Home/NewForYou'))
/* const NewForYouDesktop = loadable(() => import('@/layout-parts/Home/NewForYou/Vertical')) */
const PostListSection = loadable(() => import('@/layout-parts/Home/PostListSection'))
const TopicsForYouSection = loadable(() => import('@/layout-parts/Home/TopicsForYou'))
import { PostlistHorizontalSimple } from '@/layout-parts/HorizontalScroll'
const PopularPostVertical = loadable(() => import('@/layout-parts/PopularPosts'))

interface IHomeLowerSection {
    lists: ITopicPostSlugs[]
    newPostsForYou: ITopic[]
    topicsForYou: ITopic[]
    popularPosts: string[]
}
const HomeLowerSections: React.FC<IHomeLowerSection> = ({ lists, newPostsForYou, topicsForYou, popularPosts }) => {
    console.log('lower')
    return (
        <div className="grid-home-posts-layout sm:px-4">
            {lists.slice(0, 4).map((slot, i) => {

                return (
                    slot && (
                        <div className={`div${1 + i} mt-4 mx-4 sm:mr-10 sm:ml-0`}>
                            <LazyLoad key={i}>
                                <FetchPosts
                                    slugs={slot.posts.slice(0, 1)}
                                    layout="row"
                                    render={({ posts }) => {
                                        console.log(posts)
                                        return (
                                            <PostListSection
                                                posts={posts}
                                                header={slot.name}
                                                subHeader={ac_strings.popularTopic}
                                            />
                                        )
                                    }}

                                />
                            </LazyLoad>

                        </div>
                    )
                )
            })}


            <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden hidden sm:block">
                <LazyLoad>
                    {/*  <h6 className="text-d4slate-dark text-lg font-bold sm:hidden mx-4 mb-6">{ac_strings.popular}</h6> */}
                    {/*                    <PostlistHorizontalSimple

            posts={popularPosts}
        /> */}
                    <FetchPosts
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


            </div>
            {/*                       {newPostsForYou && newPostsForYou.length > 0 && <div className="div7 overflow-hidden">
            <LazyLoad>

                <div className="hidden sm:flex mt-8">
                    <PopularPostVertical title={ac_strings.newForYou} posts={newPostsForYou.map(item => item.posts[0])} small />
                </div>
            </LazyLoad>
        </div>} */}
            {/*             < TopicsForYouSection topics={topicsForYou} /> */}



        </div>

    )
}

export default React.memo(HomeLowerSections)