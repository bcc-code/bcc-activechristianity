import React from 'react'
import Link from '@/components/CustomLink'
import StickyBox from "react-sticky-box";
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.js'
import { useDispatch } from 'react-redux'
import { initiateLogout } from '@/state/action/authAction'
import UserInitials from '@/layout-parts/User/UserInitial'
import { INavItem } from '@/types'
import { SideNavItem } from '@/components/Button'
const AccountLayout: React.FC<{ pathname: string, userLinks: INavItem[] }> = ({ children, pathname, userLinks }) => {

    const dispatch = useDispatch()
    const [currentPageTitle, setCurrentPageTitle] = React.useState<null | string>(null)

    React.useEffect(() => {
        if (currentPageTitle === null) {
            const page = userLinks.find(item => {
                return `/${item.to}` === pathname
            })
            if (page) {
                setCurrentPageTitle(page.name)
            }

        }
    }, [pathname])

    const handleLogout = () => {
        dispatch(initiateLogout())

    }

    const title = ac_strings.title_user


    return (
        <div className="flex relative mt-12 items-start ">




            <div className="hidden sm:flex flex-col items-center bg-d4slate-lighter " style={{ width: "400px", minHeight: "80vh" }}>
                <StickyBox offsetTop={150} >

                    {/* <UserInitials /> */}
                    <div className="flex justify-center">
                        {/*                  <button
                            className="border border-d4slate-light text-d4slate-light text-sm rounded-full px-2 py-1 ">
                            {ac_strings.edit_profile}
                        </button> */}
                    </div>
                    <div className="flex flex-col py-8">
                        {/* <SideNavItem >
                            {ac_strings.account_setting}
                        </SideNavItem > */}
                        {[
                            {
                                name: "My Content",
                                to: '/user/my-content'
                            },
                            {
                                name: "History",
                                to: 'user/history'
                            }
                        ].map((item, i) => {
                            return (
                                <SideNavItem key={i} to={item.to} onClick={close}>
                                    {item.name}
                                </SideNavItem >
                            )
                        })}

                        <SideNavItem onClick={handleLogout} className="text-d4slate-light">{TS.logout}</SideNavItem>

                    </div>

                </StickyBox>
            </div>

            <div className="relative w-full flex flex-col ">
                <div className="z-10 sm:w-tablet">
                    {children}
                </div>
            </div>
        </div>

    )
}


export default AccountLayout

