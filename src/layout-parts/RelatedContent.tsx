import * as React from 'react'


import PlaylistItem from '@/components/Playlist/SimplePlaylistCover'
import QLatestPlaylist from '@/queries/QLatestPlaylist'
import QLatestVideo from '@/queries/QLatestVideo'
import QLatestSongs from '@/queries/QLatestSongs'
import VideoPost from '@/components/PostItem/TopImg'
import { PostRelatedContentHeader } from '@/layout-parts'
import newString from '@/strings/ac_strings.json'
type IRelatedContent = "podcast" | "playlist" | "video" | "music" | string

export const MockRelatedContentMedia: React.FC<{ type: IRelatedContent }> = ({ type }) => {


    const title = <PostRelatedContentHeader title={newString.youMightBeInterestedIn} />
    if (type === "playlist") {
        return (
            <QLatestPlaylist >
                {(posts) => {
                    return (
                        <div>
                            {title}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                                {posts && posts.map(item => {
                                    return (
                                        <div className="div-content">
                                            <PlaylistItem {...item} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }
                }
            </QLatestPlaylist>
        )
    } else if (type === "video") {
        return (
            <QLatestVideo >
                {(posts) => {
                    return (
                        <div>
                            {title}
                            <div className="grid-1-2col grid-h80">
                                {posts && posts.map(item => {
                                    return (
                                        <div className="py-4">
                                            <VideoPost {...item} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }
                }
            </QLatestVideo>
        )
    } else if (type === "music") {
        return (
            <QLatestSongs >
                {(posts) => {
                    return (
                        <div>
                            {title}
                            <div className="grid-1-2col grid-h80">
                                {posts && posts.map(item => {
                                    return (
                                        <div className="py-4">
                                            <VideoPost {...item} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }
                }
            </QLatestSongs >
        )
    } else {
        return null
    }
}

export default MockRelatedContentMedia
