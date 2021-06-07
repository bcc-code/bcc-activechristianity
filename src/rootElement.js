/* eslint-disable */

import React from "react"
import {languages} from './strings/generated/menus.json'
import { Provider } from "react-redux"
import { createStore, applyMiddleware} from "redux"
import authApi from './state/middleware/auth'
import userApi from './state/middleware/user'
import reducers from "./state/reducer";
import AppWrapper from '@/layouts/AppWrapper'

export const preloadedState = {
    auth: {
        loggedIn: 'notLoggedIn'
    },
    translatedUrls:languages,
    playlist:[],
    currentMedia:{},
    isPlaying:false,
    isAutoPlay:false,
    mpPlayPause:false,
    
    isSignInModalOpen:null,
    userLibrary:{
        bookmarkedPosts: [],
        unfinishedPosts: [],
        followedTopics: [],
        followedPlaylists: [],
        followedAuthors: [],
        historyPosts: []
    },
    breadcrumb:{
        items:[],
        title:''
    }
}

import "react-placeholder/lib/reactPlaceholder.css"
import "normalize.css/normalize.css"
import "./styles/reset.css"
import "./styles/tailwind-output.css"

export default ({ element }) => {
    const store = createStore(reducers, preloadedState,applyMiddleware(authApi,userApi ))
    return (
        <Provider store={store}>
                <AppWrapper>
                    {element}
                </AppWrapper>
        </Provider>
    )
}