import * as React from "react"
import Link from '@/components/CustomLink'
import { useSwipeable } from "react-swipeable"
import { ITaxonomy } from '@/types/wpPostType'

import RightImg from '@/components/PostItem/RightImgWDes'
import Icon from '@/components/Icons'
import NewForYouHeader from './header'
import TS from '@/strings'
import { IPostItem } from '@/types'

import './NewForYou.css'

export interface INewForYou {
    icon: () => JSX.Element,
    topic: ITaxonomy,
    post: IPostItem
}

interface IProps {
    topics: INewForYou[]
}
const NewForYou: React.FC<IProps> = ({ topics }) => {
    const [activeTab, setActiveTab] = React.useState<number>(0)

    const handleTabClick = (index: number) => {
        setActiveTab(index)
    }
    const nextIndex = (activeTab + 1) % topics.length
    const lastIndex = activeTab - 1 < 0 ? topics.length - 1 : activeTab - 1

    const handlers = useSwipeable({
        onSwipedLeft: () => setActiveTab(nextIndex),
        onSwipedRight: () => setActiveTab(lastIndex),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div>
            <div className="bg-d4slate-lighter py-4 max-w-lg">
                <div className="px-4">
                    <NewForYouHeader />
                </div>
                <span className="px-4 flex items-center pb-6 relative">
                    {topics.map((item, i) => {
                        const TabIcon = item.icon
                        return (
                            <button
                                className="w-12 h-12 p-2 rounded-full bg-white mr-4 focus:outline-none"
                                onClick={() => { handleTabClick(i) }}
                                key={i}
                            >
                                <TabIcon />
                            </button>
                        )
                    })}

                    <span
                        className="block absolute bottom-0 mb-3 ml-4 w-4 h-1 block bg-gray-600 rounded icon-tab-marker"
                        style={{ left: `${activeTab * 64}px` }}
                    />
                </span>
                <div className='icon-tab-card-wrapper overflow-hidden' {...handlers}>
                    {topics.map((topic, i) => {
                        let postClassName = ''
                        if (i === activeTab) {
                            postClassName = 'current'
                        } else if (i > activeTab) {
                            postClassName = 'next'
                        } else if (i < activeTab) {
                            postClassName = 'prev'
                        }

                        const tags = topic.post.tags ? topic.post.tags : []

                        return (
                            <div className={`icon-tab-${postClassName} icon-tab-card px-4`}>
                                <div className="bg-white flex flex-col items-center px-2 border border-gray-300 rounded-lg sm:max-w-sm cursor-pointer">
                                    {tags.length > 0 && (
                                        <Link className="flex justify-between w-full border-b border-gray-200 py-2" to={`${TS.slug_post_tag}/${tags[0].slug}`}>
                                            <div>
                                                <span className="rounded uppercase p-1 text-xs">{tags[0].name}</span>
                                            </div>
                                            <Icon name="right-arrow" size="lg" />
                                        </Link >
                                    )}
                                    <div className="flex py-2 w-full">
                                        <RightImg  {...topic.post} />

                                    </div>
                                </div >
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default NewForYou