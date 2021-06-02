import React, { Profiler } from 'react'
import Link from '@/components/CustomLink'
import { IDrawerNav } from '@/layouts/AppWrapper'
import LogoFull from '@/images/ACLogo'
import TopFirst from './TopFirst'
import menus from '@/strings/generated/menus.json'
import { SearchIcon, MenuIcon } from '@/components/Icons/MUI/navIcons'
import { INavItem } from '@/types'
import loadable from '@loadable/component'
const SideNav = loadable(() => import('@/layout-parts/Nav/SideNav/index'))
import BottomMobile from '@/layout-parts/Nav/BottomMobile'
import shortid from 'shortid'
const { desktop } = menus
const TopDesktop: React.FC<{ explorePage?: INavItem }> = ({ explorePage }) => {
    const [isMobile, setIsMobile] = React.useState(typeof window !== "undefined" && window.innerWidth < 640)
    const [isSideNavOpen, setSideNavOpen] = React.useState(false)
    React.useEffect(() => {
        setIsMobile(typeof window !== "undefined" && window.innerWidth < 640)
    }, [])

    const handleSideNavOpen = (status: boolean) => {
        setSideNavOpen(status)
    }

    const NavProps = React.useMemo(() => {
        return (
            {
                isSideNavOpen,
                setSideNavOpen: handleSideNavOpen
            }
        )
    }, [
        isSideNavOpen,
        setSideNavOpen,
        handleSideNavOpen
    ])




    return (
        <>
            <div style={{ zIndex: 100 }} className={`fixed top-0 bg-white block w-full py-2 sm:py-1 border-b border-gray-200 drawer-main`} >
                <TopFirst />

                <div className="flex py-2 standard-max-w items-center">
                    <Link className='flex flex-1 justify-start items-center px-4 mt-1' to="/">
                        <LogoFull />
                    </Link>
                    <div className="flex">
                        <div className="hidden sm:flex justify-end pr-12">
                            {isMobile !== true && desktop.map((item, i) => (
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
                </div>
            </div>
            {isSideNavOpen && <SideNav {...NavProps} />}

            <BottomMobile {...NavProps} key={shortid()} />
        </>

    )

}

export default TopDesktop


