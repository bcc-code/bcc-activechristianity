import * as React from 'react';
import { StaticQuery, graphql } from "gatsby";
import Link from '@/components/CustomLink'
import { IDrawerNav } from '@/layouts/App'
import Icon from '@/components/Icons/Icon'

import UserNav from '@/layout-parts/Nav/User'
import LanguageDropdown from '@/layout-parts/Nav/Languages'
import SocialPlatformas from '@/layout-parts/Nav/SocialPlatforms'
import { IMenusQuery } from '@/types'
import { IRootState, IUserState } from '@/state/types'
const SideMobile: React.FC<{
    isSideNavOpen: boolean
    close: () => void,
    user: IUserState
}> = ({ isSideNavOpen, close }) => {


    return (
        <div
            className={`drawer-side drawer-side-${isSideNavOpen ? 'open' : 'close'} drawer-side-submenu bg-d4gray-light w-full h-full px-4 py-8 sm:py-16 flex flex-col justify-between xs:w-mobile xs:left-auto xs:shadow overflow-y-scroll fixed top-0 right-0 bottom-0 z-50 `}
        >
            <div className="absolute right-0 top-0 p-4 py-6" onClick={close}>
                <Icon name="Close" size="6" />
            </div>
            <div>
                My profile
                
            </div>
            <div className="mx-auto flex flex-col font-roboto items-center font-semibold">
                {[
                    {
                        name: "Account settings",
                        to: ''
                    },
                    {
                        name: "My Content",
                        to: '/user/my-content'
                    },
                    {
                        name: "History",
                        to: ''
                    },
                    {
                        name: "Log out",
                        to: ''
                    }
                ].map((item, i) => {
                    return (
                        <Link key={i} to={item.to} className=" px-4 py-2" onClick={close}>
                            {item.name}
                        </Link>
                    )
                })}


            </div>

            <div className="pt-4 text-d4slate-light">
                <SocialPlatformas />
            </div>
        </div >
    )
}

export default React.memo(SideMobile)
