import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ExclusiveContent from '@/layout-parts/Banner/ExclusiveContent'

import { MobileHeaderBackground, MobilePostMain, DesktopPostMain, ShareSection } from '@/layout-parts'
/* import MockRelatedContentMedia from '@/layout-parts/RelatedContent' */
import ContentPlaylist from '@/components/Playlist/ContentPlaylistItem'
import { PlaylistBackground } from '@/components/PostItem/PostItemParts'

import { blog as blogApi } from '@/util/sdk'

import { normalizeAuthors, normalizeTracks } from '@/helpers'
import { getImage } from '@/helpers/imageHelpers'

import { IRootState } from '@/state/types'
import { IPlaylist, IMedia } from '@/types'

import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'

export const PostLayout: React.SFC<IPlaylist> = (post) => {

    const [lastScroll, setLastScroll] = React.useState(Date.now() + 5000)

    const { isCurrentMedia } = useSelector((state: IRootState) => ({ isCurrentMedia: state.currentMedia }))
    const id = ''
    const {
        image,
        title,
        slug,
        tracks,
        excerpt,
    } = post

    const imageUrl = getImage(title, '640x320', image)
    const shareSlug = `${ac_strings.playlist}/${slug}`

    const allTracks: IMedia[] = normalizeTracks(tracks)
    return (
        <article className="overflow-scroll">
            <MobileHeaderBackground imgUrl={imageUrl.src}>
                <div className="flex flex-col items-center w-full" style={{ transform: 'translateY(0px)' }}>
                    <div className="w-5/12">
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
                {isCurrentMedia.audio && (
                    <div className="px-4 pr-8 relative">
                        <PlaylistBackground slug={slug} imageUrl={imageUrl} />
                    </div>
                )}

                <div className="mt-6">
                    <ContentPlaylist tracks={allTracks} />
                </div>
                {/* <MockRelatedContentMedia type="playlist" /> */}
            </MobilePostMain>
            <DesktopPostMain
                id={id}
                title={title}
                excerpt={excerpt}
                shareSlug={shareSlug}
                headerLeft={
                    (
                        <div className="px-4 pr-8 relative">
                            <PlaylistBackground slug={slug} imageUrl={imageUrl} />
                        </div>
                    )
                }
                headerMeta={(
                    <div className="flex justify-end">
                        <ShareSection shareSlug={slug} id={id} text={excerpt} simple />
                    </div>
                )}
            >
                <div className="my-4">
                    <ContentPlaylist tracks={allTracks} />
                </div>
                {/* <MockRelatedContentMedia type="playlist" /> */}
            </DesktopPostMain>
            <div className="relative">
                <ExclusiveContent />
            </div>
        </article >
    )
}

export default PostLayout
