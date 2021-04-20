import * as React from 'react'

import { graphql } from "gatsby"
import { INavItem, IPage } from '@/types'
import MetaTag from '@/components/Meta'

import { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import AboutUsLayout from '@/layouts/AboutUsLayout'

import { ScrollingProvider } from 'react-scroll-section';

const Page: React.FC<IAboutProps> = ({ pageContext }) => {

    const { title, childPages, pagePath } = pageContext
    const allPages = childPages.map(item => {
        const customLayout: IPageCompTypes[] = JSON.parse(item.flexibleContent)

        return ({
            slug: item.slug,
            title: item.title,
            childPage: customLayout
        })

    })
    //CustomizedLayoutProps
    return (
        <div>
            <MetaTag
                type="article"
                title={title}
                path={pagePath}
                breadcrumb={[]}
            />

            <ScrollingProvider>
                <AboutUsLayout
                    title={title}
                    sections={allPages}
                />
            </ScrollingProvider>

        </div>
    )
}
export default Page

interface IAboutProps {
    pageContext: {
        pagePath: string
        title: string
        breadcrumb: INavItem[]
        childPages: IPage[]
    }
}