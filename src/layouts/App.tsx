import * as React from 'react'
import TopMobile from '@/layout-parts/Nav/TopMobile'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'
import BottomMobile from '@/layout-parts/Nav/BottomMobile'
import SideNav from '@/layout-parts/Nav/SideNav'
import Helmet from 'react-helmet'
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
import hardcodedurls from '@/strings/hardcodedurls.json'
import { auth as authApi } from '@/util/sdk'

// type 
import { IRootState } from '@/state/types'
import { IUser } from '@/types'


import "@/styles/tailwind-output.css"
import './Layout.css'
import "react-placeholder/lib/reactPlaceholder.css";

export interface IDrawerNav {
    isSideNavOpen: boolean
    setSideNavOpen: (status: boolean) => void
    isModalOpen?: boolean
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
        <div className="relative" style={isModalOpen ? { height: '100vh', overflowY: "hidden" } : {}}>
            <Helmet>
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <SignInSignUpModal />
            <SideNav {...NavProps} />
            <TopMobile {...NavProps} breadcrumb={breadcrumb} />
            <TopDesktop {...NavProps} />

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
                            {/* <MediaPlayer /> */}
                        </div>
                    ) : null}

                    {children}
                    {/*   <Footer /> */}
                </div>

                <BottomMobile  {...NavProps} />

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
                <Link style={{ fontSize: "11px" }} to={hardcodedurls.cookiePolicy}>
                    {TS.consent_general_link}
                </Link>
            </CookieConsent>
        </div>
    )

}

export default App