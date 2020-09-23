import * as React from "react"
import MoreLatestButton from '@/layout-parts/Buttons/MoreLatest'
import TopImgPost from '@/components/PostItem/TopImg'
import { IPostItem } from '@/types'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'
import LatestPostsStackedCard from '@/components/StackCards'


const HomeLatest: React.FC<{ latestPosts: IPostItem[], latestSlug: string }> = ({ latestPosts, latestSlug }) => {
    return (
        <div>
            <LatestSectionHeader latestSlug={latestSlug} />

            <div className="grid-home-latest-scroll-4col my-4 mx-4 hidden sm:grid">
                {latestPosts.map((item, i) => {
                    return (
                        <div className={`div${i + 1}`}>
                            < TopImgPost {...item} showType />
                        </div>
                    )
                })}
            </div>
            <div className="relative mx-4 sm:hidden">
                <LatestPostsStackedCard cards={latestPosts} />
            </div>
            <MoreLatestButton latestSlug={latestSlug} />
        </div>
    )
}

export default HomeLatest