
import * as React from 'react';
import Link from '@/components/CustomLink'
import TextSizeTitle, { ITextSizeWClamp } from '@/components/PostElements/TextSizeWClamp'

import { AuthorLink, ReadingTimingIcon, BookmarksAndViews, ReadOrListenIcon } from '@/components/PostElements'
import { IPostItem } from '@/types'
export interface IPostBase {
    wrapperClass?: string
    postTitleProps?: ITextSizeWClamp
    postExcerptProps?: ITextSizeWClamp
    audioDuration?: boolean
    post: IPostItem

}

const PostBase: React.FC<IPostBase> = (props) => {

    const { wrapperClass, postExcerptProps, postTitleProps, post, audioDuration } = props
    const { slug, duration, id, authors, media, title, likes, views } = post

    let postReadingTime = duration?.read

    if (audioDuration && duration && duration?.listen) {
        postReadingTime = duration?.listen
    }

    return (
        <div className={`flex flex-col flex-1 ${wrapperClass}`}>
            <div className="flex flex-col flex-1 leading-normal">
                <Link to={`${slug}`} >
                    <TextSizeTitle {...postTitleProps} rawText={title} />
                    {postExcerptProps && <TextSizeTitle {...postExcerptProps} rawText={title} />}
                </Link>
                <div className="text-xs text-d4slate-dark sm:text-d4slate-light mb-4"> <AuthorLink authorGroups={authors} /></div>
            </div>


            <div className="pb-4 flex">
                <ReadOrListenIcon
                    track={media}
                    {...duration}
                />
                {/*  <ReadingTimingIcon
                    duration={duration?.listen || duration?.read}
                /> */}
                <BookmarksAndViews
                    id={id}
                    likes={likes}
                    views={views}
                />
            </div>
        </div>
    )
}

export default PostBase