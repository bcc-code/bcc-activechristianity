import React, { useState, useEffect } from "react"
import { getApi, linkTypes, WPItemtoPostItem } from "@/helpers"
import axios from 'axios'
import ReactPlaceholder from 'react-placeholder'
import PostItem from '@/components/PostItem/RightImgWDes'
import { IPostItem } from '@/types'

interface IProps {
    url: string
}
const FetchPost: React.SFC<IProps> = ({ url }) => {

    const api = getApi(url)

    return (
        <ReactPlaceholder
            ready={api.type !== "external"}
            type="media"
            rows={3}
            showLoadingAnimation={true}
        >
            <FetchWPpost {...api} />
        </ReactPlaceholder>
    )
}
export default FetchPost

interface IFetchWPpost {
    url: string
    type: linkTypes
    dataKey: string
    slug: string
}
// title, featured_media, authors, slug
const FetchWPpost: React.SFC<IFetchWPpost> = ({ url, type, dataKey, slug }) => {
    useEffect(() => {
        getPost()
    }, [])
    const [post, setPost] = useState<IPostItem | undefined>(undefined)

    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)

    const getPost = () => {
        setIsLoadingPost(true)
        return axios(url).then(res => {

            if (type === "post" || type === "ac_ebook" || type === "ac_media" || type === "ac_essential") {
                if (res.data && res.data.result && res.data.result.data && res.data.result.data[dataKey]) {
                    const updatePost = (WPItemtoPostItem(res.data.result.data[dataKey]))
                    setPost(updatePost)
                    setIsLoadingPost(false)
                }
            }


        }).catch(error => {
            console.log(error.message)
            setHasError(true)
            setIsLoadingPost(false)
        })
    }
    return (
        <ReactPlaceholder
            ready={!isLoadingPost}
            type="media"
            rows={3}
            showLoadingAnimation={true} >
            {post !== undefined && (
                <div>
                    {
                        post.title && post.title !== "" ? (
                            <PostItem {...post} />
                        ) : <div>
                                {url}
                            </div>
                    }
                </div>
            )}
        </ReactPlaceholder>
    )
}


