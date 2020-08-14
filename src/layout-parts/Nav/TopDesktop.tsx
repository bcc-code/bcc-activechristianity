import React from 'react'
import { StaticQuery, graphql } from "gatsby";
import Link from '@/components/CustomLink'
import { useDispatch } from 'react-redux'
import { IDrawerNav } from '@/layouts/App'
import { IMenusQuery } from '@/types'
import LogoSmall from '@/images/AC_Logo_sm.png'
import TopFirst from './TopFirst'
import TS from '@/strings'
import { all } from '@/strings/menu'
import SearchIcon from '@/components/Icons/Search'
import MenuIcon from '@/components/Icons/Menu'

const TopDesktop: React.FC<IDrawerNav> = ({ isSideNavOpen, setSideNavOpen }) => {
    return (
        <StaticQuery
            query={query}
            render={(data: IResData) => {

                const topMenuDesktop = data.ac && data.ac.menus[0].menuItems

                return (
                    <div className={`fixed top-0 z-50 bg-white hidden sm:block w-full py-1 border-b border-gray-200 drawer-main drawer-main-${isSideNavOpen ? 'open' : 'close'}`} >
                        <TopFirst />
                        <div className="flex justify-between py-2">
                            <Link className='flex items-center' to="/">
                                <div className='pr-4'>
                                    <img className='w-8 h-auto' src={LogoSmall} alt={TS.site_title} />
                                </div>
                                <div >
                                    <img style={{ maxWidth: '200px' }} src="https://media.activechristianity.org/2020/04/activechristianity_en_logo_200px.png" alt="" />
                                </div>
                            </Link>
                            <div className="flex justify-center ">
                                {topMenuDesktop && topMenuDesktop.map((item, i) => (
                                    <Link className="block p-2" key={i} to={`${item.value}`}>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-row items-center">
                                <Link to={all.explore.to} className="px-2">
                                    <SearchIcon customSize={24} />
                                </Link>
                                <button className="pl-2 pr-4 -mt-1" onClick={() => { setSideNavOpen(true) }}>
                                    <MenuIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                )

            }
            }
        />

    )

}

export default TopDesktop

interface IResData {
    ac: IMenusQuery
}
const query = graphql`
    query MobileMenu{
        ac {
            menus(slug:"desktop"){
                name
                menuItems {
                    name
                    value
                }
            }


        }
    }
`