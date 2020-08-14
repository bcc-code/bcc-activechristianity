import * as React from 'react'
import { IIconProps } from '@/types'

const ArrowDown: React.FC<IIconProps> = ({ customSize }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className="stroke-current"
            width={size}
            height={size}
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M13 1L7 7L1 1" strokeLinecap="round" />
        </svg>

    )
}

export default ArrowDown