import * as React from "react"
import { useSelector } from 'react-redux'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import { IPostItem } from '@/types'
import { IRootState } from '@/state/types'

import PostItem from '@/components/PostItemCards/RightImg'
const UserHistory = () => {
    const [likedPosts, setLikePosts] = React.useState<IPostItem[]>([])
    const userLibrary = useSelector((state: IRootState) => state.userLibrary);

    React.useEffect(() => {
        fetchLocalPostsFromSlugs(userLibrary.bookmarkedPosts.map(p => p.slug)).then(res => {
            console.log(res)
        })
    }, [userLibrary.bookmarkedPosts])

    return (
        <div className="flex flex-col">
            {likedPosts.map((item, i) => (
                <PostItem {...item} key={i} />
            ))}
        </div>
    )
}

export default UserHistory