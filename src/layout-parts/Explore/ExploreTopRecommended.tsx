import React from 'react'

import TopImgHorizontalScrollRow from '@/components/HorizontalScroll/TopImgRow'
import FetchRecommendFormat from '@/HOC/Recommendations/FetchRecommendFormat'
import PostRow3Col from '@/components/List/PostRow3Col'
interface IFetchPost {
    slugs: string[]
}

const RecommendedSectionOne: React.FC<IFetchPost> = ({ slugs }) => {

    return (
        <FetchRecommendFormat
            layout="row"
            slugs={slugs}
            render={({ posts }) => {

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