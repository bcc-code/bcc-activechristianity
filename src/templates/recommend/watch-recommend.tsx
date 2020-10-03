import * as React from 'react'
import loadable from '@loadable/component'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import { UnderlineLinkViewAll } from '@/components/Button'
import MetaTag from '@/components/Meta'
const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBannerVideo'))
const FeaturedBannerSmall = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBannerVideoSmall'))
const LatestDesktopRow = loadable(() => import('@/layout-parts/List/Latest'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))

import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { PageSectionHeader, LayoutH1Wide } from '@/components/Headers'
import FetchTopicPostItems from '@/HOC/FetchTopicWithPostItems'
import { INavItem, IPostsByFormat, IPostItem, IPostsByFormatCollection, INavItemCount, ISubtopicLinks } from '@/types'

import ac_strings from '@/strings/ac_strings.json'



const Watch: React.FC<IProps> = (props) => {

    const [postsByFormat, setPostsByFormat] = React.useState<IPostsByFormatCollection>({})
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latest, setLatest] = React.useState<IPostItem[]>([])
    const [popular, setPopular] = React.useState<IPostItem[]>([])
    const [typeLinks, setTypeLinks] = React.useState<INavItemCount[]>([])
    const { pageContext, path } = props
    const { title, items, menu } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`
    React.useEffect(() => {

        fetchPostslistFromArchivePage(latestSlug).then(res => {
            if (res) {
                setLatestPosts(res)
            }
        })
    }, [])

    const setLatestPosts = (posts: IPostItem[]) => {
        setHeaderPost(posts[0])

        setLatest(posts)
        setPopular(posts.slice(5, 10))
    }

    return (
        <div>
            <MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={[]} path={path} />
            <div className="hidden sm:block bg-white"> <LayoutH1Wide title={title} /></div>
            <Placeholder loading={headerPost === null}>

                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                    <div className="w-full pb-4 sm:hidden pt-8">
                        <PageSectionHeader title={ac_strings.featured} />
                        <FeaturedBanner featured={popular} />
                    </div>
                </div>
                <LatestDesktopRow posts={latest} latestSlug={latestSlug} />
                {/*                 <LatestPopularTab
                    latestSlug={latestSlug}
                    popularPosts={popular}
                    latestPosts={latest}
                    video
                /> */}

                {/*                 <div className="standard-max-w">
                    <ByTaxonomies
                        title={ac_strings.byCategories}
                        types={typeLinks}
                    />
                </div> */}
                <div>
                    <div className="w-full flex justify-between pt-6 pr-4">
                        <PageSectionHeader title={ac_strings.latest} />
                        <UnderlineLinkViewAll to={latestSlug} />

                    </div>
                    <FeaturedBannerSmall
                        featured={latest.map(p => ({ title: p.title, excerpt: p.excerpt, image: p.image, slug: p.slug }))}
                        smallTitle
                    />
                </div>
                <div>
                    <div className="w-full flex justify-between pt-6 pr-4">
                        <PageSectionHeader title={ac_strings.popular} />

                    </div>
                    <FeaturedBannerSmall
                        featured={popular.map(p => ({ title: p.title, excerpt: p.excerpt, image: p.image, slug: p.slug }))}
                        smallTitle
                    />
                </div>
                <FetchTopicPostItems
                    topics={items.map(f => ({ name: f.name, slug: `${f.to}`, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => (
                        <div>

                            {topicPostItems.map(item => (
                                <div>
                                    <div className="w-full flex justify-between pt-6 pr-4">
                                        <PageSectionHeader title={item.name} />
                                        <UnderlineLinkViewAll to={`${item.slug}`} />

                                    </div>
                                    <FeaturedBannerSmall
                                        featured={item.posts.map(p => ({ title: p.title, excerpt: p.excerpt, image: p.image, slug: p.slug }))}
                                        smallTitle
                                    />
                                </div>

                            ))}
                        </div>
                    )}

                />
            </Placeholder>
        </div>
    )

}

export default Watch


interface IProps {
    pageContext: {
        title: string
        breadcrumb: INavItem[]
        info: INavItemCount
        items: ISubtopicLinks[]
        menu: INavItemCount[]
    }
    path: string
}
