import React from 'react'
import { navigate } from "gatsby"
import loadable from '@loadable/component'
const PodcastHeader = loadable(() => import('@/layout-parts/PodcastHeader'))
import { IPaginate, INavItem, IPostItem } from "@/types"
import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/components/Headers'
import PostList from '@/components/List/PostList'
import { formatsAll } from '@/strings/static/topic-ids'
import RightImgWDes from '@/components/PostItemCards/RightImg'
import Pagination from '@/components/Pagination'
import InputLeftRight from '@/components/Pagination/InputLeftRight'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import { trimSlug } from '@/helpers/index-js'

const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {
    const { pageContext, path } = props
    const { title, breadcrumb, description, fetchedPost, isTopic, id, paginate, posts } = pageContext

    let pageTitle = title

    if (isTopic) {
        pageTitle = `${breadcrumb[breadcrumb.length - 2].name} / ${title}`
    }

    /*     const isPodcast = formatsAll["podcast"] && `${formatsAll["podcast"].keyId}` === `${id}`
     */
    return (
        <div className="mx-auto max-w-sm sm:p-0">
            <MetaTag
                type="page"
                title={title}
                translatedUrls={[]}
                breadcrumb={breadcrumb}
                path={path}
            />
            <div className={`px-4 pt-8 sm:pt-0`}>

                <LayoutH1 title={pageTitle} />
                {description && (
                    <div className="w-full py-4" dangerouslySetInnerHTML={{ __html: description }} />
                )}
                <PostList
                    fetchedPost={fetchedPost}
                    posts={posts}
                    paginate={paginate}
                    isTopic={isTopic == true}
                />
            </div>
        </div>
    )

}


export default TaxonomyPage

interface ITaxonomyPageProps {

    pageContext: {
        id?: string
        fetchedPost?: boolean
        type: string
        slug: string
        title: string
        description?: string
        posts: string[],
        paginate: IPaginate
        breadcrumb: INavItem[]
        isTopic: boolean | null
    }
    path: string
}