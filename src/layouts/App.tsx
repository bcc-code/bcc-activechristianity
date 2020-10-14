import * as React from 'react'
import loadable from '@loadable/component'
import { StaticQuery, graphql } from "gatsby"
import BottomMobile, { iconMapNav, IMenuWithIcon } from '@/layout-parts/Nav/BottomMobile'
import Breadcrumb from '@/components/Breadcrumb'
import CookieConsent from "react-cookie-consent";
import Footer from '@/layout-parts/Footer'
import Helmet from 'react-helmet'
import Link from '@/components/CustomLink';
const MediaPlayer = loadable(() => import('@/components/MediaPlayer/AudioPlayer'))
import TopMobile from '@/layout-parts/Nav/TopMobile'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'
import SideNav from '@/layout-parts/Nav/SideNav/index.tsx'
import SignInSignUpModal from '@/layout-parts/SignInSignUp'

import { useDispatch, useSelector } from "react-redux"
import { setLogout, setUser, } from '@/state/action/authAction'
import { getUserLibrary } from '@/state/action/userAction'

// string
import TS from '@/strings';
import ac_strings from '@/strings/ac_strings.json'
import acApi from '@/util/api'
// type 
import { IRootState } from '@/state/types'
import { IUser, IMenusQuery, INavItem } from '@/types'


import "@/styles/tailwind-output.css"
import './Layout.css'
import "react-placeholder/lib/reactPlaceholder.css";
import auth from '@/state/reducer/authReducer'

export interface IDrawerNav {
    isSideNavOpen: boolean
    setSideNavOpen: (status: boolean) => void
    isModalOpen?: boolean
    menu: INavItem[]
}


const App: React.FC<{ pageContext: { title?: string, slug?: string }, location: { pathname: string } }> = (props) => {
    const { children, pageContext, location } = props

    const dispatch = useDispatch();

    const { isModalOpen, currentMedia, isSignInModalOpen, breadcrumb, auth } = useSelector((state: IRootState) => ({
        isSignInModalOpen: state.isSignInModalOpen,
        currentMedia: state.currentMedia,
        isFloating: state.isPlayerFloating,
        isModalOpen: state.isModalOpen,
        mpHeight: state.mpHeight,
        breadcrumb: state.breadcrumb,
        isPlay: state.isPlaying,
        auth: state.auth

    }));
    const [isSideNavOpen, setSideNavOpen] = React.useState(false)



    React.useEffect(() => {
        checkUser()
    }, [])


    const checkUser = () => {
        acApi
            .profile()
            .then((res: IUser) => {
                if (res && res.id) {

                    dispatch(setUser(res))
                    dispatch(getUserLibrary())

                } else {
                    dispatch(setLogout())
                }
            })
            .catch((err: any) => {
                dispatch(setLogout())
                console.log('handle login error')
            })
    }

    const NavProps = React.useMemo(() => (
        {
            isSideNavOpen,
            setSideNavOpen,
            isModalOpen,
            isSignInModalOpen
        }
    ), [

        isSideNavOpen,
        setSideNavOpen,
        isModalOpen,
        isSignInModalOpen

    ])


    return (
        <StaticQuery query={query}
            render={(ghdata: IAppQueryProps) => {
                const { menus, allPages } = ghdata.ac
                let sideResourceMenu: INavItem[] = []
                let sideMenu: INavItem[] = []
                let desktopMenu: INavItem[] = []
                let mobileMenu: IMenuWithIcon[] = []
                let explorePage: INavItem | undefined = undefined


                Object.keys(iconMapNav).forEach(label => {

                    const page = allPages.find(page => {
                        /* console.log(page) */
                        return page.label === label
                    })
                    if (page) {

                        if (page.label === "explore") {
                            explorePage = { name: page.title, to: page.slug }
                        }
                        sideResourceMenu.push({ name: page.title, to: page.slug })
                        mobileMenu.push(({ name: page.title, to: page.slug, icon: iconMapNav[page.label] }))
                    }

                })

                if (auth.loggedIn !== "success") {
                    mobileMenu.unshift({ name: ac_strings.home, to: "/", icon: iconMapNav["home"] })
                } else {
                    mobileMenu.push({ name: "My Content", to: "/user/my-content", icon: iconMapNav["my-content"] })
                }

                const findGlossary = allPages.find(p => p.label === "build-glossaries")
                if (findGlossary) {
                    sideResourceMenu.push({ name: findGlossary.title, to: findGlossary.slug })
                }
                menus.forEach(m => {
                    if (`${m.id}` === process.env.DESKTOP_NAV_ID) {
                        desktopMenu = m.menuItems

                    }

                    if (`${m.id}` === process.env.SIDE_NAV_ID) {
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

                        <SideNav {...NavProps} menu={sideMenu} resoureMenu={sideResourceMenu} />
                        <TopMobile
                            {...NavProps}
                            breadcrumb={breadcrumb}
                            menu={mobileMenu}
                            currentPage={{ name: pageContext.title, to: location.pathname }}
                            explorePage={explorePage}
                        />
                        <TopDesktop {...NavProps} menu={desktopMenu} explorePage={explorePage} />

                        <div>


                            <div className={` flex-grow relative z-0 pb-24 layout-children drawer-main drawer-main-${isSideNavOpen ? 'open' : 'close'} `}>
                                {breadcrumb.items.length > 0 && (
                                    <div className="relative z-50 w-full bg-white pt-2 px-4 hidden sm:block">
                                        <Breadcrumb {...breadcrumb} />
                                    </div>
                                )}
                                {currentMedia.audio ? (
                                    <div className="fixed sm:relative w-full" style={{ zIndex: 5000 }}>
                                        <MediaPlayer />
                                    </div>
                                ) : null}

                                {children}
                                <Footer />
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
                            <Link style={{ fontSize: "11px" }} to={ac_strings.slug_cookie_policy}>
                                {TS.consent_general_link}
                            </Link>
                        </CookieConsent>
                    </div>
                )
            }}



        />
    )

}

export default React.memo(App)

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