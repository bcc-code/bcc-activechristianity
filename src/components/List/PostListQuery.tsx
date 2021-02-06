import React from 'react'
import { navigate } from "gatsby"
import { IPaginate, IPostItem } from "@/types"
import RightImgWDes from '@/components/PostItemCards/RightImg'
import { RightImgListPlaceHolder } from '@/components/Loader/PlaceHolders'
import Pagination from '@/components/Pagination'
import InputLeftRight from '@/components/Pagination/InputLeftRight'
import { normalizePostRes } from '@/helpers'
const api = import('@/util/api')
import shortid from 'shortid'
export interface IPostList {
    currentPage: number
    paginate: IPaginate
    id: string
    subTopicId?: string
    totalPages: number
    path: string
    firstPosts: IPostItem[]

}
const PostList: React.FC<IPostList> = (props) => {

    const { currentPage, id, subTopicId, path, totalPages, firstPosts } = props

    const [posts, setPosts] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        if (currentPage !== 1) {
            if (id && subTopicId) {
                api.getPostsPerPageQueryBySubtopicId(id, subTopicId, currentPage)
                    .then(res => {
                        if (res && res.topic && res.topic.somePosts && Array.isArray(res.topic.somePosts.data)) {
                            const receivedPosts = res.topic.somePosts.data.map(item => normalizePostRes(item))

                            setLoading(false)
                            setPosts(receivedPosts)
                        }

                    })
            } else {
                api.getPostsPerPageQueryByTopicId(id, currentPage)
                    .then(res => {
                        if (res && res.topic && res.topic.somePosts && Array.isArray(res.topic.somePosts.data)) {
                            const receivedPosts = res.topic.somePosts.data.map(item => normalizePostRes(item))

                            setLoading(false)
                            setPosts(receivedPosts)
                        }
                    })
            }
        } else {
            setPosts(firstPosts)
            setLoading(false)
        }



    }, [id, currentPage, subTopicId])


    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    const handleChange = (nr: number) => {

        let activePage = nr
        if (typeof nr === "string") {
            activePage = parseInt(nr)
        }
        if (activePage < totalPages + 1 && activePage > -1) {

            const fullPath = activePage > 1 ? `${path}?pageNr=${activePage}` : path

            scrollToTop()
            navigate(fullPath)
        }
    }

    return (
        <div className="max-w-sm" >
            <div className="hidden sm:flex justify-end">
                <div>
                    <InputLeftRight
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onChange={handleChange}
                    />
                </div>
            </div>
            {loading ? (
                <RightImgListPlaceHolder count={12} />
            ) : (
                    <div>
                        {posts.map((p, k) => {
                            return (
                                <RightImgWDes key={shortid()} {...p} />

                            )
                        })}
                    </div>
                )}

            <div className="flex justify-item py-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={handleChange}
                />
            </div>
        </div>

    )
}

export default PostList