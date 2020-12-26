import * as React from "react"
import PostRow3Col from '@/layout-parts/List/PostRow3Col'
import TopImgHorizontalScrollRow from '@/layout-parts/HorizontalScroll/TopImgRow'
import { PageSectionHeaderUpperCaseGray } from '@/components/Headers'
import Flickity from 'react-flickity-component'
import TopImgPost from '@/components/PostItemCards/TopImg'
import shortid from 'shortid'
const flickityOptions = {
    initialIndex: 2,
    autoPlay: true,
    groupCells: true
}

import { IPostItem } from '@/types'

const Row2ColAndHorizontalScroll: React.FC<{ title: string, posts: IPostItem[] }> = ({ title, posts }) => {

    return (
        <div className="">
            <div className="pb-4">
                <PageSectionHeaderUpperCaseGray title={title} />
            </div>
            <div className="hidden sm:block">

                <PostRow3Col posts={posts.slice(0, 3)} />
            </div>
            <div className="sm:hidden -ml-4 -mr-4 pt-6">

                <TopImgHorizontalScrollRow posts={posts} />
            </div>
        </div>
    )
}

export default Row2ColAndHorizontalScroll