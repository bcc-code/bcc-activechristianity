
import {
    Middleware,
} from 'redux'

import { IRootState } from '../types'
import { blog as blogApi } from '../../util/sdk'
import { setUserLiked, setUserHistory, setUserFollowing, getUserLiked, getUserFollowing } from '@/state/action/userAction'
import { IHistory, ILiked, IUnfinished, IFollowing } from '@/types/apiResType'
const apiMiddleware: Middleware<{}, IRootState> = (store) => (next) => (action) => {
    switch (action.type) {
        // only catch a specific action
        case 'FETCH_USER_LIKED':

            blogApi.liked()
                .then((res: ILiked) => {
                    console.log(res)
                    if (Array.isArray(res.liked)) {
                        store.dispatch(setUserLiked(res.liked))
                    }

                })
                .catch((err: any) => {
                    // set_FOLLOWING_ERROR
                })
            break
        case 'FETCH_USER_FOLLOWING':
            blogApi
                .following()
                .then((res: IFollowing) => {
                    if (Array.isArray(res.topics) || Array.isArray(res.tags)) {
                        store.dispatch(setUserFollowing(res))
                    }

                })
                .catch((err: any) => {
                    // set_FOLLOWING_ERROR
                })
            break

        case 'FETCH_USER_HISTORY':
            blogApi
                .history(20)
                .then((res: IHistory) => {
                    console.log(res)
                    if (Array.isArray(res.history)) {
                        store.dispatch(setUserHistory(res.history))
                    }

                })
                .catch((err: any) => {
                    console.log(err)
                    // set_FOLLOWING_ERROR
                })
            break

        case 'FETCH_USER_UNFINISHED':
            blogApi
                .unfinishedPosts()
                .then((res: IUnfinished) => {
                    if (Array.isArray(res.unfinishedPosts)) {
                        store.dispatch(setUserHistory(res.unfinishedPosts))
                    }
                })
                .catch((err: any) => {
                    console.log(err)
                    // set_FOLLOWING_ERROR
                })
            break

        case 'NEW_USER_LIKED':
            const { id: postId, bookmarked } = action.payload

            blogApi
                .likePost(postId, !bookmarked)
                .then((res) => {

                    store.dispatch(getUserLiked())
                })
                .catch((err: any) => {
                    console.log(err)
                    // set_FOLLOWING_ERROR
                })
            break

        case 'NEW_USER_FOLLLOW_TOPIC':
            const { id: topicId, followed: followTopic } = action.payload
            blogApi
                .followTopic(topicId, !followTopic)
                .then((res: any) => {
                    console.log(res)
                    store.dispatch(getUserFollowing())
                })
                .catch((err: any) => {
                    console.log(err)
                    // set_FOLLOWING_ERROR
                })
            break

        case 'NEW_USER_FOLLLOW_TAG':
            const { id: tagId, followed: followTag } = action.payload
            blogApi
                .followTag(tagId, !followTag)
                .then((res: any) => {
                    console.log(res)
                    store.dispatch(getUserFollowing())
                })
                .catch((err: any) => {
                    console.log(err)
                    // set_FOLLOWING_ERROR
                })
            break
        // if we don't need to handle this action, we still need to pass it along


        default: next(action)
    }
}

export default apiMiddleware