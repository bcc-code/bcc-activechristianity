import React from 'react'
import LazyLoad from '@/components/LazyLoad';
import { navigate } from "gatsby"
import { IPaginate, IPostItem } from "@/types"

import RightImgWDes from '@/components/PostItem/RightImgWDes'
import Pagination from '@/components/Pagination'
import { fetchLocalPostsFromSlugs } from '@/helpers'

export interface IPostList {
    audio?: boolean
    paginate: IPaginate
    posts: string[],

}
const PostList: React.FC<IPostList> = (props) => {

    const { paginate, posts } = props
    const { currentPage, totalPages } = paginate
    const [postList, setPostList] = React.useState<IPostItem[]>([])
    console.log(posts)
    React.useEffect(() => {
        fetchLocalPostsFromSlugs(posts)
            .then(res => {

                setPostList(res)
            })
    }, posts)

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="max-w-sm" >
            {postList.map((p, k) => {
                return (
                    <LazyLoad >
                        <RightImgWDes key={k} {...p} />
                    </LazyLoad>

                )
            })}

            <div className="flex justify-item py-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={(activePage: number) => {
                        const fullPath = activePage > 1 ? `${paginate.baseUrl}/${activePage}` : paginate.baseUrl
                        scrollToTop()
                        navigate(fullPath)
                    }}
                />
            </div>

        </div>
    )
}

export default PostList