import React from 'react'
import { IPaginate, INavItem } from "@/types"
import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/layout-parts'
import PostList from '@/layout-parts/List/PostList'

const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {
    const { pageContext, path } = props

    const { title, slug, breadcrumb, description, posts } = pageContext

    return (
        <div className="mx-auto max-w-sm mt-16 px-4 sm:p-0">
            <MetaTag
                type="page"
                title={title}
                translatedUrls={[]}
                breadcrumb={breadcrumb}
                path={path}
            />
            <LayoutH1 title={title} />
            {description && (
                <div className="w-ful py-4" dangerouslySetInnerHTML={{ __html: description }} />
            )}
            <PostList
                /*            audio={type === "listen"} */
                {...pageContext}
            />
        </div>
    )

}


export default TaxonomyPage

interface ITaxonomyPageProps {

    pageContext: {
        type?: string
        slug: string
        title: string
        description?: string
        posts: string[],
        paginate: IPaginate
        breadcrumb: INavItem[]
    }
    path: string
}