import React from 'react'
import loadable from '@loadable/component'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import FetchTopicPostItems from '@/layout-parts/HOC/FetchTopicWithPostItems'
import ScrollNavTabs from '@/components/Tabs/ScrollNavTabs'
import RightImgPostItem from '@/components/PostItem/RightImgWDes'
import { LayoutH1Wide, PageSectionHeader } from '@/layout-parts'
import { UnderlineLinkViewAll } from '@/components/Button'
const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBanner'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))
import LazyLoad from '@/components/LazyLoad';
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { INavItem, IPostItem, ISubtopicLinks } from '@/types'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import getPostByTypesLayout from '@/layout-parts/RecommendLayout/getPostsLayout'
// Types 
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'

const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {

    const { pageContext, path } = props
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latest, setLatest] = React.useState<IPostItem[]>([])
    const [popular, setPopular] = React.useState<IPostItem[]>([])
    const [isLoading, setIsLoading] = React.useState(false)

    const {
        title,
        formats,
        breadcrumb
    } = pageContext

    const latestSlug = `${path}/1`
    React.useEffect(() => {

        fetchPostslistFromArchivePage(latestSlug).then(res => {
            if (res) {
                setLatestPosts(res)

            }
        })
    }, [props.pageContext])



    const setLatestPosts = (posts: IPostItem[]) => {

        setHeaderPost(posts[0])
        setLatest(posts)
        setPopular(posts.slice(5, 10))
    }

    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]} type="page"
                breadcrumb={breadcrumb}
                path={path}
            />


            <Placeholder loading={isLoading || !headerPost}>
                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>
                    <LayoutH1Wide
                        title={title}
                    />
                </div>
                <div className="w-full pb-4 sm:hidden pt-8">
                    <PageSectionHeader title={ac_strings.featured} />
                    <FeaturedBanner featured={popular} />
                </div>
                <div className="div6 bg-d4slate-lighter sm:bg-transparent py-6 overflow-hidden sm:hidden">
                    <PageSectionHeader title={ac_strings.popular} />
                    <TopImgHorizontalScroll posts={popular} />
                </div>
                <LazyLoad>
                    <FetchTopicPostItems
                        topics={formats.map(f => ({ name: f.name, slug: `${TS.slug_topic}/${f.to}`, id: '' }))}
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
                {/*                 {headerPost && (
                    <RecommendLayout
                        latestSlug={latestSlug}
                        name={title}
                        headerPost={headerPost}
                        latestPosts={latest}
                        popularPosts={popular}
                        postsByTypes={mobilePostRows}
                        postsByTypesRow1={desktopRow1}
                        postsByTypesRow2={desktopRow2}
                        postTypes={formatLinks}
                        relatedTopics={typeLinks}

                    />
                )} */}
            </Placeholder>

        </div>
    )

}

export default TaxonomyPage
interface ITaxonomyPageProps {
    pageContext: {
        slug: string
        title: string
        breadcrumb: INavItem[]
        types: ISubtopicLinks[]
        formats: ISubtopicLinks[]
    }
    path: string
}

