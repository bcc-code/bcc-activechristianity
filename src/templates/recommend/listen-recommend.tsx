import React from "react"
import loadable from '@loadable/component'
import MetaTag from '@/components/Meta'

import FetchPostList from '@/HOC/FetchPostList'

const HSCardList = loadable(() => import('@/layout-parts/HorizontalScroll/HSCardList'))
const RecommendDesktopLayout = loadable(() => import('@/layouts/RecommendDesktopLayout'))
import { INavItem, IPlaylist, INavItemCount, ISubtopicLinks } from '@/types'
import FetchPosts from '@/HOC/FetchPosts'
import { PageSectionHeader } from '@/components/Headers'
import podcastProperties from '@/strings/podcastProperties'
import HSPlaylist from '@/layout-parts/HorizontalScroll/HSPlaylist'
import RightImgWDes from '@/components/PostItemCards/RightImg'
// helper

import ac_strings from '@/strings/ac_strings.json'
// types'

const Listen: React.FC<IProps> = (props) => {

    const [podcastEps, setPodcastEps] = React.useState<string[]>([])
    const [playlists, setPlaylist] = React.useState<IPlaylist[]>([])
    const { pageContext, path, } = props

    const { title, breadcrumb, items, playlist, podcast, mostPopular } = pageContext

    React.useEffect(() => {
        Promise.all([
            fetch(`/page-data/${podcast.to}/page-data.json`)
                .then(res => res.json())
                .then(res => {
                    const posts = res.result.data.ac.topics[0].posts.slice(0, 6).map(item => item.slug)
                    setPodcastEps(posts)
                }),

            fetch(`/page-data/${playlist.to}/page-data.json`)
                .then(res => res.json())
                .then(res => {
                    const allPlaylist = res.result.data.ac.playlists
                    setPlaylist(allPlaylist.slice(0, 4))
                })
        ])


    }, [pageContext])

    const latestSlug = `${path}/${ac_strings.slug_latest}`

    console.log(mostPopular)
    return (
        <div >
            <MetaTag title={title} translatedUrls={[]} breadcrumb={[]} type="page" path={path} />

            <div className="sm:hidden">
                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                    <div className="w-full pb-4 sm:hidden pt-8">
                        <PageSectionHeader title={ac_strings.featured} />
                        <FetchPosts
                            slugs={mostPopular.slice(5).map(p => p.slug)}
                            layout="row"
                            render={({ posts }) => <HSCardList posts={posts} />}
                        />
                    </div>
                </div>
                {/*                 <div className="sm:bg-transparent py-6 overflow-hidden">
                    <PageSectionHeader title={ac_strings.popular} />
                    <FetchPosts
                        slugs={mostPopular.slice(0, 5).map(p => p.slug)}
                        layout="row"
                        render={({ posts }) => {
                            return <HSCardList posts={posts} />
                        }}
                    />
                </div> */}
                <div className="sm:bg-transparent py-6 overflow-hidden">
                    <PageSectionHeader title={podcastProperties.title} />
                    <FetchPosts
                        slugs={podcastEps}
                        layout="list"
                        render={({ posts }) => <HSCardList posts={posts} />}
                    />

                </div>
                <PageSectionHeader title={ac_strings.playlist} />
                <HSPlaylist playlists={playlists.map(p => ({ ...p, slug: `${playlist.to}/${p.slug}` }))} />
                <FetchPostList
                    slug={latestSlug}
                    layout="row" render={({ posts }) => {
                        return (
                            <div className="px-4">
                                {posts.map((p, k) => <RightImgWDes key={k} {...p} />)}
                            </div>
                        )
                    }}
                />
            </div>
            <RecommendDesktopLayout
                latestSlug={latestSlug}
                popularPosts={mostPopular.map(item => item.slug)}
                playlists={playlists}
                topics={[playlist, podcast, ...items]}
                name={title}
            />

        </div>
    )
}

export default Listen

interface IProps {
    pageContext: {
        title: string
        breadcrumb: INavItem[]
        playlist: INavItemCount
        podcast: INavItemCount
        info: INavItemCount
        items: ISubtopicLinks[]
        menu: INavItemCount[]
        mostPopular: {
            slug: string
            views: number
        }[]

    }
    path: string
}
