import * as React from "react"
import { useSelector } from 'react-redux'
import { fetchLocalPost } from '@/helpers'
import { IRootState } from '@/state/types'
import { IPostItem } from '@/types'
import PostItem from '@/components/PostItem/RightImgWDes'

const UserHistory = () => {
    const [historyPosts, setHistoryPosts] = React.useState<IPostItem[]>([])
    const userLibrary = useSelector((state: IRootState) => state.userLibrary);
    React.useEffect(() => {
        fetchLocalPost(userLibrary.historyPosts).then(res => {
            console.log(res)
            return setHistoryPosts(res)
        })
    }, [userLibrary.historyPosts])
    console.log('history')
    return (
        <div className="flex flex-col">
            {historyPosts.map((item, i) => (
                <PostItem {...item} key={i} />
            ))}
        </div>
    )
}

export default UserHistory