import React from 'react'
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentMedia, fixPlayer, floatPlayer, setMpHeight } from '@/state/action'
const VideoMediaPlay = loadable(() => import('@/components/MediaPlayer/VideoPlayerLocal'))
const Content = loadable(() => import('@/components/Content'))
const ContentPodcast = loadable(() => import('@/components/Content/ContentPodcast'))
const DesktopPopularRow = loadable(() => import('@/layout-parts/HorizontalScroll/DesktopPopular'))
const ExclusiveContent = loadable(() => import('@/layout-parts/Banner/ExclusiveContent'))
import SlateDarkFollowButton from '@/layout-parts/Buttons/ToggleFollow'
/* const EbookFooterBanner = loadable(() => import('@/layout-parts/Banner/EbookFooterBanner'))
const MockRelatedContentMedia = loadable(() => import('@/layout-parts/RelatedContent'))
const PlaylistItem = loadable(() => import('@/components/PostItem/LeftImgPlaylist')) */
import FetchAndSetFollowed from '@/layout-parts/HOC/FetchAndSetFollowed'
import Icon from "@/components/Icons/Icon"
import { SubscribePodcast } from "@/components/Podcast/PodcastPlatforms"

import FetchPost from '@/layout-parts/HOC/FetchPosts'
import FetchPostFromList from '@/layout-parts/HOC/FetchPostList'
import ShareButton from '@/layout-parts/Buttons/ToggleBookmark'
import { MobilePostMain, DesktopPostMain, ShareSection } from '@/layout-parts'

import TwoToOneImg from "@/components/Images/Image2To1"
import PostMetaWLabel from '@/components/PostMeta/PostMeta'
import PostMetaLinks from '@/components/PostMeta/PostMetaLinks'
import RightImgPost from '@/components/PostItem/RightImgWDes'
import TS from '@/strings'

import acApi from '@/util/api'
import { debounce, normalizeAvailableLanguages } from '@/helpers'
import { getImage } from '@/helpers/imageHelpers'

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

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }
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

        /*get featured in playlist*/

        /* if (media && media.audio && media.audio.playlistSlug) {
            fetchOneLocalMediaFromSlug(media.audio.playlistSlug)
                .then(res => {
                    if (res) {
                        setFeaturedInPlaylist(res)
                    }

                })
        } */

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

    const contributor = authors && <PostMetaWLabel authors={authors} />

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
                    <FetchAndSetFollowed
                        id={item.id}
                        className=""
                        render={({ followed }) => {
                            return (
                                <div className={`flex py-1 p-2 pr-0 mb-2 mr-2 text-center text-xs rounded-full font-semibold items-center bg-gray-300`}>
                                    <span className="">{item.name}</span>
                                    <span className="px-2">
                                        {followed === "loading" && <Icon name="Cached" size="3" />}
                                        {followed === "true" && <Icon name="Check" size="3" />}
                                        {followed === "false" && <Icon name="Add" size="3" />}
                                    </span>
                                </div>
                            )
                        }}
                    />
                ))}
            </div>
            <div className="border-b pb-6">
                {}
            </div>
            <div className="border-d4gray border-b py-6">
                {authors?.map(item => {
                    return (
                        <div className="flex flex-col">
                            <span className="uppercase font-roboto text-gray-500 font-semibold text-sm">
                                {item.as}
                            </span>
                            <span>{item.authors.map(a => (
                                <div className="w-full flex justify-between items-center">
                                    <div className="font-roboto text-sm">{a.name}</div>
                                    <div>{a.excerpt}</div>
                                    <div className="font-roboto text-d4secondary text-sm border border-d4secondary rounded px-2 py-1">{ac_strings.follow}</div>
                                </div>

                            ))}</span>
                        </div>
                    )
                })}
            </div>

            {authors?.map(item => {
                return (

                    <div>
                        {item.authors.map(a => (
                            <div>
                                <div className="">More from {a.name}</div>
                                <FetchPostFromList
                                    slug={`${TS.slug_ac_author}/${a.to}`}
                                    layout="list"
                                    render={({ posts }) => {
                                        const sixPosts = posts.slice(0, 6)
                                        return posts.length > 0 ? (
                                            <div>
                                                <div className="hidden sm:block pb-8">
                                                    {sixPosts.map(item => (
                                                        <RightImgPost key={item.slug} {...item} />
                                                    ))}
                                                </div>
                                                <div className="sm:hidden -ml-4 -mr-4 py-6">
                                                    <DesktopPopularRow posts={sixPosts} />
                                                </div>
                                            </div>
                                        ) : <div></div>
                                    }}

                                />
                            </div>

                        ))}
                    </div>

                )
            })}

            {/* Mock related media */}
            {/* {mediaType && (
                <LazyLoad>
                    <MockRelatedContentMedia type={mediaType?.value} />
                </LazyLoad>
            )} */}
            {/* end of Mock related media*/}
            <div>You might also be interested</div>
            {readMore.length > 0 ? (
                <LazyLoad>
                    <FetchPost
                        slugs={readMore}
                        layout="list"
                        render={({ posts }) => {
                            return (
                                <div>
                                    <div className="hidden sm:block pb-8">
                                        {posts.map(item => (
                                            <RightImgPost key={item.slug} {...item} />
                                        ))}
                                    </div>
                                    <div className="sm:hidden -ml-4 -mr-4 py-6">
                                        <DesktopPopularRow posts={posts} />
                                    </div>
                                </div>
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
            <div className="flex flex-col fixed bottom-0 right-0 mx-3 py-2 mb-16 bg-white shadow rounded-full text-white text-sm" style={{ zIndex: 60 }}>
                <button className="px-2 py-1">
                    <ShareButton
                        id={id}
                    />
                </button>
                <button className="px-2 py-1">
                    <Icon
                        name="Share"
                        color="secondary"
                        size="6"
                    />

                </button>
                <button className="px-2 py-1" onClick={scrollToTop}>
                    <Icon
                        name="Publish"
                        color="secondary"
                        size="6"
                    />
                </button>

            </div>
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
                <div className="flex items-center justify-between pb-6 bg-white border-d4gray border-b text-sm">
                    {contributor}
                    <span className="ml-4 text-d4gray-dark">{reading_time?.text}</span>
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
                    <div className="flex justify-between">
                        <div className="flex">
                            {contributor}
                            <span className="ml-4 text-d4gray-dark">{reading_time?.text}</span>
                        </div>
                    </div>
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
            <div className="main-content py-8 relative bg-white px-4">
                <p className=""><em>{TS.scripture_copyright}</em></p>
            </div>
            {postFooter}
        </article >
    )
}

export default PostLayout

