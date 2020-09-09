import * as React from "react"
import { IIconProps } from "@/types"

const ScreenIcon: React.FC<IIconProps> = ({ className }) => (
    <svg
        className={`stroke-current ${className ? className : 'w-6 h-6'}`}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >

        <path d="M3 17H9H15M9 13H17V1H1V13H9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12.5 7L7 4V10L12.5 7Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)
export default ScreenIcon