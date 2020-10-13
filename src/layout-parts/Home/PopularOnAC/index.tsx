import * as React from 'react';
import TopImgPost from '@/components/PostItemCards/TopImg'
import { IPostItem } from '@/types'

import './popular-on-ac.css';

interface IPostlistXScroll {
    posts: IPostItem[]
}
const PostlistHorizontalCards: React.FC<IPostlistXScroll> = ({ posts }) => {
    return (
        <div className="scroll-snap-x-container h-full">
            {posts.map(item => (
                <div key={item.slug} className="scroll-snap-x-child w-10/12 min-w-10/12 ml-4 h-full">
                    <TopImgPost  {...item} />
                </div>
            ))}
        </div>
    )
}

export default PostlistHorizontalCards