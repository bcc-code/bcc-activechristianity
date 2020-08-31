import * as React from 'react';
import Link from '@/components/CustomLink'
import { StaticQuery, graphql } from "gatsby";
import HomeIcon from '@/components/Icons/Home'
import SearchIcon from '@/components/Icons/Search';
import { navigate } from "gatsby"

import { IMenusQuery, INavItem } from '@/types'

import { typeIcons } from '@/layout-parts'
import ac_strings from '@/strings/ac_strings.json'

export interface IMenuWithIcon extends INavItem {
    icon: JSX.Element
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


const BottomNavMobile: React.FC<IProps> = ({ isSideNavOpen, isModalOpen, menu }) => {

    const handlePathClick = (path: string, name: string) => {
        const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
        dataLayer.push({
            event: 'ac.gtm_track_bottom_nav_click',
            label: name
        })
        navigate(path)
    }


    let drawerClass = 'close'
    if (isSideNavOpen) {
        drawerClass = 'mobile-open'
    } else if (isModalOpen) {
        drawerClass = 'mobile-open-right'
    }

    return (
        <div className={`relative sm:hidden w-full drawer-main drawer-main-${drawerClass}`} style={{ zIndex: isSideNavOpen ? 60 : undefined }}>
            <div className="fixed bottom-0 z-40 bg-white w-full flex justify-around border border-t-2 border-t-gray-500">
                <Link

                    to="/"
                    onClick={() => { handlePathClick("/", ac_strings.home) }}
                    className="flex flex-col items-center justify-between text-gray-600 pt-4 pb-3 flex-1"
                    activeClassName="bg-gray-300 "
                >
                    {iconMap.home}
                    <p className="block mt-1 text-sm font-semibold">{ac_strings.home}</p>
                </Link>

                {menu.map((item, i) => {

                    return (

                        <Link
                            key={i}
                            to={item.to}
                            onClick={() => { handlePathClick(item.to, item.name) }}
                            className="flex flex-col items-center justify-between text-gray-600 pt-4 pb-3 flex-1"
                            activeClassName="bg-gray-300 "
                        >
                            {item.icon}
                            <p className="block mt-1 text-sm font-semibold">{item.name}</p>
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