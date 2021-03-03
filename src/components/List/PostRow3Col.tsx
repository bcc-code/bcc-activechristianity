import React from 'react'
import TopImgPost from '@/components/PostItemCards/TopImg'
import { IPostItem, } from '@/types'

const PostRow: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 grid-h pb-8">
            {posts.map((post, i) => {
                return post ? (
                    < TopImgPost showType {...post} key={post.slug} noExcerpt />
                ) : null
            })}
        </div>
    )
}

export default PostRow