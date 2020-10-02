import * as React from 'react';
import FetchAndSetFollowed, { IFollowStatus } from '@/layout-parts/HOC/FetchAndSetFollowed'
import Link from '@/components/CustomLink'
import { ITopicNavItem } from '@/types'
import { toggleFollowStatusMap } from './ToggleFollowOutlineBtn'


const SlateDarkFollowButton: React.FC<ITopicNavItem> = ({ id, name, to }) => {

    return (


        <div className={`flex py-1 px-3 pr-0 mb-2 mr-2 text-center text-xs rounded-full font-semibold items-center bg-gray-300`}>
            <Link to={to} className="">{name}</Link>
            <FetchAndSetFollowed
                id={id}
                className=""
                render={({ followed }) => {
                    const config = toggleFollowStatusMap[followed]
                    console.log(followed)
                    return (<span className="px-2">
                        {config.icon}
                    </span>)
                }}
            />
        </div>



    )
}

export default SlateDarkFollowButton