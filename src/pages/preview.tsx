import React, { Profiler } from 'react'
import { useLocation } from '@reach/router';
/* import queryString from 'query-string'; */
import loadable from '@loadable/component'
const acApiModule = import('@/util/api')
import MetaTag from '@/components/Meta'
const PostLayout = loadable(() => import('@/layouts/PostLayoutUpdate'))
import { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import ac_strings from '@/strings/ac_strings.js'
import Link from '@/components/CustomLink'
import CustomizedPageComponent from '@/components/CustomizedPageComponent'
import { LayoutH1Wide } from '@/components/Headers'
import { getAllUrlParams } from '@/helpers/index-js'
import { normalizePostRes, normalizeAvailableLanguages } from '@/helpers/normalizers'
import { IPostProps, INavItem } from '@/types'
const Preview = () => {
    const location = useLocation();
    const parsed = getAllUrlParams(location.search);
    const { type, id } = parsed
    const [post, setPost] = React.useState<IPostProps | null>(null)
    const [page, setPage] = React.useState<ICustomizedPage | null>(null)
    React.useEffect(() => {
        if (type === "post" && typeof id === "string") {
            console.log('getting post')
            setPage(null)

            acApiModule.then(res => {
                const api = res.default
                api.getOnePreviewPostById(id)
                    .then(res => {

                        if (res && res.previewPost) {
                            const normalized = normalizePostRes(res.previewPost)
                            const { id, langs, content, meta, recommendPosts, readMorePosts, seo, updated_at } = res.previewPost

                            const { media, types, format } = normalized
                            const mediaTypes = []

                            let defaultMediaType = "none"
                            if (media.audio) {
                                mediaTypes.push("audio")
                                defaultMediaType = "audio"
                            }
                            if (media.video && media.video.src) {

                                mediaTypes.push("video")
                                defaultMediaType = "video"
                            }

                            const tranlsatedUrl = normalizeAvailableLanguages(langs, false)
                            const postProps = {
                                langs,
                                content,
                                meta,
                                updated_at,
                                mediaTypes: {
                                    types: mediaTypes,
                                    default: defaultMediaType
                                },
                                tranlsatedUrl,
                                recommendPosts,
                                readMorePosts,
                                seoTitle: seo,
                                ...normalized

                            }

                            setPost(postProps)
                        } else {
                            console.log(res)
                        }
                    })
            })

        }
        if (type === "page" && typeof id === "string") {
            setPost(null)
            acApiModule.then(res => {
                const api = res.default
                api.getOnePreviewPagetById(id)
                    .then(res => {
                        if (res && res.previewPage) {
                            const { flexibleContent, title, slug } = res.previewPage
                            const componentConfig: IPageCompTypes[] = JSON.parse(flexibleContent)
                            setPage({ title, slug, customizedPageComponents: componentConfig, breadcrumb: [] })
                        }
                    })
            })

        }
    }, [])
    return (
        <main className="">
            {
                post && (<PostLayout {...post} />
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