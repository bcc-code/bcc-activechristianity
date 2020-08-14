import React from "react"
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByTaxonomies'))
const ExclusiveContent = loadable(() => import('@/layout-parts/Banner/ExclusiveContent'))
const LatestDesktopRow = loadable(() => import('@/layout-parts/PostsRow/Latest'))
const LatestPopularTab = loadable(() => import('@/layout-parts/RecommendLayout/LatestPopularTab'))
const PostsByTypes = loadable(() => import('@/layout-parts/RecommendLayout/PostsByTypes'))
const QuoteBlock = loadable(() => import('@/components/QuoteBlock'))
import { HorizontalScrollSection } from '@/layout-parts/PostsRow/HorizontalScroll'
import { Button } from '@/components/Buttons'
import { LayoutH1Wide } from '@/layout-parts'

import TopImgPost from '@/components/PostItem/TopImg'
import { ITypeCount } from '@/layout-parts/RecommendLayout/ByTaxonomies'
import { IOnePostByType } from '@/layout-parts/RecommendLayout/PostsByTypes'
import { IOnePostByTypeRow } from '@/layout-parts/RecommendLayout/PostsByTypeRow'
import { IQuoteBlock } from '@/components/QuoteBlock'

import { IPostItem, INavItem } from "@/types"
import newStrings from '@/strings/NewStrings.json'
import '@/styles/react-tabs.css'


interface IRecommandLayout {
    parent?: INavItem
    name: string
    latestSlug: string
    postTypes: ITypeCount[]
    headerPost: IPostItem
    latestPosts: IPostItem[]
    popularPosts: IPostItem[]
    postsByTypesRow1: IOnePostByType[]
    postsByTypes: IOnePostByTypeRow[]
    postsByTypesRow2: IOnePostByType[]
    relatedTopics: ITypeCount[]
    quoteBlock: IQuoteBlock
}

const RecommendLayout: React.FC<IRecommandLayout> = ({
    parent,
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

    return (
        <div>
            <div className={`${parent ? 'hidden sm:block' : 'bg-d4athens sm:bg-white'}`}> <LayoutH1Wide title={name} /></div>
            {parent && (
                <div className="py-4 px-2 bg-d4athens sm:hidden uppercase">
                    <div className="flex bg-white relative w-full mb-4 uppercase tracking-widest text-xs rounded-lg overflow-hidden">

                        <Button className="border rounded-lg flex items-center font-roboto p-2 overflow-hidden" to={parent.to}>
                            {parent.name}
                        </Button >
                        <div className="-ml-2 pl-4 border-r border-t border-b rounded-r-lg flex-1 flex justify-center items-center overflow-hidden" >
                            {name}
                        </div>

                    </div>
                </div>
            )}

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


            {[
                <ByTaxonomies types={postTypes} title={newStrings.exploreType} />,

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
                </div>,
                <div className="standard-max-w-px">
                    <PostsByTypes types={postsByTypesRow1} />
                </div>,
                <div className="standard-max-w-px py-4 hidden sm:block">
                    <QuoteBlock {...quoteBlock} />
                </div>
                ,
                <div className="standard-max-w-px py-4">

                    <PostsByTypes types={postsByTypesRow2} />
                </div>,
                <ByTaxonomies types={relatedTopics} title={newStrings.relatedTopics} arrow />
            ].map((item, i) => (
                <LazyLoad key={i}>
                    {item}
                </LazyLoad>
            ))}

            <ExclusiveContent />
        </div>
    )
}

export default RecommendLayout