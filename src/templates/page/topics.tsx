import React from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import ResourceLayout from "@/layouts/ResourceLayout"
import TaxonomyIndex from '@/layout-parts/List/A-ZIndex'
import { IPage } from "@/types"

import { ITopicRes } from '@/types'
import { sortTopicsByGroups } from '@/helpers'
const AllTopic: React.FC<IAllTopic> = (props) => {

    const { title, themes } = props.pageContext
    const path = props.path
    const sortedTopics = sortTopicsByGroups(props.data.ac.allTopics)

    const { Format, Type, ...rest } = sortedTopics
    const topicGroups = Object.keys(rest).map(k => ({ name: rest[k].info.name, items: rest[k].topics.map(item => ({ ...item })) }))

    return (
        <ResourceLayout
            title={title}
        >
            <MetaTag
                title={title}
                type="page"
                path={path}
                breadcrumb={[]}
            />
            <div className="standard-max-w-px mb-8">

            </div>
            <div className="sm:mt-16">
                <TaxonomyIndex groups={topicGroups} />
            </div>

        </ResourceLayout>
    )
}

export default AllTopic

interface IAllTopic {
    path: string

    pageContext: {
        title: string
        themes: IPage[]
    }
    data: {
        ac: {
            allTopics: ITopicRes[]
        }
    }
}

export const pageQuery = graphql`
    query getAllTopics {
        ac {

            allTopics {
            group {
                name
                slug
            }
            noOfPosts
            name
            slug
            id
            }
        }
    }

`