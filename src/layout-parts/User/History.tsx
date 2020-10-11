import * as React from "react"
import { useSelector } from 'react-redux'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import { IRootState } from '@/state/types'
import { IPostItem, IApiItem } from '@/types'

import FetchPosts from '@/HOC/FetchPosts'
import { LayoutH1, PageSectionHeader } from '@/components/Headers'
import PostItem from '@/components/PostItemCards/RightImg'
import HSCardListVideo from '@/layout-parts/HorizontalScroll/HSCardListVideo'

const UserHistory = () => {
    const [historyPosts, setHistoryPosts] = React.useState<IPostItem[]>([])
    const { history } = useSelector((state: IRootState) => ({ history: state.userLibrary.historyPosts }));


    return (
        <div>
            <FetchPosts
                slugs={history.slice(0, 6).map(p => p.slug)}
                layout="list"
                render={({ posts }) => {
                    const video: IPostItem[] = []
                    const other: IPostItem[] = []
                    posts.map(p => {
                        if (p.media.video) {
                            video.push(p)
                        } else {
                            other.push(p)
                        }
                    })
                    return (
                        <div>
                            <div>
                                <PageSectionHeader title={"Saved Videos"} className="pb-4" />
                                <HSCardListVideo posts={video} />
                            </div>
                            <PageSectionHeader title={"Bookmarked"} className="pb-4" />
                            <div className="px-4">
                                {other.map((item, i) => (
                                    <PostItem {...item} key={i} />
                                ))}
                            </div>

                        </div>
                    )
                }}

            />

        </div>
    )
}

export default UserHistory