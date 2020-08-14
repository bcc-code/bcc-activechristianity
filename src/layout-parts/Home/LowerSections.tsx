import * as React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import { INewForYou } from '@/layout-parts/Home/NewForYou'
import { IPostListSection } from '@/layout-parts/Home/PostListSection'
import { ITaxonomy } from '@/types/wpPostType'
import { IPostItem } from '@/types'
import newString from '@/strings/NewStrings.json'
const NewForYou = loadable(() => import('@/layout-parts/Home/NewForYou'))
/* const NewForYouDesktop = loadable(() => import('@/layout-parts/Home/NewForYou/Vertical')) */
const PostListSection = loadable(() => import('@/layout-parts/Home/PostListSection'))
const TopicsForYouSection = loadable(() => import('@/layout-parts/Home/TopicsForYou'))
const PopularPost = loadable(() => import('@/layout-parts/Home/PopularOnAC'))
const PopularPostVertical = loadable(() => import('@/layout-parts/PopularPosts'))

interface IHomeLowerSection {
    lists: (IPostListSection | undefined)[]
    newPostsForYou: INewForYou[]
    topicsForYou: ITaxonomy[]
    popularPosts: IPostItem[]
}
const HomeLowerSections: React.FC<IHomeLowerSection> = ({ lists, newPostsForYou, topicsForYou, popularPosts }) => {
    const listSlotOne = lists[0]
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

            <div className="div6 overflow-hidden">
                <LazyLoad>
                    <div className="my-4 bg-gray-200 sm:hidden" >
                        <NewForYou topics={newPostsForYou} />
                    </div>
                    <div className="hidden sm:flex mt-8">
                        <PopularPostVertical title={newString.newForYou} posts={popularPosts} small />

                    </div>
                </LazyLoad>
            </div>
            <div className="div7 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
                <LazyLoad>
                    <h6 className="text-d4slate-dark text-lg font-bold sm:hidden mx-4 mb-6">{newString.popular}</h6>
                    <PopularPost
                        posts={popularPosts}
                    />
                    <div className="hidden sm:flex">
                        <PopularPostVertical title={newString.popularOnAC} posts={popularPosts} small />
                    </div>
                </LazyLoad>


            </div>
            < TopicsForYouSection topics={topicsForYou} />
            {/*           <div className="div8 bg-gray-200 sm:bg-transparent pt-6 overflow-hidden hidden sm:block">
                <div className="flex">
                    <PopularPostVertical posts={popularPosts} />
                </div>

            </div> */}
            <div className={`div10 sm:hidden mx-4 sm:mx-0 mt-4`}>
                <LazyLoad>
                    {listSlotOne && <PostListSection {...listSlotOne} />}
                    {listSlotOne && <PostListSection {...listSlotOne} />}
                    {listSlotOne && <PostListSection {...listSlotOne} />}
                </LazyLoad>
            </div>


            <div className={`div11 sm:hidden mx-4 sm:mx-0 mt-4`}>
                <LazyLoad>
                    {listSlotOne && <PostListSection {...listSlotOne} />}
                    {listSlotOne && <PostListSection {...listSlotOne} />}
                    {listSlotOne && <PostListSection {...listSlotOne} />}
                </LazyLoad>

            </div>


        </div>
    )
}

export default HomeLowerSections