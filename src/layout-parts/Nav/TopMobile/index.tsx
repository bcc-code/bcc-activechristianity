import * as React from 'react'
import Link from '@/components/CustomLink'
import { useSelector } from 'react-redux'
import { IRootState } from '@/state/types'
import TS from '@/strings'
import LogoSmall from '@/images/AC_Logo_sm.png'
import Icon from '@/components/Icons'

import ReactPlaceholder from 'react-placeholder'
import { UserInitial } from '@/layout-parts/User/UserInitial'
import ac_strings from '@/strings/ac_strings.json'
import { IDrawerNav } from '@/layouts/App'
import { INavItem, IBreadcrumb } from '@/types'
import './topmobile.css'
interface ITopNavMobile extends IDrawerNav {
    breadcrumb: IBreadcrumb
}
const TopNavMobile: React.FC<ITopNavMobile> = ({ isSideNavOpen, setSideNavOpen, breadcrumb }) => {
    /*     const [showMobileSteps, setShowMobileSteps] = React.useState(false) */
    const [hasDelayedOnce, setHasDelayedOnce] = React.useState(false)
    const [showMobileSteps, setShowMobileSteps] = React.useState(false)

    const authInfo = useSelector((state: IRootState) => state.auth);
    const timerId = React.useRef<NodeJS.Timeout | null>(null)
    const [mobileLastStep, setMobileLastStep] = React.useState<null | INavItem>(null)
    const languageLogoSrc = "https://media.activechristianity.org/2020/04/activechristianity_en_logo_200px.png"
    React.useEffect(() => {
        if (!hasDelayedOnce) {
            setHasDelayedOnce(true)
            delayShowSteps()
        }
    }, [hasDelayedOnce])

    React.useEffect(() => {

        let lastStep = getLastStep()
        if (typeof window !== "undefined") {
            if (lastStep && lastStep.to) {
                setMobileLastStep(lastStep)
            } else {
                setMobileLastStep(null)
            }
        }
    }, [breadcrumb])

    const getLastStep = () => {
        let lastStep = breadcrumb && breadcrumb.items.length > 0 && breadcrumb.items[breadcrumb.items.length - 1]

        if (lastStep && breadcrumb.items.length > 1 && breadcrumb.title === lastStep.name) {
            lastStep = breadcrumb && breadcrumb.items[breadcrumb.items.length - 2]
        }
        return lastStep
    }
    const delayShowSteps = () => {

        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
            setShowMobileSteps(true)
        }, 5000)

    }


    return (

        <div className={`fixed w-full top-0 z-50 sm:hidden  drawer-main drawer-main-${isSideNavOpen ? 'mobile-open' : 'close'}`}>
            <div className={`cube-wrapper`}>
                <div className={`cube ${showMobileSteps ? 'cube-row' : ''}`}>
                    <div className="cube-top flex justify-between items-center w-full">
                        <div className=" min-w-20 font-roboto">
                            {showMobileSteps && mobileLastStep ? (
                                <Link className="flex items-center" to={mobileLastStep.to}>
                                    <Icon name="chev-left" size="sm" className="pl-2" />
                                    <span className="text-sm pl-2">
                                        {mobileLastStep.name}
                                    </span>
                                </Link>
                            ) : (
                                    <div className="text-sm pl-6 font-semibold">
                                        {breadcrumb.title}
                                    </div>
                                )
                            }
                        </div>
                        <Link className='pr-4' to="/">
                            <img className='w-6 h-auto' src={LogoSmall} alt={TS.site_title} />
                        </Link>
                        <div className="flex items-center">
                            <ReactPlaceholder
                                className="m-2 w-8 h-8"

                                type="round"
                                ready={authInfo.loggedIn !== "loading"}
                                showLoadingAnimation={true}
                            >
                                {authInfo.loggedIn === 'success' ? (
                                    <Link
                                        className=""
                                        to={ac_strings.slug_user}
                                    >
                                        <UserInitial className="w-8 h-8" name={authInfo.user ? authInfo.user.name : ""} />
                                    </Link>
                                ) : <div></div>
                                }

                            </ReactPlaceholder>
                            <button
                                className="p-2 px-4 uppdercase text-small"
                                onClick={() => { setSideNavOpen(true) }}
                            >
                                <Icon name="menu" size="lg" />
                            </button>
                        </div>
                    </div>
                    <div className="cube-front flex justify-center items-center py-2 w-full">
                        <Link className='flex items-center' to="/">
                            <div className='pr-4'>
                                <img className='w-6 h-auto' src={LogoSmall} alt={TS.site_title} />
                            </div>
                            <div >
                                <img
                                    style={{ maxWidth: '150px' }}
                                    src={languageLogoSrc}
                                    alt={TS.site_title}
                                />
                            </div>


                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default React.memo(TopNavMobile)

