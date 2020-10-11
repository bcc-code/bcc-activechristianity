import * as React from "react"

import XScrollCustomSize from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard'
import TS from '@/strings'
import { ITopic } from '@/types'

const TopicRowAndHorizontalScroll: React.FC<{ topics: ITopic[] }> = ({ topics }) => {
    return (
        <>
            <div className="hidden sm:grid grid-cols-6 gap-4 px-4">
                {topics.map(({ name, slug: to }) => {
                    return (
                        <ImgBgTopicCard name={name} to={`${TS.slug_topic}/${to}`} />
                    )
                })}
            </div>
            <XScrollCustomSize
                childeClassName=""
                items={topics.map(({ name, slug: to }) => {
                    return (
                        <div className="flex flex-col items-center">
                            <div className="min-h-24 h-24 w-18" >
                                <ImgBgTopicCard name={name} to={`${TS.slug_topic}/${to}`} />
                            </div>
                        </div>
                    )
                })}
            />
        </>
    )
}

export default TopicRowAndHorizontalScroll