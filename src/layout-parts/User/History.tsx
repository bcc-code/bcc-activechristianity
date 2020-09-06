import * as React from "react"
import { useSelector } from 'react-redux'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import { IRootState } from '@/state/types'
import { IPostItem, IApiItem } from '@/types'
import PostItem from '@/components/PostItem/RightImgWDes'

const UserHistory = () => {
    const [historyPosts, setHistoryPosts] = React.useState<IPostItem[]>([])
    const { history } = useSelector((state: IRootState) => ({ history: state.userLibrary.historyPosts }));

    React.useEffect(() => {

        if (history.length > 0) {
            fetchLocalPostsFromSlugs(history.map(item => item.slug))
                .then(res => {
                    console.log(res)
                    if (res) {
                        return setHistoryPosts(res)
                    }
                })
        }

    }, [history])
    return (
        <div className="flex flex-col">
            {historyPosts.map((item, i) => (
                <PostItem {...item} key={i} />
            ))}
        </div>
    )
}

export default UserHistory