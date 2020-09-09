import * as React from 'react';
import Link from '@/components/CustomLink'
import { StaticQuery, graphql } from "gatsby";
import HomeIcon from '@/components/Icons/Home'
import SearchIcon from '@/components/Icons/Search';
import WatchIcon from '@/components/Icons/Screen';
import AudioIcon from '@/components/Icons/Audio';
import FileIcon from '@/components/Icons/File'
import { navigate } from "gatsby"

import { IMenusQuery, INavItem } from '@/types'

import { typeIcons } from '@/layout-parts'
import ac_strings from '@/strings/ac_strings.json'

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

export const iconMap: { [key: string]: JSX.Element } = {
    'home': <HomeIcon className="w-5 h-5" />,
    'explore': <SearchIcon className="pt-1 w-5 h-5" />,
    'listen-recommend': typeIcons.listen,
    'read-recommend': typeIcons.read,
    'watch-recommend': typeIcons.watch
}

export const iconMapNav: {
    [key: string]: {
        selected: JSX.Element,
        default: JSX.Element
    }
} = {
    'home': {
        selected: (
            <svg width="16" height="16" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 13V17H19V6.33333L11 1L3 6.33333V17H8V13C8 11 9.6875 10 11 10C12.3125 10 14 11 14 13Z" fill="#384156" />
                <path d="M1 7.66667L3 6.33333M21 7.66667L19 6.33333M19 6.33333L11 1L3 6.33333M19 6.33333V17H14V13C14 11 12.3125 10 11 10C9.6875 10 8 11 8 13V17H3V6.33333" stroke="#384156" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),
        default: (
            <svg width="16" height="16" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7.66667L3 6.33333M21 7.66667L19 6.33333M19 6.33333L11 1L3 6.33333M19 6.33333V17H14V13C14 11 12.3125 10 11 10C9.6875 10 8 11 8 13V17H3V6.33333" stroke="#9CA6BE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        )
    },
    'explore': {
        selected: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="9" r="8" stroke="#384156" stroke-width="2" />
                <path d="M15 16L22 23" stroke="#384156" stroke-width="2" stroke-linecap="round" />
            </svg>


        ),
        default: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="9" r="8" stroke="#9CA6BE" stroke-width="2" />
                <path d="M15 16L22 23" stroke="#9CA6BE" stroke-width="2" stroke-linecap="round" />
            </svg>

        )
    },
    'listen-recommend': {
        selected: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 13L18 11C18 9 18 4 12 4C6 4 6 9 6 11L6 13" stroke="#384156" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16 20V13C17.3333 12.9999 20 12.7666 20 16.5C20 20.2333 17.3333 20 16 20Z" fill="#384156" stroke="#384156" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 20V13C6.66667 12.9999 4 12.7666 4 16.4999C4 20.2333 6.66667 20 8 20Z" fill="#384156" stroke="#384156" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>



        ),
        default: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 13L18 11C18 9 18 4 12 4C6 4 6 9 6 11L6 13" stroke="#9CA6BE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16 20V13C17.3333 12.9999 20 12.7666 20 16.5C20 20.2333 17.3333 20 16 20Z" stroke="#9CA6BE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 20V13C6.66667 12.9999 4 12.7666 4 16.4999C4 20.2333 6.66667 20 8 20Z" stroke="#9CA6BE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        )
    },
    'read-recommend': {
        selected: (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.50649 2L5.22078 18M14.5714 2L12.2857 18M2 6.57143H18M18 13.4286H2" stroke="#384156" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


        ),
        default: (
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.50649 1L4.22078 17M13.5714 1L11.2857 17M1 5.57143H17M17 12.4286H1" stroke="#9CA6BE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


        )
    },
    'watch-recommend': {
        selected: (
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 13H9H1V1H17V13Z" fill="#384156" />
                <path d="M3 17H9H15M9 13H17V1H1V13H9Z" stroke="#384156" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


        ),
        default: (
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17H9H15M9 13H17V1H1V13H9Z" stroke="#9CA6BE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.5 7L7 4V10L12.5 7Z" stroke="#9CA6BE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


        )
    }
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
        <div className={`relative sm:hidden w-full drawer-main drawer-main-${drawerClass}`} style={{ zIndex: isSideNavOpen ? 60 : undefined }}>
            <div className="fixed bottom-0 z-40 bg-white w-full flex justify-around border border-t-2 border-t-gray-500 h-12 max-h-12">

                {menu.map((item, i) => {

                    return (

                        <Link
                            key={i}
                            to={item.to}
                            className="flex flex-col items-center justify-between text-gray-600 flex-1"
                            activeClassName="bg-gray-300"
                        >
                            <span style={{ paddingTop: "10px", paddingBottom: "6px" }}>{item.icon.default}</span>
                            <span className="block h-4" style={{ "fontSize": "9px" }}>{item.name}</span>
                        </Link>

                    )
                })}
            </div>
        </div>
    )
}

export default BottomNavMobile

interface IResData {
    ac: IMenusQuery & {
        allPages: {
            title: string
            slug: string
            label: string
        }[]
    }
}

const query = graphql`
    query BottomMobileMenu{
        ac {
            menus(slug: "mobile") {
                name
                slug
                menuItems {
                        name
                        value
                    }
            }

                allPages {
                    title
                    slug
                    label
            }
        }
        
    }
`