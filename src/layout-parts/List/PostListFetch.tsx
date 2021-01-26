import React from 'react'
import { navigate } from "gatsby"
import { IPaginate, IPostItem } from "@/types"
import RightImgWDes from '@/components/PostItemCards/RightImg'
import Pagination from '@/components/Pagination'
import InputLeftRight from '@/components/Pagination/InputLeftRight'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import { trimSlug } from '@/helpers'
export interface IPostList {
    paginate?: IPaginate
    posts: IPostItem[],
    isTopic?: boolean

}
const PostList: React.FC<IPostList> = (props) => {

    const { paginate, posts, isTopic } = props

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
        if (paginate && nr < paginate.totalPages + 1 && nr > -1) {
            const firstPagePath = `/${paginate.baseUrl}` + `${isTopic ? '/1' : ''}`
            const fullPath = activePage > 1 ? `/${trimSlug(paginate.baseUrl)}/${activePage}` : firstPagePath
            scrollToTop()
            navigate(fullPath)
        }
    }

    return (
        <div className="max-w-sm" >
            {paginate && (
                <div className="hidden sm:flex justify-end">
                    <div>
                        <InputLeftRight
                            currentPage={paginate.currentPage}
                            totalPages={paginate.totalPages}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}
            <div>
                {posts.map((p, k) => {
                    return (
                        <RightImgWDes key={k} {...p} />

                    )
                })}
            </div>


            {paginate && (
                <div className="flex justify-item py-4">
                    <Pagination
                        currentPage={paginate.currentPage}
                        totalPages={paginate.totalPages}
                        onChange={handleChange}
                    />
                </div>
            )}

        </div>
    )
}

export default PostList