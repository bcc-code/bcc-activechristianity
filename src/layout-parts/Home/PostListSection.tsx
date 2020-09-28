import * as React from "react"
import RightImgWDes from '@/components/PostItem/RightImgWDes'
import Link from '@/components/CustomLink'
import { IPostItem, ITopicPostSlugs } from '@/types'
import { PageSectionHeaderUpperCaseGray } from '@/layout-parts'
import ToggleFollowOutlineBtn from '@/layout-parts/Buttons/ToggleFollowOutlineBtn'
import { OutlineSmallRounded } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'
import FetchPosts from '@/layout-parts/HOC/FetchPosts'
const PostListSection: React.FC<ITopicPostSlugs> = ({ posts: slugs, ...topic }) => (
    <div className="md:h-full md:flex md:flex-col">
        {/*         <div className="flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-4">
            {subHeader && <PageSectionHeaderUpperCaseGray title={subHeader} />}
            {header && <h4 className="font-roboto mb-6">{header}</h4>}

        </div> */}
        <div className="w-full flex justify-between items-center text-sm mb-6">
            <Link to={`${TS.slug_topic}/${topic.slug}`}>
                <PageSectionHeaderUpperCaseGray title={ac_strings.popularTopic} />
                <h4 className="font-roboto">{topic.name}</h4>
            </Link>
            <ToggleFollowOutlineBtn id={topic.id} />
        </div>
        <div className="flex-1">
            <FetchPosts
                slugs={slugs.slice(0, 1)}
                layout="row"
                render={({ posts }) => {
                    return (
                        <div>
                            {posts.map((item, k) => {
                                return (
                                    <RightImgWDes border={true} {...item} key={k} />
                                )
                            })}
                        </div>
                    )
                }}

            />


        </div>
    </div>
)

export default PostListSection