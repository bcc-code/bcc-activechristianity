import React from 'react'
import { FetchOnePost } from '@/HOC/FetchPosts'
import SquareImage from './Image1to1Rounded'

const FetchPostImage: React.FC<{ slug: string }> = ({ slug }) => {
    return (
        <FetchOnePost
            slug={slug}
            render={({ post }) => {
                return post ? (
                    <SquareImage
                        rounded
                        {...post?.image}
                    />
                ) : (
                        <div></div>
                    )
            }}


        />
    )
}

export default FetchPostImage