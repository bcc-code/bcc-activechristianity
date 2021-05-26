import React from 'react'
import { navigate } from "gatsby"
import { IPaginate, IPostItem } from "@/types"
import RightImgWDes from '@/components/PostItemCards/RightImg'
import Pagination from '@/components/Pagination'
import InputLeftRight from '@/components/Pagination/InputLeftRight'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import { RightImgListPlaceHolder } from '@/components/Loader/PlaceHolders'
import { trimSlug } from '@/helpers/index-js'
import MotionStagger from '@/components/Motion/StaggerChildren'
export interface IPostList {
    fetchedPost?: boolean
    audio?: boolean
    paginate?: IPaginate
    posts: string[],
    isTopic?: boolean

}
const PostList: React.FC<IPostList> = (props) => {

    const { paginate, posts, isTopic, fetchedPost } = props

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
        if (paginate && nr < paginate.totalPages + 1 && nr > -1) {
            const fullPath = getLinkPath(nr)
            scrollToTop()
            navigate(fullPath)
        }
    }

    const getLinkPath = (nr: number) => {
        let activePage = nr
        let toReturnPath = '/'
        if (typeof nr === "string") {
            activePage = parseInt(nr)
        }

        if (paginate && nr < paginate.totalPages + 1 && nr > -1) {
            const firstPagePath = `/${paginate.baseUrl}` + `${isTopic || fetchedPost ? '/1' : ''}`
            toReturnPath = activePage > 1 ? `/${trimSlug(paginate.baseUrl)}/${activePage}` : firstPagePath

        }
        return toReturnPath
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
                            getLinkPath={getLinkPath}
                        />
                    </div>
                </div>
            )}
            {fetchedPost ? (<div>
                {posts.map((p, k) => {
                    return (
                        <RightImgWDes key={k} {...p} />

                    )
                })}
            </div>) : <FetchPostsFromSlugs
                slugs={posts}
                layout="list"
                render={({ posts: postList }) => {
                    return PostList.length > 0 ? (
                        <MotionStagger>
                            {postList.map((p, k) => {
                                return (
                                    <RightImgWDes key={k} {...p} />

                                )
                            })}
                        </MotionStagger>
                    ) : (
                        <RightImgListPlaceHolder count={12} />
                    )
                }}
            />}


            {paginate && (
                <div className="flex justify-item py-4">
                    <Pagination
                        currentPage={paginate.currentPage}
                        totalPages={paginate.totalPages}
                        getLinkPath={getLinkPath}
                        onChange={handleChange}
                    />
                </div>
            )}

        </div>
    )
}

export default PostList