import React from "react"

import MetaTag from '@/components/Meta'
import RecommendLayout from '@/layouts/RecommendLayoutNew'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { IOnePostByType } from '@/layout-parts/RecommendLayout/PostsByTypes'
import { IOnePostByTypeRow } from '@/layout-parts/RecommendLayout/PostsByTypeRow'
import { TitleWithIcon, typeIcons } from '@/layout-parts'
import { INavItem, IPostsByFormat, IPostItem, IPostsByFormatCollection, INavItemCount, ISubtopicLinks } from '@/types'
// helper

import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import ac_strings from '@/strings/ac_strings.json'
// types'

const Listen: React.FC<IProps> = (props) => {
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latest, setLatest] = React.useState<IPostItem[]>([])
    const [popular, setPopular] = React.useState<IPostItem[]>([])
    const [mobilePostRows, setMobilePostRows] = React.useState<IOnePostByTypeRow[]>([])
    const [desktopRow1, setDesktopRow1] = React.useState<IOnePostByType[]>([])
    const [desktopRow2, setDesktopRow2] = React.useState<IOnePostByType[]>([])
    const [typeLinks, setTypeLinks] = React.useState<INavItemCount[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const { pageContext, path } = props
    console.log(pageContext)
    const { title, breadcrumb, items, playlist, menu } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`

    React.useEffect(() => {
        setIsLoading(true)
        fetchPostslistFromArchivePage(latestSlug).then(res => {

            if (res) {
                setLatestPosts(res)
                setIsLoading(false)
            }
        })

        setPosts()
    }, [pageContext])

    const setLatestPosts = (posts: IPostItem[]) => {
        setHeaderPost(posts[0])
        setLatest(posts)
        setPopular(posts.slice(5, 10))
    }

    const setPosts = () => {
        const getTypes: Promise<IPostsByFormat | undefined>[] = []
        const postTypesLinks: INavItemCount[] = []
        console.log(items)
        items.forEach(type => {

            if (type) {
                const { key, ...count } = type

                const slug = `${type.to}`
                postTypesLinks.push({ ...count, to: slug })
                getTypes.push(fetchPostslistFromArchivePage(slug).then(posts => {
                    if (posts) {
                        const postsByFormat: IPostsByFormat = {
                            keyName: key,
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

            const postsByTypesRow: IOnePostByTypeRow[] = []
            const postsByTypesRow1: IOnePostByType[] = []
            const postsByTypesRow2: IOnePostByType[] = []

            if (collection.podcast) {
                postsByTypesRow.push(collection.podcast)
                postsByTypesRow1.push(
                    {
                        type: collection.podcast.type,
                        post: collection.podcast.postsRow[0],
                        position: '1',
                        postThumnailType: 'topImage'
                    },
                    {
                        type: {
                            name: "",
                            to: "",
                        },
                        post: collection.podcast.postsRow[1],
                        position: '2',
                        postThumnailType: 'topImage'
                    }
                )
            }

            if (collection.edification) {

                postsByTypesRow.push(collection.edification)
                postsByTypesRow2.push(
                    {
                        type: collection.edification.type,
                        post: collection.edification.postsRow[0],
                        position: '1',
                        postThumnailType: 'topImage'
                    },
                    {
                        type: {
                            name: "",
                            to: "",
                        },
                        post: collection.edification.postsRow[1],
                        position: '2',
                        postThumnailType: 'topImage'
                    },

                )
            }

            if (collection.question) {
                postsByTypesRow.push(collection.question)
                postsByTypesRow2.push(
                    {
                        type: collection.question.type,
                        post: collection.question.postsRow[0],
                        position: '3',
                        postThumnailType: 'topImage'
                    },
                )
            }

            if (collection.commentary) {

                postsByTypesRow.push(collection.commentary)
                postsByTypesRow2.push(
                    {
                        type: collection.commentary.type,
                        post: collection.commentary.postsRow[0],
                        position: '4',
                        postThumnailType: 'topImage'
                    },
                )
            }

            const withIcons = menu.map(item => ({ ...item, name: < TitleWithIcon title={item.name} icon={typeIcons["listen"]} /> }))
            setTypeLinks(withIcons)
            setMobilePostRows(postsByTypesRow)
            setDesktopRow1(postsByTypesRow1)
            setDesktopRow2(postsByTypesRow2)
        })
    }

    return (
        <div>
            <MetaTag title={title} translatedUrls={[]} breadcrumb={[]} type="page" path={path} />
            <Placeholder loading={isLoading || !headerPost}>
                {headerPost && (
                    <RecommendLayout
                        hideTitleOnMobile={true}
                        latestSlug={latestSlug}
                        name={title}
                        headerPost={headerPost}
                        latestPosts={latest}
                        popularPosts={popular}
                        postsByTypesRow1={desktopRow1}
                        postsByTypesRow2={desktopRow2}
                        postsByTypes={mobilePostRows}
                        postTypes={typeLinks}

                    />
                )}
            </Placeholder>


        </div>
    )
}

export default Listen

interface IProps {
    pageContext: {
        title: string
        breadcrumb: INavItem[]
        playlist: INavItemCount
        info: INavItemCount
        items: ISubtopicLinks[]
        menu: INavItemCount[]

    }
    path: string
}
