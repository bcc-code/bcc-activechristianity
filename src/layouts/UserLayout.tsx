import React from 'react'
import StickyBox from "react-sticky-box";
import ac_strings from '@/strings/ac_strings.js'
import { useDispatch } from 'react-redux'
import { initiateLogout } from '@/state/action/authAction'
import { INavItem } from '@/types'
import { SideNavItem } from '@/components/Button'
import menus from '@/strings/generated/menus.json'
const { userMenuItems } = menus

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
        const r = confirm("You are logging out now");
        if (r == true) {
            dispatch(initiateLogout())
        }


    }

    const title = ac_strings.title_user


    return (
        <div className="flex relative mt-12 items-start ">
            <div className="hidden sm:flex flex-col items-center bg-ac-slate-lighter " style={{ width: "400px", minHeight: "80vh" }}>
                <StickyBox offsetTop={150} >
                    <div className="flex flex-col py-8">
                        {[
                            userMenuItems.myContent,
                            userMenuItems.history
                        ].map((item, i) => {
                            return (
                                <SideNavItem key={i} to={item.to}>
                                    {item.name}
                                </SideNavItem >
                            )
                        })}

                        <SideNavItem onClick={handleLogout} className="text-ac-slate-light">{ac_strings.logout}</SideNavItem>

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

