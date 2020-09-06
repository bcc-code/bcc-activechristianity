import * as React from "react"
import { useSelector } from 'react-redux'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import { IRootState } from '@/state/types'
import { ITopic } from '@/types'
import { OutlineRightIcon } from "@/components/Buttons"

const UserHistory = () => {

    const [followedTopic, setFollowedTopics] = React.useState<ITopic[]>([])
    const userLibrary = useSelector((state: IRootState) => state.userLibrary);

    React.useEffect(() => {
        fetchLocalPostsFromSlugs(userLibrary.followedTopics).then(res => setFollowedTopics(res))
    }, [userLibrary.followedTopics])

    return (
        <div className="grid-1-2col mx-4 mt-4 sm:mt-12 mb-4">
            {followedTopic.map(({ name, slug }) => {
                return (
                    <OutlineRightIcon name={name} to={slug} key={slug} />
                )
            })}
        </div>


    )
}

export default UserHistory