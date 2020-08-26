import * as React from 'react'
import loadable from '@loadable/component'
import { fetchPostslistFromArchivePage } from '@/helpers'
import { LayoutH1Wide } from '@/layout-parts'
import MetaTag from '@/components/Meta'

import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import TopImgPost from '@/components/PostItem/TopImg'
import { HorizontalScrollSection } from '@/layout-parts/PostsRow/HorizontalScroll'
const LatestPopularTab = loadable(() => import('@/layout-parts/RecommendLayout/LatestPopularTab'))
const LatestDesktopRow = loadable(() => import('@/layout-parts/PostsRow/Latest'))
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByTaxonomies'))
import { TitleWithIcon, typeIcons } from '@/layout-parts'
import { INavItem, IPostsByFormat, IPostItem, IPostsByFormatCollection, INavItemCount, ISubtopicLinks } from '@/types'

import newString from '@/strings/ac_strings.json'



const Watch: React.FC<IProps> = (props) => {

    const [postsByFormat, setPostsByFormat] = React.useState<IPostsByFormatCollection>({})
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latest, setLatest] = React.useState<IPostItem[]>([])
    const [popular, setPopular] = React.useState<IPostItem[]>([])
    const [typeLinks, setTypeLinks] = React.useState<INavItemCount[]>([])
    const { pageContext, path } = props
    const { title, items, menu } = pageContext


    const latestSlug = `${path}/${newString.latest}`
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

    React.useEffect(() => {



        const getTypes: Promise<IPostsByFormat | undefined>[] = []
        const postTypesLinks: INavItemCount[] = []

        items.forEach(type => {
            const { key, ...count } = type


            if (type) {

                const slug = `${path}/${type.to}`
                postTypesLinks.push({ ...count, to: slug })
                getTypes.push(fetchPostslistFromArchivePage(slug).then(posts => {
                    if (posts) {
                        const postsByFormat: IPostsByFormat = {
                            keyName: type.key,
                            type: {
                                name: type.name,
                                to: slug,
                            },
                            postsRow: posts
                        }
                        return postsByFormat
                    }
                }))
            }
        })
        Promise.all(getTypes).then(res => {
            const collection: IPostsByFormatCollection = {}
            res.forEach(c => {
                if (c && c.keyName) {
                    collection[c.keyName] = c
                }
            })
            const withIcons = menu.map(item => ({
                ...item, name: <TitleWithIcon icon={typeIcons["watch"]} title={item.name} />
            }))
            setTypeLinks(withIcons)
            setPostsByFormat(collection)

        })
    }, [])


    const postsByTypesRow = Object.keys(postsByFormat).map(key => postsByFormat[key])
    return (
        <div>
            <MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={[]} path={path} />
            <div className="bg-d4athens sm:bg-white"> <LayoutH1Wide title={title} /></div>
            {
                headerPost && postsByFormat.edification && (
                    <div className="standard-max-w-px">
                        <HeaderSection
                            headerPost={headerPost}
                            listPosts={postsByFormat.edification.postsRow}
                            video
                        />
                    </div>
                )
            }
            <div className="w-full sm:hidden">
                {headerPost && <TopImgPost noBorder {...headerPost} showType />}
            </div>
            <LatestDesktopRow posts={latest} latestSlug={latestSlug} />
            <LatestPopularTab
                latestSlug={latestSlug}
                popularPosts={popular}
                latestPosts={latest}
                video
            />

            <div className="standard-max-w">
                <ByTaxonomies
                    title={newString.byCategories}
                    types={typeLinks}
                />
            </div>
            <div className="standard-max-w-px">
                {postsByTypesRow.map(item => {
                    return (
                        <HorizontalScrollSection
                            name={item.type.name}
                            slug={item.type.to}
                            postThumnailType="video"
                            posts={item.postsRow}
                            postProps={true}
                        />

                    )
                })}
            </div>
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
