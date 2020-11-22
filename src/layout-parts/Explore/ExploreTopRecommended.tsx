import React from 'react'

import TopImgHorizontalScrollRow from '@/layout-parts/HorizontalScroll/TopImgRow'
import FetchRecommendFormat from '@/HOC/Recommendations/FetchRecommendFormat'
import Flickity from "react-flickity-component";
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
                                <Flickity
                                    options={{
                                        autoPlay: true,
                                        groupCells: 3,
                                        wrapAround: true,
                                        prevNextButtons: false,
                                        pageDots: false,
                                    }}
                                >
                                    {posts.map((post, i) => {
                                        return (
                                            <div className="w-1/3 min-w-1/3 px-1 h-full" key={i}>
                                                < TopImgPost showType {...post} key={post.slug} noExcerpt />
                                            </div>
                                        )
                                    })}
                                </Flickity>
                            </div>
                            <div>

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