import React from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import ResourceLayout from "@/layouts/ResourceLayout"
import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow'
import { ITopicNavItem, IPage } from "@/types"
import Link from '@/components/CustomLink'
import { ITopicRes } from '@/types'
import { sortTopicsByGroups } from '@/helpers'
import shortid from 'shortid'
const AllTopic: React.FC<IAllTopic> = (props) => {
    console.log(props)
    const { title, themes, groupedTopics } = props.pageContext
    const path = props.path


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
                <div className="staggered-boxes-2col">
                    {Object.keys(groupedTopics).map(k => {
                        return (
                            <div style={{ maxWidth: 320 }} className="staggered-boxes-items" key={shortid()}>
                                <div className="font-bold border-t uppercase pb-2">{groupedTopics[k].info.name}</div>
                                <div className="py-2">{groupedTopics[k].topics.map(t => {
                                    return (
                                        <div className="flex justify-between pb-2 ">
                                            <Link className="block text-xs" to={`/${t.to}`}>{t.name}</Link>
                                            <div className="px-4 flex">
                                                <ToggleFollowOutlineBtn id={t.id} />
                                            </div>
                                        </div>
                                    )
                                })}</div>
                            </div>
                        )
                    })}

                </div>
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
        groupedTopics: {
            [key: string]: {
                info: {
                    id: string
                    name: string
                },
                topics: ITopicNavItem[]
            }
        }
    }

}

