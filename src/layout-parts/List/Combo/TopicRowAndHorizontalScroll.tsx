import * as React from "react"

import XScrollCustomSize from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard'
import TS from '@/strings'
import { ITopic } from '@/types'
import shortid from 'shortid'
const TopicRowAndHorizontalScroll: React.FC<{ topics: ITopic[] }> = ({ topics }) => {

    return (
        <>
            <div className="hidden sm:grid grid-cols-6 gap-4 px-4">
                {topics.map(({ name, slug: to, image }) => {
                    return (
                        <div className="min-h-24 h-24" key={shortid()}  >
                            <ImgBgTopicCard name={name} to={`${TS.slug_topic}/${to}`} image={image} />
                        </div>
                    )
                })}
            </div>
            <XScrollCustomSize
                childeClassName=""
                items={topics.map(({ name, slug: to, image }) => {
                    return (
                        <div className="flex flex-col items-center" key={shortid()} >
                            <div className="min-h-36 h-36 w-24" >
                                <ImgBgTopicCard name={name} to={`${TS.slug_topic}/${to}`} image={image} />
                            </div>
                        </div>
                    )
                })}
            />
        </>
    )
}

export default TopicRowAndHorizontalScroll