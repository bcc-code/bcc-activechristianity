/* eslint-disable */

import React from "react"
import {languages} from './strings/generated/menus.json'
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reducers from "./src/state/reducer";
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

import "react-placeholder/lib/reactPlaceholder.css"
import "normalize.css/normalize.css"
import "./styles/reset.css"
import "./styles/tailwind-output.css"

export default ({ element }) => {
    
    return (
        <Provider store={store}>
                <div>
                    nothing 
                    {element}
                </div>
        </Provider>
    )
}