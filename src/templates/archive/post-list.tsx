import React from 'react'
import { IPaginate, INavItem } from "@/types"
import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/components/Headers'
import PostList from '@/layout-parts/List/PostList'
import ac_strings from '@/strings/ac_strings.json'
const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {
    const { pageContext, path } = props

    const { title, slug, breadcrumb, description, type } = pageContext
    const pageTypeNames = {
        'read': ac_strings.read,
        'listen': ac_strings.listen,
        'watch': ac_strings.watch
    }

    const pageTitle = type ? `${pageTypeNames[type]} / ${title}` : title

    return (
        <div className="mx-auto max-w-sm px-4 sm:p-0">
            <MetaTag
                type="page"
                title={title}
                translatedUrls={[]}
                breadcrumb={breadcrumb}
                path={path}
            />
            <LayoutH1 title={pageTitle} />
            {description && (
                <div className="w-full py-4" dangerouslySetInnerHTML={{ __html: description }} />
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
        type: string
        slug: string
        title: string
        description?: string
        posts: string[],
        paginate: IPaginate
        breadcrumb: INavItem[]
    }
    path: string
}