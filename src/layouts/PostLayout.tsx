import React from 'react'
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentMedia, fixPlayer, floatPlayer, setMpHeight } from '@/state/action'
const VideoMediaPlay = loadable(() => import('@/components/MediaPlayer/VideoPlayerLocal'))
const Content = loadable(() => import('@/components/Content'))

const ContentPodcast = loadable(() => import('@/components/Content/ContentPodcast'))

const ExclusiveContent = loadable(() => import('@/layout-parts/Banner/ExclusiveContent'))
const ToggleFollowWithName = loadable(() => import('@/layout-parts/Buttons/ToggleFollowWithName'))
const Row2ColAndXScroll = loadable(() => import('@/layout-parts/List/Combo/Row2Col-HorizontalScroll'))
/* const EbookFooterBanner = loadable(() => import('@/layout-parts/Banner/EbookFooterBanner'))
const MockRelatedContentMedia = loadable(() => import('@/layout-parts/RelatedContent'))
const PlaylistItem = loadable(() => import('@/components/PostItem/LeftImgPlaylist')) */

import Icon from "@/components/Icons/Icon"
import { SubscribePodcast } from "@/components/Podcast/PodcastPlatforms"

import FetchPost from '@/layout-parts/HOC/FetchPosts'
import FetchPostFromList from '@/layout-parts/HOC/FetchPostList'
import ShareButton from '@/layout-parts/Buttons/ToggleBookmark'
import { MobilePostMain, DesktopPostMain, AuthorBookmarkShareSection, ShareBookmarkTopShortCuts } from '@/layout-parts'

import { ReadingTimingAuthor } from '@/components/PostItem/PostItemParts'
import TwoToOneImg from "@/components/Images/Image2To1"

import TS from '@/strings'

import acApi from '@/util/api'
import { debounce, normalizeAvailableLanguages } from '@/helpers'


import { IPostItem, IPostRes, ITranslations } from '@/types'
import { IRootState } from '@/state/types'

// mock data

import ac_strings from '@/strings/ac_strings.json'

