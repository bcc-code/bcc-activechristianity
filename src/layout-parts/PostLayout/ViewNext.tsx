import React from 'react'

import Link from '@/components/CustomLink'
import { IAuthor, ITopicNavItem, ITopicPostItems } from '@/types'
import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'
import topicFiter from '@/strings/topic-filters.json'
import TextSizeTitle, { ITextSizeWClamp } from '@/components/PostElements/TextSizeWClamp'
import ac_strings from '@/strings/ac_strings.js'
import Flickity from "react-flickity-component";
import SquareImage from '@/components/Images/Image1to1Rounded'
import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import { getRandomArray } from '@/helpers'
import shortid from 'shortid'
import RightImg from '@/components/PostItemCards/RightImg'
import StickyBox from "react-sticky-box";
import './view-next.css'

interface IFetchPost {
    isPlayingAudio: boolean
    topics?: ITopicNavItem[],
    authors?: IAuthor[],
    formats?: ITopicNavItem[]
    postId: string
<<<<<<< HEAD
    show?: boolean
    position: {
        height: number | null
        top: number | null
    }
}

const ReadNext: React.FC<IFetchPost> = ({ topics, formats, postId, position, isPlayingAudio }) => {
    console.log(position)
    const [showViewMore, setViewMore] = React.useState(false)

    const [topicPostItems, setTopicPostItems] = React.useState<ITopicPostItems[]>([])
    const [loading, setLoading] = React.useState(true)
    const viewNextEl = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        let isSubscribed = true
        setLoading(true)
        if (topics && formats) {
            const topicsToFetch = topics.map(t => ({ ...t, slug: `${t.to}/1` }))
            const formatsToFetch = formats.map(f => ({ ...f, slug: `${f.to}/${ac_strings.slug_latest}` }))
            console.log('fetching topic')
            if (isSubscribed) {
                Promise.all([...topicsToFetch, ...formatsToFetch]
                    .map(t => {
                        return fetchPostslistFromArchivePage(t.slug)
                            .then(posts => {

                                if (posts) {

                                    return ({
                                        ...t,
                                        posts: getRandomArray(posts, 2)
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
                            if (item) {
                                toAdd.push(item)
                            }

                        })
                        setTopicPostItems(toAdd)
                        return toAdd
                    })
            }

            /*             fetchPostsFromTopics([...topicsToFetch, ...formatsToFetch])
                            .then(res => {
                                if (res) {
                                    setLoading(false)
                                    setTopicPostItems(res)
                                } else {
                                    throw Error('No posts found')
                                }
                            })
                            .catch(error => {
                                setLoading(false)
                                console.log(error)
                            }) */
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
        width: ((window.innerWidth - 768) / 2) - 16
    }
    const fixedStyle = {
        left: 768 + lgStyle.width + 16,
        top: position.top ? position.top + 150 : 700,
        height: position.height - 100,
        ...lgStyle
    }
=======
}

const ReadNext: React.FC<IFetchPost> = ({ topics, authors, formats, postId }) => {
>>>>>>> dev/changedPages
    return (

        <div className={`fixed xl:relative transition-all duration-1000 flex flex-col bg-d4slate-lighter veiw-next-wrapper ${showViewMore ? 'veiw-next-show' : 'veiw-next-hidden'}`}>
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
                    <div ref={viewNextEl} className={`hidden lg:flex lg:absolute `} style={fixedStyle}>
                        <div className="sticky w-full" style={{ top: "150px", height: "260px" }}>
                            <div className="block uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2">
                                More from these topics
                                        </div>
                            <Flickity
                                options={{ autoPlay: true, prevNextButtons: false, pageDots: false }}
                            >
                                {topicPostItems.map(topic => {
                                    return (
                                        <div className="w-full p-4" key={shortid()}>

                                            <div className="justify-between flex items-center">
                                                <Link to={topic.slug} className="font-roboto text-lg">
                                                    {topic.name}
                                                </Link>
                                                <ToggleFollowOutlineBtn id={topic.id} />
                                            </div>


                                            {topic.posts.map(showPost => {
                                                return (
                                                    <div className="w-full py-4" key={shortid()}>
                                                        <div className="text-sm flex" >
                                                            <Link to={showPost.slug} className="h-10 w-10">
                                                                <SquareImage
                                                                    {...showPost.image}
                                                                />
                                                            </Link>
                                                            <div className="flex-1 p-2">

                                                                <Link to={showPost.slug} className="text-sm">
                                                                    <TextSizeTitle
                                                                        rawText={showPost.title}
                                                                        clamp={2}
                                                                        fontKey="text-sm"
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </Flickity>
                        </div>


                    </div>
                    <div className="xl:hidden">
                        <Flickity
                            options={{ autoPlay: true, prevNextButtons: false, pageDots: false }}
                        >
                            {topicPostItems.map(topic => {
                                const selectFromList = topic.posts.filter(post => post.id !== postId)

                                const showPost = selectFromList[0]
                                return (
                                    <div className="w-full" key={shortid()}>
                                        <div className="text-sm flex" >
                                            <Link to={showPost.slug} className="h-20 w-20">
                                                <SquareImage
                                                    {...showPost.image}
                                                />
                                            </Link>
                                            <div className="flex-1 p-2">
                                                <Link to={topic.slug} className="block uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2">
                                                    More from <span className="font-bold text-d4secondary">{topic.name}</span>
                                                </Link>
                                                <Link to={showPost.slug} className="text-sm">
                                                    <TextSizeTitle
                                                        rawText={showPost.title}
                                                        clamp={2}
                                                        fontKey="text-sm"
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {topicPostItems?.map((t) => (
                                <div className="w-full ">
                                    <Link to={t.slug} className="h-20 w-20">
                                        {t.image && <SquareImage
                                            {...t.image}
                                        />}
                                    </Link>
                                    <div className="p-2">
                                        <h5 className="block uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2">Related Topic</h5>
                                        <div className="justify-between flex items-center">
                                            <Link to={t.slug} className="font-roboto text-lg">
                                                {t.name}
                                            </Link>
                                            <ToggleFollowOutlineBtn id={t.id} />
                                        </div>
                                    </div>


                                </div>
                            ))}

                        </Flickity>
                    </div>

                </div>

            )}

        </div>


    )
}

export default React.memo(ReadNext)