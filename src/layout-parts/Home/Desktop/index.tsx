import React, { Profiler } from 'react';
import { DesktopFeaturedPostLoader } from '@/layout-parts/Loader/PlaceHolders'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'
import LatestSection from '@/layout-parts/List/PostRow4Col'
import FeatureSectionDesktop from './FeatureSectionDesktop'
import HomeTopFeaturePost from '@/layout-parts/Home/HeaderPost'
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
            <DesktopFeaturedPostLoader loading={typeof mixed[0] === "undefined"}>
                <HomeTopFeaturePost {...mixed[0]} key={shortid()} />
            </DesktopFeaturedPostLoader>

            <div className="px-4">
                <LatestSectionHeader latestSlug={latestPostAsTopic.slug} />
                <LatestSection posts={latest.slice(0, 4)} />
                <FeatureSectionDesktop
                    featuredPosts={mixed.slice(2)}
                />
                <Profiler id="Footer" onRender={(
                    id, // the "id" prop of the Profiler tree that has just committed
                    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
                    actualDuration, // time spent rendering the committed update
                    baseDuration, // estimated time to render the entire subtree without memoization
                    startTime, // when React began rendering this update
                    commitTime, // when React committed this update
                    interactions
                ) => {
                    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions)
                }}>
                    <LowerSections
                        lists={popularTopicsAll.static}
                        newPostsForYou={[]}
                        topicsForYou={popularTopicsAll.static}
                        popularPosts={popular}
                    />
                </Profiler>

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