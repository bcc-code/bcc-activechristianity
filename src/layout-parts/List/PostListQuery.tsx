import React from 'react'
import { navigate } from "gatsby"
import { IPaginate, IPostItem } from "@/types"
import RightImgWDes from '@/components/PostItemCards/RightImg'
import { RightImgListPlaceHolder } from '@/layout-parts/Loader/PlaceHolders'
import Pagination from '@/components/Pagination'
import InputLeftRight from '@/components/Pagination/InputLeftRight'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import { normalizePostRes } from '@/helpers'
import api from '@/util/api'
export interface IPostList {
    currentPage: number
    paginate: IPaginate
    id: string
    subTopicId?: string
    totalPages: number
    path: string
    firstPostsSlugs: string[]

}
const PostList: React.FC<IPostList> = (props) => {

    const { currentPage, id, subTopicId, path, totalPages, firstPostsSlugs } = props

    const [posts, setPosts] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        if (currentPage !== 1) {
            if (id && subTopicId) {
                api.getPostsPerPageQueryBySubtopicId(id, subTopicId, currentPage)
                    .then(res => {
                        if (res && res.topic && res.topic.allPosts && Array.isArray(res.topic.allPosts.data)) {

                            const receivedPosts = res.topic.somePosts.data.map(item => normalizePostRes(item))
                            setLoading(false)
                            setPosts(receivedPosts)
                        }

                    })
            } else {
                api.getPostsPerPageQueryByTopicId(id, currentPage)
                    .then(res => {
                        if (res && res.topic && res.topic.allPosts && res.topic.allPosts.data) {
                            const receivedPosts = res.topic.somePosts.data.map(item => normalizePostRes(item))
                            setLoading(false)
                            setPosts(receivedPosts)
                        }
                    })
            }
        } else {
            fetchLocalPostsFromSlugs(firstPostsSlugs).then(res => {
                if (res) {
                    setPosts(res)
                    setLoading(false)
                }
            })
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
            console.log(fullPath)
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
                                <RightImgWDes key={k} {...p} />

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