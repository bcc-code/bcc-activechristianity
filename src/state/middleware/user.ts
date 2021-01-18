
import {
    Middleware,
} from 'redux'

import { IRootState, IUserLibrary } from '../types'
import {
    setUserLiked,
    setUserHistory,
    setUserFollowingTopics,
    setUserUnfinished,
    setUserLibrary,
    setUserFollowingPlaylists
} from '@/state/action/userAction'
import { IHistory, ILiked, IUnfinished, IFollowing } from '@/types'
import acApi from '@/util/api'

const apiMiddleware: Middleware<{}, IRootState> = (store) => (next) => (action) => {
    switch (action.type) {
        // only catch a specific action
        case 'NEW_USER_FOLLOW_TOPIC':
            acApi
                .followTopic(action.payload.id, action.payload.followed)
                .then((resNewFollow: any) => {

                    return acApi
                        .following()
                        .then((res: IFollowing) => {

                            if (res.following && Array.isArray(res.following.topics)) {

                                const filtered = res.following.topics.filter(p => typeof p.id === "string")
                                store.dispatch(setUserFollowingTopics(filtered))

                            } else {
                                store.dispatch(setUserFollowingTopics([]))
                            }

                        })
                        .catch((error: any) => {
                            console.log(error)
                        })

                }).catch((error: any) => {
                    console.log(error)
                })
            break;
        case 'NEW_USER_FOLLOW_PLAYLISTS':
            acApi
                .followPlaylist(action.payload.id, action.payload.followed)
                .then((resNewFollow: any) => {
                    return acApi
                        .following()
                        .then((res: IFollowing) => {
                            if (res.following && Array.isArray(res.following.playlists)) {

                                const filtered = res.following.playlists.filter(p => typeof p.id === "string")
                                store.dispatch(setUserFollowingPlaylists(filtered))
                            } else {
                                console.log('reset playlist')
                                store.dispatch(setUserFollowingPlaylists([]))
                            }

                        })
                        .catch((error: any) => {
                            console.log(error)
                        })

                }).catch((error: any) => {
                    console.log(error)
                })
            break;
        case 'NEW_USER_LIKED':
            acApi
                .likePost(action.payload.id, !action.payload.bookmarked)
                .then((resNewLike: any) => {
                    if (resNewLike.likePost && resNewLike.likePost.success === true) {
                        return acApi.liked()
                            .then((res: ILiked) => {
                                if (Array.isArray(res.liked)) {

                                    const filtered = res.liked.filter(p => typeof p.id === "string")

                                    store.dispatch(setUserLiked(filtered))
                                }
                            })
                    } else {

                        throw Error('feil to set new like')
                    }

                })
                .catch((err: any) => {
                    console.log(err)
                })
            break;
        case 'FETCH_USER_LIKED':

            acApi
                .liked()
                .then((res: ILiked) => {

                    if (Array.isArray(res.liked)) {
                        const filtered = res.liked.filter(p => typeof p.id === "string")
                        store.dispatch(setUserLiked(filtered))
                    }

                })
                .catch((err: any) => {
                    // set_FOLLOWING_ERROR
                })
            break
        case 'FETCH_USER_FOLLOWING':
            acApi
                .following()
                .then((res: IFollowing) => {
                    console.log(res)
                    if (Array.isArray(res.following.topics)) {
                        if (res.following.topics) {
                            const filtered = res.following.topics.filter(p => typeof p.id === "string")
                            store.dispatch(setUserFollowingTopics(filtered))
                        }
                    }

                })
                .catch((err: any) => {
                    // set_FOLLOWING_ERROR
                })
            break

        case 'FETCH_USER_HISTORY':
            acApi
                .history()
                .then((res: IHistory) => {
                    if (Array.isArray(res.history)) {
                        const filtered = res.history.filter(p => typeof p.id === "string")
                        store.dispatch(setUserHistory(filtered))
                    }

                })
                .catch((err: any) => {
                    console.log(err)
                    // set_FOLLOWING_ERROR
                })
            break

        case 'FETCH_USER_UNFINISHED':
            acApi
                .unfinishedPosts()
                .then((res: IUnfinished) => {
                    if (Array.isArray(res.unfinishedPosts)) {
                        const filtered = res.unfinishedPosts.filter(p => typeof p.id === "string")
                        store.dispatch(setUserUnfinished(filtered))
                    }
                })
                .catch((err: any) => {
                    console.log(err)
                    // set_FOLLOWING_ERROR
                })
            break


        case 'FETCH_USER_LIBRARY':
            Promise.all([
                acApi.liked()
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
                acApi
                    .following()
                    .then((res: IFollowing) => {
                        console.log(res)
                        if (Array.isArray(res.following.topics)) {
                            if (res.following) {
                                return res.following
                            } else {
                                throw new Error('Error res.topics')
                            }
                        }

                    })
                    .catch((err: any) => {
                        // set_FOLLOWING_ERROR
                    }), //3
                acApi
                    .history()
                    .then((res: IHistory) => {
                        if (Array.isArray(res.history)) {
                            return res.history
                        } else {
                            throw new Error('Error res.history')
                        }

                    })
                    .catch((err: any) => {
                        console.log(err)
                        // set_FOLLOWING_ERROR
                    }), //4
                acApi
                    .unfinishedPosts()
                    .then((res: IUnfinished) => {
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

            ])
                .then(res => {
                    console.log(res)
                    const userLibrary: IUserLibrary = {
                        bookmarkedPosts: [],
                        followedTopics: [],
                        historyPosts: [],
                        unfinishedPosts: [],
                        followedAuthors: [],
                        followedPlaylists: []
                    }
                    if (res[0] && res[0].length > 0) {
                        userLibrary.bookmarkedPosts = res[0].filter(p => typeof p.id === "string")
                    }

                    if (res[1]) {
                        userLibrary.followedTopics = res[1].topics.filter(p => typeof p.id === "string")
                        userLibrary.followedPlaylists = res[1].playlists.filter(p => typeof p.id === "string")
                        userLibrary.followedAuthors = res[1].authors.filter(p => typeof p.id === "string")
                    }

                    if (res[2] && res[2].length > 0) {
                        userLibrary.historyPosts = res[2].filter(p => typeof p.id === "string")
                    }

                    if (res[3] && res[3].length > 0) {
                        userLibrary.unfinishedPosts = res[3].filter(p => typeof p.id === "string")
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