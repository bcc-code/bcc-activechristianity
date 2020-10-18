import * as React from 'react'
import Link from '@/components/CustomLink'
import { useSelector } from 'react-redux'
import { IRootState } from '@/state/types'
import TS from '@/strings'
import LogoSmall from '@/images/AC_Logo_sm.png'
import Icon from '@/components/Icons/Icon'
import { navigate } from "gatsby"
import ReactPlaceholder from 'react-placeholder'
import { UserInitial } from '@/layout-parts/User/UserInitial'
import ac_strings from '@/strings/ac_strings.json'
import { IDrawerNav } from '@/layouts/App'
import { INavItem, IBreadcrumb } from '@/types'
import './topmobile.css'

interface IHistoryPage { name?: string, to: string }
interface ITopNavMobile extends IDrawerNav {
    breadcrumb: IBreadcrumb
    currentPage: IHistoryPage
    explorePage?: INavItem
}

/*
    React.useEffect(() => {

        if (location.pathname) {
            setHistory([...history, { to: location.pathname, name: pageContext.title }])
        }
    }, [pageContext])
*/
const TopNavMobile: React.FC<ITopNavMobile> = ({ isSideNavOpen, setSideNavOpen, breadcrumb, currentPage, menu, explorePage }) => {

    /*     const [showMobileSteps, setShowMobileSteps] = React.useState(false) */
    const [hasDelayedOnce, setHasDelayedOnce] = React.useState(false)
    const [showMobileSteps, setShowMobileSteps] = React.useState(false)
    const [history, setHistory] = React.useState<IHistoryPage[]>([])
    const [isBack, setIsback] = React.useState(false)
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
        // remove all history if visit one of the 4 main pages
        const find = menu.find(item => item.to === location.pathname || `/${item.to}` === location.pathname)

        setIsback(false)
        if (find) {
            setHistory([currentPage])
        } else if (isBack) {
            // if user clicked the back button, update the history accordingly
            if (history.length > 0) {

                let updateHistory = history.slice(0, history.length - 1)

                setHistory(updateHistory)

            }

        } else {
            // if user keep browsing. 
            if (history.length > 0) {


                if (history[history.length - 1].to !== currentPage.to) {
                    setHistory([...history, currentPage])
                }
            } else {
                setHistory([...history, currentPage])
            }


        }


    }, [currentPage.to])
    React.useEffect(() => {

        if (history.length > 1) {

            const lastStep = history[history.length - 2]
            setMobileLastStep({
                name: lastStep.name ? lastStep.name : ac_strings.back,
                to: ''
            })
        } else {
            let lastStep = getLastStep()
            if (lastStep && lastStep.to) {
                setMobileLastStep(lastStep)
                delayShowSteps()
            } else {
                setMobileLastStep(null)
            }
        }

        delayShowSteps()


        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
        }
    }, [breadcrumb])
    const handleBackClick = () => {

        if (typeof window !== "undefined") {
            if (history.length > 1) {
                setIsback(true)
                navigate(-1)
            } else if (mobileLastStep) {
                setHistory([])
                navigate(`/${mobileLastStep.to}`)
            }
        }

    }

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
                                <button className="flex items-center" onClick={handleBackClick}>
                                    <span className="pl-2">
                                        <Icon name="KeyboardArrowLeft" size="6" />
                                    </span>

                                    <span className="text-sm pl-2">
                                        {mobileLastStep.name}
                                    </span>
                                </button>
                            ) : (
                                    <div className="text-sm pl-6 font-semibold">
                                        {breadcrumb.title.length > 16 ? '' : breadcrumb.title}
                                    </div>
                                )
                            }
                        </div>
                        <Link className='pr-4' to="/">
                            <img className='w-6 h-auto' src={LogoSmall} alt={TS.site_title} />
                        </Link>
                        <div className="flex items-center">
                            {explorePage && (
                                <Link to={explorePage.to}>
                                    <Icon name="Search" size="6" />
                                </Link>
                            )}
                            <button
                                className="p-2 px-4 uppdercase text-small"
                                onClick={() => { setSideNavOpen(true) }}
                            >
                                <Icon name="Menu" size="6" />
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

