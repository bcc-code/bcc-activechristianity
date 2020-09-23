import * as React from "react"
import { useSwipeable } from "react-swipeable"
import { ITab } from '@/types'
import './scrollNavTabs.css'

interface IProps {
    tabs: ITab[]
}


const TwoToThreeTabs: React.FC<IProps> = ({ tabs }) => {

    const [activeTab, setActiveTab] = React.useState<number>(0)

    const handleTabClick = (index: number) => {
        setActiveTab(index)
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
        <div className="relative  mt-8 pb-2">

            <span className="flex items-center pb-6 relative">
                {tabs.map((item, i) => {

                    return (
                        <button
                            className="w-1/2  bg-white mr-4 focus:outline-none"
                            onClick={() => { handleTabClick(i) }}
                            key={i}
                        >
                            {item.name}
                        </button>
                    )
                })}

                <span
                    className="absolute bottom-0 mb-3 h-1 block border-b border-d4primary ac-tab-marker"
                    style={{ left: `${activeTab * (100 / tabs.length)}%`, width: `${(100 / tabs.length)}%` }}
                />
            </span>
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
                        <div className={`ac-tab-${postClassName} ac-tab-card `}>
                            {tab.content}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default TwoToThreeTabs