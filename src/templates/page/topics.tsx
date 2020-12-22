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
                {/*                 <div className="flex text-xs sm:text-base font-semibold">
                    <h2 className="pb-4">{ac_strings.featured}</h2>
                </div> */}
                {/*                 {themes.length > 0 && <div className="grid grid-cols-2 gap-2 sm:flex flex-wrap">
                    {themes.map(item => (
                        <Link
                            className=" text-ac-secondary sm:text-white sm:bg-ac-primary mt-1 mr-1 sm:border-none text-xs sm:text-base sm:font-bold sm:p-2"
                            to={`${ac_strings.slug_theme}/${item.slug}`}>
                            {item.title}
                        </Link>
                    ))}
                </div>} */}
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