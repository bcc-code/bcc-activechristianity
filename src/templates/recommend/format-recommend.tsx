import * as React from 'react';
import loadable from '@loadable/component'
import MetaTag from '@/components/Meta'
import TopImgPost from '@/components/PostItemCards/TopImg'
import RightImg from '@/components/PostItemCards/RightImg'
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import { SectionTitleDesktopAndMobile, PageSectionHeader, LayoutH1Wide, } from '@/components/Headers'
const FeaturedBanner = loadable(() => import('@/components/HorizontalScroll/FeaturedBanner'))
const TopImgHorizontalScroll = loadable(() => import('@/components/HorizontalScroll/TopImgRow'))
import { UnderlineLinkViewAll } from '@/components/Button'
import { INavItemCount, ISubtopicLinks, IRecommendationPage, IPostItem } from '@/types'
import ac_strings from '@/strings/ac_strings.js'
import { processRecommendationContext, getRandomFeatured } from '@/helpers'
const Format: React.FC<IProps> = ({ path, pageContext }) => {

    const { formatType, breadcrumb, popularPosts, latestPosts, featuredPosts } = pageContext

    const { info, items } = formatType

    const latestSlug = `${info.to}/${ac_strings.slug_latest}`
    const { latest, popular, featured } = processRecommendationContext({ popularPosts, featuredPosts, latestPosts })
    const mixedFeaturedPosts = getRandomFeatured({ latest, popular, featured })
    return (
        <div className="pt-8 sm:pt-0">
            <MetaTag title={info.name} translatedUrls={[]} type="page" breadcrumb={breadcrumb} path={path} />
            <LayoutH1Wide title={info.name} />
            {formatType.info.count > 10 ? (

                <div className="sm:px-4 standard-max-w">
                    {mixedFeaturedPosts[0] ? <HeaderSection headerPost={mixedFeaturedPosts[0]} listPosts={popular.slice(0, 5)} /> : <div></div>}

                    <div className="w-full pb-4 sm:hidden">
                        {/*                  <PageSectionHeader title={ac_strings.featured} className="pb-4" /> */}
                        <FeaturedBanner featured={mixedFeaturedPosts} />
                    </div>
                    <div className="bg-ac-slate-lighter sm:hidden py-6 overflow-hidden">
                        <PageSectionHeader title={ac_strings.popular} className="pb-4" />
                        <TopImgHorizontalScroll posts={popular.slice(0, 5)} />
                    </div>
                    <div className="pb-6">
                        <SectionTitleDesktopAndMobile name={ac_strings.latest} to={latestSlug} />
                        <div className="sm:hidden px-4">
                            {latest.map(item => (
                                <RightImg {...item} />
                            ))}
                        </div>
                        <div className="hidden sm:block">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 grid-h pb-16">
                                {latest.map((post, i) => {
                                    return (
                                        <div className={`div${i + 1}`} key={post.slug}>
                                            < TopImgPost showType {...post} />
                                        </div>
                                    )
                                })}
                                <div className="w-full flex justify-center py-6">
                                    <UnderlineLinkViewAll to={`${latestSlug}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            ) : (
                    <div className="standard-max-w-px grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-6 pb-6">
                        { latest.map(p => {
                            return (
                                <TopImgPost {...p} key={p.slug} />
                            )
                        })}
                    </div>
                )}
        </div>
    )

}

export default Format

interface IPageContext extends IRecommendationPage {
    formatType: {
        info: INavItemCount
        items: ISubtopicLinks[]

    }
    id: string
}

interface IProps {
    path: string
    pageContext: IPageContext

}