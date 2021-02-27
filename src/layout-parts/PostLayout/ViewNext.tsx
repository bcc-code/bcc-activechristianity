import React from 'react'

import Link from '@/components/CustomLink'
import { IAuthor, ITopicNavItem, ITopicPostItems, ITopic, IPostItem } from '@/types'
import SquareImage from '@/components/Images/Image1to1Rounded'
import TextSizeTitle from '@/components/PostElements/TextSizeWClamp'
import ac_strings from '@/strings/ac_strings.js'
/* import Flickity from "react-flickity-component"; */

import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow'
import { fetchPostslistFromArchivePage, fetchOneLocalPostFromSlug } from '@/helpers/fetchLocalData'
import { getRandomArray } from '@/helpers'
import shortid from 'shortid'
const acApiModule = import('@/util/api')
/* import seriesInfo from '@/strings/series.json' */
import './view-next.css'
import { reference } from '@popperjs/core'

interface IFetchPost {
    isPlayingAudio: boolean
    topics?: ITopicNavItem[],
    authors?: IAuthor[],
    formats?: ITopicNavItem[]
    postId: string
    slug: string
    show?: boolean
    position: {
        height: number | null
        top: number | null
    }
}

const ReadNext: React.FC<IFetchPost> = ({ topics, formats, postId, position, isPlayingAudio, slug }) => {

    const [showViewMore, setViewMore] = React.useState(false)

    const [topicPostItems, setTopicPostItems] = React.useState<ITopicPostItems[]>([])
    const [formatPostItems, setFormatPostItems] = React.useState<ITopicPostItems[]>([])
    const [related, setRelated] = React.useState<IPostItem[]>([])
    const [preference, setPreference] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(true)
    const viewNextEl = React.useRef<HTMLDivElement>(null);

    const getPostRelated = () => {

        return acApiModule.then(res => {
            const api = res.default
            api.recommendedByPost(postId)
                .then(res => {
                    const allSlugs: string[] = res.recommendedByPost.map((p: any) => p.slug)
                    const pickRandomSlugs = getRandomArray(allSlugs, 3)
                    return Promise.all(pickRandomSlugs.map(p => {
                        return fetchOneLocalPostFromSlug(p)
                    })).then(res => {
                        const toAdd: IPostItem[] = []
                        if (res && Array.isArray(res)) {
                            res.forEach(item => {
                                if (item && item.id !== postId) { toAdd.push(item) }
                            })
                        }
                        return toAdd
                    })

                })
                .catch(error => {
                    console.log(error)
                })
        })


    }

    const getPersonalRecommend = () => {
        return acApi.recommended()
            .then(res => {
                const allSlugs: string[] = res.recommended.map((p: any) => p.slug)
                const pickRandomSlugs = getRandomArray(allSlugs, 3)
                return Promise.all(pickRandomSlugs.map(p => {
                    return fetchOneLocalPostFromSlug(p)
                })).then(res => {
                    const toAdd: IPostItem[] = []
                    if (res && Array.isArray(res)) {
                        res.forEach(item => {
                            if (item && item.id !== postId) { toAdd.push(item) }
                        })
                    }
                    return toAdd
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    const getTopicPosts = (topics: ITopic[]) => {
        return Promise.all([...topics]
            .map(t => {
                return fetchPostslistFromArchivePage(t.slug)
                    .then(posts => {
                        if (posts) {
                            const allPosts = posts.filter(post => post.id !== postId)
                            return ({
                                ...t,
                                posts: getRandomArray(allPosts, 2)
                            })
                        }
                    }).catch(error => {
                        console.log(error)
                        return null

                    })
            }))
            .then(res => {
                const toAdd: ITopicPostItems[] = []
                res.forEach(item => {
                    if (item && item.id !== postId) { toAdd.push(item) }
                })
                return toAdd//.filter(post => post.id !== postId)
            })
    }
    React.useEffect(() => {
        let isSubscribed = true
        setLoading(true)
        if (topics && formats) {
            const topicsToFetch = topics.map(t => ({ ...t, slug: `${t.to}/1` }))
            const formatsToFetch = formats.map(f => ({ ...f, slug: `${f.to}/${ac_strings.slug_latest}` }))
            if (isSubscribed) {
                Promise.all([
                    getTopicPosts(topicsToFetch),
                    getTopicPosts(formatsToFetch),
                    getPostRelated(),
                    getPersonalRecommend(),
                ]).then(res => {
                    const topics = res[0]
                    const formats = res[1]
                    const related = res[2]
                    const preference = res[3]
                    if (topics) {
                        setTopicPostItems(topics)
                    }

                    if (formats) {
                        setFormatPostItems(formats)
                    }

                    if (related) {
                        setRelated(related)
                    }

                    if (preference) {
                        setPreference(preference)
                    }
                })

            }
        }
        return () => {
            isSubscribed = false
        }
    }, [topics])

    const handleView = () => {
        if (window.innerWidth < 1280) {
            if (position.top && position.height) {
                if (window.scrollY > position.top && window.scrollY < position.height + position.top) {
                    setViewMore(true)
                } else {
                    setViewMore(false)
                }
            }
        }
    }
    React.useEffect(() => {
        /*    const debounceScroll = debounce(handleView, 200) */
        window.addEventListener('scroll', handleView);
        return () => window.removeEventListener('scroll', handleView);
    }, [position])

    const lgStyle = {
        width: typeof window !== "undefined" ? ((window.innerWidth - 768) / 2) - 16 : 0
    }
    const fixedStyle = {
        left: 768 + lgStyle.width + 16,
        top: position.top ? position.top + 150 : 700,
        height: position.height - 100,
        ...lgStyle
    }
    const seriesId = seriesInfo.posts[slug]

    const getSeries = seriesId ? seriesInfo.series[seriesId] : null
    const deskTopicSlider = (
        <Flickity
            options={{ autoPlay: true, prevNextButtons: false, pageDots: false }}
        >
            {topicPostItems.map(topic => {
                return (
                    <div className="w-full py-4 pr-4" key={shortid()}>

                        <div className="justify-between flex items-center">
                            <Link to={topic.slug} className="font-roboto text-lg">
                                {topic.name}
                            </Link>
                            <ToggleFollowOutlineBtn id={topic.id} />
                        </div>


                        {topic.posts.map(showPost => {
                            return (
                                <div className="w-full py-4" key={shortid()}>
                                    <SimplePost {...showPost} />
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            {preference.length > 0 && (
                <div className=" w-full py-4" key={shortid()}>
                    <div className="font-roboto text-lg">

                    </div>
                    {preference.map(showPost => {
                        return (
                            <div className="w-full py-4" key={shortid()}>
                                <SimplePost {...showPost} />
                            </div>
                        )
                    })}
                </div>
            )}
            <div className=" w-full py-4" key={shortid()}>
                <div className="font-roboto text-lg">
                    You might be insterested in
                                        </div>
                {related.map(showPost => {
                    return (
                        <div className="w-full py-4" key={shortid()}>
                            <SimplePost {...showPost} />
                        </div>
                    )
                })}
            </div>
        </Flickity>
    )
    return (

        <div className={`fixed xl:relative transition-all duration-1000 flex flex-col bg-ac-slate-lighter veiw-next-wrapper ${showViewMore ? 'veiw-next-show' : 'veiw-next-hidden'}`}>
            {/*             <ShareBookmarkTopShortCuts
                isPlayingAudio={isPlayingAudio}
                id={id}
                text={text}
                shareSlug={shareSlug}
                views={views}
                likes={likes}
            /> */}

            {!isPlayingAudio && topics && formats && (

                <div className="">
                    {seriesId ? (<div ref={viewNextEl} className={`hidden lg:flex lg:absolute px-4 flex-col`} style={{ ...fixedStyle, left: 0 }}>
                        <div className="sticky w-full flex flex-col" style={{ top: "150px", height: "260px" }}>
                            {seriesId && (
                                <SeriesIndex
                                    title={getSeries.title}
                                    posts={getSeries.posts}
                                />
                            )}

                            <div className="block py-4 uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2">
                                More from these sections
                                        </div>
                            {deskTopicSlider}
                        </div>
                        {/* */}
                    </div>) : (<div ref={viewNextEl} className={`hidden lg:flex lg:absolute `} style={fixedStyle}>
                        <div className="sticky w-full px-4" style={{ top: "150px", height: "260px" }}>
                            <div className="block  uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2">
                                More from these topics
                                        </div>
                            {deskTopicSlider}


                        </div>


                    </div>)}
                    <div className="xl:hidden">
                        <Flickity
                            options={{ autoPlay: true, prevNextButtons: false, pageDots: false }}
                        >
                            {formatPostItems.map}
                            {topicPostItems.map(topic => {
                                const selectFromList = topic.posts.filter(post => post.id !== postId)

                                const showPost = selectFromList[0]
                                return (
                                    <TopicWithPost
                                        topic={topic}
                                        post={showPost}
                                    />
                                )
                            })}
                            {topicPostItems?.map((t) => (
                                <TopicCard {...t} />
                            ))}

                        </Flickity>
                    </div>

                </div>

            )}

        </div>


    )
}

export default React.memo(ReadNext)

const SeriesIndex = (data: { title: string, posts: { title: string, slug: string }[] }) => {
    const { title, posts } = data

    return (
        <div className="flex flex-col">
            <div className="block uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2">
                Series
           </div>
            <div className="text-lg pb-6">
                {title}
            </div>
            {posts.map((item) => {
                return (
                    <Link to={item.slug} className="pb-4 text-ac-slate-light text-sm">
                        {item.title}
                    </Link >
                )
            })}
        </div>
    )
}
const SimplePost: React.FC<IPostItem> = (post) => {
    return (
        <div className="text-sm flex" >
            <Link to={post.slug} className="h-10 w-10">
                <SquareImage
                    {...post.image}
                />
            </Link>
            <div className="flex-1 p-2">

                <Link to={post.slug} className="text-sm">
                    <TextSizeTitle
                        rawText={post.title}
                        clamp={2}
                        fontKey="text-sm"
                    />
                </Link>
            </div>
        </div>
    )
}

const TopicCard = (topic: ITopic) => {

    return (
        <div className="w-full ">
            <Link to={topic.slug} className="h-20 w-20">
                {topic.image && <SquareImage
                    {...topic.image}
                />}
            </Link>
            <div className="p-2">
                <h5 className="block uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2">Related Topic</h5>
                <div className="justify-between flex items-center">
                    <Link to={topic.slug} className="font-roboto text-lg">
                        {topic.name}
                    </Link>
                    <ToggleFollowOutlineBtn id={topic.id} />
                </div>
            </div>
        </div>
    )
}

export const TopicWithPost = (data: { post: IPostItem, topic: ITopic }) => {
    const { post, topic } = data
    return (
        <div className="w-full" key={shortid()}>
            <div className="text-sm flex" >
                <Link to={post.slug} className="h-20 w-20">
                    <SquareImage
                        {...post.image}
                    />
                </Link>
                <div className="flex-1 p-2">
                    <Link to={topic.slug} className="block uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2">
                        More from <span className="font-bold text-ac-secondary">{topic.name}</span>
                    </Link>
                    <Link to={post.slug} className="text-sm">
                        <TextSizeTitle
                            rawText={post.title}
                            clamp={2}
                            fontKey="text-sm"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}