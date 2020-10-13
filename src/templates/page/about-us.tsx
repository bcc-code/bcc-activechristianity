import * as React from 'react'

import { graphql } from "gatsby"
import { INavItem, IPage } from '@/types'
import MetaTag from '@/components/Meta'
import CustomizedLayoutProps from '@/components/CustomizedPageComponent'
import RenderFeaturedPost, { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import ScrollSectionLayout from '@/layouts/LeftSidebarLayout/ScrollSectionLayout'
import { IScrollSectionChildProps } from '@/components/ScrollSection/Section'


import { divide } from 'lodash'
import { Header } from './contact'
const imageUrl = 'https://media.activechristianity.org/2019/08/ac-home-hero-bg.jpg'
const Page: React.FC<IAboutProps> = ({ pageContext, path }) => {


    const aboutUs: IScrollSectionChildProps[] = []
    const { title, childPages } = pageContext
    const allPages = childPages.map(item => {
        const customLayout: IPageCompTypes[] = JSON.parse(item.flexibleContent)

        return ({
            slug: item.slug,
            title: item.title,
            childPage: customLayout[0]
        })

    })
    //CustomizedLayoutProps
    return (
        <div>
            <MetaTag
                type="article"
                title={title}
                path={path}
                breadcrumb={[]}
            />


            <ScrollSectionLayout
                title={title}
                sections={allPages}
            />

        </div>
    )
}
export default Page

interface IAboutProps {
    pageContext: {
        title: string
        breadcrumb: INavItem[]
        childPages: IPage[]
    }
    path: string
}