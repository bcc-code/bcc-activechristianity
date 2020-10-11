import * as React from "react"
import { graphql, Link } from "gatsby";
import FeaturedTopics from '@/layout-parts/HorizontalScroll/FeaturedTopics'
import { ITopic } from '@/types'
import { ToggleBookmarkIconOnly } from '@/components/PostElements/TopicToggleFollow'
import ac_strings from '@/strings/ac_strings.json'
import QPopularAndFeaturedTopics from '@/HOC/QPopularAndFeaturedTopics'
import { getRandomArray } from '@/helpers'
import TS from '@/strings'
const TopicsForYou = () => {

    return (
        <div className="col-start-1 col-end-5 overflow-hidden flex flex-col bg-d4slate-dark p-10 text-white rounded-lg">
            <QPopularAndFeaturedTopics
                excludeFollowed
                render={({ topics }) => {
                    const randomTopics = getRandomArray(topics, 6)
                    return (

                        <div className="sm:w-9/12 ">
                            <h6 className="font-semibold sm:text-2xl md:text-3xl mb-6">{ac_strings.topics_for_you}</h6>
                            <div className="flex flex-wrap">

                                {randomTopics.map(({ name, slug: to, id }, i) => (
                                    <div className="flex bg-white text-d4slate-dark mt-4 mr-4 text-lg font-bold">
                                        <Link
                                            key={i}
                                            className="p-2"
                                            to={`/${to}`}>
                                            {name}
                                        </Link>
                                        <ToggleBookmarkIconOnly
                                            id={id}
                                        />

                                    </div>
                                ))}
                            </div>
                        </div>

                    )
                }}
            />
        </div>

    )
}

export default TopicsForYou