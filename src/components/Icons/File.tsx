
import * as React from "react"
import { IIconProps } from '@/types'

const FileIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    let customeClassName = className ? className : `w-6 h-6`
    return (
        <svg
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 1000 1000"
            enableBackground="new 0 0 1000 1000"
            className={`fill-current stroke-current ${customeClassName}`}
        >
            <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
            <g><path d="M867.5,928.8h-735C64.9,928.8,10,873.8,10,806.3V193.8c0-67.6,54.9-122.5,122.5-122.5H745c67.6,0,122.5,54.9,122.5,122.5V745h-61.3V193.8c0-33.7-27.4-61.3-61.3-61.3H132.5c-33.7,0-61.3,27.5-61.3,61.3v612.5c0,33.8,27.5,61.3,61.3,61.3h735c33.8,0,61.3-27.4,61.3-61.3V193.8H990v612.5C990,873.8,935.1,928.8,867.5,928.8z" /><path d="M193.8,316.3h490v61.3h-490V316.3z" /><path d="M193.8,500h490v61.3h-490V500z" /><path d="M193.8,683.8h490V745h-490V683.8z" /></g>
        </svg>

    )
}

export default FileIcon