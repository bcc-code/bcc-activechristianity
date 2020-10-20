import React from 'react'
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import { useSelector, useDispatch } from 'react-redux'
/* const AudioPlayer */
const AudioMediaPlayer = loadable(() => import('@/components/MediaPlayer/AudioBanner'))
const VideoMediaPlayer = loadable(() => import('@/components/MediaPlayer/VideoPlayer'))
const Content = loadable(() => import('@/components/Content'))
const ContentPodcast = loadable(() => import('@/components/Content/ContentPodcast'))
const ExclusiveContent = loadable(() => import('@/layout-parts/Banner/ExclusiveContent'))
import { ToggleFollowWithName } from '@/components/PostElements/TopicToggleFollow'
const Row2ColAndXScroll = loadable(() => import('@/layout-parts/List/Combo/Row2Col-HorizontalScroll'))
/* const EbookFooterBanner = loadable(() => import('@/layout-parts/Banner/EbookFooterBanner'))
const MockRelatedContentMedia = loadable(() => import('@/layout-parts/RelatedContent'))
const PlaylistItem = loadable(() => import('@/components/PostItem/LeftImgPlaylist')) */

import Icon from "@/components/Icons/Icon"
import { SubscribePodcast } from "@/components/Podcast/PodcastPlatforms"

import { FetchPostsFromArchivePage } from '@/HOC/FetchPosts'

import { MobilePostMain, DesktopPostMain, AuthorBookmarkShareSection, ShareBookmarkTopShortCuts, RecommendedPostsSection } from '@/layout-parts/PostSections'

import { ReadingTimingAuthor } from '@/components/PostElements'
import TwoToOneImg from "@/components/Images/Image2To1"

import TS from '@/strings'

import acApi from '@/util/api'
import { debounce, normalizeAvailableLanguages } from '@/helpers'


import { IPostItem, IPostRes, ITranslations } from '@/types'
import { IRootState } from '@/state/types'

// mock data

import ac_strings from '@/strings/ac_strings.json'
import currentMedia from '@/state/reducer/mp_currentMedia';


