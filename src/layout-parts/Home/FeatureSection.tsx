import React from 'react'
import FeaturedCard, { IFeaturedCard } from '@/components/PostItem/FeaturedCardNew'
import FeatureIcon from '@/components/Icons/Feature'
import MobileFeatureCard from '@/components/PostItem/WTopicFollowCard'
import newStrings from '@/strings/NewStrings.json'

const FeatureSection: React.FC<{ featuredPosts: IFeaturedCard[] }> = ({ featuredPosts }) => {
    return (
        <div>
            <h3 className="relative mt-8 sm:mt-16 mx-4 mb-2 sm:mb-8 pb-2 text-d4dark text-base sm:border-b">
                <div className="flex items-center">
                    <FeatureIcon className="w-4 h-4" />
                    <span className="block mx-2">{newStrings.featured}</span>
                </div>
            </h3>
            <div className="scroll-4col-h mx-4 my-4 hidden sm:grid">
                {featuredPosts.map((item, i) => {

                    return (
                        <div className={`div${i + 1}`} key={item.slug}>
                            <FeaturedCard className="bg-white" {...item} />
                        </div>
                    )
                })}
            </div>
            <div className="scroll-4col-h flex mb-4 sm:hidden">
                {featuredPosts.map((item, i) => {
                    const topic = item.tags && Array.isArray(item.tags) ? item.tags[0] : undefined
                    if (item.type) {
                        return (
                            <div className={`div${i + 1}`} key={item.slug}>
                                <FeaturedCard className="bg-white" {...item} />
                            </div>

                        )
                    } else {
                        return (
                            <div className={`div${i + 1}`} key={i}>
                                <MobileFeatureCard post={item} topic={topic} />
                            </div>
                        )
                    }

                })}
                <div className="min-w-4">

                </div>
            </div>
        </div>
    )
}

export default FeatureSection