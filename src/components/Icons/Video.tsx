import * as React from "react"
import { IIconProps } from "@/types"

const Bookmark: React.FC<IIconProps> = ({ customSize, className }) => {
  const size = customSize ? `${customSize}` : "24"
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      /* width={size}
      height={size} */
      viewBox="0 0 24 24"
      className={`${className ? className : 'w-6 h-6'} m-auto block`}
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path
        d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM12 5.5v9l6-4.5z"
        fill="#a0aec0"
      />
    </svg>
  )
}

export default Bookmark
