import * as React from 'react';
import { IIconProps } from "@/types"
const CloseIcon: React.FC<IIconProps> = ({ className, customSize }) => (
    <svg
        className={`${className ? className : ''} stroke-current`}
        width={customSize}
        height={customSize}
        viewBox="0 0 12 12"
        fill="none" xmlns="http://www.w3.org/2000/svg">

        <path d="M1 1L6 6M11 11L6 6M6 6L11 1M6 6L1 11" strokeLinecap="round"></path>
    </svg>
)

export default CloseIcon