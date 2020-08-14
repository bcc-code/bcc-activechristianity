import * as React from 'react'
import Link from '@/components/CustomLink'
import { useSelector } from 'react-redux'
import { IRootState } from '@/state/types'
import LeftArrow from '@/components/Icons/ArrowLeft'
import TS from '@/strings'
import LogoSmall from '@/images/AC_Logo_sm.png'
import HamburgerIcon from '@/components/Icons/Menu'
import ReactPlaceholder from 'react-placeholder'
import { UserInitial } from '@/layout-parts/User/UserInitial'
import { all } from '@/strings/menu'
import { IDrawerNav } from '@/layouts/App'
import { INavItem } from '@/types'

interface ITopNavMobile extends IDrawerNav {
    breadcrumb: INavItem[]
}
const TopNavMobile: React.FC<ITopNavMobile> = ({ isSideNavOpen, setSideNavOpen, breadcrumb }) => {
    /*     const [showMobileSteps, setShowMobileSteps] = React.useState(false) */
    const [hasDelayedOnce, setHasDelayedOnce] = React.useState(false)
    const [showMobileSteps, setShowMobileSteps] = React.useState(false)
    const authInfo = useSelector((state: IRootState) => state.auth);
    const timerId = React.useRef<NodeJS.Timeout | null>(null)
    const [mobileLastStep, setMobileLastStep] = React.useState<null | INavItem>(null)

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
        let lastStep = breadcrumb && breadcrumb.length > 0 && breadcrumb[breadcrumb.length - 1]

        if (lastStep && breadcrumb.length > 1 && window.location.pathname && window.location.pathname.indexOf(lastStep.to) > -1) {
            lastStep = breadcrumb && breadcrumb[breadcrumb.length - 2]
        }
        return lastStep
    }
    const delayShowSteps = () => {

        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
            setShowMobileSteps(true)
        }, 3000)

    }


    return (

        <div className={`fixed top-0 z-50 bg-white sm:hidden w-full py-2 border border-b-gray-600 drawer-main drawer-main-${isSideNavOpen ? 'mobile-open' : 'close'}`}>
            <span className="flex justify-between items-center">

                {showMobileSteps && mobileLastStep && (
                    <Link className="flex items-center" to={mobileLastStep.to}>
                        <LeftArrow className="h-4 w-4" />
                        <span className="text-sm pl-2">
                            {mobileLastStep.name}
                        </span>
                    </Link>
                )}

                <Link className='flex items-center' to="/">
                    <div className='pr-4'>
                        <img className='w-6 h-auto' src={LogoSmall} alt={TS.site_title} />
                    </div>
                    {!mobileLastStep && (
                        <div >
                            <img
                                style={{ maxWidth: '150px' }}
                                src="https://media.activechristianity.org/2020/04/activechristianity_en_logo_200px.png"
                                alt=""
                            />
                        </div>
                    )
                    }

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
                                to={all.user.to}
                            >
                                <UserInitial className="w-8 h-8" name={authInfo.user ? authInfo.user.name : ""} />
                            </Link>
                        ) : <div></div>
                        }

                    </ReactPlaceholder>
                    <button
                        className="p-2 pl-4 uppdercase text-small text-gray-400 hover:text-gray-800"
                        onClick={() => { setSideNavOpen(true) }}
                    >
                        <HamburgerIcon />
                    </button>
                </div>

            </span>
        </div>
    )
}

export default TopNavMobile

