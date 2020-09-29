import React from "react"
import MetaTag from '@/components/Meta'
import LazyLoad from '@/components/LazyLoad';
import { UnderlineLinkViewAll } from '@/components/Button'
import loadable from '@loadable/component'
import ac_strings from '@/strings/ac_strings.json'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { IOnePostByType } from '@/layout-parts/RecommendLayout/PostsByTypes'
import { IOnePostByTypeRow } from '@/layout-parts/RecommendLayout/PostsByTypeRow'
const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBanner'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))

import { TitleWithIcon, typeIcons } from '@/layout-parts'
import { INavItem, IPostsByFormat, IPostItem, IPostsByFormatCollection, INavItemCount, ISubtopicLinks } from '@/types'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import FetchTopicPostItems from '@/layout-parts/HOC/FetchTopicWithPostItems'
import ScrollNavTabs from '@/components/Tabs/ScrollNavTabs'
import RightImgPostItem from '@/components/PostItem/RightImgWDes'
import { LayoutH1Wide, PageSectionHeader } from '@/layout-parts'

const Read: React.FC<IProps> = (props) => {
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latest, setLatest] = React.useState<IPostItem[]>([])
    const [popular, setPopular] = React.useState<IPostItem[]>([])
    const [mobilePostRows, setMobilePostRows] = React.useState<IOnePostByTypeRow[]>([])
    const [desktopRow1, setDesktopRow1] = React.useState<IOnePostByType[]>([])
    const [desktopRow2, setDesktopRow2] = React.useState<IOnePostByType[]>([])
    const [typeLinks, setTypeLinks] = React.useState<INavItemCount[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const { pageContext, path } = props

    const { title, menu, info, items } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`

    React.useEffect(() => {


        setIsLoading(true)
        fetchPostslistFromArchivePage(latestSlug).then(res => {

            if (res) {
                setLatestPosts(res)
                setIsLoading(false)
            }
        })
    }, [pageContext])

    const setLatestPosts = (posts: IPostItem[]) => {
        setHeaderPost(posts[0])
        setLatest(posts)
        setPopular(posts.slice(5, 10))
    }




    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]}
                type="page"
                breadcrumb={[]}
                path={path}
            />

            <Placeholder loading={isLoading || !headerPost}>

                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                    <div className="w-full pb-4 sm:hidden pt-8">
                        <PageSectionHeader title={ac_strings.featured} />
                        <FeaturedBanner featured={popular} />
                    </div>
                </div>
                <div className="sm:bg-transparent py-6 overflow-hidden sm:hidden">
                    <PageSectionHeader title={ac_strings.popular} />
                    <TopImgHorizontalScroll posts={popular} />
                </div>
                <LazyLoad>
                    <FetchTopicPostItems
                        topics={items.map(f => ({ name: f.name, slug: `${f.to}`, id: '' }))}
                        layout="list"
                        render={({ topicPostItems }) => (
                            <div>
                                <div className="sm:hidden">
                                    <ScrollNavTabs tabs={topicPostItems.map(item => ({
                                        name: item.name,
                                        to: item.slug,
                                        content: (
                                            <div>
                                                {item.posts.slice(0, 6).map(p => {
                                                    return (
                                                        <RightImgPostItem {...p} />
                                                    )
                                                })}
                                                <div className="w-full flex justify-center py-6">
                                                    <UnderlineLinkViewAll to={`${item.slug}`} />
                                                </div>
                                            </div>
                                        )
                                    }))} />
                                </div>

                            </div>
                        )}

                    />
                </LazyLoad>
            </Placeholder>
        </div>
    )
}

export default Read


interface IProps {
    pageContext: {
        title: string
        breadcrumb: INavItem[]
        info: INavItemCount
        items: ISubtopicLinks[]
        menu: INavItemCount[]
        ebook: INavItemCount

    }
    path: string
}
