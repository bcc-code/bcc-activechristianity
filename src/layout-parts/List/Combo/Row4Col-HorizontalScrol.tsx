import * as React from "react"
import PostRow2Col from '@/layout-parts/List/PostRow2Col'
import TopImgHorizontalScrollRow from '@/layout-parts/HorizontalScroll/TopImgRow'
import { PageSectionHeaderUpperCaseGray } from '@/components/Headers'

import { IPostItem } from '@/types'

const Row2ColAndHorizontalScroll: React.FC<{ title: string, posts: IPostItem[] }> = ({ title, posts }) => {
    return (
        <div className="py-6">
            <PageSectionHeaderUpperCaseGray title={title} />
            <div className="hidden sm:block">
                <PostRow2Col posts={posts} />
            </div>
            <div className="sm:hidden -ml-4 -mr-4 py-6">
                <TopImgHorizontalScrollRow posts={posts} />
            </div>
        </div>
    )
}

export default Row2ColAndHorizontalScroll