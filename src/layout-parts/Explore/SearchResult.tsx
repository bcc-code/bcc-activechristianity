import * as React from 'react';
import { connectHits } from 'react-instantsearch-dom'
import { IPostRes, IAuthor, IAuthorRes, ITopicRes } from '@/types'
import FeaturedCard from '@/components/PostItem/FeaturedCard'
import PostItem from '@/components/PostItemCards/RightImg'
import { normalizePostRes, ebookResToPost, playlistToPost } from '@/helpers'
import ac_strings from '@/strings/ac_strings.json'

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
            <p className="text-sm text-gray-800 p-4"><i>{ac_strings.noSearchNoResult}</i></p>
        </div>
    ) : (
            <div className="m-4">
                {hits.map((hit, i) => {

                    if (hit.type === "post") {

                        const post = normalizePostRes(hit)
                        return (
                            <PostItem {...post} />
                        )
                    } else if (hit.type === "ebook") {
                        return (
                            <FeaturedCard
                                {...ebookResToPost(hit)}
                                slug={hit.slug}

                                type="ebook"
                            />
                        )
                    } else if (hit.type = "playlist") {
                        return (
                            <FeaturedCard
                                {...playlistToPost(hit)}
                                slug={hit.slug}

                                type="playlist"
                            />
                        )
                    }

                })}
            </div>
        )


}

export default connectHits(ExploreSearchResult);