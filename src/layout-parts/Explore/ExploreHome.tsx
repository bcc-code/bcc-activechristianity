import * as React from 'react';

import XScrollCustomSize from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import ImgBgTopicCard, { IBgImgTopicCard, asImageWDataUri } from '@/components/Cards/BgImgTopicCard'

import { SectionTitleDesktopAndMobile, TitleWithIcon } from '@/components/Headers'
import ExplorePopularScripture from '@/layout-parts/Explore/ExplorePopularScripture'
import QPopularAndFeaturedPosts from '@/HOC/QPopularAndFeaturedTopics'
import TopicRowAndHorizontalScroll from '@/layout-parts/List/Combo/TopicRowAndHorizontalScroll'
import ac_strings from '@/strings/ac_strings.js'
import categoriesMap, { IFormatKey } from '@/components/Icons/Formats'

import TS from '@/strings'
import shortid from 'shortid'
import { getRandomArray } from '@/helpers'

import typesFormats from '@/strings/topic-filters.json'
import PlaylistImg from '@/images/format-Playlist-02.jpg'
import PodcastImg from '@/images/format-Podcast-05.jpg'
import { ITopic } from '@/types';

const ExploreLayout: React.FC<{
    topics: ITopic[]
    scriptureSlug: string
}> = ({ scriptureSlug, topics }) => {

    const categoryKeys: IFormatKey[] = ["testimony", "commentary", "edification", "question"]
    const mediaLongKeys: IFormatKey[] = ["animation", "interview", "song", "message"]
    const mediaSquareKeys: IFormatKey[] = ['podcast', 'playlist']

    const mediaSquareImages = {
        'podcast': asImageWDataUri(PodcastImg),
        'playlist': asImageWDataUri(PlaylistImg)
    }
    const { formatIds, typeIds } = typesFormats
    const formats = Object.keys(formatIds).map(id => formatIds[id])
    const getMenu = (keys: IFormatKey[]) => {
        const toReturn: IBgImgTopicCard[] = []
        keys.map(k => {

            const findFormat = formats.find(f => f.key === k)
            if (findFormat) {
                const icon = categoriesMap[k]
                toReturn.push({
                    name: <TitleWithIcon title={findFormat.name} icon={icon ? icon : categoriesMap.fallback} />,
                    to: findFormat.to,
                    image: findFormat.image || mediaSquareImages[k]
                })
            }
        })
        return toReturn
    }
    const categories: IBgImgTopicCard[] = getMenu(categoryKeys)
    const mediaLong: IBgImgTopicCard[] = getMenu(mediaLongKeys)
    const mediaSquare: IBgImgTopicCard[] = getMenu(mediaSquareKeys)
    const filteredTopics = topics.filter(t => formatIds[t.id] === undefined && typeIds[t.id] === undefined)
    const randomTopics = getRandomArray(filteredTopics, 6)
    return (
        <div className="bg-white max-w-tablet mx-auto">
            <div className="pt-6">
                <SectionTitleDesktopAndMobile
                    name={ac_strings.topics}
                    to={TS.slug_topic}
                />
                <TopicRowAndHorizontalScroll
                    topics={randomTopics}
                />
            </div>
            <div className="pt-6">
                <SectionTitleDesktopAndMobile
                    name={TS.categories}

                />
                <div className="grid  grid-cols-2 sm:grid-cols-4 gap-4 px-4 mb-4 ">
                    {categories.map((card) => (
                        <div className="min-h-12 h-12">
                            <ImgBgTopicCard
                                {...card}
                                overlay="light"
                                key={shortid()}

                            />
                        </div>
                    ))}
                </div>

            </div>
            <div className="pt-6">
                <SectionTitleDesktopAndMobile
                    name={TS.media}

                />
                <XScrollCustomSize
                    childeClassName=""
                    items={mediaLong.map((card) => (
                        <div className="min-h-24 h-24 w-36" key={shortid()} >
                            <ImgBgTopicCard {...card} overlay="medium" />

                        </div>
                    ))}
                />
                <XScrollCustomSize
                    childeClassName=""
                    items={mediaSquare.map((card) => (
                        <div className="min-h-24 h-24 w-24" key={shortid()}>
                            <ImgBgTopicCard {...card} overlay="medium" />

                        </div>
                    ))}
                />

                <div className="hidden sm:grid grid-cols-4 gap-4 px-4">
                    {[...mediaLong, ...mediaSquare].map((card) => (
                        <div className="min-h-24 h-24" >
                            <ImgBgTopicCard {...card} overlay="medium" />
                        </div>
                    ))}
                </div>
            </div>

            <ExplorePopularScripture
                scriptureSlug={scriptureSlug}
            />
        </div>
    )
}

export default React.memo(ExploreLayout)

