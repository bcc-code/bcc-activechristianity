import * as React from "react"
import { useSwipeable } from "react-swipeable"
import Icon from '@/components/Icons'
import { INavItem } from '@/types'
import { SmoothHorizontalScrolling } from '@/helpers'
import './scrollNavTabs.css'

interface ITab extends INavItem {
    content: JSX.Element
}
interface IProps {
    tabs: ITab[]
}
const HScrollNav: React.FC<IProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = React.useState<number>(0)
    const menuEl = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {



    }, [activeTab])
    const handleTabClick = (index: number, e: any) => {

        setActiveTab(index)

        if (menuEl && menuEl.current) {
            const menu = menuEl.current
            const activeMidPoint = e.target.clientWidth / 2
            const menuMidPoint = menu.clientWidth / 2
            const activeOffset = e.target.offsetLeft
            const currentLeftScroll = menu.scrollLeft
            const distanceToMid = activeOffset - (menuMidPoint + currentLeftScroll) + activeMidPoint
            SmoothHorizontalScrolling(menu, 200, currentLeftScroll, distanceToMid)
            /*  menu.scrollLeft = currentLeftScroll + distanceToMid */

        }

    }
    const nextIndex = (activeTab + 1) % tabs.length
    const lastIndex = activeTab - 1 < 0 ? tabs.length - 1 : activeTab - 1

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
                style={{ scrollBehavior: 'smooth' }}
            >

                {tabs.map((item, i) => {
                    return (
                        <button
                            className={`scroll-snap-x-child-start font-roboto py-1 px-2 bg-white ml-2 text-sm focus:outline-none ${activeTab === i ? 'bg-gray-200 rounded-lg font-semibold' : ''}`}
                            onClick={(e) => { handleTabClick(i, e) }}
                            key={i}
                        >
                            {item.name}
                        </button>
                    )
                })}
                <div className="scroll-snap-x-child-start min-w-20 min-h-4">

                </div>
            </div>
            <div className='icon-tab-card-wrapper overflow-hidden' {...handlers}>
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
                        <div className={`icon-tab-${postClassName} icon-tab-card px-4`}>
                            {tab.content}
                        </div>
                    )
                })}
            </div>

        </div >
    )
}

export default HScrollNav