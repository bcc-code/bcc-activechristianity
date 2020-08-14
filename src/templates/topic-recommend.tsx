import React from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import RecommendLayout from '@/layouts/RecommendLayoutNew'

import { IPaginate, INavItem, IPostItem } from "@/types"
import { IOnePostByType } from '@/layout-parts/RecommendLayout/PostsByTypes'
// Types 

import TS from '@/strings'


const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {
    console.log(props)
    const { pageContext, path } = props

    const {
        title,

        breadcrumb
    } = pageContext

    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)

    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]} type="page"
                breadcrumb={breadcrumb}
                path={path}
            />
            {headerPost && (
                <div>

                </div>
            )}
        </div>
    )

}

export default TaxonomyPage
interface ITaxonomyPageProps {
    pageContext: {
        slug: string
        title: string
        breadcrumb: INavItem[]
    }
    path: string
}

