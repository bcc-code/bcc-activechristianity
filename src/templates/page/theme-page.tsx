import * as React from 'react'
import { graphql } from "gatsby"
import { INavItem, IImage } from "@/types"
import MetaTag from '@/components/Meta'
import RenderFeaturedPost from '@/components/ScrollSection/FeaturedItem'
import FetchPost from '@/components/FetchPost'
import Content from '@/components/Content'

import { LayoutH1Wide } from '@/layout-parts'

const CustomizedPage: React.FC<ICustomizedPage> = ({ path, pageContext, data }) => {
    const { breadcrumb } = pageContext
    const { flexibleContent, title, slug } = data.ac.page
    const componentConfig: IPageCompTypes[] = JSON.parse(flexibleContent)

    return (
        <div>
            <MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={breadcrumb} path={path} />
            <LayoutH1Wide title={title} />
            <div className="standard-max-w-px">
                {componentConfig.map((item, i) => {

                    if (item.type === "text") {

                        return (
                            <Content content={item.data.content} />

                        )
                    } else if (item.type === "article_banner") {
                        const post = item.data

                        return (
                            <FetchPost slug={post.slug} />
                        )
                    } else if (item.type === "featured_items") {
                        const childItems = item.data

                        return (
                            <div>
                                {childItems.map((child, k) => {
                                    return (
                                        <RenderFeaturedPost withBg={i == 0 && k === 0} {...child} />
                                    )
                                })}
                            </div>
                        )
                    }
                })}
            </div>

        </div>
    )
}

export default CustomizedPage


interface ICustomizedPage {
    path: string
    data: {
        ac: {
            page: {
                flexibleContent: string
                slug: string
                title: string
            }
        }
    }
    pageContext: {
        title: string
        breadcrumb: INavItem[]

    }
}

interface IPageTextComp {
    type: "text"
    data: {
        content: string
    }
}

interface IPageFeaturedPost {
    type: "playlist" | "ebook" | "post"
    id: number
    image: IImage
    slug: string
    sub: string
    title: string
}

interface IPageFeaturedItems {
    type: "featured_items"
    data: IPageFeaturedPost[]
}

interface IPagePost {
    type: "article_banner"
    data: {
        author: string
        id: number
        image: IImage
        slug: string
        title: string

    }
}

type IPageCompTypes = IPagePost | IPageFeaturedItems | IPageTextComp

export const pageQuery = graphql`
    query getThemepage($id: ID) {
        ac {
            page(id: $id ) {
                title
                slug
                flexibleContent
            }
        }
    }
`