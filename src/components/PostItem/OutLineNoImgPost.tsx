import * as React from 'react';
import { IPostItem } from '@/types'
import { PostBase, IPostBase } from '@/components/PostItem/PostItemParts'

const OutlineNoImagePost: React.FC<IPostItem> = (post) => {
    const props: IPostBase = {
        post,
        wrapperClass: "block px-4 py-4 border border-gray-300 rounded-xxl sm:rounded-xl sm:max-w-sm",
        postTitleProps: {
            rawText: post.title,
            fontKey: "simple-lg",
            clamp: 2,
            bold: "font-semibold",
            className: "block mb-4"
        },
        postExcerptProps: {
            rawText: post.excerpt,
            fontKey: "top-img",
            clamp: 4,
            className: "text-gray-600 pb-4 h-24 leading-tight"
        },
        hasReadMore: true

    }
    return (
        <PostBase {...props} />
    )
}

export default OutlineNoImagePost