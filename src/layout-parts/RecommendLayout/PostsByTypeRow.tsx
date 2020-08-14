import React from "react"
import { IPostItem, INavItem } from "@/types"
import { UnderlineTitleLink } from '@/layout-parts'
import TopImgRowScroll from '@/layout-parts/Home/PopularOnAC'

export interface IOnePostByTypeRow {
    type: INavItem
    postsRow: IPostItem[]
}

const PostRowByType: React.FC<IOnePostByTypeRow> = ({ type, postsRow }) => {

    return (
        <div className="sm:hidden">
            <div className="px-4">
                <UnderlineTitleLink {...type} />
            </div>
            <TopImgRowScroll posts={postsRow} />
        </div>
    )
}

export default PostRowByType