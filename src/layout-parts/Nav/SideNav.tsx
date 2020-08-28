import * as React from 'react';
import { StaticQuery, graphql } from "gatsby";
import Link from '@/components/CustomLink'
import { IDrawerNav } from '@/layouts/App'
import { sideMenu } from '@/strings/menu'
import CloseIcon from '@/components/Icons/Close'
import UserNav from '@/layout-parts/Nav/User'
import LanguageDropdown from '@/layout-parts/Nav/Languages'
import SocialPlatformas from '@/layout-parts/Nav/SocialPlatforms'
import { IMenusQuery } from '@/types'

const SideMobile: React.FC<IDrawerNav> = ({ isSideNavOpen, setSideNavOpen }) => {

    const close = () => setSideNavOpen(false)

    return (
        <StaticQuery query={query}
            render={(data: IResData) => {
                const sideMenuMobile = data.ac && data.ac.menus[0].menuItems ? data.ac && data.ac.menus[0].menuItems : []

                return (
                    <div
                        className={`bg-d4gray-light w-full h-full px-4 py-8 sm:py-16 flex flex-col justify-between xs:w-mobile xs:left-auto xs:shadow overflow-y-scroll fixed top-0 right-0 bottom-0 z-50 drawer-side drawer-side-${isSideNavOpen ? 'open' : 'close'}`}
                    >
                        <div className="absolute right-0 top-0 p-4 py-6" onClick={close}>
                            <CloseIcon className="w-4 h-4" />
                        </div>
                        <div className="w-full flex justify-center sm:hidden">
                            <LanguageDropdown className="border px-4 py-2 rounded mb-4" />
                        </div>
                        <div className="text-sm">
                        </div>

                        <div className="mx-auto flex flex-col font-roboto items-center">
                            {sideMenuMobile.map((item, i) => {
                                return (
                                    <Link key={i} to={item.value} className=" px-4 py-2" onClick={close}>
                                        {item.name}
                                    </Link>
                                )
                            })}
                            <UserNav col callback={close} />

                        </div>
                        <div className="flex flex-col mx-auto text-sm">
                        </div>
                        <div className="pt-4 text-d4slate-light">
                            <SocialPlatformas />
                        </div>
                    </div>
                )
            }}

        />
        /*         <div
                    className={`bg-d4gray-light w-full h-full px-4 py-8 sm:py-16 flex flex-col justify-between xs:w-mobile xs:left-auto xs:shadow overflow-y-scroll fixed top-0 right-0 bottom-0 z-50 drawer-side drawer-side-${isSideNavOpen ? 'open' : 'close'}`}
                >
                    <div className="absolute right-0 top-0 p-4 py-6" onClick={close}>
                        <CloseIcon className="w-4 h-4" />
                    </div>
                    <div className="w-full flex justify-center sm:hidden">
                        <LanguageDropdown className="border px-4 py-2 rounded mb-4" />
                    </div>
                    <div className="text-sm">
                    </div>
        
                    <div className="mx-auto flex flex-col font-roboto items-center">
                        {sideMenu.map((item, i) => {
                            return (
                                <Link key={i} to={item.to} className=" px-4 py-2" onClick={close}>
                                    {item.name}
                                </Link>
                            )
                        })}
                        <UserNav col callback={close} />
        
                    </div>
                    <div className="flex flex-col mx-auto text-sm">
                    </div>
                    <div className="pt-4 text-d4slate-light">
                        <SocialPlatformas />
                    </div>
                </div> */
    )
}

export default SideMobile

const query = graphql`
    query SideMobileMenu{
        ac {
            menus(slug: "side") {
                name
                slug
                menuItems {
                        name
                        value
                    }
            }

        }
        
    }
`

interface IResData {
    ac: IMenusQuery & {
        allPages: {
            title: string
            slug: string
            label: string
        }[]
    }
}