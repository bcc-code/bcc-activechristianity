import * as React from 'react'
import { INavItem, IPage } from '@/types'
import MetaTag from '@/components/Meta'
import { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'

const Page: React.FC<IAboutProps> = ({ pageContext, path }) => {

    const { title } = pageContext

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
    pageContext: {
        title: string
        breadcrumb: INavItem[]
        page: IPage
    }
    path: string
}