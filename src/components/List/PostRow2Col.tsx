import React from 'react'
import TopImgPost from '@/components/PostItemCards/TopImg'
import { IPostItem, } from '@/types'
import MotionStagger from '@/components/Motion/StaggerChildren'
const PostRow: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 grid-h py-6">
            {posts.slice(0, 4).map((post, i) => {
                return (
                    <div className={`div${i + 1}`} key={post.slug}>
                        < TopImgPost {...post} />
                    </div>
                )
            })}
        </MotionStagger>
    )
}

export default PostRow