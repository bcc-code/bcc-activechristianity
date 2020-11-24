import * as React from "react"
import RightImgWDes from '@/components/PostItemCards/RightImg'
import Link from '@/components/CustomLink'
import { ITopicPostItems } from '@/types'
import { PageSectionHeaderUpperCaseGray } from '@/components/Headers'
import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow'
import ac_strings from '@/strings/ac_strings.js'

const PostListSection: React.FC<ITopicPostItems> = ({ posts, ...topic }) => (
    <div className="md:h-full md:flex md:flex-col">
        {/*         <div className="flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-4">
            {subHeader && <PageSectionHeaderUpperCaseGray title={subHeader} />}
            {header && <h4 className="font-roboto mb-6">{header}</h4>}

        </div> */}
        <div className="w-full flex justify-between items-center text-sm mb-6">
            <Link to={`${ac_strings.slug_topic}/${topic.slug}`}>
                <PageSectionHeaderUpperCaseGray title={ac_strings.popularTopic} />
                <h4 className="font-roboto text-base">{topic.name}</h4>
            </Link>
            <ToggleFollowOutlineBtn id={topic.id} />
        </div>
        <div className="flex-1">
            <div>
                {posts.slice(0, 2).map((item, k) => {
                    return (
                        <RightImgWDes border={true} {...item} key={k} />
                    )
                })}
            </div>


        </div>
    </div>
)

export default PostListSection