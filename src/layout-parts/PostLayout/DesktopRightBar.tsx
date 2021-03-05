import React from 'react'
import StickyBox from "react-sticky-box";
import shortid from 'shortid'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import Link from '@/components/CustomLink'
import { PageSectionHeaderUpperCaseGray } from '@/components/Headers'
import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow'
import SquareLeftImg from '@/components/PostItemCards/SquareLeftImg'
import { ITopicPostSlugs, } from '@/types'

import ac_strings from '@/strings/ac_strings.js'

interface IPostProps {
    topicPosts?: ITopicPostSlugs[]
    authorsPosts?: ITopicPostSlugs[]
    formatPosts?: ITopicPostSlugs[]
}

const PostSidebarRight: React.FC<IPostProps> = ({ topicPosts, authorsPosts, formatPosts }) => {
    return (
        <StickyBox>
            <div className="bg-grey-300 hidden lg:flex flex-col w-full pl-6 justify-start">
                <div className="py-6">
                    <PageSectionHeaderUpperCaseGray title='More from these topics' />
                    {
                        topicPosts && topicPosts.map(item => {
                            return (
                                <div className="md:flex md:flex-col" key={shortid()}>

                                    <div className="w-full flex justify-between items-center text-sm mb-6">
                                        <Link to={`${item.slug}`}>
                                            {/* <PageSectionHeaderUpperCaseGray title={ac_strings.popular_topic} /> */}
                                            <h4 className="font-roboto text-base">{item.name}</h4>
                                        </Link>
                                        <ToggleFollowOutlineBtn id={item.id} />
                                    </div>
                                    <FetchPostsFromSlugs
                                        layout="list"
                                        slugs={item.posts}
                                        render={({ posts }) => {
                                            return (
                                                <div className="mb-2">
                                                    {posts.slice(0, 5).map((item, k) => {
                                                        return (
                                                            <SquareLeftImg {...item} key={k} />
                                                        )
                                                    })}
                                                </div>
                                            )
                                        }}
                                    />

                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {authorsPosts && authorsPosts.length > 0 && authorsPosts.map(item => {

                        return (
                            <FetchPostsFromSlugs
                                layout="list"
                                slugs={item.posts}
                                render={({ posts }) => {
                                    return (
                                        <div className="py-6">
                                            <PageSectionHeaderUpperCaseGray title={`${ac_strings.more_from} ${item.name}`} />

                                            <div className="mb-2">
                                                {posts.slice(0, 5).map((item, k) => {
                                                    return (
                                                        <SquareLeftImg {...item} key={k} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        )
                    })}
                </div>
                <div>
                    {formatPosts && formatPosts.length > 0 && formatPosts.map(item => {

                        return (
                            <FetchPostsFromSlugs
                                layout="list"
                                slugs={item.posts}
                                render={({ posts }) => {
                                    return (
                                        <div className="py-6">
                                            <PageSectionHeaderUpperCaseGray title={`${ac_strings.more_from} ${item.name}`} />

                                            <div className="mb-2">
                                                {posts.slice(0, 5).map((item, k) => {
                                                    return (
                                                        <SquareLeftImg {...item} key={k} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </StickyBox>
    )
}

export default PostSidebarRight 