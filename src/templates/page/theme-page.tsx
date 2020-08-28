import * as React from 'react'
import { graphql } from "gatsby"
import { INavItem, IImage } from "@/types"
import MetaTag from '@/components/Meta'
import RenderFeaturedPost, { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import FetchPost from '@/components/FetchPost'
import Content from '@/components/Content'
import CustomizedPageComponent from '@/components/CustomizedPageComponent'
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

                    return <CustomizedPageComponent {...item} key={i} isFirst={i === 0} />
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