import * as React from 'react';
import { IIconProps } from '@/types'

const SearchIcon: React.SFC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    let customeClassName = className ? className : `w-6 h-6`
    return (
        <svg
            className={`stroke-current ${customeClassName}`}
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <g>
                <circle cx="7.5" cy="6.75" r="5.75" strokeWidth="2" />
                <path d="M11.25 12L16.5 17.25" strokeWidth="2" strokeLinecap="round" />
            </g>
        </svg>
    )
}

export default SearchIcon