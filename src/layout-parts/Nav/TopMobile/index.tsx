import * as React from 'react'
import Link from '@/components/CustomLink'
import LogoFull from '@/images/ACLogo'
import { SearchIcon, MenuIcon } from '@/components/Icons/MUI'

import { IDrawerNav } from '@/layouts/App'
import { INavItem } from '@/types'
import './topmobile.css'

interface ITopNavMobile extends IDrawerNav {
    explorePage?: INavItem
}


const TopNavMobile: React.FC<ITopNavMobile> = ({ isSideNavOpen, setSideNavOpen, explorePage }) => {
    console.log('render top')
    return (
        <div className={`fixed py-2 w-full top-0 z-50 sm:hidden bg-white shadow-md drawer-main drawer-main-${isSideNavOpen ? 'mobile-open' : 'close'}`}>
            <div className="flex justify-between items-center w-full">
                <Link className='px-4' to="/">
                    <LogoFull height="24" />
                </Link>
                <div className="flex items-center">
                    {explorePage && (
                        <Link to={explorePage.to}>
                            <SearchIcon customSize="6" />
                        </Link>
                    )}
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