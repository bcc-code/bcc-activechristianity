import React from 'react';
import loadable from '@loadable/component'
import { graphql } from "gatsby"
import BottomMobile from '@/layout-parts/Nav/BottomMobile'
import Breadcrumb from './Breadcrumb'
import CookieConsent from "@/layouts/App/CookeConsent";
import Helmet from 'react-helmet'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'
import TopMobile from '@/layout-parts/Nav/TopMobile'
const MediaPlayer = loadable(() => import('@/components/MediaPlayer/AudioPlayerGlobal'))
const SideNav = loadable(() => import('@/layout-parts/Nav/SideNav/index.tsx'))
const SignInSignUpModal = loadable(() => import('@/layout-parts/SignInSignUp'))
const Footer = loadable(() => import('@/layout-parts/Footer'))

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


const App: React.FC<{ pageContext: { title?: string, slug?: string }, location: { pathname: string } }> = (props) => {
    const { children, pageContext, location } = props

    const isLandingPage = location && location.pathname && location.pathname.indexOf('campaign/') > -1
    const dispatch = useDispatch();
    const [isSideNavOpen, setSideNavOpen] = React.useState(false)

    React.useEffect(() => {
        checkUser()

    }, [])

    const checkUser = () => {
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
            <CookieConsent />
            <SignInSignUpModal />
            <MediaPlayer />
            <div className="relative layout-children">
                <Helmet>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Helmet>
                <TopDesktop {...NavProps} explorePage={menusItems.explore} />
                <TopMobile
                    {...NavProps}
                />
                {isSideNavOpen && <SideNav {...NavProps} />}
                <Breadcrumb />
                {children}
                <Footer />
                <BottomMobile {...NavProps} />
            </div>
        </div>

    )

}

export default React.memo(App)

const query = graphql`
    query LayoutQuery {
        ac {
            menus {
                id
                slug
                menuItems {
                    name
                    to:value
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