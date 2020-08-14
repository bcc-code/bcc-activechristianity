import * as React from "react"
import { IIconProps } from "@/types"

const Latest: React.SFC<IIconProps> = ({ customSize }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className="w-4 h-4 stroke-current"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <circle cx="8" cy="8" r="5.5" /><path d="M8 5V8H10" strokeLinecap="round" />
        </svg>
    )
}

export default Latest