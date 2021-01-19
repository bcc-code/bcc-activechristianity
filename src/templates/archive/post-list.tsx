import React from 'react'
import loadable from '@loadable/component'
const PodcastHeader = loadable(() => import('@/layout-parts/PodcastHeader'))
import { IPaginate, INavItem } from "@/types"
import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/components/Headers'
import PostList from '@/layout-parts/List/PostList'
import { formatsAll } from '@/strings/topic-ids'
import ac_strings from '@/strings/ac_strings.js'

const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {
    const { pageContext, path } = props
    const { title, breadcrumb, description, type, isTopic, id } = pageContext
    const pageTypeNames = {
        'read': ac_strings.read,
        'listen': ac_strings.listen,
        'watch': ac_strings.watch
    }

    let pageTitle = title

    if (isTopic) {
        pageTitle = `${breadcrumb[breadcrumb.length - 2].name} / ${title}`
    }

    const isPodcast = `${formatsAll["podcast"].keyId}` === `${id}`
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
                <PostList
                    /*            audio={type === "listen"} */
                    {...pageContext}
                    isTopic={isTopic == true}
                />
            </div>
        </div>
    )

}


export default TaxonomyPage

interface ITaxonomyPageProps {

    pageContext: {
        id: string
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