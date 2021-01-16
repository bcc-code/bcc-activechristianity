import React from 'react';
import FeatureSectionDesktop from './FeatureSectionDesktop'
import LowerSections from './LowerSections'
import ShowMore from '@/layout-parts/ShowMorePosts'
import RightImgWDes from '@/components/PostItemCards/RightImg'
import shortid from 'shortid'
import { IPostItem, ITopicPostItems } from '@/types'
import ac_strings from '@/strings/ac_strings.js'

interface IHomeMobileProps {
    mixed: IPostItem[]
    latest: IPostItem[]
    popular: IPostItem[]
    popularTopicsAll: {
        static: ITopicPostItems[]
        dynamic: ITopicPostItems[]
    }
}
const HomeDesktop: React.FC<IHomeMobileProps> = ({ mixed, latest, popular, popularTopicsAll }) => {
    const latestPostAsTopic = {
        id: '',
        name: ac_strings.latest,
        slug: ac_strings.slug_latest
    }

    return (


        <div className="hiddem sm:block">
            <div className="px-4">

                <FeatureSectionDesktop
                    featuredPosts={mixed.slice(2)}
                />

                <LowerSections
                    lists={popularTopicsAll.static}
                    newPostsForYou={[]}
                    topicsForYou={popularTopicsAll.static}
                    popularPosts={popular}
                />
                <div className="grid grid-cols-4 gap-4 md:gap-6 sm:px-4">
                    <div className="col-start-1 col-end-3 lg:col-end-4">

                        {latest.slice(6, 12).map((item, i) => {
                            return (
                                <div className={`mt-6 sm:mt-8 mx-4 sm:mr-10 sm:ml-0 div-post`} key={shortid()}>
                                    <RightImgWDes key={i} {...item} />
                                </div>
                            )
                        })}
                        <ShowMore
                            slug={latestPostAsTopic.slug}
                            startNr={2}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomeDesktop