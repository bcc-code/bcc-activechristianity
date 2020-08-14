import * as React from 'react'
import { IIconProps } from '@/types'

const Filter: React.FC<IIconProps> = ({ customSize }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7H19" stroke="#384156" strokeLinecap="round" />
            <path d="M5 12H19" stroke="#384156" strokeLinecap="round" />
            <path d="M5 17H19" stroke="#384156" strokeLinecap="round" />
            <rect x="11" y="15" width="4" height="4" rx="1" fill="#384156" />
            <rect x="7" y="10" width="4" height="4" rx="1" fill="#384156" />
            <rect x="13" y="5" width="4" height="4" rx="1" fill="#384156" />
        </svg>

    )
}

export default Filter