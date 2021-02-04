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
import { trimSlug } from '@/helpers'

const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {
    const { pageContext, path } = props
    const { title, breadcrumb, description, type, isTopic, id, paginate, posts } = pageContext

    let pageTitle = title

    if (isTopic) {
        pageTitle = `${breadcrumb[breadcrumb.length - 2].name} / ${title}`
    }

    const isPodcast = formatsAll["podcast"] && `${formatsAll["podcast"].keyId}` === `${id}`

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    const handleChange = (nr: number) => {
        let activePage = nr
        if (typeof nr === "string") {
            activePage = parseInt(nr)
        }
        if (paginate && nr < paginate.totalPages + 1 && nr > -1) {
            const firstPagePath = `/${paginate.baseUrl}` + `${isTopic ? '/1' : ''}`
            const fullPath = activePage > 1 ? `/${trimSlug(paginate.baseUrl)}/${activePage}` : firstPagePath
            scrollToTop()
            navigate(fullPath)
        }
    }
    const [fetchedPosts, setFetchedPosts] = React.useState<IPostItem[] | null>(null)

    React.useEffect(() => {

    }, [])
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
                {!fetchedPosts ? <PostList
                    /*            audio={type === "listen"} */
                    /* {...pageContext} */
                    posts={posts}
                    paginate={paginate}
                    isTopic={isTopic == true}
                /> : (
                        <div className="max-w-sm" >
                            {paginate && (
                                <div className="hidden sm:flex justify-end">
                                    <div>
                                        <InputLeftRight
                                            currentPage={paginate.currentPage}
                                            totalPages={paginate.totalPages}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            )}
                            <div>
                                {fetchedPosts.map((p, k) => {
                                    return (
                                        <RightImgWDes key={k} {...p} />

                                    )
                                })}
                            </div>


                            {paginate && (
                                <div className="flex justify-item py-4">
                                    <Pagination
                                        currentPage={paginate.currentPage}
                                        totalPages={paginate.totalPages}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                        </div>
                    )}
            </div>
        </div>
    )

}


export default TaxonomyPage

interface ITaxonomyPageProps {

    pageContext: {
        id?: string
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