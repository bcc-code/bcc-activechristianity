import * as React from "react"

import XScrollCustomSize from '@/components/HorizontalScroll/BaseCustomSize'
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard'
import ac_strings from '@/strings/ac_strings.js'
import { ITopic } from '@/types'
import shortid from 'shortid'
const TopicRowAndHorizontalScroll: React.FC<{ topics: ITopic[] }> = ({ topics }) => {
    return (
        <>
            <div className="hidden sm:grid grid-cols-6 gap-4 px-4">
                {topics.map(({ name, slug: to, image }) => {
                    return (
                        <div className="min-h-24 h-24" key={shortid()}  >
                            <ImgBgTopicCard
                                name={name}
                                to={`${ac_strings.slug_topic}/${to}`}
                                image={image}
                                rounded="rounded-xxl"
                            />
                        </div>
                    )
                })}
            </div>
            <XScrollCustomSize
                childeClassName=""
                items={topics.map(({ name, slug: to, image }) => {
                    return (
                        <div className="flex flex-col items-center" key={shortid()} >
                            <div style={{ width: "100px", height: "138px" }}>
                                <ImgBgTopicCard
                                    name={name}
                                    to={`${ac_strings.slug_topic}/${to}`}
                                    image={image}
                                    rounded="rounded-xxl"
                                />
                            </div>
                        </div>
                    )
                })}
            />
        </>
    )
}

export default TopicRowAndHorizontalScroll