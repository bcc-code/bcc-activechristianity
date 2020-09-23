import React from 'react'
import loadable from '@loadable/component'
import LazyLoad from '@/components/LazyLoad';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentMedia, fixPlayer, floatPlayer, setMpHeight } from '@/state/action'
const VideoMediaPlay = loadable(() => import('@/components/MediaPlayer/VideoPlayerLocal'))
const Content = loadable(() => import('@/components/Content'))
const ContentPodcast = loadable(() => import('@/components/Content/ContentPodcast'))

const ExclusiveContent = loadable(() => import('@/layout-parts/Banner/ExclusiveContent'))

/* const EbookFooterBanner = loadable(() => import('@/layout-parts/Banner/EbookFooterBanner'))
const MockRelatedContentMedia = loadable(() => import('@/layout-parts/RelatedContent'))
const PlaylistItem = loadable(() => import('@/components/PostItem/LeftImgPlaylist')) */

import { SubscribePodcast } from "@/components/Podcast/PodcastPlatforms"
import FetchPost from '@/layout-parts/HOC/FetchPosts'
import { MobilePostMain, DesktopPostMain, ShareSection } from '@/layout-parts'

import TwoToOneImg from "@/components/Images/Image2To1"
import PostMetaWLabel from '@/components/PostMeta/PostMeta'
import PostMetaLinks from '@/components/PostMeta/PostMetaLinks'

import TS from '@/strings'

import { blog as blogApi } from '@/util/sdk'
import { debounce, normalizeAvailableLanguages } from '@/helpers'
import { getImage } from '@/helpers/imageHelpers'

import { IPostItem, IPostRes, ITranslations } from '@/types'
import { IRootState } from '@/state/types'

// mock data

import ac_strings from '@/strings/ac_strings.json'
interface IPostProps extends IPostItem {
    content: string
    langs: ITranslations[]
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
                    blogApi
                        .readingPost(id)
                        .then((res: any) => {
                            console.log(res)
                        })
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
            blogApi.visitsPost(id)
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
        glossary
    } = post

    const postId = id

    const imageUrl = image;

    const contributor = authors && <PostMetaWLabel authors={authors} />

    const tranlsatedUrl = normalizeAvailableLanguages(langs, false)
    let readMore: string[] = []
    /*   if (read_more_posts) {
          readMore = read_more_posts.posts.map(item => item.replace(/^\/|\/$/g, ''))
      } */

    // prepare to remove dupicates in readmores 
    /*     if (post.related_posts) {
            readMore = [...post.related_posts.map(item => item.slug.replace(/^\/|\/$/g, '')), ...readMore]
        } */
    // remove dupicates in readmores 
    if (readMore.length > 0) {
        readMore = [...new Set(readMore)]
    }

    const isPodcast = format?.findIndex(f => `${f.id}` === process.env.PODCAST_FILTER_ID)
    const body = (

        <div>

            {isPodcast ? (
                <ContentPodcast
                    episodeNotes={"<p>Peter the disciple might be the apostle that we know the most about from the accounts written in the Bible. And what we find when we read these stories about him is that he is a very relatable man. In this episode Kathy and Julia have an animated discussion about Peter – Julia’s self-proclaimed “favorite apostle” – and how what we read about him as a man and a disciple, can fill us with hope for our own lives.</p>\n<p>Read the article “The Apostle Peter: A completely new man” here: <a href=\"https://bit.ly/2X1ogq9\">https://bit.ly/2X1ogq9</a></p>\n"}
                    transcript={content}
                    hosts={authors || []}
                />
            ) : (
                    <Content content={content} glossary={glossary} />
                )
            }

            {/* Mock related media */}
            {/* {mediaType && (
                <LazyLoad>
                    <MockRelatedContentMedia type={mediaType?.value} />
                </LazyLoad>
            )} */}
            {/* end of Mock related media*/}

            {readMore.length > 0 ? (
                <LazyLoad>
                    <div className="pb-8">
                        {/* {read_more_posts && read_more_posts.main_text ? (
                            <div className="main-content">
                                <p
                                    className="my-4"
                                    dangerouslySetInnerHTML={{
                                        __html: read_more_posts.main_text
                                    }} />
                            </div>
                        ) : null} */}
                        {readMore.map((url, k) => (
                            <div className="mb-6">
                                <FetchPost key={k} url={url} />
                            </div>
                        )
                        )}

                    </div>
                </LazyLoad>
            ) : null}


            {featuredInPlaylist && (
                {/* <LazyLoad>
                    <PlaylistItem tagline={"Featured in playlist"} {...featuredInPlaylist} />
                </LazyLoad> */}
            )}
            {/*           {!featuredInPlaylist && ac_ebook ? (
                <LazyLoad>
                    <div className="mb-8">
                        <EbookFooterBanner
                            {...WPItemtoPostItem(ac_ebook)}
                        />
                    </div>
                </LazyLoad>

            ) : null} */}

            <div className="main-content py-8">
                <p className=""><em>{TS.scripture_copyright}</em></p>
            </div>
            {topics && (
                <p className="border-d4gray border-t py-8 flex">
                    <div>{ac_strings.topics}:</div> {<PostMetaLinks links={topics} />}
                </p>
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
        <article className="overflow-scroll w-full">
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
                            style={{ top: "50px", background: `url(${imageUrl}) center center no-repeat`, backgroundSize: "cover", height: "300px" }}
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
                <div className="flex items-center pb-6">
                    {contributor}
                    <span className="ml-4 text-d4gray-dark">{reading_time?.text}</span>
                </div>
                <ShareSection shareSlug={slug} id={postId} text={excerpt} />
                {isCurrentMedia.audio && (
                    <div className="relative sm:pt-10 mb-12 ">
                        <TwoToOneImg image={image} />
                        {types && types[0] && types[0].name === "podcast" && (
                            <div>
                                <SubscribePodcast />
                            </div>
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
                        <ShareSection shareSlug={slug} id={postId} text={excerpt} simple />
                    </div>
                )}
            >
                {!isCurrentMedia.video && <div className="relative sm:pt-10 mb-12 ">
                    <TwoToOneImg image={image} rounded />
                    {isPodcast && (
                        <div>
                            <SubscribePodcast />
                        </div>
                    )}
                </div>}

                {body}
            </DesktopPostMain>
            {postFooter}
        </article >
    )
}

export default PostLayout

