import React from 'react'
import TopImgPost from '@/components/PostItemCards/TopImg'
import { IPostItem, } from '@/types'
import MotionStagger from '@/components/Motion/StaggerChildren'
const PostRow: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <MotionStagger
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 grid-h py-8"
        >
            {posts.map((post, i) => {
                return (
                    < TopImgPost showType {...post} key={post.slug} />
                )
            })}
        </MotionStagger>
    )
}

export default PostRow