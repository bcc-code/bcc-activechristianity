import * as React from 'react';
import Link from '@/components/CustomLink'
import HOCLoginCheck from '@/HOC/LogInCheck'
import { HeadsetIcon, HomeIcon, ExploreIcon, DescriptionIcon, LocalOfferIcon, BookmarksIcon, PlayCircleOutlineIcon } from '@/components/Icons/MUI'
import { useSelector } from "react-redux"
import { IRootState } from '@/state/types'
import { INavItem } from '@/types'
import { menusItems, mobile } from '@/strings/generated/menus.json'
export interface IMenuWithIcon extends INavItem {
    icon: {
        selected: JSX.Element,
        default: JSX.Element
    }
}
interface IProps {
    isSideNavOpen: boolean
}

const iconMapNav = {
    HomeIcon,
    ExploreIcon,
    HeadsetIcon,
    DescriptionIcon,
    PlayCircleOutlineIcon,
    BookmarksIcon,
    LocalOfferIcon
}
const BottomNavMobile: React.FC<IProps> = ({ isSideNavOpen }) => {

    const handlePathClick = (path: string, name: string) => {
        const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
        dataLayer.push({
            event: 'ac.gtm_track_bottom_nav_click',
            label: name
        })
    }

    let drawerClass = 'close'
    /*     if (isSideNavOpen) {
            drawerClass = 'mobile-open'
        }
     */

    return (
        <HOCLoginCheck
            render={({ loginStatus }) => {
                let mobileMenu = mobile.default
                if (loginStatus === "success") {
                    mobileMenu = mobile.loggedIn
                }

                return (
                    <div style={{ zIndex: 600 }} className={`relative w-full drawer-main drawer-main-${drawerClass}`}>
                        <div className="fixed bottom-0 z-40 bg-white w-full">

                            <div className="sm:hidden flex justify-around border border-t-2 border-t-gray-500">

                                {mobileMenu.map((item, i) => {
                                    const Icon = iconMapNav[item.iconName]
                                    return (
                                        <Link
                                            onClick={() => handlePathClick(item.to, item.name)}
                                            key={i}
                                            to={item.to}
                                            className="flex flex-col items-center justify-between text-gray-600 flex-1 py-2"
                                            activeClassName="bg-gray-300"
                                        >
                                            <span className="flex-1 flex items-center pb-3"><Icon className="fill-slate-light" /></span>
                                            <span className="block font-semibold" style={{ "fontSize": "10px" }}>{item.name}</span>
                                        </Link>

                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            }}

        />

    )
}

export default BottomNavMobile
