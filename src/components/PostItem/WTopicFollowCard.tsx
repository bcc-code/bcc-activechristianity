import * as React from 'react';
import { ITopic, IPostItem, ITopicNavItem } from '@/types'
import ToggleFollow from '@/components/Buttons/ToggleFollow'
import Two2OneImage from '../Images/Image2To1'
import TopicIcon from '@/components/Icons/Topics'
import { PostTitle, ReadMore } from '@/components/PostItem/PostItemParts'
import Link from '@/components/CustomLink'

export interface IPostsByTypes {
    topic?: ITopicNavItem | undefined
    post: IPostItem
}
const WTopicFollowCard: React.FC<IPostsByTypes> = ({ topic, post }) => {
    const { title, image, excerpt, id, slug, bookmarked } = post
    return (
        <div className="flex flex-col border rounded-xxl sm:rounded-xl p-4">
            {topic && (
                <div className="flex border-b pb-4">
                    <div className="bg-gray-100 w-10 h-10 p-1 text-d4slate-dark flex items-center justify-adjustify rounded-full mr-4"><TopicIcon /></div>
                    <ToggleFollow
                        wrapperClassName="ml-2 flex-1 flex justify-between items-center w-11/12"
                        topicClassName={"text-sm font-semibold leading-5 mb-2"}
                        buttonClassName="text-xs rounded-md bg-blue-100 text-d4secondary font-semibold p-1"
                        {...topic}
                    />
                </div>
            )}

            <Link className="flex flex-col leading-normal" to={slug}>
                <PostTitle
                    rawText={title}
                    fontKey="simple-lg"
                    clamp={2}
                    bold="font-semibold"
                    className="block mb-4"
                />

                <Two2OneImage image={image} alt={title} />
                <div className="truncate mt-4 font-medium text-gray-600 my-4" dangerouslySetInnerHTML={{ __html: excerpt }} />
                <ReadMore bookmarked={bookmarked} id={id} slug={slug} />
            </Link>
        </div>
    )
}

export default WTopicFollowCard