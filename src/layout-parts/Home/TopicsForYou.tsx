import * as React from "react"
import { graphql, Link } from "gatsby";
import CardSimple from "@/components/Cards/SolidTopicCard"
import { ITopic } from '@/types'
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'
const TopicsForYou: React.FC<{ topics: ITopic[] }> = ({ topics }) => {

    return (
        <div className="div9 overflow-hidden">
            <div className="sm:hidden">
                <h6 className="text-d4slate-dark text-lg font-bold mx-4 mt-1 pt-10">{ac_strings.topics_for_you}</h6>
                <div className="py-6  flex content-between overflow-scroll">
                    {topics.map(({ name, slug: to }, i) => (
                        <CardSimple key={i} className="ml-4 snap-item" title={name} to={`/${TS.slug_topic}/${to}`} />
                    ))}
                </div>
            </div>
            <div className="hidden sm:flex flex-col bg-d4primary p-10 text-white rounded-lg">
                <div className="sm:w-9/12 ">
                    <h6 className="font-semibold sm:text-2xl md:text-3xl mb-6">{ac_strings.topics_for_you}</h6>
                    <p className="text-xl leading-snug h-12 mb-8">{ac_strings.topics_for_you_text}</p>
                    <div className="flex flex-wrap">
                        {topics.map(({ name, slug: to }, i) => (
                            <Link
                                key={i}
                                className="bg-white text-d4primary p-2 mt-1 mr-1 text-lg font-bold"
                                to={`/${to}`}>
                                {name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TopicsForYou