import * as React from 'react';
import Link from '@/components/CustomLink'
import { INavItem } from '@/types'


export interface IMenuWithIcon extends INavItem {
    icon: {
        selected: JSX.Element,
        default: JSX.Element
    }
}
interface IProps {
    isSideNavOpen: boolean
    isModalOpen: boolean
    menu: IMenuWithIcon[]
}


const BottomNavMobile: React.FC<IProps> = ({ isSideNavOpen, isModalOpen, menu }) => {

    const handlePathClick = (path: string, name: string) => {
        const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
        dataLayer.push({
            event: 'ac.gtm_track_bottom_nav_click',
            label: name
        })
    }


    let drawerClass = 'close'
    if (isSideNavOpen) {
        drawerClass = 'mobile-open'
    } else if (isModalOpen) {
        drawerClass = 'mobile-open-right'
    }

    return (
        <div className={`relative w-full drawer-main drawer-main-${drawerClass}`} style={{ zIndex: isSideNavOpen ? 60 : undefined }}>
            <div className="fixed bottom-0 z-40 bg-white w-full">

                <div className="sm:hidden flex justify-around border border-t-2 border-t-gray-500">
                    {menu.map((item, i) => (
                        <Link
                            key={i}
                            to={item.to}
                            className="flex flex-col items-center justify-between text-gray-600 flex-1 py-2"
                            activeClassName="bg-gray-300"
                        >
                            <span className="flex-1 flex items-center pb-3">{item.icon.default}</span>
                            <span className="block font-semibold" style={{ "fontSize": "9px" }}>{item.name}</span>
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default BottomNavMobile
