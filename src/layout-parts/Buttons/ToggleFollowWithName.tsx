import * as React from 'react';
import FetchAndSetFollowed from '@/layout-parts/HOC/FetchAndSetFollowed'
import Icon from "@/components/Icons/Icon"
import { ITopicNavItem } from '@/types'



const SlateDarkFollowButton: React.FC<ITopicNavItem> = ({ id, name, to }) => {

    return (
        <FetchAndSetFollowed
            id={id}
            className=""
            render={({ followed }) => {
                return (
                    <div className={`flex py-1 px-3 pr-0 mb-2 mr-2 text-center text-xs rounded-full font-semibold items-center bg-gray-300`}>
                        <span className="">{name}</span>
                        <span className="px-2">
                            {followed === "loading" && <Icon name="Cached" size="3" />}
                            {followed === "true" && <Icon name="Check" size="3" />}
                            {followed === "false" && <Icon name="Add" size="3" />}
                        </span>
                    </div>
                )
            }}
        />

    )
}

export default SlateDarkFollowButton