import * as React from "react"
import { useSwipeable } from "react-swipeable"
import ImageRound from '@/components/Images/ImageRound'
import { IImage } from '@/types'
import './scrollNavTabs.css'


interface IProps {
    tabs: {
        header: {
            image: IImage,
            name: string
        },
        content: React.ReactNode,
    }[]
}
const NewForYou: React.FC<IProps> = ({ tabs }) => {
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
        <div>

            <span className="px-4 flex items-center pb-6 relative overflow-scroll py-">
                {tabs.map((item, i) => {

                    return (
                        <button
                            className={`pt-6`}
                            onClick={() => { handleTabClick(i) }}
                            key={i}
                        >
                            <div className={`w-20 h-20 rounded-full  mx-1 ${activeTab === i ? 'border-d4slate-dark border-2' : ''}`}>
                                <ImageRound {...item.header.image} />
                            </div>
                            <span className={`text-roboto text-xs ${activeTab === i ? 'font-semibold' : ''}`}>{item.header.name}</span>
                        </button>
                    )
                })}
                <span
                    className="absolute bottom-0 mb-5 block rounded ac-tab-marker"
                    style={{ left: `${activeTab * 92}px`, width: "20px", height: "2px", marginLeft: "42px", backgroundColor: "#ED8C61" }}
                />
                {/*                 <span
                    className="absolute bottom-0 mb-5 block rounded ac-tab-marker"
                    style={{ left: `${activeTab * 88}px`, width: "20px", height: "2px", marginLeft: "50px", backgroundColor: "#ED8C61" }}
                /> */}
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
                        <div className={`ac-tab-${postClassName} ac-tab-card px-4`}>
                            {tab.content}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default NewForYou