interface IPostProps extends IPostItem {
    content: string
    langs: ITranslations[]
    recommendPosts: string[]
    readMorePosts: string[]
}
type IMediaType = "audio" | "video"
export const PostLayout: React.FC<IPostProps> = (post) => {

    const {
        id,
        title,
        slug,
        excerpt,
        authors,
        image,
        types,
        topics,
        format,
        reading_time,
        content,
        langs,
        glossary,
        readMorePosts,
        views,
        likes,
        duration,
        media
    } = post

    const [lastScroll, setLastScroll] = React.useState(Date.now() + 5000)
    const [currentMediaType, setCurrentMediaType] = React.useState<IMediaType | "none">("none")
    const [mediaTypes, setMediaMtypes] = React.useState<IMediaType[]>([])
    const { isCurrentMedia } = useSelector((state: IRootState) => ({ isCurrentMedia: state.currentMedia }))

    React.useEffect(() => {

        const handleScroll = () => {

            if (lastScroll < Date.now()) {
                setLastScroll(Date.now() + 5000)
                const { id } = post
                if (id) {
                    acApi
                        .readingPost(id)
                        .catch((err: any) => {
                            console.log(err)
                        })
                }
            }


        }
        const debounceScroll = debounce(handleScroll, 1000)
        window.addEventListener('scroll', debounceScroll);
        return () => window.removeEventListener('scroll', debounceScroll);
    }, [post.slug])

    React.useEffect(() => {

        const toAddMediaType: IMediaType[] = []

        let toUpdateCurrentMediaType: IMediaType | "none" = "none"
        if (media.audio) {
            toAddMediaType.push("audio")
            toUpdateCurrentMediaType = "audio"
        }
        if (media.video && media.video.src) {

            toAddMediaType.push("video")
            toUpdateCurrentMediaType = "video"
        }

        if (toAddMediaType.length > 0) {
            setMediaMtypes(toAddMediaType)
        }
        setCurrentMediaType(toUpdateCurrentMediaType)


    }, [media])


    const postId = id
    const imageUrl = image;
    const tranlsatedUrl = normalizeAvailableLanguages(langs, false)
    const isPodcast = format?.findIndex(f => `${f.id}` === process.env.PODCAST_FILTER_ID)

    const body = (

        <div>

            <Content
                content={content}
                glossary={glossary}
                slug={slug}
                title={title}
            />
            <div className="flex flex-wrap border-d4gray py-6">
                {topics && topics?.map(item => (
                    <ToggleFollowWithName {...item} />
                ))}
            </div>
            <div className="border-b pb-6">
                <AuthorBookmarkShareSection
                    id={id}
                    text={excerpt || title}
                    shareSlug={slug}
                    views={views}
                    likes={likes}
                    authors={authors}

                />
            </div>
            <LazyLoad>
                <RecommendedPostsSection
                    postId={id}
                    readMorePosts={readMorePosts}
                />
            </LazyLoad>
            {authors?.map(item => {
                return (

                    <div className="pt-6">
                        {item.authors.map(a => (
                            <FetchPostsFromArchivePage
                                slug={`${TS.slug_ac_author}/${a.to}`}
                                layout="list"
                                render={({ posts }) => {
                                    const filteredPosts = posts.filter(p => `${p.id}` !== `${postId}`).slice(0, 6)
                                    return filteredPosts.length > 0 ? (
                                        <Row2ColAndXScroll
                                            title={`${ac_strings.more_from} ${a.name}`}
                                            posts={filteredPosts}
                                        />
                                    ) : <div></div>
                                }}

                            />

                        ))}
                    </div>

                )
            })}


        </div>
    )


    const postFooter = (
        <LazyLoad>
            <div className="relative bg-white">
                <ExclusiveContent />
            </div>
        </LazyLoad>

    )

    const defaultHeight = {
        "audio": 88,
        "video": window ? ((9 / 16) * (window.innerWidth)) + 60 : 250,
        "none": 250
    }

    console.log(currentMediaType)
    const currentHeigt = defaultHeight[currentMediaType] + (mediaTypes.length > 1 ? 39 : 0)
    return (
        <article className="overflow-scroll w-full relative">
            <ShareBookmarkTopShortCuts
                isPlayingAudio={!!isCurrentMedia.audio}
                id={id}
                text={excerpt || title}
                shareSlug={slug}
                views={views}
                likes={likes}
            />

            <div className="fixed sm:relative w-full z-50">
                {currentMediaType === "video" && media.video && media.video.src && (
                    <VideoMediaPlayer src={media.video.src} />

                )}
                {currentMediaType === "audio" && media.audio && (
                    <AudioMediaPlayer media={media} duration={duration?.listen} stopScrollingTitle={!!isCurrentMedia.audio} />
                )}

                {mediaTypes.length > 1 && (
                    <div className="w-full flex justify-center pb-4  bg-mp-background sm:pt-4">
                        {mediaTypes.map((item, i) => (
                            <button
                                key={item}
                                className={`border-d4slate-light text-d4slate-light px-2 py-1 border-t border-b text-xs sm:text-sm ${i === 0 ? 'rounded-l  border-l' : 'rounded-r  border-r'} ${currentMediaType === item ? 'bg-d4slate-light text-d4slate-dark' : ''}`}
                                onClick={() => setCurrentMediaType(item)}>
                                {item}
                            </button>
                        ))}
                    </div>
                )}

            </div>

            <div className="sm:hidden fixed mt-64 inset-x top-0 w-full">
                {mediaTypes.length > 0 ? (
                    <div className='fixed bg-mp-background w-full' style={{ top: "50px", height: `${currentHeigt + 50}px` }}>

                    </div>
                ) : (
                        <div
                            className={`fixed transition-transform background-image w-full flex items-end`}
                            style={{ top: "50px", background: `url(${imageUrl.src}) center center no-repeat`, backgroundSize: "cover", height: "300px" }}
                        >
                        </div>

                    )}
            </div>

            <MobilePostMain
                id={postId}
                title={title}
                excerpt={excerpt}
                height={currentHeigt}
                shareSlug={slug}
                translatedUrls={tranlsatedUrl}
            >
                <div className="pb-6 bg-white border-d4gray border-b text-sm">
                    <ReadingTimingAuthor
                        duration={duration?.read}
                        authors={authors}

                    />
                </div>
                {(currentMediaType !== "video") && (
                    <div className="relative sm:pt-10 mb-12 ">
                        <TwoToOneImg image={image} />
                        {isPodcast && isPodcast > -1 ? (
                            <SubscribePodcast />
                        ) : null}
                    </div>
                )}
                {body}
            </MobilePostMain>
            <DesktopPostMain
                id={postId}
                title={title}
                excerpt={excerpt}
                shareSlug={slug}
                translatedUrls={tranlsatedUrl}
                headerMeta={(
                    <ReadingTimingAuthor
                        duration={duration?.read}
                        authors={authors}

                    />
                )}
            >
                {currentMediaType !== "video" && (
                    <div className="relative sm:pt-10 mb-12 ">
                        <TwoToOneImg image={image} rounded />
                        {isPodcast && isPodcast > -1 && (
                            <div>
                                <SubscribePodcast />
                            </div>
                        )}
                    </div>
                )}

                {body}
            </DesktopPostMain>
            <div className="mx-auto max-w-tablet main-content py-8 relative bg-white px-4 z-50">
                <p className=""><em>{TS.scripture_copyright}</em></p>
            </div>

        </article >
    )
}

export default PostLayout

