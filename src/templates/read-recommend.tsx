import React from "react"
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import RecommendLayout from '@/layouts/RecommendLayoutNew'

import NewStrings from '@/strings/NewStrings.json'

import { IOnePostByType } from '@/layout-parts/RecommendLayout/PostsByTypes'
import { IOnePostByTypeRow } from '@/layout-parts/RecommendLayout/PostsByTypeRow'
import { INavItem, IPostsByFormat, IPostItem, IPostsByFormatCollection } from '@/types'
import { fetchPostslistFromArchivePage } from '@/helpers'
import { typeToFormatLinks } from '@/strings/types-formats.json'

const types = [
    {
        keyId: process.env.EDIFICATION_FILTER_ID,
        keyname: "edification",
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



const Read: React.FC<IProps> = (props) => {

    const [postsByFormat, setPostsByFormat] = React.useState<IPostsByFormatCollection>({})
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latest, setLatest] = React.useState<IPostItem[]>([])
    const [popular, setPopular] = React.useState<IPostItem[]>([])

    const { pageContext, path } = props

    const { title, breadcrumb } = pageContext
    const pageConfig = typeToFormatLinks[process.env.READ_POSTS_FILTER_ID]

    const latestSlug = `${path}/${NewStrings.latest_slug}`

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

    const postTypes = Object.keys(postsByFormat).map(item => ({ name: postsByFormat[item].type.name, to: postsByFormat[item].type.to }))
    const customerQuote = {
        author: {
            name: 'mock name',
            to: 'slug-mock',
            wordpress_id: 0
        },
        url: 'post-slug-mock',
        quote: '“Living a life where joy is a part of me requires action. There is no time to sit and feel sorry for myself and wonder why things are as they are. Instead, I can do good things for others, first for those who are closest to me.”',
        title: '‘Joy can be a part of me!’'
    }
    const quoteBlock = customerQuote
    const relatedTopic = postTypes

    const postsByTypesRow: IOnePostByTypeRow[] = []
    const postsByTypesRow1: IOnePostByType[] = []
    const postsByTypesRow2: IOnePostByType[] = []


    if (postsByFormat.edification) {

        postsByTypesRow.push(postsByFormat.edification)
        postsByTypesRow1.push(
            {
                type: postsByFormat.edification.type,
                post: postsByFormat.edification.postsRow[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
        )
    }

    if (postsByFormat.testimony) {
        postsByTypesRow.push(postsByFormat.testimony)
        postsByTypesRow1.push(
            {
                type: postsByFormat.testimony.type,
                post: postsByFormat.testimony.postsRow[0],
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
                post: postsByFormat.testimony.postsRow[1],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
    }

    if (postsByFormat.comment) {
        postsByTypesRow.push(postsByFormat.comment)
        postsByTypesRow2.push(
            {
                type: postsByFormat.comment.type,
                post: postsByFormat.comment.postsRow[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
        )
    }

    if (postsByFormat.question) {
        postsByTypesRow.push(postsByFormat.question)
        postsByTypesRow2.push(
            {
                type: postsByFormat.question.type,
                post: postsByFormat.question.postsRow[0],
                position: '2-wide',
                postThumnailType: 'leftImage'
            },
        )
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

            {headerPost && (
                <RecommendLayout
                    latestSlug={latestSlug}
                    name={title}

                    headerPost={headerPost}
                    latestPosts={latest}
                    popularPosts={popular}
                    postsByTypes={postsByTypesRow}
                    postsByTypesRow1={postsByTypesRow1}
                    postsByTypesRow2={postsByTypesRow2}
                    postTypes={postTypes}
                    relatedTopics={relatedTopic}
                    quoteBlock={quoteBlock}
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
    }
    path: string
    data: {
        ac: {

        }
    }
}
