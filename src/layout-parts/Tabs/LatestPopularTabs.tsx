import * as React from "react"
import TwoToThreeTabs from '@/components/Tabs/TwoToThreeTabs'
import { useSwipeable } from "react-swipeable"

import RightImgWDes from '@/components/PostItem/RightImgSimple'
import LeftImgVideo from '@/components/PostItem/VideoLefttImg'


import { IPostItem, ITab } from '@/types'
import ac_strings from '@/strings/ac_strings.json'


interface ILatesProps {
    latestSlug: string
    latestPosts: IPostItem[]
    popularPosts: IPostItem[]
    video?: boolean
}

const LatestPopularTabs: React.FC<ILatesProps> = ({ latestPosts, popularPosts, latestSlug, video }) => {
    const PostComponent = video ? LeftImgVideo : RightImgWDes
    const tabs: ITab[] = [
        {
            name: ac_strings.latest,
            to: '',
            content: (
                <div className="bg-white flex flex-col items-center px-2 sm:max-w-sm cursor-pointer">

                    {latestPosts.slice(0, 4).map((item, i) => {
                        return (
                            <PostComponent key={i} {...item} />
                        )
                    })}
                </div >
            )
        },
        {
            name: ac_strings.popular,
            to: '',
            content: (
                <div className="bg-white flex flex-col items-center px-2 sm:max-w-sm cursor-pointer">

                    {popularPosts.slice(0, 4).map((item, i) => {
                        return (
                            <PostComponent key={i} {...item} />
                        )
                    })}
                </div >
            )
        }
    ]


    return (
        <TwoToThreeTabs

            tabs={tabs}
        />

    )
}

export default LatestPopularTabs