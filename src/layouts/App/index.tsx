import * as React from 'react'
import LazyLoad from 'react-lazyload';
import loadable from '@loadable/component'
import { StaticQuery, graphql } from "gatsby"
import BottomMobile from '@/layout-parts/Nav/BottomMobile'
import Breadcrumb from './Breadcrumb'
import CookieConsent from "@/layouts/App/CookeConsent";
import Helmet from 'react-helmet'
import Link from '@/components/CustomLink';

const MediaPlayer = loadable(() => import('@/components/MediaPlayer/AudioPlayerGlobal'))
const SideNav = loadable(() => import('@/layout-parts/Nav/SideNav/index.tsx'))
const SignInSignUpModal = loadable(() => import('@/layout-parts/SignInSignUp'))
const Footer = loadable(() => import('@/layout-parts/Footer'))
import TopMobile from '@/layout-parts/Nav/TopMobile'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'

import shortid from 'shortid'
import { useDispatch, useSelector } from "react-redux"
import { setLogout, setUser, } from '@/state/action/authAction'
import { getUserLibrary } from '@/state/action/userAction'
import { setIsModalOpen, openSignInModal } from '@/state/action'
import { mobileMenuBase, menusItems, iconMapNav, userMenuItems } from '@/layout-parts/Nav/Menus'

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

    /*     const { isModalOpen, currentMedia, isSignInModalOpen, breadcrumb, auth } = useSelector((state: IRootState) => ({
            isSignInModalOpen: state.isSignInModalOpen,
            currentMedia: state.currentMedia,
            isModalOpen: state.isModalOpen,
            breadcrumb: state.breadcrumb,
            isPlay: state.isPlaying,
            auth: state.auth
    
        })); */
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

    const isModalOpen = false
    const isSignInModalOpen = false;
    const NavProps = React.useMemo(() => {
        return (
            {
                isSideNavOpen,
                setSideNavOpen: handleSideNavOpen,
                isModalOpen,
                isSignInModalOpen
            }
        )
    }, [
        isSideNavOpen,
        setSideNavOpen,
        handleSideNavOpen,
        isModalOpen,
        isSignInModalOpen
    ])

    return (
        <div>
            {isSignInModalOpen && <SignInSignUpModal />}
            <div className="relative" style={isModalOpen ? { height: '100vh', overflowY: "hidden" } : {}}>
                <Helmet>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Helmet>

                <SideNav {...NavProps} />
                <TopMobile
                    {...NavProps}
                    explorePage={menusItems.explore}
                />
                <TopDesktop {...NavProps} explorePage={menusItems.explore} />
                {isLandingPage ? (
                    <div className={`flex-grow relative z-0 pb-24 sm:pb-0 layout-children drawer-main ${isSideNavOpen ? 'drawer-main-open' : 'drawer-main-close'} `}>
                        {children}
                        <Footer key={shortid()} />
                    </div>
                ) : (
                        <div className={`flex-grow relative z-0 pb-24 sm:pb-0 layout-children drawer-main ${isSideNavOpen ? 'drawer-main-open' : 'drawer-main-close'} `}>

                            <Breadcrumb />
                            <div className="fixed sm:relative w-full" style={{ zIndex: 5000 }}>
                                <MediaPlayer />
                            </div>


                            {children}
                            <LazyLoad>
                                <Footer key={shortid()} />
                            </LazyLoad>
                        </div>
                    )}


                {!isLandingPage && <BottomMobile key={shortid()} {...NavProps} />}
                <CookieConsent />

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