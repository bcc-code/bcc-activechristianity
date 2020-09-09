import * as React from "react"
import { IIconProps } from "@/types"

const Home: React.SFC<IIconProps> = ({ customSize, className }) => {
  let customeClassName = className ? className : `w-6 h-6`
  return (
    <svg
      className={`${customeClassName} stroke-current hover:fill-current`}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 7.66667L3 6.33333M21 7.66667L19 6.33333M19 6.33333L11 1L3 6.33333M19 6.33333V17H14V13C14 11 12.3125 10 11 10C9.6875 10 8 11 8 13V17H3V6.33333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

    </svg>
  )
}

export default Home
