import * as React from 'react'
import Link from '@/components/CustomLink'
import LogoFull from '@/images/ACLogo'
import { SearchIcon, MenuIcon } from '@/components/Icons/MUI/navIcons'
import ac_strings from '@/strings/ac_strings.js'
import { IDrawerNav } from '@/layouts/AppWrapper/index'

import './topmobile.css'


const TopNavMobile: React.FC<IDrawerNav> = ({ isSideNavOpen, setSideNavOpen }) => {
    const [isMobile, setIsMobile] = React.useState(typeof window !== "undefined" && window.innerWidth < 640)

    React.useEffect(() => {
        setIsMobile(typeof window !== "undefined" && window.innerWidth < 400)
    }, [])

    if (isMobile) {
        return (
            <div style={{ zIndex: 100, marginTop: 200 }} className={`fixed py-2 w-full top-0 z-50 sm:hidden bg-white shadow-md drawer-main drawer-main-${isSideNavOpen ? 'mobile-open' : 'close'}`}>
                <div className="flex justify-between items-center w-full">
                    <Link className='px-4' to="/">
                        <LogoFull />
                    </Link>
                    <div className="flex items-center">
                        <Link to={ac_strings.slug_explore}>
                            <SearchIcon customSize="6" />
                        </Link>
                        <button
                            className="p-2 px-4 uppdercase text-small"
                            onClick={() => { setSideNavOpen(true) }}
                        >
                            <MenuIcon customSize="6" />
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="hidden">
            </div>
        )
    }
}

export default React.memo(TopNavMobile)