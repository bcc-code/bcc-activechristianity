import { IUserLibrary, } from '@/state/types'
import { IApiItem } from "@/types/apiResType"


export const setUserLibrary = (payload: IUserLibrary) => ({
    type: 'SET_USER_LIBRARY',
    payload
})

export const setUserLiked = (payload: IApiItem[]) => ({
    type: 'SET_USER_LIKED',
    payload
})

export const setUserHistory = (payload: IApiItem[]) => ({
    type: 'SET_USER_HISTORY',
    payload
})

export const setUserFollowing = (payload: IApiItem[]) => ({
    type: 'SET_USER_FOLLOW',
    payload
})

export const setUserUnfinished = (payload: IApiItem[]) => ({
    type: 'SET_USER_UNFINISHED',
    payload
})

export const getUserLiked = () => ({
    type: 'FETCH_USER_LIKED'
})

export const getUserHistory = () => ({
    type: 'FETCH_USER_HISTORY'
})

export const getUserFollowing = () => ({
    type: 'FETCH_USER_FOLLOWING'
})

export const getUserUnfinished = () => ({
    type: 'FETCH_USER_UNFINISHED'
})

export const setNewLike = (payload: { id: string, bookmarked: boolean }) => ({
    type: 'NEW_USER_LIKED',
    payload
})

export const setNewFollowTopic = (payload: { id: string, followed: boolean }) => ({
    type: 'NEW_USER_FOLLLOW_TOPIC',
    payload
})

export const setNewFollowTag = (payload: { id: string, followed: boolean }) => ({
    type: 'NEW_USER_FOLLLOW_TAG',
    payload
})

