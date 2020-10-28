import React from 'react'
import { navigate } from "gatsby"
import { IPaginate, IPostItem } from "@/types"
import Icons from '@/components/Icons/Icon'
import RightImgWDes from '@/components/PostItemCards/RightImg'
import Pagination from '@/components/Pagination'
import InputLeftRight from '@/components/Pagination/InputLeftRight'
import { fetchLocalPostsFromSlugs, } from '@/helpers/fetchLocalData'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import { trimSlug } from '@/helpers'
export interface IPostList {
    audio?: boolean
    paginate?: IPaginate
    posts: string[],

}
const PostList: React.FC<IPostList> = (props) => {

    const { paginate, posts } = props
    const [pageInput, setPageInput] = React.useState(paginate ? paginate.currentPage : 1)
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    const handleChange = (activePage: number) => {
        if (paginate) {
            const firstPagePath = `/${paginate.baseUrl}` + `${paginate.hasRecommendPage === true ? '/1' : ''}`
            const fullPath = activePage > 1 ? `/${trimSlug(paginate.baseUrl)}/${activePage}` : firstPagePath
            scrollToTop()
            navigate(fullPath)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        handleChange(pageInput)
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
            <FetchPostsFromSlugs

                slugs={posts}
                layout="list"
                render={({ posts: postList }) => {
                    return (
                        <div>
                            {postList.map((p, k) => {
                                return (
                                    <RightImgWDes key={k} {...p} />

                                )
                            })}
                        </div>
                    )
                }}
            />


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