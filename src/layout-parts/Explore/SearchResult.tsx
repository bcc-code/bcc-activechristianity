import * as React from 'react';
import { connectHits } from 'react-instantsearch-dom'
import { IPostRes, IAuthorRes, ITopicRes } from '@/types'
import FeaturedCard from '@/components/PostItemCards/FeaturedCard'
import { normalizePostRes, playlistToPost } from '@/helpers/normalizers'
import ac_strings from '@/strings/ac_strings.js'

import { FetchOnePost, FetchOnePlaylist } from '@/HOC/FetchPosts'
import RightImgWDes from '@/components/PostItemCards/RightImg';
interface IHitPost extends IPostRes {
    type: "post"
}

interface IHitEbook {
    type: "ebook"
    title: string
    slug: string
    authors: IAuthorRes[]
    topics: ITopicRes[]
}

interface IHitPlaylist {
    type: "playlist"
    title: string
    slug: string
    excerpt: string
}

type IHitResultItem = IHitPost | IHitEbook | IHitPlaylist
interface IExploreSearchResult {
    hits: IHitResultItem[]
    isSearchStalled: boolean

}


const ExploreSearchResult: React.FC<IExploreSearchResult> = (props) => {
    const { hits } = props
    return hits.length === 0 ? (
        <div className="m-4">
            <p className="text-sm text-gray-800 p-4"><i>{ac_strings.no_search_results}</i></p>
        </div>
    ) : (
        <div className="m-4">
            {hits.map((hit, i) => {

                if (hit.type === "post") {

                    const post = normalizePostRes(hit)
                    return (
                        <FetchOnePost
                            slug={hit.slug}

                            render={({ post }) => {
                                if (post) {
                                    return (
                                        <RightImgWDes {...post} />
                                    )
                                } else {
                                    return <div> </div>
                                }
                            }}
                        />
                    )
                } else if (hit.type = "playlist") {
                    return (
                        <FetchOnePlaylist

                            slug={hit.slug}
                            render={({ post }) => {
                                if (post) {
                                    const fetched = playlistToPost(post)
                                    return (
                                        <div className="flex flex-col">
                                            <div className="pb-2">
                                                <span className="text-xxs text-gray-600">{ac_strings.playlist}</span>
                                            </div>

                                            <FeaturedCard
                                                {...fetched}

                                                type="playlist"
                                            />
                                        </div>
                                    )
                                } else {
                                    return <div> </div>

                                }

                            }}
                        />
                        /*                             */
                    )
                }

            })}
        </div>
    )


}

export default connectHits(ExploreSearchResult);