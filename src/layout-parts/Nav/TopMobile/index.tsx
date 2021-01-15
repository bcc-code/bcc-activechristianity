import * as React from 'react'
import Link from '@/components/CustomLink'
import LogoFull from '@/images/ACLogo'
import { SearchIcon, MenuIcon } from '@/components/Icons/MUI'
import ac_strings from '@/strings/ac_strings.js'
import { IDrawerNav } from '@/layouts/App'
import { INavItem } from '@/types'
import './topmobile.css'


const TopNavMobile: React.FC<IDrawerNav> = ({ isSideNavOpen, setSideNavOpen }) => {
    return (
        <div className={`fixed py-2 w-full top-0 z-50 sm:hidden bg-white shadow-md drawer-main drawer-main-${isSideNavOpen ? 'mobile-open' : 'close'}`}>
            <div className="flex justify-between items-center w-full">
                <Link className='px-4' to="/">
                    <LogoFull height="24" />
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
}

export default React.memo(TopNavMobile)