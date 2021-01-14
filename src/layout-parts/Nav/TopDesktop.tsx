import React from 'react'
import Link from '@/components/CustomLink'

import { IDrawerNav } from '@/layouts/App'

import LogoFull from '@/images/ACLogo'
import TopFirst from './TopFirst'

import { desktopMenu } from '@/layout-parts/Nav/Menus'
import { SearchIcon, MenuIcon } from '@/components/Icons/MUI'
import { INavItem } from '@/types'

const TopDesktop: React.FC<IDrawerNav & { explorePage?: INavItem }> = ({ isSideNavOpen, setSideNavOpen, explorePage }) => {
    return (
        <div className={`fixed top-0 z-50 bg-white hidden sm:block w-full py-1 border-b border-gray-200 drawer-main drawer-main-${isSideNavOpen ? 'open' : 'close'}`} >
            <TopFirst />
            <div className="flex py-2 standard-max-w items-center">
                <Link className='flex flex-1 justify-start items-center px-4 mt-1' to="/">
                    <LogoFull height="24px" />
                </Link>
                <div className="flex">
                    <div className="flex justify-end pr-12">
                        {desktopMenu.map((item, i) => (
                            <Link className="block p-2 hover:text-ac-slate-light" key={i} to={`${item.to}`}>
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-row justify-end items-center mt-1">
                        {explorePage && (
                            <Link to={explorePage.to} className="px-2">
                                <SearchIcon customSize="6" />
                            </Link>
                        )}
                        <button className="pl-2 pr-4" onClick={() => { setSideNavOpen(!isSideNavOpen) }}>
                            <MenuIcon customSize="6" />
                        </button>
                    </div>
                </div>
                <div className="flex">

                </div>
            </div>
        </div>

    )

}

export default React.memo(TopDesktop)

