import React from 'react'
import { IPaginate, INavItem } from "@/types"
import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/components/Headers'
import PostList from '@/layout-parts/List/PostList'
import ac_strings from '@/strings/ac_strings.js'
const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {
    const { pageContext, path } = props

    const { title, slug, breadcrumb, description, type, isTopic } = pageContext
    const pageTypeNames = {
        'read': ac_strings.read,
        'listen': ac_strings.listen,
        'watch': ac_strings.watch
    }

    let pageTitle = title
    if (type) {
        pageTitle = `${pageTypeNames[type]} / ${title}`
    }
    if (isTopic) {
        pageTitle = `${breadcrumb[breadcrumb.length - 2].name} / ${title}`
    }



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
        isTopic: boolean | null
    }
    path: string
}