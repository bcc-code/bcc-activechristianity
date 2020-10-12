import * as React from 'react';

import XScrollCustomSize from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import ImgBgTopicCard, { IBgImgTopicCard, asImageWDataUri } from '@/components/Cards/BgImgTopicCard'

import { SectionTitleDesktopAndMobile, TitleWithIcon } from '@/components/Headers'
import { OutlineScriptureChapter } from '@/components/Button'
import QPopularAndFeaturedPosts from '@/HOC/QPopularAndFeaturedTopics'
import TopicRowAndHorizontalScroll from '@/layout-parts/List/Combo/TopicRowAndHorizontalScroll'
import ac_strings from '@/strings/ac_strings.json'
import categoriesMap, { IFormatKey } from '@/components/Icons/Formats'
import { INavItem, INavItemWKey, ITopic } from "@/types"

import Link from '@/components/CustomLink';
import TS from '@/strings'
import shortid from 'shortid'
import { getRandomArray } from '@/helpers'

import EbookImg from '@/images/format-Ebooks-01.jpg'
import PlaylistImg from '@/images/format-Playlist-02.jpg'
import PodcastImg from '@/images/format-Podcast-05.jpg'

const ExploreLayout: React.FC<{
    formats: INavItemWKey[]
    scriptureSlug: string
}> = ({ formats, scriptureSlug }) => {
    const [mostUsedScriptures, setPopularScriptures] = React.useState<INavItem[]>([])


    React.useEffect(() => {

        fetch(`/page-data/${scriptureSlug}/page-data.json`)
            .then(res => res.json())
            .then(res => {
                const mostUsedScriptures: INavItem[] = res.result.pageContext.mostPopular
                setPopularScriptures(mostUsedScriptures)
            })
            .catch(error => console.log(error))

    }, [])

    const categoryKeys: IFormatKey[] = ["testimony", "commentary", "edification", "question"]
    const mediaLongKeys: IFormatKey[] = ["animation", "interview", "song", "message"]
    const mediaSquareKeys: IFormatKey[] = ['podcast', 'playlist', 'ebook']

    const mediaSquareImages = {
        'podcast': asImageWDataUri(PodcastImg),
        'playlist': asImageWDataUri(PlaylistImg),
        'ebook': asImageWDataUri(EbookImg)
    }

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

    return (
        <div className="bg-white max-w-tablet mx-auto">
            <div className="pt-6">
                <SectionTitleDesktopAndMobile
                    name={ac_strings.topics}
                    to={TS.slug_topic}
                />
                <QPopularAndFeaturedPosts
                    render={({ topics }) => {
                        const randomTopics = getRandomArray(topics, 6)
                        return (
                            <TopicRowAndHorizontalScroll
                                topics={randomTopics}
                            />
                        )
                    }}

                />
            </div>
            <div className="pt-6">
                <SectionTitleDesktopAndMobile
                    name={TS.categories}

                />
                <div className="grid  grid-cols-2 sm:grid-cols-4 gap-4 px-4 mb-4 ">
                    {categories.map((card) => (
                        <ImgBgTopicCard {...card} overlay="light" key={shortid()} />
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
            <div className="pt-6 pb-8">
                <SectionTitleDesktopAndMobile
                    name={ac_strings.byScripture}
                    to={scriptureSlug}

                />
                <div className="hidden sm:grid grid-cols-4 lg:grid-cols-6 gap-2 px-4">
                    {mostUsedScriptures.map(s => {
                        return (
                            <Link to={s.to}>
                                < OutlineScriptureChapter>
                                    {s.name}
                                </ OutlineScriptureChapter>
                            </Link>
                        )
                    })}
                </div>
                <XScrollCustomSize
                    childeClassName=""
                    items={mostUsedScriptures.map(s => {
                        return (
                            <Link to={s.to}>
                                < OutlineScriptureChapter>
                                    {s.name}
                                </ OutlineScriptureChapter>
                            </Link>
                        )
                    })}
                />
            </div>
        </div>
    )
}

export default ExploreLayout

