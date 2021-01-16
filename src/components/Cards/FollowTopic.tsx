import * as React from "react"
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard'
import { SlateDarkFollowButton } from '@/components/PostElements/TopicToggleFollow'
import ac_strings from '@/strings/ac_strings.js'
import { ITopic } from '@/types'

const FollowTopic: React.FC<ITopic> = ({ name, image, slug, id }) => (
    <div className="flex flex-col items-center">
        <div style={{ width: "100px", height: "138px" }}>
            <ImgBgTopicCard
                name={name}
                image={image}
                to={`${ac_strings.slug_topic}/${slug}`}
                rounded="rounded-xxl"

            />
        </div>
        <SlateDarkFollowButton
            id={id}
        />
    </div>
)

export default FollowTopic