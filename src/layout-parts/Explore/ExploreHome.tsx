import * as React from 'react';

import { asImageWDataUri } from '@/components/Cards/BgImgTopicCard'
import Link from '@/components/CustomLink'
import { SectionTitleDesktopAndMobile } from '@/components/Headers'
import ExplorePopularScripture from '@/layout-parts/Explore/ExplorePopularScripture'

import TopicRowAndHorizontalScroll from '@/layout-parts/List/Combo/TopicRowAndHorizontalScroll'
import ExploreFormatRecommended from '@/layout-parts/Explore/ExploreTopRecommended'
import FetchRecommendMix from '@/layout-parts/Explore/FetchRecommendMix'
import ac_strings from '@/strings/ac_strings.js'

import SquareImages from '@/components/Images/Image1to1Rounded'
import shortid from 'shortid'
import { getRandomArray } from '@/helpers'

import typesFormats from '@/strings/topic-filters.json'
import PlaylistImg from '@/images/format-Playlist-02.jpg'
import PodcastImg from '@/images/format-Podcast-05.jpg'
import { ITopic } from '@/types';

const ExploreLayout: React.FC<{
    topics: ITopic[]
    formatIds?: number[]
}> = (props) => {
    const { topics, formatIds: recommendFormatIds } = props
    const mediaSquareImages = {
        'podcast': asImageWDataUri(PodcastImg),
        'playlist': asImageWDataUri(PlaylistImg)
    }
    const { formatIds, typeIds } = typesFormats
    const formats = Object.keys(formatIds).map(id => formatIds[id])
    let filteredTopics = topics.filter(item => !formatIds[item.id] && !typeIds[item.id])
    filteredTopics = [...new Set(filteredTopics)]
    const randomTopics = getRandomArray(filteredTopics, 6)

    return (
        <div className="bg-white max-w-tablet mx-auto pb-8">
            <div className="pt-6">
                <SectionTitleDesktopAndMobile
                    name={ac_strings.topics}
                    to={ac_strings.slug_topic}
                />
                <TopicRowAndHorizontalScroll
                    topics={randomTopics}
                />
            </div>
            <div className="pt-6">
                <SectionTitleDesktopAndMobile
                    name={ac_strings.categories}

                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
                    {ac_strings.slug_podcast && (
                        <Link key={shortid()} to={ac_strings.slug_podcast} className="flex flex-col shadow rounded-lg overflow-hidden" >
                            <SquareImages
                                className="rounded-t-lg"
                                {...mediaSquareImages.podcast}
                            />
                            <div className="font-roboto font-semi text-center py-2 px-2">
                                {ac_strings.podcast}
                            </div>
                        </Link>
                    )}
                    {ac_strings.slug_playlist && (
                        <Link key={shortid()} to={ac_strings.slug_playlist} className="flex flex-col shadow rounded-lg overflow-hidden" >
                            <SquareImages
                                className="rounded-t-lg"
                                {...mediaSquareImages.playlist}
                            />
                            <div className="font-roboto font-semi text-center py-2 px-2">
                                {ac_strings.playlist}
                            </div>
                        </Link>
                    )}
                    {formats.map((card) => (
                        <Link key={shortid()} to={card.to} className="flex flex-col shadow rounded-lg overflow-hidden" >
                            <SquareImages
                                className="rounded-t-lg"
                                {...card.image}
                            />
                            <div className="font-roboto font-semi text-center py-2 px-2">
                                {card.name}
                            </div>
                        </Link>

                    ))}

                </div>
            </div>

            {ac_strings.slug_scripture && (
                <ExplorePopularScripture
                    scriptureSlug={ac_strings.slug_scripture}
                />
            )}

            <div className="pt-6">
                <SectionTitleDesktopAndMobile
                    name={ac_strings.recommend_for_you}

                />
                {recommendFormatIds && recommendFormatIds.length > 3 && <ExploreFormatRecommended ids={recommendFormatIds} />}
                <FetchRecommendMix />
            </div>
        </div>
    )
}

export default React.memo(ExploreLayout)

