import React from "react"
import { IPostItem } from "@/types"
import VideoPost from '@/components/PostItem/TopImg'
import newStrings from '@/strings/NewStrings.json'
import MoreLatestButton from '@/components/Buttons/MoreLatest'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'
interface ILatestDesktopRow {
    posts: IPostItem[]
    latestSlug: string
}
const LatestDesktopRow: React.FC<ILatestDesktopRow> = ({ posts, latestSlug }) => {
    return (
        <div className="bg-d4athens hidden sm:block">
            <div className="standard-max-w-px">
                <LatestSectionHeader latestSlug={latestSlug} />
                <div className="scroll-4col-h pt-8 pb-16">
                    {posts.slice(0, 4).map((post, i) => {
                        return (
                            <div className={` min-w-3/12 pt-8 pb-16`} key={post.slug}>
                                <VideoPost {...post} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <MoreLatestButton latestSlug={latestSlug} />
        </div>
    )
}

export default LatestDesktopRow

