import React from 'react'
import StickyBox from "react-sticky-box";
import ac_strings from '@/strings/ac_strings.js'
import { useDispatch } from 'react-redux'
import { initiateLogout } from '@/state/action/authAction'

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
                                name: ac_strings.my_content,
                                to: `${ac_strings.slug_user}/${ac_strings.slug_user_content}`
                            },
                            {
                                name: ac_strings.history,
                                to: `${ac_strings.slug_user}/${ac_strings.slug_user_history}`
                            }
                        ].map((item, i) => {
                            return (
                                <SideNavItem key={i} to={item.to}>
                                    {item.name}
                                </SideNavItem >
                            )
                        })}

                        <SideNavItem onClick={handleLogout} className="text-d4slate-light">{ac_strings.logout}</SideNavItem>

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

