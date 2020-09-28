import * as React from 'react';
import FetchAndSetFollowed from '@/layout-parts/HOC/FetchAndSetFollowed'
import Icon from "@/components/Icons/Icon"
import { ITopicNavItem } from '@/types'
import { OutlineSmallRounded } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.json'

export const toggleFollowStatusMap = {
    "loading": {
        color: 'bg-slate-lighter text-d4slate-dark',
        icon: <Icon name="Cached" size="3" />,
        text: ac_strings.loading
    },
    "true": {
        color: 'bg-slate-lighter text-d4slate-dark',
        icon: <Icon name="Check" size="3" />,
        text: ac_strings.following
    },
    "false": {
        color: 'bg-d4slate-dark text-white',
        icon: <Icon name="Add" size="3" />,
        text: ac_strings.follow
    },
}


const SlateDarkFollowButton: React.FC<{ id: string }> = ({ id }) => {



    return (
        <FetchAndSetFollowed
            id={id}
            className=""
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]
                return (
                    <OutlineSmallRounded>
                        <div className="flex">
                            <span className="">{config.text}</span>
                            <span className="pl-2 flex items-center">
                                {config.icon}
                            </span>
                        </div>
                    </OutlineSmallRounded>
                )
            }}
        />

    )
}

export default SlateDarkFollowButton