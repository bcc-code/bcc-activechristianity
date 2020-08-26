import * as React from 'react';
import Link from '@/components/CustomLink'

import { PostExcerpt } from '@/components/PostItem/PostItemParts'
import { useDispatch } from 'react-redux'
import { setNewFollowTopic, setNewFollowTag } from '@/state/action/userAction'

import TS from '@/strings'
import newString from '@/strings/ac_strings.json'

interface IProps {
    wrapperClassName?: string
    topicClassName?: string
    buttonClassName?: string
    id: string
    name: string
    slug: string
    type: 'topic' | 'tag'
    followed?: boolean
    size?: number | string
    className?: string
}

const FollowButton: React.SFC<IProps> = ({ followed, topicClassName, buttonClassName, id, slug, name, type }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(
            type === 'topic' ?
                setNewFollowTopic({ id, followed: followed === true }) :
                setNewFollowTag({ id, followed: followed === true })
        )

    }
    return (
        <div className="flex flex-col mr-1">
            <div className="text-sm text-d4gray-dark">{newString.topic}</div>
            <Link className={topicClassName ? topicClassName : "uppercase"} to={`/${TS.slug_post_tag}/${slug}`}>
                <PostExcerpt
                    rawText={name}
                    clamp={1}
                    fontKey='top-img break-normal'
                />
            </Link>
            <div>
                <button
                    className={buttonClassName ? buttonClassName : "m-2 px-1 rounded-sm font-semibold text-d4gray-dark text-mini border border-d4gray"}
                    onClick={handleClick}
                >
                    {followed === true ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    )
}

export default FollowButton