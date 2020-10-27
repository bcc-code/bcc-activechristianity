import React from 'react'

import Link from '@/components/CustomLink'

import { IDrawerNav } from '@/layouts/App'

import LogoFull from '@/images/ACLogoFull'
import TopFirst from './TopFirst'
import TS from '@/strings'
import Icon from '@/components/Icons/Icon'
import { INavItem } from '@/types'

const TopDesktop: React.FC<IDrawerNav & { explorePage?: INavItem }> = ({ isSideNavOpen, setSideNavOpen, menu, explorePage }) => {
    return (
        <div className={`fixed top-0 z-50 bg-white hidden sm:block w-full py-1 border-b border-gray-200 drawer-main drawer-main-${isSideNavOpen ? 'open' : 'close'}`} >
            <TopFirst />
            <div className="flex justify-between py-2">
                <Link className='flex items-center px-4' to="/">
                    <LogoFull full height="24px" />
                </Link>
                <div className="flex justify-center ">
                    {menu.map((item, i) => (
                        <Link className="block p-2" key={i} to={`${item.to}`}>
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex flex-row items-center">
                    {explorePage && (
                        <Link to={explorePage.to} className="px-2">
                            <Icon name="Search" size="6" />
                        </Link>
                    )}
                    <button className="pl-2 pr-4 -mt-1" onClick={() => { setSideNavOpen(true) }}>

                        <Icon name="Menu" size="6" />
                    </button>
                </div>
            </div>
        </div>

    )

}

export default React.memo(TopDesktop)

