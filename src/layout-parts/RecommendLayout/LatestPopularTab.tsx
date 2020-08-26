import React from "react"
import { IPostItem } from "@/types"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import RightImgWDes from '@/components/PostItem/RightImgSimple'
import LeftImgVideo from '@/components/PostItem/VideoLefttImg'
import ac_strings from '@/strings/ac_strings.json'
import MoreLatestButton from '@/components/Buttons/MoreLatest'

interface ILatestDesktopRow {
    latestSlug: string
    latestPosts: IPostItem[]
    popularPosts: IPostItem[]
    video?: boolean
}

const LatestPopularTab: React.FC<ILatestDesktopRow> = ({ latestPosts, popularPosts, latestSlug, video }) => {

    const PostComponent = video ? LeftImgVideo : RightImgWDes
    return (
        <div className="relative px-4 sm:hidden mt-8 pb-2">
            <Tabs >
                <TabList>
                    <Tab>{ac_strings.latest}</Tab>
                    <Tab>{ac_strings.popular}</Tab>
                </TabList>
                <TabPanel>
                    {latestPosts.slice(0, 4).map((item, i) => {
                        return (
                            <PostComponent key={i} {...item} />
                        )
                    })}
                    <MoreLatestButton latestSlug={latestSlug} />
                </TabPanel>
                <TabPanel>
                    {popularPosts.slice(0, 4).map((item, i) => {
                        return (
                            <PostComponent key={i} {...item} />
                        )
                    })}
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default LatestPopularTab