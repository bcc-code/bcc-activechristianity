import React from "react"
import MetaTag from '@/components/Meta'
import RecommendLayout from '@/layouts/RecommendLayoutNew'

import ac_strings from '@/strings/ac_strings.json'

import { IOnePostByType } from '@/layout-parts/RecommendLayout/PostsByTypes'
import { IOnePostByTypeRow } from '@/layout-parts/RecommendLayout/PostsByTypeRow'
import { TitleWithIcon, typeIcons } from '@/layout-parts'
import { INavItem, IPostsByFormat, IPostItem, IPostsByFormatCollection, INavItemCount, ISubtopicLinks } from '@/types'
import { fetchPostslistFromArchivePage } from '@/helpers'

const Read: React.FC<IProps> = (props) => {
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latest, setLatest] = React.useState<IPostItem[]>([])
    const [popular, setPopular] = React.useState<IPostItem[]>([])
    const [mobilePostRows, setMobilePostRows] = React.useState<IOnePostByTypeRow[]>([])
    const [desktopRow1, setDesktopRow1] = React.useState<IOnePostByType[]>([])
    const [desktopRow2, setDesktopRow2] = React.useState<IOnePostByType[]>([])
    const [typeLinks, setTypeLinks] = React.useState<INavItemCount[]>([])
    const { pageContext, path } = props

    const { title, menu, info, items } = pageContext

    const latestSlug = `${path}/${ac_strings.latest_slug}`

    React.useEffect(() => {

        fetchPostslistFromArchivePage(latestSlug).then(res => {
            if (res) {
                setLatestPosts(res)
            }
        })
    }, [pageContext])

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

            /* setPostsByFormat(collection) */

            const postsByTypesRow: IOnePostByTypeRow[] = []
            const postsByTypesRow1: IOnePostByType[] = []
            const postsByTypesRow2: IOnePostByType[] = []


            if (collection.edification) {

                postsByTypesRow.push(collection.edification)
                postsByTypesRow1.push(
                    {
                        type: collection.edification.type,
                        post: collection.edification.postsRow[0],
                        position: '1-wide',
                        postThumnailType: 'leftImage'
                    },
                )
            }

            if (collection.testimony) {
                postsByTypesRow.push(collection.testimony)
                postsByTypesRow1.push(
                    {
                        type: collection.testimony.type,
                        post: collection.testimony.postsRow[0],
                        position: '3',
                        postThumnailType: 'topImage'
                    }
                )

                postsByTypesRow1.push(
                    {
                        type: {
                            name: "",
                            to: ""
                        },
                        post: collection.testimony.postsRow[1],
                        position: '4',
                        postThumnailType: 'topImage'
                    }
                )
            }

            if (collection.commentary) {
                postsByTypesRow.push(collection.commentary)
                postsByTypesRow2.push(
                    {
                        type: collection.commentary.type,
                        post: collection.commentary.postsRow[0],
                        position: '1-wide',
                        postThumnailType: 'leftImage'
                    },
                )
            }

            if (collection.question) {
                postsByTypesRow.push(collection.question)
                postsByTypesRow2.push(
                    {
                        type: collection.question.type,
                        post: collection.question.postsRow[0],
                        position: '2-wide',
                        postThumnailType: 'leftImage'
                    },
                )
            }


            const withIcons = menu.map(item => ({
                ...item, name: <TitleWithIcon icon={typeIcons["read"]} title={item.name} />
            }))
            setTypeLinks(withIcons)
            setMobilePostRows(postsByTypesRow)
            setDesktopRow1(postsByTypesRow1)
            setDesktopRow2(postsByTypesRow2)

        })
    }, [pageContext])



    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]}
                type="page"
                breadcrumb={[]}
                path={path}
            />

            {headerPost && (
                <RecommendLayout
                    latestSlug={latestSlug}
                    name={title}
                    headerPost={headerPost}
                    latestPosts={latest}
                    popularPosts={popular}
                    postsByTypes={mobilePostRows}
                    postsByTypesRow1={desktopRow1}
                    postsByTypesRow2={desktopRow2}
                    postTypes={typeLinks}

                />
            )}
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
