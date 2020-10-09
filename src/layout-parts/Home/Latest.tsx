import * as React from "react"
import { MoreLatestLink } from '@/layout-parts/PostSections'
import TopImgPost from '@/components/PostItemCards/TopImg'
import { IPostItem } from '@/types'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'
import './desktop-latest-grid.css'
const HomeLatest: React.FC<{ latestPosts: IPostItem[], latestSlug: string }> = ({ latestPosts, latestSlug }) => {
    return (
        <div className="hidden sm:block">
            <LatestSectionHeader latestSlug={latestSlug} />

            <div className="grid grid-cols-4 gap-4 md:gap-6 my-4 mx-4 grid-home-desktop-latest">
                {latestPosts.map((item, i) => {
                    return (
                        <div className={`div${i + 1}`} key={i}>
                            < TopImgPost {...item} showType fixedImageHeight />
                        </div>
                    )
                })}
            </div>
            {/* <div className="relative mx-4 sm:hidden">
                <LatestPostsStackedCard cards={latestPosts} />
            </div> */}
            <MoreLatestLink latestSlug={latestSlug} />
        </div>
    )
}

export default HomeLatest