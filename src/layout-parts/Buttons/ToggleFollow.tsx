import * as React from 'react';
import FetchAndSetFollowed from '@/layout-parts/HOC/FetchAndSetFollowed'

import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'

interface IProps {
    id: string
    text?: string


}

const map = {
    "loading": {
        color: 'bg-slate-lighter text-d4slate-dark',
        text: ac_strings.loading
    },
    "true": {
        color: 'bg-slate-lighter text-d4slate-dark',
        text: ac_strings.following
    },
    "false": {
        color: 'bg-d4slate-dark text-white',
        text: ac_strings.follow
    },
}

const SlateDarkFollowButton: React.FC<IProps> = ({ id, text }) => {

    return (
        <FetchAndSetFollowed
            id={id}
            className="w-full"
            render={({ followed }) => {
                const config = map[followed]
                return (
                    <div className={`py-1 px-2 my-2 w-full text-center text-xs rounded-full font-semibold ${config.color}`}>
                        {text ? text : config.text}
                    </div>
                )
            }}
        />

    )
}

export default SlateDarkFollowButton