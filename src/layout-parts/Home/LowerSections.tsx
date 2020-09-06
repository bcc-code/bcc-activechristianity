import * as React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import { INewForYou } from '@/layout-parts/Home/NewForYou'
import { IPostListSection } from '@/layout-parts/Home/PostListSection'
import { IPostItem, ITopic, INavItem } from '@/types'
import ac_strings from '@/strings/ac_strings.json'
const NewForYou = loadable(() => import('@/layout-parts/Home/NewForYou'))
/* const NewForYouDesktop = loadable(() => import('@/layout-parts/Home/NewForYou/Vertical')) */
const PostListSection = loadable(() => import('@/layout-parts/Home/PostListSection'))
const TopicsForYouSection = loadable(() => import('@/layout-parts/Home/TopicsForYou'))
import { PostlistHorizontalSimple } from '@/layout-parts/PostsRow/HorizontalScroll'
const PopularPostVertical = loadable(() => import('@/layout-parts/PopularPosts'))

interface IHomeLowerSection {
    lists: (IPostListSection | undefined)[]
    newPostsForYou: INewForYou[]
    topicsForYou: INavItem[]
    popularPosts: IPostItem[]
}
const HomeLowerSections: React.FC<IHomeLowerSection> = ({ lists, newPostsForYou, topicsForYou, popularPosts }) => {

    return (
        <div className="grid-home-posts-layout sm:px-4">
            {lists.map((slot, i) => {
                return (
                    slot && (
                        <div className={`div${1 + i} mt-4 mx-4 sm:mr-10 sm:ml-0`}>
                            <LazyLoad key={i}>
                                <PostListSection {...slot} />
                            </LazyLoad>

                        </div>
                    )
                )
            })}


            <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
                <LazyLoad>
                    <h6 className="text-d4slate-dark text-lg font-bold sm:hidden mx-4 mb-6">{ac_strings.popular}</h6>
                    <PostlistHorizontalSimple

                        posts={popularPosts}
                    />
                    <div className="hidden sm:flex">
                        <PopularPostVertical title={ac_strings.popularOnAC} posts={popularPosts} small />
                    </div>
                </LazyLoad>


            </div>
            {newPostsForYou && newPostsForYou.length > 0 && <div className="div7 overflow-hidden">
                <LazyLoad>
                    {<div className="my-4 bg-gray-200 sm:hidden" >
                        <NewForYou topics={newPostsForYou} />
                    </div>}
                    <div className="hidden sm:flex mt-8">
                        <PopularPostVertical title={ac_strings.newForYou} posts={newPostsForYou.map(item => item.post)} small />
                    </div>
                </LazyLoad>
            </div>}
            < TopicsForYouSection topics={topicsForYou} />



        </div>
    )
}

export default HomeLowerSections