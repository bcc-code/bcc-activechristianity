/* eslint-disable */

import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reducers from "./src/state/reducer";
import middleware from './src/state/middleware'
import authApi from './src/state/middleware/auth'
import userApi from './src/state/middleware/user'
import {homeUrls} from "./src/state/reducer/translationUrl"
import loadable from '@loadable/component'
const MediaPlayer = loadable(() => import('@/components/MediaPlayer/AudioPlayerGlobal'))
import shortid from 'shortid'
import BottomMobile from '@/layout-parts/Nav/BottomMobile'
import CookieConsent from "@/layouts/App/CookeConsent";
import Helmet from 'react-helmet'
const SignInSignUpModal = loadable(() => import('@/layout-parts/SignInSignUp'))
const Footer = loadable(() => import('@/layout-parts/Footer'))
import { menusItems } from '@/layout-parts/Nav/Menus'
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


    return (
        <Provider store={store}>
         <CookieConsent key={shortid()} />
            <SignInSignUpModal key={shortid()} />
            <MediaPlayer key={shortid()} />
            <div className="relative layout-children">
                <Helmet>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Helmet>
                {element}

                <BottomMobile key={shortid()}  />
            </div>
        </Provider>
    )
}