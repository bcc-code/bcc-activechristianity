import React from "react"
import { IPostItem } from "@/types"
import { MoreLatestLink } from '@/layout-parts/PostSections'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'
import PostRow from '@/layout-parts/List/PostRow4Col'
interface ILatestDesktopRow {
    posts: IPostItem[]
    latestSlug: string
    video?: boolean

}
const LatestDesktopRow: React.FC<ILatestDesktopRow> = ({ posts, latestSlug, video }) => {
    return (
        <div className="bg-d4athens hidden sm:block">
            <div className="standard-max-w-px">
                <LatestSectionHeader latestSlug={latestSlug} />
                <PostRow posts={posts} />
                <MoreLatestLink latestSlug={latestSlug} />
            </div>
        </div>
    )
}

export default LatestDesktopRow