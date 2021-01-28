import React from 'react'
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import loadable from '@loadable/component'
import api from '@/util/api'
import MetaTag from '@/components/Meta'
const PostLayout = loadable(() => import('@/layouts/PostLayout'))
import { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import ac_strings from '@/strings/ac_strings.js'
import Link from '@/components/CustomLink'
import CustomizedPageComponent from '@/components/CustomizedPageComponent'
import { LayoutH1Wide } from '@/components/Headers'
import { normalizePostRes } from '@/helpers'
import { IPostProps, INavItem } from '@/types'
const Preview = () => {
    const location = useLocation();
    const parsed = queryString.parse(location.search);
    const { type, id } = parsed
    const [post, setPost] = React.useState<IPostProps | null>(null)
    const [page, setPage] = React.useState<ICustomizedPage | null>(null)
    React.useEffect(() => {
        if (type === "post" && typeof id === "string") {
            console.log('getting post')
            setPage(null)
            api.getOnePostById(id)
                .then(res => {
                    if (res && res.post) {
                        const simplePost = normalizePostRes(res.post)
                        const { id, langs, content, meta, recommendPosts, readMorePosts, seo } = res.post
                        const postProps = {
                            langs,
                            content,
                            meta,
                            recommendPosts,
                            readMorePosts,
                            seo,
                            ...simplePost

                        }

                        setPost(postProps)
                    }
                })
        }
        if (type === "page" && typeof id === "string") {
            setPost(null)
            api.getOnePagetById(id)
                .then(res => {
                    if (res && res.page) {
                        const { flexibleContent, title, slug } = res.page
                        const componentConfig: IPageCompTypes[] = JSON.parse(flexibleContent)
                        setPage({ title, slug, customizedPageComponents: componentConfig, breadcrumb: [] })
                    }

                })
        }
    }, [])
    return (
        <main className="">
            {
                post && (
                    <div>

                        <PostLayout {...post} />
                    </div>
                )
            }
            {page && (
                <div>
                    <MetaTag title={page.title} translatedUrls={[]} type="page" breadcrumb={page.breadcrumb} path={page.slug} />
                    <LayoutH1Wide title={page.title} />
                    <CustomizedPageComponent items={page.customizedPageComponents} slug={page.slug} title={page.title} />
                    <div className="w-full flex justify-center py-6">
                        <Link to={`${ac_strings.slug_topic}/${page.slug}`} className="bg-ac-slate-dark px-4 py-2 rounded text-white text-lg">
                            More on this topic
                            </Link>
                    </div>

                </div>
            )}
            {!post && !page && (
                <div className="max-w-tablet mx-auto">
                    <h1 className="text-gray-200 text-center" style={{ fontSize: "120px", textShadow: "-1px -1px 0 var(--secondary), 0 0 1px var(--secondary), 4px 4px 0 var(--secondary)" }}>
                        This is a preview page
                    </h1>
                    <p>
                        Please add the post type and id in the url, for example:
                        {`${process.env.SITE_URL}/preivew?type=post&id=12345`}
                    </p>
                    <p>"Type" can be either "post" or "page". Make sure the post id is correct, and the post is published</p>
                </div>
            )
            }
        </main>
    )
}

export default Preview

export interface ICustomizedPage {
    title: string
    slug: string
    breadcrumb: INavItem[]
    customizedPageComponents: IPageCompTypes[]
}