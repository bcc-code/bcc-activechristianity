import * as React from 'react'
import LazyLoad from '@/components/LazyLoad';
import { PageSectionHeader } from '@/components/Headers'
import { TopImgRowHorizontalScroll, FeaturedBanner } from '@/layout-parts/HorizontalScroll'
import FeatureSectionMobile from './FeatureSectionMobile'
import FeaturedTopics from '@/layout-parts/HorizontalScroll/FeaturedTopics'
import BgImgTopicCard from '@/components/Cards/BgImgTopicCard'
import ac_strings from '@/strings/ac_strings.js'
import { IPostItem, ITopicPostItems } from '@/types'

interface IHomeMobileProps {
    mixed: IPostItem[]
    latest: IPostItem[]
    popular: IPostItem[]
    popularTopicsAll: {
        static: ITopicPostItems[]
        dynamic: ITopicPostItems[]
    }
}
const HomeMobile: React.FC<IHomeMobileProps> = ({ mixed, latest, popular, popularTopicsAll }) => {
    return (
        <div className="sm:hidden">
            <div className="w-full pb-4 pt-8">
                <FeaturedBanner featured={mixed} />
            </div>

            <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
                <PageSectionHeader title={ac_strings.latest} className="pb-4" />
                <TopImgRowHorizontalScroll posts={latest} />
            </div>

            <LazyLoad>
                <div className="py-6">
                    <PageSectionHeader title={ac_strings.recommend_for_you} className="pb-4" />
                    <FeatureSectionMobile topicPosts={popularTopicsAll.static} />
                </div>
            </LazyLoad>
            <div className="py-6">
                <LazyLoad>
                    <PageSectionHeader title={ac_strings.topics_for_you} className="pb-4" />
                    <FeaturedTopics featured={popularTopicsAll.static} />
                </LazyLoad>
                <LazyLoad>
                    <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
                        <PageSectionHeader title={ac_strings.popular} className="pb-4" />
                        <TopImgRowHorizontalScroll posts={popular} />
                    </div>
                </LazyLoad>
                <LazyLoad>
                    <div className="w-full p-4">
                        <div className='w-full h-16'>
                            <BgImgTopicCard
                                name={ac_strings.browse_resource}
                                to={ac_strings.slug_explore}
                            />
                        </div>
                    </div>
                </LazyLoad>

            </div>

        </div>
    )
}

export default HomeMobile