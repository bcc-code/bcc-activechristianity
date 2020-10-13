import { IUserLibrary, } from '@/state/types'
import { IApiItem } from "@/types"


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

export const setUserFollowingTopics = (payload: IApiItem[]) => ({
    type: 'SET_USER_FOLLOW_TOPICS',
    payload
})

export const setUserFollowingPlaylists = (payload: IApiItem[]) => ({
    type: 'SET_USER_FOLLOW_PLAYLISTS',
    payload
})

export const setUserFollowingAuthors = (payload: IApiItem[]) => ({
    type: 'SET_USER_FOLLOW_AUTHORS',
    payload
})


export const setUserUnfinished = (payload: IApiItem[]) => ({
    type: 'SET_USER_UNFINISHED',
    payload
})

export const getUserLibrary = () => ({
    type: 'FETCH_USER_LIBRARY',

})


export const setNewLike = (payload: { id: string, bookmarked: boolean }) => ({
    type: 'NEW_USER_LIKED',
    payload
})

export const setNewFollowTopic = (payload: { id: string, followed: boolean }) => ({
    type: 'NEW_USER_FOLLOW_TOPIC',
    payload
})

export const setNewFollowPlaylists = (payload: { id: string, followed: boolean }) => ({
    type: 'NEW_USER_FOLLOW_PLAYLISTS',
    payload
})


export const setNewFollowAuthors = (payload: { id: string, followed: boolean }) => ({
    type: 'NEW_USER_FOLLOW_AUTHORS',
    payload
})

