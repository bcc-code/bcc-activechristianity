import * as React from 'react';
import { IIconProps } from '@/types'

const ArrowLeftIcon: React.FC<IIconProps> = ({ className }) => {
    const customClassName = className ? className : 'w-4 h-4';

    return (
        <svg
            className={`${customClassName} stroke-current`}
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9 1L1 9L9 17" strokeLinecap="round" />
        </svg>

    )
}
export default ArrowLeftIcon
