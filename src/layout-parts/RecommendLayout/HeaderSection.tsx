import React from "react"
import Link from '@/components/CustomLink'
import { IPostItem } from "@/types"
import PopularPosts from '@/layout-parts/PopularPosts'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import VideoHeader from '@/components/Images/Video16to9'
import VideoLefttImg from '@/components/PostItemCards/VideoLefttImg'
import PostBase from '@/components/PostElements/Base'
import { fetchOneLocalPostsFromSlug } from '@/helpers/fetchLocalData'
import ac_strings from '@/strings/ac_strings.js'

interface ISectionHeader {
    headerPost: IPostItem
    listPosts: IPostItem[]
    listTitle?: string
    video?: boolean
}
const SectionHeader: React.FC<ISectionHeader> = ({ headerPost, listPosts, listTitle, video }) => {
    const { image, media } = headerPost
    const [videoUrl, setVideoUrl] = React.useState<string | null>(null)
    React.useEffect(() => {
        fetchOneLocalPostsFromSlug(headerPost.slug).then(res => {
            if (res && res.media && res.media.video) {
                setVideoUrl(res.media.video.src)
            }
        })
    }, [headerPost.slug])
    return (

        <div className="relative hidden sm:flex mb-8">
            <div className="flex-1 pr-4">
                <Link
                    to={`${headerPost.slug}`}
                    className="relative z-30 flex flex-col justify-between text-sm"
                >
                    {videoUrl ? (
                        <VideoHeader
                            src={videoUrl}
                            className={`rounded-xxl sm:rounded-xl overflow-hidden`}
                        />

                    ) : (
                            <div className="m-0 relative w-full pb-square sm:pb-half">
                                <LazysizesFeaturedImage

                                    {...image}
                                    className="absolute w-full h-full inset-0 rounded-xxl sm:rounded-xl object-cover g-image"
                                />
                            </div>
                        )
                    }
                </Link>
                <PostBase
                    post={headerPost}
                    wrapperClass={' pt-4'}
                    postTitleProps={{
                        fontKey: "header-post",
                        clamp: 3,
                        className: "sm:py-3 py-1"
                    }}
                    audioDuration
                />

            </div>
            <div className="flex flex-col justify-start" style={{ width: "350px", minWidth: "350px", minHeight: "350px" }}>
                {video ? listPosts.map(item => (
                    <div>
                        <VideoLefttImg {...item} />
                    </div>
                )) : (
                        <PopularPosts
                            title={listTitle ? listTitle : ac_strings.popular}
                            posts={listPosts}
                        />
                    )}

            </div>
        </div>
    )
}

export default SectionHeader