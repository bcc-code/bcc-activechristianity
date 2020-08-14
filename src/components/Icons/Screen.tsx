import * as React from "react"
import { IIconProps } from "@/types"

const ScreenIcon: React.FC<IIconProps> = ({ className }) => (
    <svg
        className={`stroke-current ${className ? className : 'w-6 h-6'}`}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M3 17H9H15M9 13H17V1H1V13H9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
export default ScreenIcon