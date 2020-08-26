import React from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import PostLayout from '@/layouts/PostLayout';
import { INavItem, IPostRes } from '@/types'
import { normalizePostRes } from '@/helpers'

const Post: React.FC<IPostProp> = (props) => {
    const { pageContext, data } = props
    const postRes = data.acNodePost

    const post = normalizePostRes(postRes)

    const { title, excerpt, date, topics, types, image, format } = post
    const { id, langs, content } = postRes
    const breadcrumb: INavItem[] = []
    if (types) {
        breadcrumb.push(types[0])
    }

    if (format) {
        breadcrumb.push(format[0])
    }

    return (
        <div>
            <MetaTag
                title={title}
                type="article"
                meta={{
                    description: excerpt,
                    date,
                    topics,
                    types,
                    imageUrl: image.src
                }}
                translatedUrls={langs}
                breadcrumb={breadcrumb}
                path={props.path}
            />

            <PostLayout {...post} langs={langs} content={content} />
        </div>
    )
}

export default Post

interface IPostProp {
    path: string
    data: {
        acNodePost: IPostRes
    }
    pageContext: {
        breadcrumb: INavItem[]
    }
}

export const pageQuery = graphql`
    fragment PostMain on ac_node_post {
                id
                title
                slug

                excerpt
                image {
                    src
                    srcset
                    dataUri

                }
                readtime
                meta {
                    url
                }
                track {
                    url
                    title
                    post {
                        title
                        slug
                        }
                    }
                authors {
                    name
                    slug
                    id
                    pivot {
                        as
                    }
                }
                topics {
                    name
                    slug
                    id
                    group {
                        name
                        slug
                    }
                }
                published

    }

    query PostById($id: String!) {
        acNodePost(id: { eq: $id }) {
                ...PostMain

                langs {
                    lang
                    slug
                }
                content
                glossary {
                    slug
                    id
                    content
                    word
                }
            }
    }
`