
import * as React from "react"
import { IIconProps } from '@/types'

const Play: React.FC<IIconProps> = ({ customSize }) => (
    <svg
        role="button"
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        className="fill-current"
    >
        <polygon
            key="play"
            /*         fill="gray" */
            points="14,11 26,18 14,25"
            style={{ transformOrigin: '100% 50%' }}
        />
    </svg>
)

export default Play