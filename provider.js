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
import Link from '@/components/CustomLink'
import { graphql } from "gatsby"
import BottomMobile from '@/layout-parts/Nav/BottomMobile'
import Breadcrumb from '@/layouts/App'
import CookieConsent from "@/layouts/App/CookeConsent";
import Helmet from 'react-helmet'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'
import TopMobile from '@/layout-parts/Nav/TopMobile'
const SideNav = loadable(() => import('@/layout-parts/Nav/SideNav/index.tsx'))
const SignInSignUpModal = loadable(() => import('@/layout-parts/SignInSignUp'))
const Footer = loadable(() => import('@/layout-parts/Footer'))
import { useDispatch } from "react-redux"
import { setLogout, setUser, } from '@/state/action/authAction'
import { getUserLibrary } from '@/state/action/userAction'
import { setIsModalOpen, openSignInModal } from '@/state/action'
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
{/*                 <TopDesktop key={shortid()} {...NavProps} explorePage={menusItems.explore} />
                <TopMobile
                    {...NavProps}
                    key={shortid()}
                />
                {isSideNavOpen && <SideNav {...NavProps} />} */}
                {element}
                <Footer key={shortid()} />
                <BottomMobile key={shortid()}  />
            </div>
        </Provider>
    )
}