import React from 'react'
import { navigate } from 'gatsby'
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
import { LayoutH1, LayoutH1Wide } from '@/components/Headers'
import { getAllUrlParams } from '@/helpers/index-js'
import { normalizePostRes, normalizeAvailableLanguages } from '@/helpers/normalizers'
import Dropdown, { IOption } from '@/components/Dropdown'
import { InputText } from '@/components/Input'
import { FormSubmitButton } from '@/components/Button'
import Snackbar from '@/components/Snackbar'
/* export interface IDropdownProps {
    label: string
    options: IOption[],
    selected: IOption | undefined
    onChange?: (selected: IOption) => void
    className?: string
} */

const options = [{ label: "Post", value: "post" }, { label: "Page", value: "page" }]
import { IPostProps, INavItem } from '@/types'
const Preview = () => {
    const location = useLocation();
    const parsed = getAllUrlParams(location.search);
    const { type, id } = parsed
    const [post, setPost] = React.useState<IPostProps | null>(null)
    const [page, setPage] = React.useState<ICustomizedPage | null>(null)
    const [selectedType, setSelectedType] = React.useState<IOption | undefined>(options[0])
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
    const [inputId, setInputId] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleInputId = (e: any) => {
        setInputId(e.target.value)

    }

    const handleSubmitPreivewForm = () => {
        let path = `/preview?id=${inputId}&type=${type}`
        navigate(path)
    }
    const getPage = (id: string) => {
        acApiModule.then(res => {
            const api = res.default
            api.getOnePreviewPagetById(id)
                .then(res => {
                    setLoading(false)
                    if (res && res.previewPage) {
                        const { flexibleContent, title, slug } = res.previewPage
                        const componentConfig: IPageCompTypes[] = JSON.parse(flexibleContent)
                        setPage({ title, slug, customizedPageComponents: componentConfig, breadcrumb: [] })
                    } else {
                        setLoading(false)
                        setErrorMessage('Something went wrong')
                    }
                }).catch(err => {
                    setLoading(false)
                    setErrorMessage(err)
                })
        })
    }
    const getPost = (id: string) => {

        acApiModule.then(res => {
            const api = res.default
            setLoading(true)
            api.getOnePreviewPostById(id)
                .then(res => {

                    if (res && res.previewPost) {
                        const normalized = normalizePostRes(res.previewPost)
                        const { id, langs, content, meta, recommendPosts, readMorePosts, seo, updated_at } = res.previewPost

                        const { media } = normalized
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
                        setLoading(false)
                        setPost(postProps)
                    } else {
                        setErrorMessage('Something went wrong')
                        setLoading(false)
                    }
                })
                .catch(err => {
                    setLoading(false)
                    setErrorMessage(err)
                })
        })
    }
    React.useEffect(() => {
        if (type === "post" && typeof id === "string") {

            setPage(null)
            getPost(id)


        }
        if (type === "page" && typeof id === "string") {
            setPost(null)
            setLoading(true)
            getPage(id)

        }
    }, [])
    return !loading ? (
        <main className="">
            <div className="max-w-tablet mx-auto"></div>


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
                <div className="max-w-tablet mx-auto px-4">
                    <LayoutH1 title={"Preview"} />
                    {errorMessage && (
                        <Snackbar
                            text={errorMessage}
                            error
                        />
                    )}

                    <div className="text-lg flex px-4 flex-col">
                        <div style={{ position: "relative", zIndex: 0 }}>
                            <InputText

                                label="Id"
                                value={inputId}
                                onChange={handleInputId}
                            />
                        </div>
                        <div className="">
                            <span className="w-full text-sm pb-2 block font-roboto font-semibold">Type</span>
                            <div className="text-ac-secondary border p-2 rounded opacity-70" style={{ zIndex: 60 }}>
                                <Dropdown
                                    label="Content type"
                                    options={options}
                                    selected={selectedType}
                                    onChange={setSelectedType}

                                />
                            </div>
                        </div>
                        <FormSubmitButton
                            className="my-6"
                            onClick={handleSubmitPreivewForm}
                        />

                    </div>
                </div>
            )
            }
        </main>
    ) : (
        <div className="max-w-tablet mx-auto">
            <h1 className="text-gray-200 text-center" style={{ fontSize: "80px", textShadow: "-1px -1px 0 var(--secondary), 0 0 1px var(--secondary), 4px 4px 0 var(--secondary)" }}>
                Loading
                </h1>

        </div>
    )
}

export default Preview

export interface ICustomizedPage {
    title: string
    slug: string
    breadcrumb: INavItem[]
    customizedPageComponents: IPageCompTypes[]
}