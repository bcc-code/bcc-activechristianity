import React from "react"
import { graphql } from "gatsby"

// Components
import Link from '@/components/CustomLink'
import Content from '@/components/Content'
import { OutlineButton } from '@/components/Button'
import MetaTag from '@/components/Meta'
import Modal from '@/components/Modal/ModalWProps'


import PostItem from '@/components/PostItem/RightImgSimple'
import { PostTitle } from '@/components/PostItem/PostItemParts'
import { PlaylistPlayOutlineButton } from '@/layout-parts/Buttons/PlayButton'
import { SubscribePodcast } from "@/components/Podcast/PodcastPlatforms"
import TwoToThreeTabs from '@/components/Tabs/TwoToThreeTabs'
import { UnderlineTitleLink } from '@/layout-parts'

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
    const { breadcrumb, hosts: hostSlugs } = pageContext
    const [postList, setPostList] = React.useState<IPostItem[]>([])
    const [latestPageNr, setLatestPageNr] = React.useState(1)
    const [popularPost, setPopularPost] = React.useState<IPostItem[]>([])
    const [hosts, setHosts] = React.useState<IAuthor[]>([])
    React.useEffect(() => {
        getHosts().then(res => console.log(res))

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
        const getAuthors = hostSlugs.map(slug => {
            const trimmedSlug = slug.replace(`${ac_strings.slug_host}/`, '')
            const authorSlug = `${TS.slug_ac_author}/${trimmedSlug}`
            return fetch(`/page-data/${authorSlug}/page-data.json`)
                .then(res => res.json())
                .then((res: any) => {
                    const { author } = res.result.pageContext
                    return fetch(`/page-data/${ac_strings.slug_host}/${trimmedSlug}/page-data.json`)
                        .then(res => res.json())
                        .then(hostRes => {

                            const hostInfo = hostRes.result.data.ac.page

                            const contentInfo = JSON.parse(hostInfo.flexibleContent)

                            return ({
                                as: 'host',
                                name: hostInfo.title,
                                to: authorSlug,
                                image: author.image,
                                excerpt: contentInfo[0].data.content

                            })
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



    const popularPanel = (
        <div>
            {popularPost.map((post, i) => (
                <PostItem {...post} key={i} />
            ))}
        </div>
    )

    return (
        <div>
            <MetaTag title={ac_strings.podcast} translatedUrls={[]} type="page" breadcrumb={breadcrumb} path={path} />
            <div className="flex" style={{ background: "#384156" }} >
                <div className="block flex-1">
                    <h1>{livingTheGospel.title}</h1>
                    <button>Learn more</button>
                    <SubscribePodcast />
                </div>
                <div className="w-3/5 ">
                    <div className="w-full relative ">
                        <div className="relative w-full pb-square sm:pb-wide">
                            <img
                                src={livingTheGospel.artworkSrc}
                                className="absolute w-full h-full inset-0 rounded-lg object-cover g-image"
                            />
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
        hosts: string[]
    }
    path: string
}