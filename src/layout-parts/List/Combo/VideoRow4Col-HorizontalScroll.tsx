import * as React from "react"
import PostRow2Col from '@/layout-parts/List/PostRow2Col'
import TopImgHorizontalScrollRow from '@/layout-parts/HorizontalScroll/TopImgRow'
import { UnderlineLinkViewAll } from '@/components/Button'
import { PageSectionHeader, UnderlineTitleLink } from '@/components/Headers'
import HSCardListVideo from '@/layout-parts/HorizontalScroll/HSCardListVideo'
import { IPostItem, ITopic } from '@/types'
import VideoTopImg from '@/components/PostItemCards/VideoTopImg'
const Row2ColAndHorizontalScroll: React.FC<{ name: string, slug?: string, posts: IPostItem[] }> = (item) => {
    return (
        <div>
            <div className="hidden sm:block px-4">
                <UnderlineTitleLink name={item.name} to={item.slug} />
            </div>
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
                {item.posts.slice(0, 4).map((post, i) => {
                    return (
                        <div className={`div${i + 1}`} key={post.slug}>
                            < VideoTopImg {...post} />
                        </div>
                    )
                })}
            </div>


            <div className="block sm:hidden">
                <div className="w-full flex justify-between pt-6 pr-4">
                    <PageSectionHeader title={item.name} className="pb-4" />
                    {item.slug && <UnderlineLinkViewAll to={`${item.slug}`} />}
                </div>
            </div>
            <HSCardListVideo posts={item.posts} />
        </div>
    )
}

export default Row2ColAndHorizontalScroll




