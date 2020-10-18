import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reducers from "./src/state/reducer";
import middleware from './src/state/middleware'
import authApi from './src/state/middleware/auth'
import userApi from './src/state/middleware/user'
import {homeUrls} from "./src/state/reducer/translationUrl"

export const preloadedState = {
    auth: {
        loggedIn: 'loading'
    },
    translatedUrls:homeUrls,
    playlist:[],
    currentMedia:{},
    isAutoPlay:false,
    mpPlayPause:false,
    isPlaying:false,
    isSignInModalOpen:null,
    isModalOpen:false,
    userLibrary:{
        bookmarkedPosts: [],
        unfinishedPosts: [],
        followedTopics: [],
        followedPlaylists: [],
        followedAuthors: [],
        historyPosts: []
    },
    mpHeight:0,
    breadcrumb:{
        items:[],
        title:''
    }
}

export default ({ element }) => {
    const store = createStore(reducers, preloadedState,applyMiddleware(authApi,userApi,middleware ))
    return <Provider store={store}>{element}</Provider>
}