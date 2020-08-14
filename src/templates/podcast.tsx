import React from "react"
import { graphql } from "gatsby"

// Components
import Link from '@/components/CustomLink'
import Content from '@/components/Content'
import { OutlineButton } from '@/components/Buttons'
import MetaTag from '@/components/Meta'
import Modal from '@/components/Modal/ModalWProps'


import PostItem from '@/components/PostItem/RightImgSimple'
import { PostTitle } from '@/components/PostItem/PostItemParts'
import { PlaylistPlayOutlineButton } from '@/components/Buttons/PlayButton'
import Square from '@/components/Images/Image1to1Rounded'
import { SubscribePodcast } from "@/components/Podcast/PodcastPlatforms"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { UnderlineTitleLink } from '@/layout-parts'

// helpers
import { fetchLocalPostsFromSlugs } from '@/helpers'
import livingTheGospel from '@/strings/podcastProperties'

import { INavItem, IPostItem, IAuthor } from '@/types'


import TS from '@/strings'
import newString from '@/strings/NewStrings.json'
// mock data
import '@/styles/react-tabs.css'


const Listen: React.FC<IListenPageProps> = (props) => {
    const { data, pageContext, path } = props
    const { posts } = data.ac.topics[0]
    const postSlugList = posts.map(p => p.slug)
    const { breadcrumb } = pageContext
    const [postList, setPostList] = React.useState<IPostItem[]>([])
    const [latestPageNr, setLatestPageNr] = React.useState(1)
    const [popularPost, setPopularPost] = React.useState<IPostItem[]>([])
    const [hosts, setHosts] = React.useState<IAuthor[]>([])
    React.useEffect(() => {
        getHosts().then(res => console.log(res))
        getLatest()
        getPopular()
    }, [])

    const getPopular = () => {
        const toAdd = postSlugList.slice(10, 20)

        fetchLocalPostsFromSlugs(toAdd)
            .then(res => {
                setPopularPost(res)
            })
    }

    const getHosts = () => {
        const getAuthors = livingTheGospel.hosts.map(slug => {
            const authorSlug = `${TS.slug_ac_author}/${slug}`
            return fetch(`/page-data/${authorSlug}/page-data.json`)
                .then(res => res.json())
                .then((res: any) => {
                    const { author } = res.result.pageContext
                    return ({
                        as: 'host',
                        name: author.name,
                        to: authorSlug,
                        image: author.image,
                        excerpt: author.excerpt

                    })
                })
        })
        return Promise
            .all(getAuthors)
            .then((res: IAuthor[]) => {
                setHosts(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const getLatest = () => {
        const toAdd = postSlugList.slice(0, 10)

        fetchLocalPostsFromSlugs(toAdd)
            .then(res => {
                setPostList(res)
            })
    }
    const showMoreLatest = () => {
        const postPerPage = 5
        const startFrom = postPerPage * latestPageNr
        const toAdd = postSlugList.slice(startFrom, startFrom + 5)
        setLatestPageNr(latestPageNr + 1)
        fetchLocalPostsFromSlugs(toAdd)
            .then(res => {
                setPostList([...postList, ...res])
            })
    }


    const hostsBlock = {
        title: <h6 className="text-d4slate-dark text-lg font-bold pb-4">{newString.meetTheHost}</h6>,
        content: (
            <div>
                {hosts.map((item, i) => {
                    return (

                        <div className="" key={i} >
                            <Modal
                                contentLabel={item.name}
                                content={(props) => {
                                    return (
                                        <div className="p-8">

                                            {item.excerpt ? (
                                                <Content content={item.excerpt} />
                                            ) : (
                                                    <div>{item.name}</div>
                                                )}
                                        </div>
                                    )
                                }}
                                trigger={
                                    (
                                        <div className="flex items-center mb-4">
                                            {item.image && (
                                                <div className="max-w-12 mb-4">
                                                    <img src={item.image.src} alt="" style={{ borderRadius: "50%", filter: 'grayscale(100%)' }} />
                                                </div>
                                            )}
                                            <h2 className="text-center mb-4 text-sm md:font-seminbold mx-2">{item.name}</h2>
                                        </div>
                                    )
                                }
                            />

                        </div>
                    )
                })}
            </div>
        )
    }


    const latestPanel = (
        <div>
            {postList.map((post, i) => (
                <PostItem {...post} key={i} />
            ))}
            <div className="w-full flex justify-center py-16">
                <OutlineButton name={newString.moreLatest} onClick={showMoreLatest} />

            </div>
        </div>
    )

    const popularPanel = (
        <div>
            {popularPost.map((post, i) => (
                <PostItem {...post} key={i} />
            ))}
        </div>
    )
    return (
        <div>
            <MetaTag title={newString.podcast} translatedUrls={[]} type="page" breadcrumb={breadcrumb} path={path} />
            <div className="relative py-8">

                <div className="standard-max-w grid md:grid-cols-4 px-4 mb-20  relative z-10">

                    <div className="flex flex-col sm:flex-row md:col-span-3">
                        <div className="w-full sm:w-1/3 ">
                            <div className="w-full relative ">
                                <div className="relative w-full pb-square sm:pb-wide">
                                    <img
                                        src={livingTheGospel.artworkSrc}
                                        className="absolute w-full h-full inset-0 rounded-lg object-cover g-image"
                                    />
                                </div>

                            </div>

                            <div className="hidden sm:block">
                                <SubscribePodcast showText />
                            </div>
                        </div>

                        <div className="flex-1 w-full sm:w-2/3 px-4 sm:mb-8">
                            <PostTitle
                                rawText={livingTheGospel.title}
                                bold="font-semibold"
                                fontKey="header-post"
                                clamp={3}
                                className="my-4 sm:mt-0"
                            />
                            <span className="text-d4gray-dark leading-normal" dangerouslySetInnerHTML={{ __html: livingTheGospel.description }}></span>
                            <div className="w-full py-2">
                                <PlaylistPlayOutlineButton slug="podcast" />
                            </div>
                            <div className="sm:hidden">
                                <SubscribePodcast showText />
                            </div>
                        </div>
                    </div>


                    <div className="pt-4">
                        <div className="hidden md:block p-4 rounded-lg" style={{ backgroundImage: 'linear-gradient(#edf2f7,#fff)' }}>
                            {hostsBlock.title}
                            {hostsBlock.content}
                        </div>
                    </div>

                </div>

                <div className="standard-max-w-px pt-8">
                    <div className="md:hidden">
                        <Tabs >
                            <TabList>
                                <Tab className="react-tabs__tab react-tabs__tab__1/3">{newString.latest}</Tab>
                                <Tab className="react-tabs__tab react-tabs__tab__1/3">{newString.popular}</Tab>
                                <Tab className="react-tabs__tab react-tabs__tab__1/3">{newString.hosts}</Tab>
                            </TabList>
                            <TabPanel>
                                {latestPanel}
                            </TabPanel>
                            <TabPanel>
                                {popularPanel}
                            </TabPanel>
                            <TabPanel>
                                {hostsBlock.content}
                            </TabPanel>

                        </Tabs>
                    </div>
                    <div className="hidden md:flex flex-wrap p-2 ">


                        <div className="w-full sm:w-1/2 px-4">
                            <UnderlineTitleLink name={newString.latest} />
                            {latestPanel}
                        </div>
                        <div className="w-full sm:w-1/2 px-4">
                            <UnderlineTitleLink name={newString.popular} />
                            {popularPanel}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Listen


export const pageQuery = graphql`
    query AllPodcast {
        ac {
            topics(ids:108205) {
                    posts {
                    slug
                    }
            }
        }
    }
`

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
    }
    path: string
}