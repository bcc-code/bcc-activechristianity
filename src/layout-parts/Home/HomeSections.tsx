import * as React from "react"
import { IPostItem } from '@/types'
import PostItemCard from '@/components/PostItemCard/TopImg'
export const CardListPosts: React.FC<{ posts: IPostItem[], title: string }> = ({ posts, title }) => {
    return (
        <div style={{ background: "#f4f4f4" }}>
            <div className="standard-max-w px-4 flex flex-col justify-center py-18">
                <h2 className="text-center font-bold text-4-7/10-xl pb-8">{title}</h2>
                <div>

                </div>
                <div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
                    {posts.map((item) => {

                        return (
                            <PostItemCard {...item} />
                        )
                    })}
                </div>

            </div>
        </div>
    )
}