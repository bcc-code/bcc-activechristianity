import * as React from "react"
import PostRow3Col from '@/components/List/PostRow3Col'
import TopImgHorizontalScrollRow from '@/components/HorizontalScroll/TopImgRow'
import { PageSectionHeaderUpperCaseGray } from '@/components/Headers'

const flickityOptions = {
    initialIndex: 2,
    autoPlay: true,
    groupCells: true
}

import { IPostItem } from '@/types'

const Row3ColAndHorizontalScroll: React.FC<{ title: string, posts: IPostItem[], className?: string }> = ({ title, posts, className }) => {

    return (
        <div className={className}>
            <div className="pb-4">
                <PageSectionHeaderUpperCaseGray title={title} />
            </div>
            <div className="hidden sm:block">

                <PostRow3Col posts={posts.slice(0, 3)} />
            </div>
            <div className="sm:hidden -ml-4 -mr-4">

                <TopImgHorizontalScrollRow posts={posts} />
            </div>
        </div>
    )
}

export default Row3ColAndHorizontalScroll