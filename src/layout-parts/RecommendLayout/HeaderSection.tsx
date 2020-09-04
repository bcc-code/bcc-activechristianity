import React from "react"
import Link from '@/components/CustomLink'
import { IPostItem } from "@/types"
import LazysizeBg from '@/components/Images/LazysizeBg'
import PopularPosts from '@/layout-parts/PopularPosts'
import VideoLefttImg from '@/components/PostItem/VideoLefttImg'
import { PostTitle } from '@/components/PostItem/PostItemParts'
import { PostItemPlayButton } from '@/components/Buttons/PlayButton'
import ac_strings from '@/strings/ac_strings.json'
interface ISectionHeader {
    headerPost: IPostItem
    listPosts: IPostItem[]
    listTitle?: string
    video?: boolean
}
const SectionHeader: React.FC<ISectionHeader> = ({ headerPost, listPosts, listTitle, video }) => {
    let background = 'linear-gradient(90deg, rgba(33, 34, 54, 0.88) 0%, rgba(33, 34, 54, 0) 100%)'
    return (

        <div className="relative hidden sm:flex mb-8">
            <div className="flex-1 relative rounded-xxl sm:rounded-xl overflow-hidden mr-4 text-white z-10 pl-4 pt-10 pb-4">
                <Link to={`${headerPost.slug}`} className="relative z-30 h-full flex flex-col justify-between text-sm md:w-8/12" >
                    <div>
                        <PostTitle
                            rawText={headerPost.title}
                            bold="font-semibold"
                            fontKey="header-post"
                            clamp={3}
                            className="mb-4"
                        />

                        <span className="leading-normal	" dangerouslySetInnerHTML={{ __html: headerPost.excerpt }}></span>
                    </div>
                    {headerPost.media.audio && (
                        <div id="play-button" className="text-white z-10">
                            <PostItemPlayButton track={headerPost.media} />
                        </div>
                    )}
                    {headerPost.media.video && (
                        <div id="play-button" className="text-white z-10">
                            <PostItemPlayButton track={headerPost.media} />
                        </div>
                    )}
                </Link>
                {/*                 {headerPost.image && <LazyLoad
                    {...headerPost.image}
                    className="z-0 absolute inset-0 overflow-hidden bg-center bg-cover w-full h-auto"
                />} */}
                {/* {headerPost.image && <LazysizeBg
                    {...headerPost.image}
                />} */}
                {headerPost.image && <div className="z-0 absolute inset-0 overflow-hidden bg-center bg-cover w-full" style={{ backgroundImage: `url(${headerPost.image.src})` }}></div>}
                <div className="z-0 absolute left-0 top-0 bottom-0 right-0 rounded-lg" style={{ background }}></div>
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