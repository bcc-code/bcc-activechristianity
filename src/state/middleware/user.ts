
import {
    Middleware,
} from 'redux'

import { IRootState, IUserLibrary } from '../types'
import { blog as blogApi } from '../../util/sdk'
import { setUserLiked, setUserHistory, setUserFollowing, setUserUnfinished, setUserLibrary } from '@/state/action/userAction'
import { IHistory, ILiked, IUnfinished, IFollowing } from '@/types'
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
                    console.log(res)
                    if (Array.isArray(res.topics)) {
                        if (res.topics) {
                            store.dispatch(setUserFollowing(res.topics))
                        }
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
                        console.log(res.history)
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
                    console.log(res)
                    if (Array.isArray(res.unfinishedPosts)) {
                        store.dispatch(setUserUnfinished(res.unfinishedPosts))
                    }
                })
                .catch((err: any) => {
                    console.log(err)
                    // set_FOLLOWING_ERROR
                })
            break


        case 'FETCH_USER_LIBRARY':
            Promise.all([
                blogApi.liked()
                    .then((res: ILiked) => {
                        console.log(res)
                        if (Array.isArray(res.liked)) {
                            return res.liked
                        } else {
                            throw new Error('Error res.liked')
                        }
                    })
                    .catch((err: any) => {
                        // set_FOLLOWING_ERROR
                    }), //0
                blogApi
                    .following()
                    .then((res: IFollowing) => {
                        console.log(res)
                        if (Array.isArray(res.topics)) {
                            if (res.topics) {
                                console.log(res.topics)
                                return res.topics
                            } else {
                                throw new Error('Error res.topics')
                            }
                        }

                    })
                    .catch((err: any) => {
                        // set_FOLLOWING_ERROR
                    }), //3
                blogApi
                    .history(20)
                    .then((res: IHistory) => {
                        console.log(res)
                        if (Array.isArray(res.history)) {
                            console.log(res.history)
                            return res.history
                        } else {
                            throw new Error('Error res.history')
                        }

                    })
                    .catch((err: any) => {
                        console.log(err)
                        // set_FOLLOWING_ERROR
                    }), //4
                blogApi.unfinishedPosts()
                    .then((res: IUnfinished) => {
                        console.log(res)
                        if (Array.isArray(res.unfinishedPosts)) {
                            return res.unfinishedPosts
                        } else {
                            throw new Error('Error res.unfinishedPosts')
                        }
                    })
                    .catch((err: any) => {
                        console.log(err)
                        // set_FOLLOWING_ERROR
                    }) //5

            ]).then(res => {
                const userLibrary: IUserLibrary = {
                    bookmarkedPosts: [],
                    followedTopics: [],
                    historyPosts: [],
                    unfinishedPosts: []
                }
                if (res[0] && res[0].length > 0) {
                    userLibrary.bookmarkedPosts = res[0]
                }

                if (res[1] && res[1].length > 0) {
                    userLibrary.followedTopics = res[1]
                }

                if (res[2] && res[2].length > 0) {
                    userLibrary.historyPosts = res[2]
                }

                if (res[3] && res[3].length > 0) {
                    userLibrary.unfinishedPosts = res[3]
                }
                store.dispatch(setUserLibrary(userLibrary))
                /*
                  followedTopics: IApiItem[]
  unfinishedPosts: IApiItem[]
  bookmarkedPosts: IApiItem[]
  historyPosts: IApiItem[]*/
                //)
            })

            break;
        // if we don't need to handle this action, we still need to pass it along


        default: next(action)
    }
}

export default apiMiddleware