import * as React from "react"
import { IIconProps } from "@/types"

const NewWindow: React.FC<IIconProps> = ({ className }) => (
    <svg
        className={`fill-current ${className ? className : 'w-6 h-6'}`}
        viewBox={`0 0 24 24`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
    </svg>
)
export default NewWindow