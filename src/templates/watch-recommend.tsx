import * as React from 'react'
import loadable from '@loadable/component'
import { typeToFormatLinks } from '@/strings/types-formats.json'
import { fetchPostslistFromArchivePage } from '@/helpers'
import { LayoutH1Wide } from '@/layout-parts'
import MetaTag from '@/components/Meta'

import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import TopImgPost from '@/components/PostItem/TopImg'
import { HorizontalScrollSection } from '@/layout-parts/PostsRow/HorizontalScroll'
const LatestPopularTab = loadable(() => import('@/layout-parts/RecommendLayout/LatestPopularTab'))
const LatestDesktopRow = loadable(() => import('@/layout-parts/PostsRow/Latest'))
const ByTaxonomies = loadable(() => import('@/layout-parts/RecommendLayout/ByTaxonomies'))

import { IPostsByFormat, IPostItem, IPostsByFormatCollection } from '@/types'

import newString from '@/strings/NewStrings.json'


const types = [

    {
        keyId: process.env.EDIFICATION_FILTER_ID,
        keyname: "edification",
    },
    {
        keyId: process.env.SONG_FILTER_ID,
        keyname: "song",
    },
    {
        keyId: process.env.TESTIMONY_FILTER_ID,
        keyname: "testimony",
    },
    {
        keyId: process.env.QUESTION_FILTER_ID,
        keyname: "question",
    },
    {
        keyId: process.env.COMMENTARY_FILTER_ID,
        keyname: "commentary",
    },

]
const Dummy: React.FC<IDummy> = (props) => {
    const pageConfig = typeToFormatLinks[process.env.WATCH_POSTS_FILTER_ID]
    const [postsByFormat, setPostsByFormat] = React.useState<IPostsByFormatCollection>({})
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latest, setLatest] = React.useState<IPostItem[]>([])
    const [popular, setPopular] = React.useState<IPostItem[]>([])
    console.log(pageConfig)
    const { pageContext, path } = props
    const { title } = pageContext
    const latestSlug = `${path}/latest`
    console.log(latestSlug)
    React.useEffect(() => {

        fetchPostslistFromArchivePage(latestSlug).then(res => {
            console.log(res)
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
        types.forEach(item => {

            const type = pageConfig[item.keyId]

            if (type) {
                const slug = `${path}/${type.slug}`
                getTypes.push(fetchPostslistFromArchivePage(slug).then(posts => {
                    if (posts) {
                        const postsByFormat: IPostsByFormat = {
                            keyName: item.keyname,
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
                <ByTaxonomies title={newString.byCategories} types={postsByTypesRow.map(item => ({ name: item.type.name, to: item.type.to }))} />
            </div>
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
    )

}

export default Dummy

interface IDummy {
    path: string

    pageContext: {
        title: string

    }
}
