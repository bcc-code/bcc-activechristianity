import React from "react"
import { graphql } from "gatsby"

// Components
import PostTitle from '@/components/PostElements/TextSizeWClamp'
import { PostItemPlayButton } from '@/components/PostElements/PlayButton'
import { UnderlineLinkViewAll } from '@/components/Button'
import Link from '@/components/CustomLink'
import MetaTag from '@/components/Meta'

import { SectionTitleDesktopAndMobile, TitleWithIcon } from '@/components/Headers'
import { SubscribePodcast } from "@/components/Podcast/PodcastPlatforms"
import FetchPosts from '@/HOC/FetchPosts'
import TopImg from '@/components/PostItemCards/TopImg'
import RightImg from '@/components/PostItemCards/RightImg'
// helpers
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import livingTheGospel from '@/strings/podcastProperties'

import { INavItem, IPostItem, IAuthor, ITab } from '@/types'


import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
// mock data
import '@/styles/react-tabs.css'


const Listen: React.FC<IListenPageProps> = (props) => {
    const { data, pageContext, path } = props
    const { posts } = data.ac.topics[0]
    const postSlugList = posts.map(p => p.slug)
    const { breadcrumb } = pageContext
    /*     React.useEffect(() => {
            getHosts().then(res => console.log(res))
    
            getPopular()
        }, []) */

    /*     const getPopular = () => {
            const toAdd = postSlugList.slice(10, 20)
    
            fetchLocalPostsFromSlugs(toAdd)
                .then(res => {
                    setPopularPost(res)
                })
        }
 
     */


    return (
        <div>
            <MetaTag title={ac_strings.podcast} translatedUrls={[]} type="page" breadcrumb={breadcrumb} path={path} />
            <div className="text-white sm:hidden" style={{ background: "#263948" }} >
                <h1 className="p-4 font-semibold text-3xl relative z-10">{livingTheGospel.title}</h1>
                <div className="flex">
                    <div className="p-4">

                        <Link
                            className="block bg-white rounded-full text-d4slate-dark px-4 py-2 font-semibold mb-4"
                            to={ac_strings.slug_podcast_intro}
                        >
                            {ac_strings.learn_more}
                        </Link>
                        <SubscribePodcast />
                    </div>
                    <div style={{ width: "180px", marginTop: "-40px" }}>
                        <div className="relative w-full pb-square sm:pb-wide" >
                            <img
                                src={livingTheGospel.artworkSrc}
                                className="absolute w-full h-full inset-0 rounded-lg object-cover g-image"
                            />
                        </div>
                    </div>
                </div>

            </div>
            <FetchPosts

                slugs={postSlugList.slice(0, 13)}
                layout="list"
                render={({ posts }) => {
                    const first = posts[0]
                    const latest = posts.slice(1)
                    return (
                        <div className="">
                            <div className="sm:hidden">
                                {first && (
                                    <div className="px-4 py-6">
                                        <TopImg
                                            {...first}
                                        />
                                    </div>
                                )}
                                <SectionTitleDesktopAndMobile
                                    name={TS.latest}

                                />
                                <div className="px-4">
                                    {latest.map(p => {
                                        return (
                                            <RightImg  {...p} key={p.slug} />
                                        )
                                    })}
                                </div>
                                <div className="flex justify-center py-4">

                                    <UnderlineLinkViewAll

                                        to={`${path}/${ac_strings}`}
                                    />
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <div className="standard-max-w-px">
                                    <div className="relative p-4 text-white rounded-xl overflow-hidden w-full" style={{ background: "#263948" }} >
                                        <h1 className="font-semibold text-3xl relative z-10 mb-4">{livingTheGospel.title}</h1>

                                        <SubscribePodcast />
                                        <div className="flex justify-start">
                                            <Link
                                                className="rounded-full  border border-white px-4 my-6 font-semibold mb-4 py-2"
                                                to={ac_strings.slug_podcast_intro}
                                            >
                                                {ac_strings.learn_more}
                                            </Link>
                                        </div>
                                        <div className="absolute w-64 h-64 bottom-0 right-0">
                                            <div className="w-full pb-square sm:pb-wide" >
                                                <img
                                                    src={livingTheGospel.artworkSrc}
                                                    className="absolute w-full h-full inset-0 rounded-lg object-cover g-image"
                                                />
                                            </div>
                                        </div>


                                    </div>


                                </div>
                                <SectionTitleDesktopAndMobile
                                    name={TS.latest}

                                />
                                <div className="standard-max-w-px" >

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 grid-h pb-16">
                                        {posts.map((post, i) => {
                                            return (
                                                <div className={`div${i + 1}`} key={post.slug}>
                                                    < TopImg showType {...post} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="flex justify-center py-4">

                                        <UnderlineLinkViewAll

                                            to={`${path}/${ac_strings}`}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
}

export default Listen


export const pageQuery = graphql`
    query AllPodcast($id: [ID!])  {
        ac {
            topics(ids:$id) {
                    posts {
                    slug
                    }
            }
        }
    }
`
console.log(pageQuery)

interface IListenPageProps {
    data: {
        ac: {
            topics: {
                posts: {
                    slug: string
                }[]
            }[]
        }
    }
    pageContext: {
        breadcrumb: INavItem[]
        hosts: string[]
    }
    path: string
}