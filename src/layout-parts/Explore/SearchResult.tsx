import * as React from 'react';
import { connectHits } from 'react-instantsearch-dom'
import { IPostRes } from '@/types'

import PostItem from '@/components/PostItem/RightImgWDes'
import { normalizePostRes } from '@/helpers'
import newString from '@/strings/NewStrings.json'

interface IExploreSearchResult {
    hits: IPostRes[]
    isSearchStalled: boolean

}
const ExploreSearchResult: React.FC<IExploreSearchResult> = (props) => {
    const { hits } = props
    return hits.length === 0 ? (
        <div className="m-4">
            <p className="text-sm text-gray-800 p-4"><i>{newString.noSearchNoResult}</i></p>
        </div>
    ) : (
            <div className="m-4">
                {hits.map((hit, i) => {
                    const post = normalizePostRes(hit)
                    return (
                        <PostItem {...post} />
                    )
                })}
            </div>
        )


}

export default connectHits(ExploreSearchResult);