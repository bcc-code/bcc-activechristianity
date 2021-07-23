import React from 'react'
import loadable from '@loadable/component'
import { IPaginate, INavItem, IPostItem } from "@/types"
import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/components/Headers'
import { useLocation } from '@reach/router';
import PostListQuery from '@/components/List/PostListQuery'
import { getAllUrlParams } from '@/helpers/index-js'

const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {

    const { pageContext } = props
    const { title, breadcrumb, description, isTopic, id, paginate, pagePath } = pageContext

    let pageTitle = title

    if (isTopic) {
        pageTitle = `${breadcrumb[breadcrumb.length - 2].name} / ${title}`
    }

    const location = useLocation();
    const parsed = getAllUrlParams(location.search);
    const pageNrQuery = parsed && parsed.pagenr && typeof parsed.pagenr === "string" && parseInt(parsed.pagenr)

    const currentPage = typeof pageNrQuery === "number" && pageNrQuery <= paginate.totalPages && pageNrQuery > 1 ? pageNrQuery : 1
    return (
        <div className="mx-auto max-w-sm sm:p-0">
            <MetaTag
                type="page"
                title={title}
                translatedUrls={[]}
                breadcrumb={breadcrumb}
                path={pagePath}
            />

            <div className={`px-4 pt-8 sm:pt-0`}>

                <LayoutH1 title={pageTitle} />
                {description && (
                    <div className="w-full py-4" dangerouslySetInnerHTML={{ __html: description }} />
                )}
                <PostListQuery
                    firstPosts={pageContext.posts}
                    totalPages={paginate.totalPages}
                    path={pagePath}
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
        pagePath: string
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