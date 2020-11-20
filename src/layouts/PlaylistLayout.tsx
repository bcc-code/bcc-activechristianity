import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LazyLoad from '@/components/LazyLoad';

import ShareButton from '@/components/PostElements/SharePopover'
import { ToggleFollowPlaylistBookmark } from '@/components/PostElements/TopicToggleFollow'
import { MobileHeaderBackground, MobilePostMain, DesktopPostMain, ShareSection } from '@/layout-parts/PostLayout/PostSections'
/* import MockRelatedContentMedia from '@/layout-parts/RelatedContent' */
import { FetchLatestPlaylists } from '@/HOC/FetchLatest'
import ContentPlaylist from '@/components/Playlist/ContentPlaylistItem'
import { PlaylistBackground } from '@/components/PostElements'
import { getRandomArray } from "@/helpers"
import { normalizeTracks } from '@/helpers'
import { getImage } from '@/helpers/imageHelpers'
import PodcastTopImg from '@/components/PostItemCards/PlaylistTopImg'
import { IRootState } from '@/state/types'
import { IPlaylist, IMedia } from '@/types'
import { PageSectionHeaderUpperCaseGray } from '@/components/Headers'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.js'


export const PostLayout: React.FC<IPlaylist> = (post) => {

    const {
        id,
        image,
        title,
        slug,
        tracks,
        excerpt,
    } = post

    const imageUrl = getImage(title, '640x320', image)
    const shareSlug = `${ac_strings.slug_playlist}/${slug}`

    const allTracks: IMedia[] = normalizeTracks(tracks)
    const share = (
        <div className="flex">

            <ShareButton
                shareUrl={shareSlug}
                text={excerpt ? excerpt : ""}
                label={ac_strings.share}
                color="slate-light"
            />
            <div className="mx-4">
                < ToggleFollowPlaylistBookmark
                    id={id}
                    color="slate-light"
                />
            </div>

        </div>
    )

    const body = (
        <div>

            <div className="mt-6">
                <ContentPlaylist tracks={allTracks} slug={slug} />
            </div>
            <LazyLoad  >
                <div className="pt-6">
                    <PageSectionHeaderUpperCaseGray title={ac_strings.youMightBeInterestedIn} />
                </div>
                <FetchLatestPlaylists
                    layout="row"
                    render={({ playlists }) => {
                        const randomPlaylist = getRandomArray(playlists.filter(p => `${p.id}` !== `${id}`), playlists.length > 4 ? 4 : playlists.length)
                        return (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                                {randomPlaylist.map(p => {
                                    return (
                                        <PodcastTopImg
                                            {...p}
                                            slug={`${ac_strings.slug_playlist}/${p.slug}`}

                                        />
                                    )
                                })}
                            </div>
                        )
                    }
                    }

                />
            </LazyLoad>
        </div>
    )
    return (
        <article className="overflow-scroll">
            <MobileHeaderBackground imgUrl={imageUrl.src}>
                <div className="flex flex-col items-center w-full" style={{ transform: 'translateY(0px)' }}>
                    <div className="w-7/12">
                        <PlaylistBackground slug={slug} imageUrl={imageUrl} />
                    </div>
                </div>
            </MobileHeaderBackground>
            <MobilePostMain
                id={id}
                height={300}
                title={title}
                excerpt={excerpt}
                shareSlug={shareSlug}

            >
                {body}
            </MobilePostMain>
            <DesktopPostMain
                id={id}
                title={title}
                excerpt={excerpt}
                shareSlug={shareSlug}
                headerLeft={
                    (
                        <div className="pr-8 relative">
                            <PlaylistBackground slug={slug} imageUrl={imageUrl} />
                        </div>
                    )
                }
                headerMeta={(
                    <div className="flex justify-end text-d4slate-dark">
                        {share}
                    </div>
                )}
            >
                {body}
            </DesktopPostMain>
            {/*             <div className="relative">
                <ExclusiveContent />
            </div> */}
        </article >
    )
}

export default PostLayout
