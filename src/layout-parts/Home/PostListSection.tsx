import * as React from "react"
import RightImgWDes from '@/components/PostItem/RightImgWDes'
import { IPostItem } from '@/types'

export interface IPostListSection {
    header?: string
    subHeader?: string
    posts: IPostItem[]

}
const PostListSection: React.FC<IPostListSection> = ({ header, subHeader, posts }) => (
    <div className="md:h-full md:flex md:flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-4">
            {header && <h4 className="font-roboto text-d4slate-dark mr-2">{header}</h4>}
            {subHeader && <span className="text-sm italic text-d4slate-light">{subHeader}</span>}
        </div>
        <div className="flex-1">
            {posts.map((item, k) => {
                return (
                    <RightImgWDes border={true} {...item} key={k} />
                )
            })}
        </div>
    </div>
)

export default PostListSection