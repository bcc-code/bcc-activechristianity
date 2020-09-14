import * as React from 'react';
import Link from '@/components/CustomLink'

import { PostExcerpt } from '@/components/PostItem/PostItemParts'
import { useDispatch } from 'react-redux'
import { setNewFollowTopic, setNewFollowTag } from '@/state/action/userAction'

import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'

interface IProps {
    id: string
    followed: boolean
    className?: string

}

const FollowButtonWrapper: React.FC<IProps> = ({ followed, id, children, className }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setNewFollowTopic({ id, followed: followed === true }))
    }
    return (
        <div onClick={handleClick} className={`${className ? className : ''}`}>
            {children}
        </div>
    )
}

export default FollowButtonWrapper

export const SlateDarkFollowButton: React.FC<IProps> = (props) => {
    const { followed } = props
    return (
        <FollowButtonWrapper {...props} >
            <div className={`py-1 px-2 my-2 w-full text-center text-xs rounded-full font-semibold ${followed ? 'bg-slate-lighter text-d4slate-dark' : 'bg-d4slate-dark text-white'}`}>
                {followed ? ac_strings.following : ac_strings.follow}
            </div>
        </FollowButtonWrapper>
    )
}