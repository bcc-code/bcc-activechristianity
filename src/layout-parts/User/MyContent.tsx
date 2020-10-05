import * as React from "react"
import { useSelector } from 'react-redux'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import { IPostItem, ITopicNavItem } from '@/types'
import { IRootState } from '@/state/types'

import PostItem from '@/components/PostItem/RightImgWDes'
const UserHistory = () => {
    const [followedTopic, setFollowedTopics] = React.useState<ITopicNavItem[]>([])
    const [likedPosts, setLikePosts] = React.useState<IPostItem[]>([])
    const userLibrary = useSelector((state: IRootState) => state.userLibrary);

    React.useEffect(() => {

        fetchLocalPostsFromSlugs(userLibrary.bookmarkedPosts.map(p => p.slug)).then(res => {
            setLikePosts(likedPosts)
        })
    }, [userLibrary.bookmarkedPosts])

    return (
        <div className="flex flex-col">
            My content!!!
            {likedPosts.map((item, i) => (
                <PostItem {...item} key={i} />
            ))}
        </div>
    )
}

export default UserHistory