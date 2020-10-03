import * as React from "react"
import { useSwipeable } from "react-swipeable"
import Icon from '@/components/Icons'
import { SolidDarkBgToggleActive } from '@/components/Button'
import { ITab } from '@/types'
import { SmoothHorizontalScrolling } from '@/helpers'
import './scrollNavTabs.css'

interface IProps {
    tabs: ITab[]
}
const HScrollNav: React.FC<IProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = React.useState<number>(0)
    const menuEl = React.useRef<HTMLDivElement>(null);
    const activeEl = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {

        moveActiveTab()

    }, [activeTab])
    const handleTabClick = (index: number) => {
        setActiveTab(index)
    }
    const nextIndex = (activeTab + 1) % tabs.length
    const lastIndex = activeTab - 1 < 0 ? tabs.length - 1 : activeTab - 1

    const moveActiveTab = () => {
        if (menuEl && menuEl.current) {
            const menu = menuEl.current
            if (activeEl.current) {
                const active = activeEl.current
                const activeMidPoint = active.clientWidth / 2
                const menuMidPoint = menu.clientWidth / 2
                const activeOffset = active.offsetLeft
                const currentLeftScroll = menu.scrollLeft
                const distanceToMid = activeOffset - (menuMidPoint + currentLeftScroll) + activeMidPoint
                SmoothHorizontalScrolling(menu, 200, currentLeftScroll, distanceToMid)

            }
        }
    }
    const handlers = useSwipeable({
        onSwipedLeft: () => setActiveTab(nextIndex),
        onSwipedRight: () => setActiveTab(lastIndex),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className="relative scroll-tabs-background">
            <div className="absolute right-0 z-40 pt-6 pr-2">
                <Icon name="chev-right" size="xs" />
            </div>
            <div
                ref={menuEl}
                className="scroll-snap-x-container scroll-snap-x-container-start overflow-x-auto whitespace-no-wrap flex items-center relative pt-4 pb-2"
            >

                {tabs.map((item, i) => {
                    return (
                        <button
                            className={`scroll-snap-x-child-start font-roboto ml-2`}
                            onClick={() => { handleTabClick(i) }}
                            key={i}
                            ref={activeTab === i ? activeEl : undefined}
                        >
                            < SolidDarkBgToggleActive
                                active={activeTab === i}
                            >
                                {item.name}
                            </ SolidDarkBgToggleActive>
                        </button>
                    )
                })}
                <div className="min-w-24 h-4"></div>
            </div>
            <div className='ac-tab-card-wrapper overflow-hidden' {...handlers}>
                {tabs.map((tab, i) => {
                    let postClassName = ''
                    if (i === activeTab) {
                        postClassName = 'current'
                    } else if (i > activeTab) {
                        postClassName = 'next'
                    } else if (i < activeTab) {
                        postClassName = 'prev'
                    }
                    return (
                        <div className={`ac-tab-${postClassName} ac-tab-card px-4`}>
                            {tab.content}
                        </div>
                    )
                })}
            </div>

        </div >
    )
}

export default HScrollNav