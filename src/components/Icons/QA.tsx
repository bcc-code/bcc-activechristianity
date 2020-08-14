import * as React from "react"
import { IIconProps } from "@/types"

const QA: React.SFC<IIconProps> = ({ customSize }) => {
  const size = customSize ? `${customSize}` : "24"
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="m-auto block"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path
        d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"
        fill="#a0aec0"
      />
    </svg>
  )
}

export default QA
