import * as React from 'react'
import { INavItem, IPage } from '@/types'
import MetaTag from '@/components/Meta'
import { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import CustomizedPageComponent from '@/components/CustomizedPageComponent'
const Page: React.FC<IAboutProps> = ({ pageContext, path }) => {

    const { title, slug, flexibleContent } = pageContext
    const customLayout: IPageCompTypes[] = JSON.parse(flexibleContent)

    const comProps = {
        slug: slug,
        title,
        childPage: customLayout
    }
    //CustomizedLayoutProps
    return (
        <div>
            <MetaTag
                type="article"
                title={title}
                path={path}
                breadcrumb={[]}
            />

            <div>
                {title}
            </div>

        </div>
    )
}
export default Page

interface IAboutProps {
    pageContext: IPage & {
        breadcrumb: INavItem[]
    }
    path: string
}