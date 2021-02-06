import React, { Profiler } from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import PostLayout, { IMediaTypes } from '@/layouts/PostLayoutUpdate';
import { INavItem, IPostRes, IPostItem, ITopicPostItems } from '@/types'
import { normalizePostRes } from '@/helpers'

const Post: React.FC<IPostProp> = (props) => {
    const { pageContext, data } = props
    const postRes = data.acNodePost

    const { normalized: post, tranlsatedUrl, mediaTypes, authorsPosts, topicPosts, allInterestedPosts, breadcrumb } = pageContext
    const { title, excerpt, date, topics, types, image } = post
    const { langs, content, meta, seo } = postRes

    const seoTitle = seo && seo.title ? seo.title : title
    console.log(data)
    console.log(pageContext)
    return (
        <div>
            <MetaTag
                title={seoTitle}
                type="article"
                meta={{
                    description: seo && seo.desc ? seo.desc : excerpt,
                    date,
                    topics,
                    types,
                    imageUrl: image.src
                }}
                translatedUrls={langs}
                breadcrumb={breadcrumb}
                path={props.path}
            />


            <PostLayout
                {...post}
                seoTitle={seoTitle}
                tranlsatedUrl={tranlsatedUrl}
                content={content}
                authorsPosts={authorsPosts}
                topicPosts={topicPosts}
                allInterestedPosts={allInterestedPosts}
                mediaTypes={mediaTypes}
                credits={meta ? meta.credits : undefined}
            />


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
        normalized: IPostItem
        allInterestedPosts: IPostItem[]
        topicPosts: ITopicPostItems[]
        authorsPosts: ITopicPostItems[]
        tranlsatedUrl: INavItem[]
        mediaTypes: IMediaTypes
        //ITopicPostItems
    }
}

export const pageQuery = graphql`
    fragment PostMain on ac_node_post {
                id:acId
                title
                slug

                excerpt
                image {
                    src
                    srcset
                    dataUri
                    colors

                }
                readtime
                track {
                    url
                    title
                    duration
                    post {
                        title
                        slug
                        }
                    playlists {
                    slug
                    title
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
                        id
                        name
                        slug
                    }
                }
                published
                likes
                views
                seo {
                    desc
                    title
                 }
                 meta {
                    credits
                    url
                }

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
                readMorePosts
            }
    }
`