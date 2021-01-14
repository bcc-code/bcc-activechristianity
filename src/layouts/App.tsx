import * as React from 'react'
import loadable from '@loadable/component'
import { StaticQuery, graphql } from "gatsby"
import BottomMobile, { IMenuWithIcon } from '@/layout-parts/Nav/BottomMobile'
import Breadcrumb from '@/components/Breadcrumb'
import CookieConsent from "react-cookie-consent";
import Footer from '@/layout-parts/Footer'
import Helmet from 'react-helmet'
import Link from '@/components/CustomLink';
import { KeyboardArrowRightIcon, CloseIcon } from '@/components/Icons/MUI'
const MediaPlayer = loadable(() => import('@/components/MediaPlayer/AudioPlayerGlobal'))
import TopMobile from '@/layout-parts/Nav/TopMobile'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'
import SideNav from '@/layout-parts/Nav/SideNav/index.tsx'
import SignInSignUpModal from '@/layout-parts/SignInSignUp'
import shortid from 'shortid'
import { useDispatch, useSelector } from "react-redux"
import { setLogout, setUser, } from '@/state/action/authAction'
import { getUserLibrary } from '@/state/action/userAction'
import { setIsModalOpen, openSignInModal } from '@/state/action'
import Cookies from 'js-cookie'
import { desktopMenu, mobileMenuBase, sideMenu, sideResourceMenu, menusItems, iconMapNav, userMenuItems } from '@/layout-parts/Nav/Menus'

// string
import ac_strings from '@/strings/ac_strings.js'

import acApi from '@/util/api'
// type 
import { IRootState } from '@/state/types'
import { IUser, INavItem } from '@/types'


import './Layout.css'


export interface IDrawerNav {
    isSideNavOpen: boolean
    setSideNavOpen: (status: boolean) => void
    isModalOpen?: boolean
    menu: INavItem[]
}


const App: React.FC<{ pageContext: { title?: string, slug?: string }, location: { pathname: string } }> = (props) => {
    const { children, pageContext, location } = props

    const isLandingPage = location && location.pathname && location.pathname.indexOf('campaign/') > -1
    const cookieName = 'ac.revert_to_original'

    const showInfoBanner = Cookies.get(cookieName);

    const dispatch = useDispatch();

    const { isModalOpen, currentMedia, isSignInModalOpen, breadcrumb, auth } = useSelector((state: IRootState) => ({
        isSignInModalOpen: state.isSignInModalOpen,
        currentMedia: state.currentMedia,
        isModalOpen: state.isModalOpen,
        breadcrumb: state.breadcrumb,
        isPlay: state.isPlaying,
        auth: state.auth

    }));
    const [isSideNavOpen, setSideNavOpen] = React.useState(false)
    const [isInfoBarOpen, setIsInfoBarOpen] = React.useState(showInfoBanner !== "true")

    React.useEffect(() => {
        checkUser()

    }, [])

    const setNotIsInfoBarOpen = () => {
        setIsInfoBarOpen(false)
        Cookies.set(cookieName, 'true')
    }

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
    let mobileMenu: IMenuWithIcon[] = mobileMenuBase.map(item => ({ ...menusItems[item], icon: iconMapNav[item] }))
    if (auth.loggedIn !== "success") {
        mobileMenu.unshift({ ...menusItems.home, icon: iconMapNav["home"] })
    } else {
        mobileMenu.push({
            ...userMenuItems.myContent,
            icon: iconMapNav["my-content"]
        })
    }

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
                explorePage={menusItems.explore}
            />
            <TopDesktop {...NavProps} menu={desktopMenu} explorePage={menusItems.explore} />
            {isLandingPage ? (
                <div className={`flex-grow relative z-0 pb-24 sm:pb-0 layout-children drawer-main ${isSideNavOpen ? 'drawer-main-open' : 'drawer-main-close'} `}>
                    {children}
                    <Footer key={shortid()} />
                </div>
            ) : (
                    <div className={`flex-grow relative z-0 pb-24 sm:pb-0 layout-children drawer-main ${isSideNavOpen ? 'drawer-main-open' : 'drawer-main-close'} `}>

                        {isInfoBarOpen && process.env.LOCALE === "en" && (
                            <div className={"fixed sm:relative flex items-center bg-info-bar py-2 text-xs leading-snug text-ac-slate-dark"} style={{ zIndex: 100 }}>
                                <a href={process.env.SITE_URL} className="standard-max-w-px text-left w-full mx-auto">
                                    Revert back to original version here. Note that your old login details will apply.
                    <button onClick={setNotIsInfoBarOpen}>
                                        <KeyboardArrowRightIcon
                                            customSize="4"
                                        />
                                    </button>
                                </a>
                                <div onClick={() => setIsInfoBarOpen(false)} className="p-2">
                                    <CloseIcon
                                        customSize="4"
                                    />
                                </div>

                            </div>
                        )}
                        {breadcrumb.items.length > 0 && (
                            <div className="relative z-50 w-full bg-white px-4 hidden sm:block standard-max-w i">
                                <Breadcrumb {...breadcrumb} />
                            </div>
                        )}
                        {currentMedia.audio ? (
                            <div className="fixed sm:relative w-full" style={{ zIndex: 5000 }}>
                                <MediaPlayer />
                            </div>
                        ) : null}

                        {children}
                        <Footer key={shortid()} />
                    </div>
                )}


            {!isLandingPage && <BottomMobile key={shortid()} {...NavProps} menu={mobileMenu} />}
            <CookieConsent
                location="bottom"
                buttonText={ac_strings.consent_general_accept}
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
                {ac_strings.consent_general_main}
                {" "}
                <Link style={{ fontSize: "11px" }} to={ac_strings.slug_cookie_policy}>
                    {ac_strings.consent_general_link}
                </Link>
            </CookieConsent>
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