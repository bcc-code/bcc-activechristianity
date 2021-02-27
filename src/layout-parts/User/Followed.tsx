import * as React from "react"
import { useSelector } from 'react-redux'
import { fetchLocalPostsFromSlugs, fetchTopicFromSlug } from '@/helpers/fetchLocalData'
import { IRootState } from '@/state/types'
import { ITopicNavItem } from '@/types'
import { OutlineRightIcon } from "@/components/Button"
import { followedTopicsSelector } from '@/state/selectors/user'
const UserHistory = () => {

    const [followedTopic, setFollowedTopics] = React.useState<ITopicNavItem[]>([])
    const followedTopics = useSelector(followedTopicsSelector);

    React.useEffect(() => {
        Promise.all(followedTopics.map(item => fetchTopicFromSlug(item.slug)))
            .then(res => {
                const topics: ITopicNavItem[] = []
                res.forEach(item => {
                    if (item) {
                        topics.push(item)
                    }
                })
                setFollowedTopics(topics)
            })


    }, [followedTopics])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mx-4 sm:mt-12">
            {followedTopic.map(({ name, to }) => {
                return (
                    <OutlineRightIcon name={name} to={to} key={to} />
                )
            })}
        </div>


    )
}

export default UserHistory