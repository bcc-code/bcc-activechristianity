import * as React from 'react';
import FetchAndSetFollowed from '@/layout-parts/HOC/FetchAndSetFollowed'
import { toggleFollowStatusMap } from './ToggleFollowOutlineBtn'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'

interface IProps {
    id: string
    text?: string


}

const SlateDarkFollowButton: React.FC<IProps> = ({ id, text }) => {

    return (
        <FetchAndSetFollowed
            id={id}
            className="w-full"
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]
                console.log(config)
                return (
                    <div className={`flex justify-center py-1 px-2 my-2 w-full text-center text-xs rounded-full font-semibold ${config.color}`}>
                        <span>{text ? text : config.text}</span>
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