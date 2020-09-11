import * as React from 'react';
import loadable from '@loadable/component'

import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import ContentPlaylist from '@/components/Playlist/SimplePlaylist'
import MetaTag from '@/components/Meta'
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import { HorizontalScrollSection } from '@/layout-parts/PostsRow/HorizontalScroll'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import TopImgPost from '@/components/PostItem/TopImg'

import { UnderlineTitleLink, typeIcons, LayoutH1Wide, TitleWithIcon } from '@/layout-parts'


const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByTaxonomies'))


import { INavItem, IPostsByFormat, IPostItem, ITopic, INavItemCount, ISubtopicLinks } from '@/types'
import ac_strings from '@/strings/ac_strings.json'


const Format: React.FC<IProps> = ({ path, pageContext }) => {
    const { formatType, breadcrumb } = pageContext

    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latestPosts, setLatestPosts] = React.useState<IPostItem[]>([])
    const [types, setTypes] = React.useState<INavItem[]>([])
    const [readPosts, setReadPosts] = React.useState<IPostsByFormat | null>(null)
    const [listenPosts, setListenPosts] = React.useState<IPostsByFormat | null>(null)
    const [watchPosts, setWatchPosts] = React.useState<IPostsByFormat | null>(null)
    const [typeLinks, setTypeLinks] = React.useState<INavItemCount[]>([])
    const { info, items } = formatType
    const latestSlug = `${info.to}/${ac_strings.slug_latest}`

    React.useEffect(() => {

        fetchPostslistFromArchivePage(latestSlug).then(posts => {
            console.log(posts)
            if (posts) {
                setHeaderPost(posts[0])
                setLatestPosts(posts.slice(1, 5))
            }
        })
    }, [])

    React.useEffect(() => {
        getAllFormat()

    }, [])

    const getAllFormat = () => {


        const postTypesLinks: INavItemCount[] = []

        setTypeLinks(items)
        Promise
            .all(items
                .map(link => {


                    const slug = `${link.to}/${info.to}`
                    postTypesLinks.push({ ...link, to: slug, name: <TitleWithIcon icon={typeIcons[link.key]} title={link.name} /> })
                    return fetchPostslistFromArchivePage(slug)
                        .then(res => {

                            if (res) {
                                const toReturn: IPostsByFormat = {
                                    type: {
                                        name: link.name,
                                        to: link.to
                                    },
                                    postsRow: res
                                }
                                if (link.key === "read") {
                                    setReadPosts(toReturn)
                                }
                                if (link.key === "listen") {

                                    setListenPosts(toReturn)
                                }

                                if (link.key === "watch") {
                                    setWatchPosts(toReturn)
                                }
                                return toReturn
                            }
                        })
                })
            ).then(res => {
                const allTypes: INavItem[] = []
                res.forEach(c => {
                    if (c && c.type) {
                        allTypes.push(c.type)
                    }
                })
                setTypeLinks(postTypesLinks)
                setTypes(allTypes)
            })

    }


    return (
        <div>
            <MetaTag title={info.name} translatedUrls={[]} type="page" breadcrumb={breadcrumb} path={path} />
            <div className="bg-d4athens sm:bg-white"> <LayoutH1Wide title={info.name} /></div>
            <Placeholder loading={headerPost === null}>
                {
                    headerPost && latestPosts && (
                        <div className="standard-max-w-px">
                            <HeaderSection
                                headerPost={headerPost}
                                listPosts={latestPosts}
                            />
                        </div>
                    )
                }
                <div className="w-full sm:hidden">
                    {headerPost && <TopImgPost noBorder {...headerPost} showType />}
                </div>


                <div className="standard-max-w">
                    <ByTaxonomies col={typeLinks.length} title={ac_strings.byCategories} types={typeLinks} />
                </div>
                {readPosts && (
                    <div>
                        <HorizontalScrollSection
                            name={readPosts.type.name}
                            slug={readPosts.type.to}
                            postThumnailType="topImage"
                            posts={readPosts.postsRow}
                            postProps={true}
                        />
                    </div>
                )}

                {listenPosts && (
                    <div className="standard-max-w pb-8 px-4">
                        <div className="" >
                            <UnderlineTitleLink name={listenPosts.type.name} to={listenPosts.type.to} />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <ContentPlaylist tracks={listenPosts.postsRow.slice(0, 3).map(post => post.media)} />
                            <ContentPlaylist tracks={listenPosts.postsRow.slice(3, 6).map(post => post.media)} />
                        </div>
                    </div>
                )}
                {watchPosts && (
                    <div>
                        <HorizontalScrollSection
                            name={watchPosts.type.name}
                            slug={watchPosts.type.to}
                            postThumnailType="topImage"
                            posts={watchPosts.postsRow}
                            postProps={true}
                            video
                        />
                    </div>
                )}
            </Placeholder>
        </div>
    )

}

export default Format


interface IProps {
    path: string
    pageContext: {
        id: string
        node: ITopic
        title: string
        breadcrumb: INavItem[]
        formatType: {
            info: INavItemCount
            items: ISubtopicLinks[]

        }
    }

}