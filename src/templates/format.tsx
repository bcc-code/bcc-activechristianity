import * as React from 'react';
import loadable from '@loadable/component'
import { LayoutH1Wide } from '@/layout-parts'
import { fetchPostslistFromArchivePage } from '@/helpers'
import MetaTag from '@/components/Meta'
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import TopImgPost from '@/components/PostItem/TopImg'

import { UnderlineTitleLink } from '@/layout-parts'
import { HorizontalScrollSection } from '@/layout-parts/PostsRow/HorizontalScroll'
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByTaxonomies'))
import ContentPlaylist from '@/components/Playlist/SimplePlaylist'
import { formatToTypeLinks } from '@/strings/types-formats.json'
import { INavItem, IPostsByFormat, IPostItem, IPostsByFormatCollection, ITopic } from '@/types'
import newString from '@/strings/NewStrings.json'

interface IFormatProps {
    path: string
    pageContext: {
        id: string
        node: ITopic
        title: string
    }
}
const Format: React.FC<IFormatProps> = ({ path, pageContext }) => {
    const { title, id, node } = pageContext
    const { slug } = node
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latestPosts, setLatestPosts] = React.useState<IPostItem[]>([])
    const [types, setTypes] = React.useState<INavItem[]>([])
    const [readPosts, setReadPosts] = React.useState<IPostsByFormat | null>(null)
    const [listenPosts, setListenPosts] = React.useState<IPostsByFormat | null>(null)
    const [watchPosts, setWatchPosts] = React.useState<IPostsByFormat | null>(null)
    const { info, ...rest } = formatToTypeLinks[id]
    const latestSlug = `${info.slug}/${newString.latest_slug}`

    React.useEffect(() => {

        fetchPostslistFromArchivePage(latestSlug).then(posts => {
            console.log(posts)
            if (posts) {
                setHeaderPost(posts[0])
                setLatestPosts(posts.slice(5, 10))
            }
        })
    }, [])

    React.useEffect(() => {
        getAllFormat()

    }, [])

    const getAllFormat = () => {
        Promise
            .all(Object.keys(rest)
                .map(id => {
                    const slug = `${rest[id].slug}/${info.slug}`
                    return fetchPostslistFromArchivePage(slug)
                        .then(res => {

                            if (res) {
                                const toReturn: IPostsByFormat = {
                                    type: {
                                        name: rest[id].name,
                                        to: rest[id].slug
                                    },
                                    keyName: rest[id].slug,
                                    postsRow: res
                                }
                                if (id === process.env.READ_POSTS_FILTER_ID) {
                                    setReadPosts(toReturn)
                                }
                                if (id === process.env.LISTEN_POSTS_FILTER_ID) {

                                    setListenPosts(toReturn)
                                }

                                if (id === process.env.WATCH_POSTS_FILTER_ID) {
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
                setTypes(allTypes)
            })

    }

    return (
        <div>
            <MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={[]} path={path} />
            <div className="bg-d4athens sm:bg-white"> <LayoutH1Wide title={title} /></div>
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
                <ByTaxonomies col={3} title={newString.byCategories} types={types} />
            </div>
            <div className="px-4">
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
                    <div className="standard-max-w pb-8">
                        <div className="" >
                            <UnderlineTitleLink name={listenPosts.type.name} to={listenPosts.type.to} />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <ContentPlaylist hideRead tracks={listenPosts.postsRow.slice(0, 3).map(post => post.media)} />
                            <ContentPlaylist hideRead tracks={listenPosts.postsRow.slice(3, 6).map(post => post.media)} />
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
            </div>

        </div>
    )

}

export default Format 