import * as React from "react"
import MoreLatestButton from '@/layout-parts/Buttons/MoreLatest'
import TopImgPost from '@/components/PostItem/TopImg'
import { IPostItem } from '@/types'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'

const HomeLatest: React.FC<{ latestPosts: IPostItem[], latestSlug: string }> = ({ latestPosts, latestSlug }) => {
    return (
        <div className="hidden sm:block">
            <LatestSectionHeader latestSlug={latestSlug} />

            <div className="grid-home-latest-scroll-4col my-4 mx-4 grid">
                {latestPosts.map((item, i) => {
                    return (
                        <div className={`div${i + 1}`} key={i}>
                            < TopImgPost {...item} showType />
                        </div>
                    )
                })}
            </div>
            {/* <div className="relative mx-4 sm:hidden">
                <LatestPostsStackedCard cards={latestPosts} />
            </div> */}
            <MoreLatestButton latestSlug={latestSlug} />
        </div>
    )
}

export default HomeLatest