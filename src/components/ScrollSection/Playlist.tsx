import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlaylistBackground } from '@/components/PostItem/PostItemParts'
import SimplePlaylist from '@/components/Playlist/SimplePlaylist'
import { getImage } from '@/helpers/imageHelpers'
import { normalizeTracks } from "@/helpers"
import { IRootState } from '@/state/types'
import { IPlaylist, IMedia } from '@/types'
import { PostH1, ShareSection } from '@/layout-parts'
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



    const imageUrl = getImage(title, '400x400', image)
    const shareSlug = `${TS.slug_ac_media}/${slug}`

    const allTracks: IMedia[] = normalizeTracks(tracks)

    return (
        <div className="flex flex-col sm:flex-row py-8">
            <div className=" w-full lg:w-4/12">
                <div className="sm:px-4 relative pb-8 flex">
                    <div className="w-48">
                        <PlaylistBackground slug={slug} imageUrl={imageUrl} />
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <span className="font-roboto rounded uppercase p-1 text-xxs bg-white opacity-75">{ac_strings.playlist}</span>
                <PostH1 title={title} />
                <p className="text-d4slate-dark-dark text-lg font-medium leading-normal" dangerouslySetInnerHTML={{ __html: excerpt }} />
                <div className="border-b w-1/6 my-8 border-d4gray"></div>
                <SimplePlaylist tracks={allTracks} />
            </div>

        </div>
    )
}

export default PostLayout
