import React from "react"
import loadable from '@loadable/component'
import MetaTag from '@/components/Meta'

import FetchPostList from '@/HOC/FetchPostList'
import FetctLatestPlaylists from '@/HOC/FetctLatestPlaylists'
import FetchLatestPodcast from '@/HOC/FetchLatestPodcast'
const HSCardList = loadable(() => import('@/layout-parts/HorizontalScroll/HSCardList'))
const RecommendDesktopLayout = loadable(() => import('@/layouts/RecommendDesktopLayout'))
import LazyLoad from '@/components/LazyLoad';
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
    console.log(pageContext)
    const { title, breadcrumb, items, playlist, podcast, mostPopular, featuredPosts } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`
    const featured = [...featuredPosts, ...mostPopular.slice(5)]
    return (
        <div >
            <MetaTag title={title} translatedUrls={[]} breadcrumb={[]} type="page" path={path} />

            <div className="sm:hidden">
                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                    <div className="w-full pb-4 sm:hidden pt-8">
                        <PageSectionHeader title={ac_strings.featured} />
                        <FetchPosts
                            slugs={featured}
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
                <LazyLoad>
                    <div className="py-6">
                        <PageSectionHeader title={ac_strings.playlist} />
                        <FetctLatestPlaylists
                            slug={playlist.to}
                            render={({ playlists }) => <HSPlaylist playlists={playlists.map(p => ({ ...p, slug: `${playlist.to}/${p.slug}` }))} />}
                        />
                    </div>

                </LazyLoad>
                <LazyLoad>
                    <div className="py-6">
                        <PageSectionHeader title={podcastProperties.title} />
                        <FetchLatestPodcast
                            slug={podcast.to}
                            render={({ podcastEps }) => <HSCardList posts={podcastEps} />}

                        />
                    </div>

                </LazyLoad>


                <LazyLoad>
                    <div className="py-6">

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

                </LazyLoad>
            </div>
            <RecommendDesktopLayout
                latestSlug={latestSlug}
                popularPosts={mostPopular}
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
        mostPopular: string[]
        featuredPosts: string[]

    }
    path: string
}
