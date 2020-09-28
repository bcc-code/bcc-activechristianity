import * as React from 'react';
import Link from '@/components/CustomLink'
import FetchAndSetFollowed from '@/layout-parts/HOC/FetchAndSetFollowed'
import Icon from "@/components/Icons/Icon"
import { ITopicNavItem } from '@/types'
import TS from '@/strings'
import { toggleFollowStatusMap } from './ToggleFollowOutlineBtn'

const TopicWithIcon: React.FC<ITopicNavItem> = ({ name, to }) => {

    return (
        <Link to={`${TS.slug_topic}/${to}`} className="border border-d4slate-light rounded-lg px-1 flex items-center mr-2 mb-2 py-1">
            <Icon
                size="2"
                color="slate-light"
                name="LocalOffer"
            />
            <span className="px-1 text-mini text-d4slate-light">{name}</span>

        </Link>
    )
}

export default TopicWithIcon