import * as React from 'react';
import Link from '@/components/CustomLink'
import { IDrawerNav } from '@/layouts/App'
import Icon from '@/components/Icons/Icon'
import { useDispatch, useSelector } from 'react-redux'
import LanguageDropdown from '@/layout-parts/Nav/Languages'
import SocialPlatformas from '@/layout-parts/Nav/SocialPlatforms'
import Submenu from './Submenu'
import { openSignInModal } from '@/state/action'
import { IRootState, IUserState } from '@/state/types'
import { initiateLogout } from '@/state/action/authAction'
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'
const SideMobile: React.FC<IDrawerNav> = ({ isSideNavOpen, setSideNavOpen, menu }) => {
    const [openSubmenu, setOpenSubmenu] = React.useState(false)
    const close = () => setSideNavOpen(false)
    const { authInfo } = useSelector((state: IRootState) => ({ authInfo: state.auth }));
    const dispatch = useDispatch()

    const handleSignIn = () => {
        dispatch(openSignInModal("signInOptions"))

    }

    const handleSignUp = () => {
        dispatch(openSignInModal("signUpOptions"))

    }
    const handleLogout = () => {
        dispatch(initiateLogout())
    }

    const closeSubmenu = () => {
        setOpenSubmenu(false)
        setSideNavOpen(false)
    }
    return (
        <div
            className={`drawer-side drawer-side-${isSideNavOpen ? 'open' : 'close'} bg-d4gray-light w-full h-full px-4 py-8 sm:py-16 flex flex-col justify-between xs:w-mobile xs:left-auto xs:shadow overflow-y-scroll fixed top-0 right-0 bottom-0`}
        >
            <Submenu
                isSideNavOpen={openSubmenu}
                close={closeSubmenu}
                user={authInfo}
            />
            <div className="absolute right-0 top-0 p-4 py-6" onClick={close}>
                <Icon name="Close" size="6" />
            </div>
            <div className="w-full flex justify-center sm:hidden">
                <LanguageDropdown className="border px-4 py-2 rounded mb-4" />
            </div>

            <div className="mx-auto flex flex-col font-roboto items-center font-semibold">
                {menu.map((item, i) => {
                    return (
                        <Link key={i} to={item.to} className=" px-4 py-2" onClick={close}>
                            {item.name}
                        </Link>
                    )
                })}
                {authInfo.loggedIn === 'success' ? (
                    <div className={`flex flex-col justify-center`}>
                        <Link
                            className="py-2 hidden sm:block"
                            to={`/${ac_strings.slug_user}`}
                        >
                            {ac_strings.title_user}
                        </Link>
                        <span onClick={() => { setOpenSubmenu(true) }}>{ac_strings.title_user} <Icon name="KeyboardArrowRight" size="6" /></span>
                        <span className="py-2 text-center" onClick={handleLogout}>{TS.logout}</span>

                    </div>
                ) : (
                        authInfo.loggedIn === "loading" ? (
                            <div className="px-2">
                                {ac_strings.loading}
                            </div>
                        ) : (
                                <div className={`flex flex-col`}>
                                    <span className="whitespace-no-wrap p-2 text-center" onClick={handleSignIn}>{TS.login}</span>
                                    <span className="p-2 text-center" onClick={handleSignUp}>{TS.register}</span>
                                </div>

                            )
                    )}

            </div>

            <div className="pt-4 text-d4slate-light">
                <SocialPlatformas />
            </div>
        </div >
    )
}

export default React.memo(SideMobile)
