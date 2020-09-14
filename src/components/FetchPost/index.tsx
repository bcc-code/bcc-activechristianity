import React, { useState, useEffect } from "react"

import ReactPlaceholder from 'react-placeholder'
import RightImgWDes from '@/components/PostItem/RightImgWDes'
import { IPostItem } from '@/types'
import { fetchOneLocalPostsFromSlug } from '@/helpers'

import DesktopHeader from "@/components/PostItem/DesktopHeaderPost"

// title, featured_media, authors, slug


interface IFetchPost {
    slug: string
    type?: "header"
}
const FetchPost: React.FC<IFetchPost> = ({ slug, type }) => {
    useEffect(() => {
        getPost()
    }, [])
    const [post, setPost] = useState<IPostItem | undefined>(undefined)

    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)

    const getPost = () => {
        setIsLoadingPost(true)
        return fetchOneLocalPostsFromSlug(slug)
            .then(res => {
                setIsLoadingPost(false)
                setPost(res)

            }).catch(error => {
                console.log(error.message)
                setHasError(true)
                setIsLoadingPost(false)
            })
    }

    const PostComponent = type === "header" ? DesktopHeader : RightImgWDes
    return (
        <ReactPlaceholder
            ready={!isLoadingPost}
            type="media"
            rows={3}
            showLoadingAnimation={true} >
            {post !== undefined && (
                <PostComponent {...post} />
            )}
        </ReactPlaceholder>
    )
}

export default FetchPost

