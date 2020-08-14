import * as React from 'react';
import { IIconProps } from '@/types'

const ArrowLeftIcon: React.FC<IIconProps> = ({ className, customSize }) => {
    const customClassName = className ? className : 'w-4 h-4';
    return (
        <svg
            className={`${customClassName} stroke-current`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 14"
        >
            <path d="M1 1L7 7L1 13" strokeLinecap="round" />
        </svg>

    )
}
export default ArrowLeftIcon