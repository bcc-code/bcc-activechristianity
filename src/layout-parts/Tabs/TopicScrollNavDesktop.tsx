import * as React from "react"
import TopImgPost from '@/components/PostItemCards/TopImg'
import ScrollNavTabs from '@/components/Tabs/ScrollNavTabs'

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
                    <div className="grid-home-latest-scroll-4col my-4 sm:grid">
                        {tab.posts.slice(0, 6).map((item, i) => {
                            return (
                                <div className={`div${i + 1}`}>
                                    < TopImgPost {...item} showType />
                                </div>
                            )
                        })}
                    </div>
                )
            }))}
        />

    )
}

export default NewForYou