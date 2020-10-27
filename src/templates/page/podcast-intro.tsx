import * as React from 'react'
import { IPostRes, INavItem, IAuthor } from '@/types'
import { graphql } from "gatsby"

import ImageRound from '@/components/Images/ImageRound'
import livingTheGospel from '@/strings/podcastProperties'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
import { PageSectionHeader } from '@/components/Headers'
import { ReadOrListenIcon } from '@/components/PostElements'
import Tabs from '@/components/Tabs/ImageTab'
import { normalizePostRes, dateToString } from '@/helpers'
import MetaTag from '@/components/Meta'

export const PodcastPageHeadSection: React.FC = ({ children }) => {
    return (
        <div className="relative text-white  sm:rounded-xl overflow-hidden w-full" style={{ background: "#263948", }} >
            {children}
            <div className="absolute right-0 bottom-0  w-32 h-32 sm:w-64 sm:h-64">
                <div className="relative w-full pb-square sm:pb-wide" >
                    <img
                        src={livingTheGospel.artworkSrc}
                        className="absolute w-full h-full inset-0 rounded-lg object-cover g-image"
                    />
                </div>
            </div>
        </div>
    )
}

const Host: React.FC<IPodcastIntro> = (props) => {
    const { data, path } = props
    const { hosts: hostSlugs, breadcrumb } = props.pageContext
    const introPost = normalizePostRes(data.acNodePost)
    const [hosts, setHosts] = React.useState<IAuthor[]>([])
    React.useEffect(() => {
        getHosts()

    }, [])


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

    return (
        <div className="max-w-sm mx-auto">
            <MetaTag title={ac_strings.podcast} translatedUrls={[]} type="page" breadcrumb={[...breadcrumb, { name: introPost.title, to: path }]} path={path} />
            <PodcastPageHeadSection >
                <div className="p-4" >
                    <h1 className="font-semibold text-2xl relative z-10 mb-6">{introPost.title}</h1>
                    <p className="text-xs leading-normal sm:w-7/12">{livingTheGospel.description}</p>
                </div>
                <div className="pt-6 pb-12 flex items-center px-4">
                    <div className="bg-d4gray-light rounded-full inline-block">
                        <ReadOrListenIcon
                            listen={introPost.duration?.listen}
                            track={introPost.media}
                        />
                    </div>
                    <div className="text-xs text-white mx-4">
                        {dateToString(introPost.date)}
                    </div>
                </div>
            </PodcastPageHeadSection>
            <div className="py-6 sm:hidden">
                < PageSectionHeader
                    title={ac_strings.meetTheHost}
                />
                <Tabs
                    tabs={hosts.map(h => {
                        return ({
                            header: {
                                image: h.image,
                                name: h.name
                            },
                            content: (
                                <div className=" bg-white text-xs leading-normal">
                                    {h.excerpt && <p dangerouslySetInnerHTML={{ __html: h.excerpt }}></p>}
                                </div>
                            )
                        })
                    })}
                />
            </div>
            <div className="hidden sm:block">
                <div className="max-w-sm px-4 py-6 mx-auto">

                    < PageSectionHeader
                        title={ac_strings.meetTheHost}
                        className="pt-6"
                    />
                    <div>
                        {hosts.map((h, i) => {
                            return (
                                <div className={`flex py-6 px-4 rounded-xl ${i % 2 == 0 ? 1 : 2 ? 'bg-d4slate-lighter' : ''}`} key={i}>
                                    <div className="flex flex-col justify-center" style={{ order: i % 2 == 0 ? 1 : 2 }}>
                                        <div className={`w-36 h-36 rounded-full`} >
                                            <ImageRound {...h.image} />
                                        </div>
                                        <span className={`block text-roboto font-semibold text-center py-2`}>{h.name}</span>
                                    </div>
                                    <div className=" leading-6 px-4 text-justify" style={{ order: i % 2 == 0 ? 2 : 1 }}>
                                        {h.excerpt && <p dangerouslySetInnerHTML={{ __html: h.excerpt }}></p>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Host

export const pageQuery = graphql`
    query getPodcastIntro($postId:String!) {
        acNodePost(acId: { eq: $postId}) {
                ...PostMain
                content
        }
    }
`

interface IPodcastIntro {
    path: string
    data: {
        acNodePost: IPostRes
    }
    pageContext: {
        title: string
        postId: string
        breadcrumb: INavItem[]
        hosts: string[]

    }
} 