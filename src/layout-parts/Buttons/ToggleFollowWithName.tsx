import * as React from 'react';
import FetchAndSetFollowed from '@/layout-parts/HOC/FetchAndSetFollowed'
import Icon from "@/components/Icons/Icon"
import { ITopicNavItem } from '@/types'
import { toggleFollowStatusMap } from './ToggleFollowOutlineBtn'


const SlateDarkFollowButton: React.FC<ITopicNavItem> = ({ id, name, to }) => {

    return (
        <FetchAndSetFollowed
            id={id}
            className=""
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]
                return (
                    <div className={`flex py-1 px-3 pr-0 mb-2 mr-2 text-center text-xs rounded-full font-semibold items-center bg-gray-300`}>
                        <span className="">{name}</span>
                        <span className="px-2">
                            {config.icon}
                        </span>
                        <span className="pl-2 flex items-center">
                            {config.icon}
                        </span>
                    </div>
                )
            }}
        />

    )
}

export default SlateDarkFollowButton