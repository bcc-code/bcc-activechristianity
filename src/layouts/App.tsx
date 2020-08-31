import * as React from 'react'
import { StaticQuery, graphql } from "gatsby"
import TopMobile from '@/layout-parts/Nav/TopMobile'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'
import BottomMobile, { iconMap, IMenuWithIcon } from '@/layout-parts/Nav/BottomMobile'
import SideNav from '@/layout-parts/Nav/SideNav'
import Helmet from 'react-helmet'
const MediaPlayer = loadable(() => import('@/components/MediaPlayer/AudioPlayer'))
import loadable from '@loadable/component'
import Link from '@/components/CustomLink';
import { useDispatch, useSelector } from "react-redux"
import Breadcrumb from '@/components/Breadcrumb'
import CookieConsent from "react-cookie-consent";
import { setLogout, setUser, } from '@/state/action/authAction'
import { getUserFollowing, getUserHistory, getUserLiked, getUserUnfinished } from '@/state/action/userAction'
import SignInSignUpModal from '@/layout-parts/SignInSignUp'
// string
import TS from '@/strings';
import ac_strings from '@/strings/ac_strings.json'
import { auth as authApi } from '@/util/sdk'

// type 
import { IRootState } from '@/state/types'
import { IUser, IMenusQuery, INavItem } from '@/types'


import "@/styles/tailwind-output.css"
import './Layout.css'
import "react-placeholder/lib/reactPlaceholder.css";

export interface IDrawerNav {
    isSideNavOpen: boolean
    setSideNavOpen: (status: boolean) => void
    isModalOpen?: boolean
    menu: INavItem[]
}

const App: React.FC<any> = (props) => {
    const { children } = props

    const dispatch = useDispatch();

    const { isModalOpen, currentMedia, isSignInModalOpen, breadcrumb, isPlay } = useSelector((state: IRootState) => ({
        isSignInModalOpen: state.isSignInModalOpen,
        currentMedia: state.currentMedia,
        isFloating: state.isPlayerFloating,
        isModalOpen: state.isModalOpen,
        mpHeight: state.mpHeight,
        breadcrumb: state.breadcrumb,
        isPlay: state.isPlaying

    }));
    const [isSideNavOpen, setSideNavOpen] = React.useState(false)

    React.useEffect(() => {
        checkUser()
    }, [])


    const checkUser = () => {
        authApi
            .profile()
            .then((res: IUser) => {
                if (res && res.id) {

                    dispatch(setUser(res))
                    dispatch(getUserFollowing())
                    dispatch(getUserLiked())
                    dispatch(getUserHistory())
                    dispatch(getUserUnfinished())
                } else {
                    dispatch(setLogout())
                }
            })
            .catch((err: any) => {
                console.log(err)
                console.log('handle login error')
            })
    }

    const NavProps = {
        isSideNavOpen,
        setSideNavOpen,
        isModalOpen,
        isSignInModalOpen
    }


    return (
        <StaticQuery query={query}
            render={(ghdata: IAppQueryProps) => {
                const { menus, allPages } = ghdata.ac

                let sideMenu: INavItem[] = []
                let desktopMenu: INavItem[] = []
                let mobileMenu: IMenuWithIcon[] = []
                let explorePage: INavItem | undefined = undefined
                Object.keys(iconMap).forEach(label => {

                    const page = allPages.find(page => {
                        /* console.log(page) */
                        return page.label === label
                    })
                    if (page) {

                        if (page.label === "explore") {
                            explorePage = { name: page.title, to: page.slug }
                        }
                        mobileMenu.push(({ name: page.title, to: page.slug, icon: iconMap[page.label] }))
                    }

                })
                menus.forEach(m => {
                    if (`${m.id}` === "6") {
                        desktopMenu = m.menuItems

                    }

                    if (`${m.id}` === "10") {
                        sideMenu = m.menuItems

                    }
                })
                return (
                    <div className="relative" style={isModalOpen ? { height: '100vh', overflowY: "hidden" } : {}}>
                        <Helmet>
                            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                        </Helmet>
                        <SignInSignUpModal />

                        <SideNav {...NavProps} menu={sideMenu} />
                        <TopMobile {...NavProps} breadcrumb={breadcrumb} menu={mobileMenu} />
                        <TopDesktop {...NavProps} menu={desktopMenu} explorePage={explorePage} />

                        <div>


                            <div className={` flex-grow relative z-0 pb-24 layout-children drawer-main drawer-main-${isSideNavOpen ? 'open' : 'close'} `}>
                                {breadcrumb.length > 0 && (
                                    <div className="relative z-50 w-full bg-white pt-2 px-2 hidden sm:block">
                                        <Breadcrumb
                                            items={breadcrumb}
                                        />
                                    </div>
                                )}
                                {currentMedia.audio ? (
                                    <div className="fixed sm:relative w-full" style={{ zIndex: 5000 }}>
                                        <MediaPlayer />
                                    </div>
                                ) : null}

                                {children}
                                {/*   <Footer /> */}
                            </div>

                            <BottomMobile  {...NavProps} menu={mobileMenu} />

                        </div>
                        <CookieConsent
                            location="bottom"
                            buttonText={TS.consent_general_accept}
                            cookieName="myAwesomeCookieName2"
                            style={{ background: "#2B373B" }}
                            buttonStyle={{
                                color: "#2B373B",
                                fontSize: "12px",
                                background: "#F1AD2C",
                                borderRadius: "25px",
                                padding: "0.5rem 1rem"
                            }}
                            expires={150}
                        >
                            {TS.consent_general_main}
                            {" "}
                            <Link style={{ fontSize: "11px" }} to={ac_strings.cookie_policy_slug}>
                                {TS.consent_general_link}
                            </Link>
                        </CookieConsent>
                    </div>
                )
            }}



        />
    )

}

export default App

interface IAppQueryProps {
    ac: {
        menus: {
            id: string
            slug: string
            menuItems: INavItem[]
        }[]

        allPages: {
            title: string
            slug: string
            label: string
        }[]
    }
}
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