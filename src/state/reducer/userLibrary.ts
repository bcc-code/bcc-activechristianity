import { IUserLibrary } from '../types'

interface authAction {
    type:
    'SET_USER_LIBRARY' |
    'SET_USER_LIKED' |
    'SET_USER_HISTORY' |
    'SET_USER_FOLLOW_TOPICS' |
    'SET_USER_FOLLOW_PLAYLISTS' |
    'SET_USER_FOLLOW_AUTHORS' |
    'SET_USER_UNFINISHED'
    payload: any
}

const initialState: IUserLibrary = {
    bookmarkedPosts: [],
    unfinishedPosts: [],
    followedTopics: [],
    followedPlaylists: [],
    followedAuthors: [],
    historyPosts: []
}

const userLibrary = (state: IUserLibrary = initialState, action: authAction) => {
    switch (action.type) {

        case 'SET_USER_LIBRARY': {
            return (action.payload)
        }

        case 'SET_USER_LIKED': {
            return ({
                ...state,
                bookmarkedPosts: action.payload
            })
        }
        case 'SET_USER_FOLLOW_TOPICS': {
            return ({
                ...state,
                followedTopics: action.payload
            })
        }
        case 'SET_USER_FOLLOW_PLAYLISTS': {
            return ({
                ...state,
                followedPlaylists: action.payload
            })
        }
        case 'SET_USER_FOLLOW_AUTHORS': {
            return ({
                ...state,
                followedAuthors: action.payload
            })
        }
        case 'SET_USER_HISTORY': {
            return ({
                ...state,
                historyPosts: action.payload
            })
        }

        case 'SET_USER_UNFINISHED': {
            return ({
                ...state,
                unfinishedPosts: action.payload
            })
        }
        default:
            return state
    }
}

export default userLibrary
