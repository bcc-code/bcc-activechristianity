import React from 'react';

import { INavItem, IPostAuthors } from '@/types'
import PostMetaLinks from './PostMetaLinks'
import TS from '@/strings'

interface IPostMetaProps {
    categories?: INavItem[]
    authors: IPostAuthors[]
    showCategory?: boolean
}
const PostMeta: React.FC<IPostMetaProps> = ({ categories, authors, showCategory }) => {

    return (
        <div className="font-roboto ">

            {authors && authors.length > 0 && authors.map((a, i) => (
                <div className="flex" key={i}>
                    <span className=" text-gray-500">{a.as}</span>  <PostMetaLinks prefix={TS.slug_ac_author} links={a.authors} />
                </div>
            ))

            }
            {showCategory !== false && categories && categories.length > 0 ?
                <div>
                    <PostMetaLinks prefix={TS.slug_category} links={categories} />
                </div> : null
            }
        </div>
    )
}

export default PostMeta;

