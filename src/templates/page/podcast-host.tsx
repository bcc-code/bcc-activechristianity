import * as React from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import { LayoutH1Wide } from '@/components/Headers'
import RenderFeaturedPost, { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'

const Host: React.FC<IHost> = ({ pageContext, data }) => {
    const { breadcrumb, pagePath } = pageContext
    const { flexibleContent, title, slug } = data.ac.page
    const componentConfig: IPageCompTypes[] = JSON.parse(flexibleContent)

    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]}
                type="page"
                breadcrumb={breadcrumb}
                path={pagePath}
            />
            <LayoutH1Wide title={title} />
            <div className="standard-max-w-px">
                {componentConfig.map((item, i) => {

                    if (item.type === "featured_items") {
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
                    } else {
                        return null
                    }
                })}
            </div>
        </div>
    )
}

export default Host

export const pageQuery = graphql`
    query getHost($id: ID) {
        ac {
            page(id: $id ) {
                title
                slug
                flexibleContent
            }
        }
    }
`

interface IHost {
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
        pagePath: string
        title: string
        breadcrumb: []

    }
}