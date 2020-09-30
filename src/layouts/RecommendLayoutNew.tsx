import React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByTaxonomies'))
const ExclusiveContent = loadable(() => import('@/layout-parts/Banner/ExclusiveContent'))
const LatestDesktopRow = loadable(() => import('@/layout-parts/List/Latest'))
const LatestPopularTab = loadable(() => import('@/layout-parts/Tabs/LatestPopularTabs'))
const PostsByTypes = loadable(() => import('@/layout-parts/RecommendLayout/PostsByTypes'))
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
const QuoteBlock = loadable(() => import('@/components/QuoteBlock'))
import { HorizontalScrollSection } from '@/layout-parts/HorizontalScroll'
import { LayoutH1Wide } from '@/layout-parts'

import TopImgPost from '@/components/PostItem/TopImg'
import { ITypeCount } from '@/layout-parts/RecommendLayout/ByTaxonomies'
import { IOnePostByType } from '@/layout-parts/RecommendLayout/PostsByTypes'
import { IOnePostByTypeRow } from '@/layout-parts/RecommendLayout/PostsByTypeRow'
import { IQuoteBlock } from '@/components/QuoteBlock'

import { IPostItem, INavItem } from "@/types"
import ac_strings from '@/strings/ac_strings.json'
import '@/styles/react-tabs.css'


interface IRecommandLayout {
    hideTitleOnMobile?: boolean
    name: string
    latestSlug: string
    headerPost: IPostItem
    latestPosts: IPostItem[]
    popularPosts: IPostItem[]
    postTypes?: ITypeCount[]
    postsByTypesRow1?: IOnePostByType[]
    postsByTypes?: IOnePostByTypeRow[]
    postsByTypesRow2?: IOnePostByType[]
    relatedTopics?: ITypeCount[]
    quoteBlock?: IQuoteBlock
}

const RecommendLayout: React.FC<IRecommandLayout> = ({
    hideTitleOnMobile,
    name,
    headerPost,
    latestPosts,
    popularPosts,
    postTypes,
    postsByTypesRow1,
    postsByTypesRow2,
    postsByTypes,
    relatedTopics,
    quoteBlock,
    latestSlug
}) => {


    const lowerSection: JSX.Element[] = []
    if (postTypes) {
        lowerSection.push(<ByTaxonomies types={postTypes} title={ac_strings.exploreType} />)
    }
    if (postsByTypes) {
        lowerSection.push(
            <div className="sm:hidden">
                {postsByTypes.map((item, k) => {
                    let postThumnailType = "topImage"
                    if (item.type.to.indexOf('playlist') > 0) {
                        postThumnailType = "playlist"
                    }
                    if (item.type.to.indexOf('e-book') > 0) {
                        postThumnailType = 'ebook'
                    }

                    return (
                        /*  <PostsByTypesRow {...item} key={k} /> */
                        < HorizontalScrollSection
                            key={k}
                            name={item.type.name}
                            posts={item.postsRow}
                            postThumnailType={postThumnailType}
                        />
                    )
                })}
            </div>
        )
    }

    if (postsByTypesRow1) {
        lowerSection.push(
            <div className="standard-max-w-px">
                <PostsByTypes types={postsByTypesRow1} />
            </div>
        )
    }

    if (quoteBlock) {
        lowerSection.push(
            <div className="standard-max-w-px py-4 hidden sm:block">
                <QuoteBlock {...quoteBlock} />
            </div>
        )
    }

    if (postsByTypesRow2) {
        lowerSection.push(
            <div className="standard-max-w-px py-4">
                <PostsByTypes types={postsByTypesRow2} />
            </div>
        )
    }

    if (relatedTopics) {
        lowerSection.push(
            <ByTaxonomies types={relatedTopics} title={ac_strings.exploreType} />
        )
    }

    return (
        <div>
            <div className={`${hideTitleOnMobile ? 'hidden sm:block' : 'bg-d4athens sm:bg-white'}`}> <LayoutH1Wide title={name} /></div>
            <Placeholder loading={headerPost === null}>

                {headerPost && (
                    <div className="standard-max-w-px">

                        <HeaderSection headerPost={headerPost} listPosts={popularPosts} />
                    </div>

                )}
                <div className="w-full sm:hidden">
                    {headerPost && <TopImgPost noBorder {...headerPost} showType />}
                </div>
                <LatestDesktopRow posts={latestPosts} latestSlug={latestSlug} />
                <LatestPopularTab
                    latestSlug={latestSlug}
                    popularPosts={popularPosts}
                    latestPosts={latestPosts}
                />


                {lowerSection.map((item, i) => (
                    <LazyLoad key={i}>
                        {item}
                    </LazyLoad>
                ))}

                <ExclusiveContent />
            </Placeholder>
        </div>
    )
}

export default RecommendLayout