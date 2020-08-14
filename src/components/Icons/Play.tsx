
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
        <path d="M0 3.62474V30.3752C0 32.6302 2.39453 34.079 4.39202 33.0327L29.9266 19.6575C32.0706 18.5345 32.0706 15.4655 29.9266 14.3425L4.39202 0.967239C2.39452 -0.0790699 0 1.3698 0 3.62474Z" fill="white" fill-opacity="0.9" />

    </svg>
)

export default Play
