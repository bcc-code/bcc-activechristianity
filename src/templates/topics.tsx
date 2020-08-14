import React from 'react'
import { graphql } from "gatsby"
import Link from '@/components/CustomLink'
import MetaTag from '@/components/Meta'
import ResourceLayout from "@/layouts/ResourceLayout"
import TaxonomyIndex from '@/layout-parts/List/A-ZIndex'
import SimpleInstanceSearch, { getFilteredResult } from '@/components/Search/SimpleInstanceSearch'
import { IPaginate, INavItem } from "@/types"
import newString from '@/strings/NewStrings.json'
import TS from '@/strings'
import { ITopic } from '@/types'
import { sortTopicsByGroups } from '@/helpers'
const AllTopic: React.FC<IAllTopic> = (props) => {
    const [featuredTopics, setFeaturedTopic] = React.useState<INavItem[]>([])
    const title = props.pageContext.title
    const path = props.path
    const sortedTopics = sortTopicsByGroups(props.data.ac.allTopics)

    const { Topic, Format, Type, ...rest } = sortedTopics
    const topicGroups = Object.keys(rest).map(k => ({ name: rest[k].info.name, items: rest[k].topics }))
    return (
        <ResourceLayout
            title={title}
        >
            <MetaTag
                title={title}
                type="page"
                path={path}
                translatedUrls={[]}
                breadcrumb={[]}
            />
            <div className="standard-max-w-px mb-8">
                <div className="flex text-xs sm:text-base font-semibold">
                    <h2 className="pb-4">{newString.featured}</h2>
                </div>
                {featuredTopics.length > 0 && <div className="grid grid-cols-2 gap-2 sm:flex flex-wrap">
                    {featuredTopics.slice(0, 6).map(item => (
                        <Link
                            className=" text-d4secondary sm:text-white sm:bg-d4primary mt-1 mr-1 sm:border-none text-xs sm:text-base sm:font-bold sm:p-2"
                            to={`${TS.slug_post_tag}/${item.to}/recommend`}>
                            {item.name}
                        </Link>
                    ))}
                </div>}
            </div>
            <div className="mt-8 sm:mt-16">
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
    }
    data: {
        ac: {
            allTopics: ITopic[]
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
            name
            slug
            id
            }
        }
    }

`