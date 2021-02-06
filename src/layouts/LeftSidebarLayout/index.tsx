import React from 'react'
import { KeyboardArrowLeftIcon, CloseIcon } from '@/components/Icons/MUI/arrowIcons'
import { MenuIcon } from '@/components/Icons/MUI/navIcons'
import { useDispatch } from 'react-redux'
import { setIsModalOpen } from '@/state/action'

import "./leftSidebarLayout.css"
import { INavItem } from '@/types';

export interface ISiderbar {
    closeMobileNav: () => void
}
interface IProps {
    title: string
    menuIcon?: boolean
    sidebar: React.FC<ISiderbar & any>
    content: JSX.Element | React.ReactNode
    parent?: INavItem
}
const ScrollSectionLayout: React.FC<IProps> = ({ title, sidebar, content, menuIcon }) => {
    const dispatch = useDispatch()
    const [openMobileNav, setOpenMobileNav] = React.useState(false)

    React.useEffect(() => {
        return (() => {
            closeMobileNav()
        })
    }, [])
    const closeMobileNav = () => {
        setOpenMobileNav(false)
        dispatch(setIsModalOpen(false))
    }
    const toggleNav = () => {
        setOpenMobileNav(!openMobileNav)
        dispatch(setIsModalOpen(!openMobileNav))
    }
    return (
        <div className="relative mt-12 flex items-start ">
            <div className={`bg-white font-roboto fixed w-full h-full sm:hidden overflow-y-scroll z-50 sm:w-1/3 pt-4 px-6 sm:pl-12 pb-32 scroll-layout-sidebar scroll-layout-sidebar-${openMobileNav ? 'active' : 'close'}`}>
                <div
                    className="flex justify-end"
                    onClick={toggleNav}
                    onKeyDown={toggleNav}
                >
                    <button className="p-2 rounded-md border">
                        <CloseIcon customSize="6" className="fill-slate-light" />
                    </button>
                </div>
                {sidebar({ closeMobileNav })}
            </div>

            <div
                className="fixed w-full shadow bg-white px-4 py-2 flex justify-between z-20 sm:hidden "
                onClick={toggleNav}
                onKeyDown={toggleNav}
            >
                <div className="flex items-center">
                    <button className="p-1 text-gray-600 rounded-md border flex items-center">
                        {menuIcon ? <MenuIcon customSize="6" /> : <KeyboardArrowLeftIcon customSize="6" className="fill-slate-dark" />} <span className="px-2">{title}</span>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ScrollSectionLayout