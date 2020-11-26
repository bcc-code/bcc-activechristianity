import React from 'react'

import TopImgHorizontalScrollRow from '@/layout-parts/HorizontalScroll/TopImgRow'
import FetchRecommendFormat from '@/HOC/Recommendations/FetchRecommendFormat'
import PostRow3Col from '@/layout-parts/List/PostRow3Col'
import TopImgPost from '@/components/PostItemCards/TopImg'
import shortid from 'shortid'
interface IFetchPost {
    ids: number[]
}

const RecommendedSectionOne: React.FC<IFetchPost> = ({ ids }) => {

    return (
        <FetchRecommendFormat
            layout="row"
            ids={ids}
            render={({ posts }) => {
                console.log(posts)
                if (posts.length > 0) {
                    return (
                        <div className="px-4">
                            <div className="sm:hidden -ml-4 -mr-4 py-6">

                                <TopImgHorizontalScrollRow posts={posts.slice(0, 6)} />
                            </div>
                            <div className="hidden sm:block">
                                <PostRow3Col
                                    posts={posts.slice(0, 3)}
                                />

                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div></div>
                    )
                }
            }}
        />

    )



}

export default RecommendedSectionOne