import * as React from "react"
import { IPostItem } from '@/types'
import { PostTitle, ReadingTimingAuthor } from '@/components/PostItem/PostItemParts'
export interface ILeftIconPost {
    icon: () => JSX.Element,
    post: IPostItem
}

const LeftIconPost: React.FC<ILeftIconPost> = ({ icon, post }) => {

    const TabIcon = icon
    const { title, reading_time, authors, topics } = post
    return (
        <div className="flex mb-8">
            <div className="bg-white w-12 h-12 flex justify-center items-center pt-2" style={{ borderRadius: 9999 }}>
                <TabIcon />
            </div>
            <div className="ml-4 flex flex-col justify-between flex-1">
                <PostTitle
                    rawText={title}
                    fontKey="top-img"
                    clamp={2}
                    bold="font-semibold"
                    className="block mb-2 leading-tight"
                />
                {/*                 <title className="block font-bold text-xl mb-2 leading-none">{title}</title> */}
                <span className="text-sm mb-2">{topics && topics[0] && topics[0].name}</span>
                {authors && authors[0] && <ReadingTimingAuthor className="text-xs text-gray-600 mb-2" readingTime={reading_time?.text} authors={authors[0].authors} />}
            </div>
        </div>
    )
}

export default LeftIconPost