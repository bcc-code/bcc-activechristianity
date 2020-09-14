import * as React from 'react';

import { IIconProps } from '@/types'

const BibleSmall: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <path d="M2.5 12.5H12.5C13.0523 12.5 13.5 12.0523 13.5 11.5V2C13.5 1.44772 13.0523 1 12.5 1H3.5C2.94772 1 2.5 1.44772 2.5 2V12.5ZM2.5 12.5V14C2.5 14.5523 2.94772 15 3.5 15H12.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 10V6M8 4V6M8 6H6M8 6H10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default BibleSmall