import * as React from "react"
import { graphql, Link } from "gatsby";
import CardSimple from "@/components/Cards/SolidTopicCard"
import { ITaxonomy, IMixTypePost, IMixTypePostNode } from '@/types/wpPostType'
const TopicsForYou: React.FC<{ topics: ITaxonomy[] }> = ({ topics }) => {
    return (
        <div className="div9 overflow-hidden">
            <div className="sm:hidden">
                <h6 className="text-d4slate-dark text-lg font-bold mx-4 mt-1 pt-10">Topics for you</h6>
                <div className="py-6  flex content-between overflow-scroll">
                    {topics.map(({ name, slug }, i) => (
                        <CardSimple className="ml-4 snap-item" title={name} to={`/tag/${slug}`} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col hidden sm:flex bg-d4primary p-10 text-white rounded-lg">
                <div className="sm:w-9/12 ">
                    <h6 className="font-semibold sm:text-2xl md:text-3xl mb-6">Topics for you</h6>
                    <p className="text-xl leading-snug h-12 mb-8">Looking for a topic? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer erat urna, aliquam ac massa vel, dictum rhoncus mi. Sed blandit.</p>
                    <div className="flex flex-wrap">
                        {topics.map(item => (
                            <Link
                                className="bg-white text-d4primary p-2 mt-1 mr-1 text-lg font-bold"
                                to={`/${item.slug}`}>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TopicsForYou