import * as React from 'react';
import Link from '@/components/CustomLink'
import { StaticQuery, graphql } from "gatsby";
import Icon from '@/components/Icons'
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
    'home': <Icon size="lg" name="home" />,
    'explore': <Icon size="lg" name="search" />,
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
            <Icon size="lg" name="home" />
        ),
        default: (
            <Icon size="lg" name="home" />

        )
    },
    'explore': {
        selected: (
            <Icon size="lg" name="search" />


        ),
        default: (
            <Icon size="lg" name="search" />

        )
    },
    'listen-recommend': {
        selected: (
            <Icon size="lg" name="listen" />



        ),
        default: (
            <Icon size="lg" name="listen" />

        )
    },
    'read-recommend': {
        selected: (
            <Icon size="lg" name="file" />


        ),
        default: (
            <Icon size="lg" name="file" />


        )
    },
    'watch-recommend': {
        selected: (
            <Icon size="lg" name="watch" />


        ),
        default: (
            <Icon size="lg" name="watch" />


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
            <div className="fixed bottom-0 z-40 bg-white w-full flex justify-around border border-t-2 border-t-gray-500">

                {menu.map((item, i) => {

                    return (

                        <Link
                            key={i}
                            to={item.to}
                            className="flex flex-col items-center justify-between text-gray-600 flex-1 py-2"
                            activeClassName="bg-gray-300"
                        >
                            <span className="flex-1 flex items-center pb-1">{item.icon.default}</span>
                            <span className="block" style={{ "fontSize": "9px" }}>{item.name}</span>
                        </Link>

                    )
                })}
            </div>
        </div>
    )
}

export default BottomNavMobile