interface IPostProps extends IPostItem {
    content: string
    langs: ITranslations[]
    recommendPosts: string[]
    readMorePosts: string[]
}
export const PostLayout: React.FC<IPostProps> = (post) => {
    const dispatch = useDispatch()
    const [lastScroll, setLastScroll] = React.useState(Date.now() + 5000)
    const [featuredInPlaylist, setFeaturedInPlaylist] = React.useState<IPostRes | null>(null)
    const [hasMedia, setHasMedia] = React.useState<"audio" | "video" | "none" | "waiting">("waiting")
    const [videoSrc, setVideoSrc] = React.useState('')
    const [showControl, setShowControl] = React.useState(true)
    const { isPlaying, mpHeight, isCurrentMedia } = useSelector((state: IRootState) => ({ isCurrentMedia: state.currentMedia, isFloating: state.isPlayerFloating, isPlaying: state.isPlaying, mpHeight: state.mpHeight }))

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

            const scrollY = 120

            if (window.scrollY > scrollY) {
                setShowControl(false)
            } else {
                if (window.scrollY < scrollY) {
                    setShowControl(false)
                }
            }
        }
        const debounceScroll = debounce(handleScroll, 500)
        window.addEventListener('scroll', debounceScroll);
        return () => window.removeEventListener('scroll', debounceScroll);
    }, [post.slug])

    React.useEffect(() => {
        const { id } = post

        const { media } = post

        if (media.video) {
            setHasMedia("video")
            if (media.video.src) {
                setVideoSrc(media.video.src)
            }
        } else if (media.audio) {
            setHasMedia("audio")
        } else {
            setHasMedia("none")
        }

        dispatch(setCurrentMedia(media))
        dispatch(fixPlayer())

        if (id) {
            acApi.visitsPost(id)
                .then((res: any) => {
                    console.log(res)
                })
                .catch((err: any) => {
                    console.log(err)
                })
        }
        return () => {
            if (media.audio && isPlaying) {
                dispatch(floatPlayer())
            } else {
                dispatch(setCurrentMedia({ path: undefined }))
                dispatch(setMpHeight(0))
            }
        }

    }, [post, isPlaying])

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
        recommendPosts,
        readMorePosts,
        views,
        likes
    } = post

    const postId = id

    const imageUrl = image;

    const tranlsatedUrl = normalizeAvailableLanguages(langs, false)

    let readMore: string[] = []
    if (readMorePosts.length > 0) {
        const procssedReadMore = readMorePosts.map(item => item.replace(/^\/|\/$/g, ''))
        readMore = procssedReadMore
    }

    let randomRecommendPosts: string[] = []
    if (recommendPosts) {
        let randName = [];
        let recommendPostsSlugs = [...recommendPosts]
        do {
            randName[randName.length] = recommendPostsSlugs.splice(
                Math.floor(Math.random() * recommendPostsSlugs.length)
                , 1)[0];
        } while (randName.length < 3);
        // prepare to remove dupicates in readmores 
        randomRecommendPosts = randName.map(item => item.replace(/^\/|\/$/g, ''))
    }

    readMore = [...new Set([...randomRecommendPosts, ...readMore])]


    const isPodcast = format?.findIndex(f => `${f.id}` === process.env.PODCAST_FILTER_ID)

    const body = (

        <div>

            {isPodcast && isPodcast > -1 ? (
                <ContentPodcast
                    episodeNotes={"<p>Peter the disciple might be the apostle that we know the most about from the accounts written in the Bible. And what we find when we read these stories about him is that he is a very relatable man. In this episode Kathy and Julia have an animated discussion about Peter – Julia’s self-proclaimed “favorite apostle” – and how what we read about him as a man and a disciple, can fill us with hope for our own lives.</p>\n<p>Read the article “The Apostle Peter: A completely new man” here: <a href=\"https://bit.ly/2X1ogq9\">https://bit.ly/2X1ogq9</a></p>\n"}
                    transcript={content}
                    hosts={authors || []}
                />
            ) : (
                    <Content content={content} glossary={glossary} />
                )
            }
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
            {/*             <div className="border-b pb-6">
                <ShareSection
                    id={id}
                    text={excerpt || title}
                    shareSlug={slug}
                    views={views}
                    likes={likes}

                />
            </div>
            {authors && <AuthorsFollowAndPosts
                authors={authors}
                postId={id}
            />
            } */}
            {authors?.map(item => {
                return (

                    <div>
                        {item.authors.map(a => (
                            <div className="py-6">
                                <FetchPostFromList
                                    slug={`${TS.slug_ac_author}/${a.to}`}
                                    layout="list"
                                    render={({ posts }) => {
                                        const fourPosts = posts.filter(p => p.id !== postId).slice(0, 4)
                                        return fourPosts.length > 0 ? (
                                            <Row2ColAndXScroll
                                                title={`${ac_strings.more_from} ${a.name}`}
                                                posts={posts}
                                            />
                                        ) : null
                                    }}

                                />
                            </div>

                        ))}
                    </div>

                )
            })}

            {readMore.length > 0 ? (
                <LazyLoad>
                    <FetchPost
                        slugs={readMore}
                        layout="list"
                        render={({ posts }) => {
                            return (
                                <Row2ColAndXScroll title={`${ac_strings.youMightBeInterestedIn}`} posts={posts} />
                            )
                        }}
                    />


                </LazyLoad>
            ) : null}


            {featuredInPlaylist && (
                {/* <LazyLoad>
                    <PlaylistItem tagline={"Featured in playlist"} {...featuredInPlaylist} />
                </LazyLoad> */}
            )}

        </div>
    )

    const postFooter = (
        <LazyLoad>
            <div className="relative bg-white">
                <ExclusiveContent />
            </div>
        </LazyLoad>

    )
    return (
        <article className="overflow-scroll w-full relative">
            <ShareBookmarkTopShortCuts
                id={id}
                text={excerpt || title}
                shareSlug={slug}
                views={views}
                likes={likes}
            />

            {hasMedia === "video" && videoSrc !== '' && (
                <div className="fixed sm:relative w-full" style={{ zIndex: 5000 }}>
                    <VideoMediaPlay src={videoSrc} showControl={showControl} />
                </div>

            )}

            <div className="sm:hidden fixed mt-64 inset-x top-0 w-full">
                {hasMedia === "video" || hasMedia === "audio" ? (
                    <div className='fixed bg-mp-background w-full' style={{ top: "50px", height: `${mpHeight + 50}px` }}>

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
                height={mpHeight === 0 ? 250 : mpHeight}
                shareSlug={slug}
                translatedUrls={tranlsatedUrl}
            >
                <div className="pb-6 bg-white border-d4gray border-b text-sm">
                    <ReadingTimingAuthor
                        readingTime={reading_time?.text}
                        authors={authors}

                    />
                </div>
                {isCurrentMedia.audio && (
                    <div className="relative sm:pt-10 mb-12 ">
                        <TwoToOneImg image={image} />
                        {isPodcast && isPodcast > -1 && (
                            <SubscribePodcast />
                        )}
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
                        readingTime={reading_time?.text}
                        authors={authors}

                    />
                )}
            >
                {!isCurrentMedia.video && <div className="relative sm:pt-10 mb-12 ">
                    <TwoToOneImg image={image} rounded />
                    {isPodcast && isPodcast > -1 && (
                        <div>
                            <SubscribePodcast />
                        </div>
                    )}
                </div>}

                {body}
            </DesktopPostMain>
            <div className="mx-auto max-w-tablet main-content py-8 relative bg-white px-4 ">
                <p className=""><em>{TS.scripture_copyright}</em></p>
            </div>
            {postFooter}
        </article >
    )
}

export default PostLayout

