import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ExclusiveContent from '@/layout-parts/Banner/ExclusiveContent'
import ShareButton from '@/components/PostElements/SharePopover'
import { MobileHeaderBackground, MobilePostMain, DesktopPostMain, ShareSection } from '@/layout-parts/PostSections'
/* import MockRelatedContentMedia from '@/layout-parts/RelatedContent' */
import ContentPlaylist from '@/components/Playlist/ContentPlaylistItem'
import { PlaylistBackground } from '@/components/PostElements'

import { normalizeTracks } from '@/helpers'
import { getImage } from '@/helpers/imageHelpers'

import { IRootState } from '@/state/types'
import { IPlaylist, IMedia } from '@/types'

import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'

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

                <div className="mt-6">
                    <ContentPlaylist tracks={allTracks} slug={slug} />
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
                        <div className="pr-8 relative">
                            <PlaylistBackground slug={slug} imageUrl={imageUrl} />
                        </div>
                    )
                }
                headerMeta={(
                    <div className="flex justify-end text-d4slate-dark">
                        <ShareButton
                            shareUrl={shareSlug}
                            color="slate-dark"
                            label={ac_strings.share}
                            text={title}
                            size="5"
                        />
                    </div>
                )}
            >
                <div className="mt-6">
                    <ContentPlaylist tracks={allTracks} slug={slug} />
                </div>
                {/* <MockRelatedContentMedia type="playlist" /> */}
            </DesktopPostMain>
            {/*             <div className="relative">
                <ExclusiveContent />
            </div> */}
        </article >
    )
}

export default PostLayout
