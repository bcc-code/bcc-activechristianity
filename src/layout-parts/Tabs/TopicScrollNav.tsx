import * as React from "react"
import Link from '@/components/CustomLink'
import { useSwipeable } from "react-swipeable"

import ScrollNavTabs from '@/layout-parts/Tabs/ScrollNavTabs'
import RightImg from '@/components/PostItem/RightImgWDes'
import { ITopicPostItems } from '@/types'



interface IProps {
    tabs: ITopicPostItems[]
}
const NewForYou: React.FC<IProps> = ({ tabs }) => {

    return (
        <ScrollNavTabs
            tabs={tabs.map(tab => ({
                name: tab.name,
                to: tab.slug,
                content: (
                    <div className="bg-white flex flex-col items-center sm:max-w-sm">
                        {tab.posts.map(item => (
                            <div className="py-2 w-full">
                                <RightImg  {...item} />

                            </div>
                        ))}
                    </div >
                )
            }))}
        />

    )
}

export default NewForYou