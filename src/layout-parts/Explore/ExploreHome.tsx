import * as React from 'react';

import { asImageWDataUri } from '@/components/Cards/BgImgTopicCard'
import { Button } from '@/components/Button'
import BookShop from '@/layout-parts/Banner/BookShop'

import ExploreFormatRecommended from '@/layout-parts/Explore/ExploreTopRecommended'
import ExplorePopularScripture from '@/layout-parts/Explore/ExplorePopularScripture'

import FetchRecommendMix from '@/layout-parts/Explore/FetchRecommendMix'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'

import PlaylistImg from '@/images/format-Playlist-02.jpg'

import RightImgPost from '@/components/PostItemCards/RightImg'
import Row3ColHorizontalScroll from '@/components/List/Combo/Row3Col-HorizontalScroll'

import SquareCard from '@/components/Cards/SquareCategoryCard'
import SquareCardSmall from '@/components/Cards/SquareCategoryCardLong'
import SquareLeftImg from '@/components/PostItemCards/SquareLeftImg'
import { SectionTitleDesktopAndMobile } from '@/components/Headers'

import TitleLink from '@/components/PostItemCards/TitleLink'
import TopicRowAndHorizontalScroll from '@/components/List/Combo/TopicRowAndHorizontalScroll'

import ac_strings from '@/strings/ac_strings.js'
import { getRandomArray } from '@/helpers/normalizers'
import shortid from 'shortid'
import { ITopic, ITopicPostSlugs } from '@/types';

const ExploreLayout: React.FC<{
    topics: ITopic[]
    allFormats: ITopic[]
    recommendFormats: ITopic[]
    questions: ITopicPostSlugs
    featuredVideos: ITopicPostSlugs
    edification: ITopicPostSlugs
    songs: ITopicPostSlugs
}> = (props) => {
    const { topics, recommendFormats, allFormats, questions, songs, featuredVideos, edification } = props
    const [isMobile, setIsMobile] = React.useState(typeof window !== "undefined" && window.innerWidth < 640)

    React.useEffect(() => {
        setIsMobile(typeof window !== "undefined" && window.innerWidth < 640)
    }, [])

    const mediaSquareImages = {
        'playlist': asImageWDataUri(PlaylistImg)
    }

    const randomTopics = getRandomArray(topics, 6)
    const hasPlaylist = process.env.LISTEN_SECTION === "all"
    const hasScriptureSection = process.env.SCRIPTURE_SECTION === "true"
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
            {process.env.LANG_CODE === "en" && (
                <>
                    <div className="pt-6 text-sm " >
                        <SectionTitleDesktopAndMobile
                            name={edification.name}
                            to={edification.slug}
                        />
                        <FetchPostsFromSlugs
                            layout={"list"}
                            slugs={getRandomArray(edification.posts, 4)}
                            render={({ posts }) => {
                                return (
                                    <div className="px-4">
                                        {posts.map(p => {
                                            return isMobile ? (
                                                <SquareLeftImg small {...p} />
                                            ) : (
                                                <RightImgPost {...p} />
                                            )
                                        })}
                                    </div>
                                );
                            }}
                        />

                    </div>
                    <div className="pt-6">
                        <FetchPostsFromSlugs
                            layout={"list"}
                            slugs={getRandomArray(featuredVideos.posts, 4)}
                            render={({ posts }) => {
                                return (
                                    <div className="px-4">
                                        <Row3ColHorizontalScroll
                                            largeTitle posts={posts}
                                            title={featuredVideos.name}
                                            to={featuredVideos.slug}
                                        />
                                    </div>
                                );
                            }}
                        />
                    </div>
                    <div className="pt-6">
                        <SectionTitleDesktopAndMobile
                            name={questions.name}
                            to={questions.slug}
                        />
                        <FetchPostsFromSlugs
                            layout={"list"}
                            slugs={getRandomArray(questions.posts, 4)}
                            render={({ posts }) => {
                                return (
                                    <div className="px-4">
                                        {posts.map(p => {
                                            return (
                                                <TitleLink
                                                    title={p.title}
                                                    slug={p.slug}
                                                />
                                            )
                                        })}
                                    </div>
                                );
                            }}
                        />
                    </div>
                    <div className="pt-6">
                        <FetchPostsFromSlugs
                            layout={"list"}
                            slugs={getRandomArray(songs.posts, 4)}
                            render={({ posts }) => {
                                return (
                                    <div className="px-4">
                                        <Row3ColHorizontalScroll
                                            largeTitle
                                            posts={posts}
                                            title={songs.name}
                                            to={songs.slug}
                                        />
                                    </div>
                                );
                            }}
                        />
                    </div>
                </>
            )}
            {hasScriptureSection && (
                <ExplorePopularScripture
                    isMobile={isMobile}
                />
            )}


            {process.env.LANG_CODE === "en" ? (
                <div className="pt-6">
                    <SectionTitleDesktopAndMobile
                        name={ac_strings.categories}

                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
                        {hasPlaylist && (
                            <SquareCard
                                image={mediaSquareImages.playlist}
                                title={ac_strings.playlist}
                                to={ac_strings.slug_playlist}
                            />
                        )}
                        {allFormats.map((card) => (
                            <SquareCard
                                key={shortid()}
                                to={card.slug}
                                image={card.image}
                                title={card.name}
                            />

                        ))}
                    </div>

                </div>
            ) : (
                <>
                    <div className="pt-6">
                        <SectionTitleDesktopAndMobile
                            name={ac_strings.recommend_for_you}

                        />
                        {recommendFormats && <ExploreFormatRecommended slugs={recommendFormats.map(item => item.slug)} />}
                        <FetchRecommendMix topics={topics} isMobile={isMobile} />
                    </div>
                    <div className="pt-6">
                        <SectionTitleDesktopAndMobile
                            name={ac_strings.categories}

                        />
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 px-4">
                            {hasPlaylist ? isMobile ? (
                                <SquareCardSmall
                                    image={mediaSquareImages.playlist}
                                    title={ac_strings.playlist}
                                    to={ac_strings.slug_playlist}
                                />
                            ) : (
                                <SquareCard
                                    image={mediaSquareImages.playlist}
                                    title={ac_strings.playlist}
                                    to={ac_strings.slug_playlist}
                                />
                            ) : null}
                            {allFormats.map((card) => isMobile ? (
                                <SquareCardSmall
                                    key={shortid()}
                                    to={card.slug}
                                    image={card.image}
                                    title={card.name}
                                />

                            ) : (
                                <SquareCard
                                    key={shortid()}
                                    to={card.slug}
                                    image={card.image}
                                    title={card.name}
                                />
                            ))}
                        </div>
                    </div>
                </>

            )}
            {process.env.LANG_CODE === "en" && (
                <div className="pt-6">
                    <SectionTitleDesktopAndMobile
                        name={ac_strings.banner_ebook_title}
                    />
                    <div className="px-4 text-sm">{ac_strings.banner_ebook_content}</div>
                    <Button
                        className="text-sm sm:text-base mx-4 mt-4 text-ac-secondary"
                        href={ac_strings.banner_ebook_cta_url}
                    >
                        {ac_strings.banner_ebook_cta_label}
                    </Button>
                </div>
            )}


        </div>
    )
}

export default React.memo(ExploreLayout)

