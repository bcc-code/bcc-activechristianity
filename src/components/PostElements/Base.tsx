
import * as React from 'react';
import Link from '@/components/CustomLink'
import TextSizeTitle, { ITextSizeWClamp } from '@/components/PostElements/TextSizeWClamp'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import { AuthorLink, Views, ReadOrListenIcon } from '@/components/PostElements'
import { IPostItem } from '@/types'
export interface IPostBase {
    wrapperClass?: string
    postTitleProps?: ITextSizeWClamp
    postExcerptProps?: ITextSizeWClamp
    audioDuration?: boolean
    post: IPostItem
    noBorder?: boolean
    hideTime?: boolean

}

const PostBase: React.FC<IPostBase> = (props) => {

    const { wrapperClass, postExcerptProps, postTitleProps, post, audioDuration, hideTime } = props
    const { slug, duration, id, authors, media, title, likes, views, excerpt } = post

    let postReadingTime = duration?.read

    if (audioDuration && duration && duration?.listen) {
        postReadingTime = duration?.listen
    }

    return (
        <div className={`flex flex-col flex-1 ${wrapperClass}`}>
            <div className="flex flex-col flex-1 leading-normal">
                <Link to={`${slug}`} >
                    <TextSizeTitle {...postTitleProps} rawText={title} />
                    {postExcerptProps && <TextSizeTitle {...postExcerptProps} rawText={excerpt} />}
                </Link>
                <div className="text-xs text-d4slate-dark sm:text-d4slate-light mb-4"> <AuthorLink authorGroups={authors} /></div>
            </div>


            <div className={`pb-4 flex justify-between`}>
                {hideTime !== true && (
                    <ReadOrListenIcon
                        track={media}
                        {...duration}
                    />
                )}
                <div className="flex">
                    {views && <Views views={views} />}
                    <Bookmark id={id} color="slate-dark" size="5" />
                </div>

            </div>
        </div>
    )
}

export default PostBase