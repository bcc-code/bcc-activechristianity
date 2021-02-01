import React from 'react'
import loadable from '@loadable/component'
const PodcastHeader = loadable(() => import('@/layout-parts/PodcastHeader'))
import { IPaginate, INavItem, IPostItem } from "@/types"
import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/components/Headers'
import { useLocation } from '@reach/router';
import PostListSlugs from '@/layout-parts/List/PostList'
import PostListQuery from '@/layout-parts/List/PostListQuery'
import { formatsAll } from '@/strings/static/topic-ids'
import { getAllUrlParams } from '@/helpers'

import { IPostItems } from '@/components/ScrollSection/FeaturedItem'

const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {
    const { pageContext, path } = props
    const { title, breadcrumb, description, type, isTopic, id, paginate } = pageContext

    let pageTitle = title

    if (isTopic) {
        pageTitle = `${breadcrumb[breadcrumb.length - 2].name} / ${title}`
    }

    const isPodcast = formatsAll["podcast"] && `${formatsAll["podcast"].keyId}` === `${id}`

    const location = useLocation();

    const parsed = getAllUrlParams(location.search);
    const pageNrQuery = parsed && parsed.pageNr && typeof parsed.pageNr === "string" && parseInt(parsed.pageNr)
    const currentPage = typeof pageNrQuery === "number" && pageNrQuery <= paginate.totalPages && pageNrQuery > 1 ? pageNrQuery : 1

    return (
        <div className="mx-auto max-w-sm sm:p-0">
            <MetaTag
                type="page"
                title={title}
                translatedUrls={[]}
                breadcrumb={breadcrumb}
                path={path}
            />
            {isPodcast && (
                <div className={`pt-8 sm:pt-0`}>
                    <PodcastHeader />
                </div>
            )}
            <div className={`px-4 pt-8 sm:pt-0`}>

                {!isPodcast && <LayoutH1 title={pageTitle} />}
                {description && (
                    <div className="w-full py-4" dangerouslySetInnerHTML={{ __html: description }} />
                )}
                <PostListQuery
                    firstPosts={pageContext.posts}
                    totalPages={paginate.totalPages}
                    path={path}
                    currentPage={currentPage}
                    {...pageContext}
                />
            </div>
        </div>
    )

}


export default TaxonomyPage

interface ITaxonomyPageProps {

    pageContext: {
        id: string
        subTopicId?: string
        type: string
        slug: string
        title: string
        description?: string
        posts: IPostItem[],
        paginate: IPaginate
        breadcrumb: INavItem[]
        isTopic: boolean | null
    }
    path: string
}