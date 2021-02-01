
import React, { Profiler } from 'react'
import loadable from '@loadable/component'
import Breadcrumb from './Breadcrumb'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'
import TopMobile from '@/layout-parts/Nav/TopMobile'
const SideNav = loadable(() => import('@/layout-parts/Nav/SideNav/index.tsx'))
const Footer = loadable(() => import('@/layout-parts/Footer'))
import shortid from 'shortid'
import { useDispatch } from "react-redux"
import { setLogout, setUser, } from '@/state/action/authAction'
import { getUserLibrary } from '@/state/action/userAction'
import { setIsModalOpen, openSignInModal } from '@/state/action'
import { menusItems } from '@/layout-parts/Nav/Menus'

// string

import acApi from '@/util/api'
// type 
import { IUser } from '@/types'


import './Layout.css'


export interface IDrawerNav {
    isSideNavOpen: boolean
    setSideNavOpen: (status: boolean) => void
    isModalOpen?: boolean
}


const App: React.FC<{ pageContext: { title?: string, slug?: string } }> = (props) => {
    const { children } = props

    const dispatch = useDispatch();
    const [isSideNavOpen, setSideNavOpen] = React.useState(false)

    React.useEffect(() => {
        checkUser()

    }, [])

    const checkUser = () => {
        console.log('checking user')
        acApi
            .profile()
            .then((res: IUser) => {
                if (res && res.id) {
                    if (res.meta && res.meta.consented) {
                        dispatch(setUser(res))
                        dispatch(getUserLibrary())
                    } else {
                        dispatch(openSignInModal("giveConsent"))
                    }
                } else {
                    dispatch(setLogout())
                }
            })
            .catch((err: any) => {
                console.log(err)
                dispatch(setLogout())
                console.log('handle login error')
            })
    }

    const handleSideNavOpen = (status: boolean) => {
        setSideNavOpen(status)
        dispatch(setIsModalOpen(status))
    }



    const NavProps = React.useMemo(() => {
        return (
            {
                isSideNavOpen,
                setSideNavOpen: handleSideNavOpen
            }
        )
    }, [
        isSideNavOpen,
        setSideNavOpen,
        handleSideNavOpen
    ])

    return (
        <div className="relative">
            <div className="relative layout-children">
                <TopDesktop key={shortid()} {...NavProps} explorePage={menusItems.explore} />
                <TopMobile
                    {...NavProps}
                    key={shortid()}
                />
                {isSideNavOpen && <SideNav {...NavProps} />}
                <Breadcrumb key={shortid()} />
                {children}
                <Footer key={shortid()} />
            </div>
        </div>

    )

}

export default App

