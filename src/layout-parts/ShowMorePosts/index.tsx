
import * as React from "react"
import FetchPostList from '@/layout-parts/HOC/FetchPostList'
import RightImgWDes from '@/components/PostItem/RightImgWDes'
import { OutlineButton } from '@/layout-parts/Buttons'
import ac_strings from '@/strings/ac_strings.json'
import { ITopic, IPostItem } from '@/types'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'

const ShowMorePosts: React.FC<{ startNr: number, slug: string }> = ({ startNr, slug }) => {
    const [infinitePosts, setInfinitePosts] = React.useState<IPostItem[]>([])
    const [latestPageNr, setLatestPageNr] = React.useState(startNr)
    const [isFetchingMore, setIsFetchingMore] = React.useState(false)


    const showMorePosts = () => {

        if (latestPageNr > 0) {
            setIsFetchingMore(true)
            const nextPage = latestPageNr + 1
            setLatestPageNr(latestPageNr + 1)
            fetchPostslistFromArchivePage(`${ac_strings.slug_latest}/${nextPage}`)
                .then(res => {
                    if (res) {

                        setInfinitePosts([...infinitePosts, ...res])
                        setIsFetchingMore(false)
                    }
                })
        }

    }
    return (
        <div className="w-full flex flex-col justify-center py-16">
            {infinitePosts.map((item, i) => {
                return (
                    <div className={`mt-6 sm:mt-8 mx-4 sm:mr-10 sm:ml-0 div-post`}>
                        <RightImgWDes key={i} {...item} />
                    </div>
                )
            })}
            <div className="flex justify-center py-4">
                <OutlineButton name={isFetchingMore ? ac_strings.loading : ac_strings.showMore} onClick={showMorePosts} />
            </div>

        </div>
    )
}

export default ShowMorePosts