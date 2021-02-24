import * as React from "react"
import { SectionTitleDesktopAndMobile } from '@/components/Headers'
import { IPostItem } from '@/types'

import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import PostItem from '@/components/PostItemCards/RightImg'
import HSCardListVideo from '@/components/HorizontalScroll/HSCardListVideo'
const acApiModule = import('@/util/api')
import ac_strings from '@/strings/ac_strings.js'
const UserHistory = () => {
    const [historyPosts, setHistoryPosts] = React.useState<IPostItem[]>([])
    React.useEffect(() => {
        acApiModule.then(res => {
            const api = res.default
            api.history().then(res => {
                const { history } = res
                if (res && Array.isArray(history)) {
                    const slugs = history.map(item => item.slug)
                    return fetchLocalPostsFromSlugs(slugs).then(posts => {
                        if (posts) {
                            setHistoryPosts(posts)
                        }
                    })
                    /*                         console.log(history.map(item=>item.slug))
                                        setHistoryPosts(history.map(item=>item.slug)) */
                }
            })
        })


    }, [])

    const video: IPostItem[] = []
    const other: IPostItem[] = []
    historyPosts.map(p => {
        if (p.media.video) {
            video.push(p)
        } else {
            other.push(p)
        }
    })
    return (
        <div>
            <div className="py-6">
                <SectionTitleDesktopAndMobile name={ac_strings.recently_watched} />
                <HSCardListVideo posts={video} />
            </div>
            <div className="py-6">
                <SectionTitleDesktopAndMobile name={ac_strings.recently_viewed} />
                <div className="px-4">
                    {other.map((item, i) => (
                        <PostItem {...item} key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserHistory