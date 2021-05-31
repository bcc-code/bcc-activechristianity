
import React, { Profiler } from 'react'
import { useDispatch } from "react-redux"
import loadable from '@loadable/component'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'

const Footer = loadable(() => import('@/layout-parts/Footer'))
import LazyLoad from '@/components/LazyLoad';

import Breadcrumb from './Breadcrumb'

import checkUser from '@/state/reducer/checkUser'
const MediaPlayer = loadable(() => import('@/components/MediaPlayer/AudioPlayerGlobal'))
import shortid from 'shortid'

import CookieConsent from "@/layouts/AppWrapper/CookeConsent";
const SignInSignUpModal = loadable(() => import('@/layout-parts/SignInSignUp'))
import { socialLoginlocalStorageKey } from '@/layout-parts/SignInSignUp/Main'
import { menusItems } from '@/strings/generated/menus.json'


import './Layout.css'


export interface IDrawerNav {
    isSideNavOpen: boolean
    setSideNavOpen: (status: boolean) => void
    isModalOpen?: boolean
}


const App: React.FC<{ pageContext: { title?: string, slug?: string } }> = (props) => {
    const { children } = props
    const localStorageKey = 'ac.loggedIn'
    const dispatch = useDispatch();

    React.useEffect(() => {
        const redirectedFromSocialPlatform = localStorage.getItem(socialLoginlocalStorageKey)
        const loggedIn = localStorage.getItem(localStorageKey)
        if (loggedIn === "true" || redirectedFromSocialPlatform === "true") {
            checkUser(dispatch)
        }

    }, [])




    return (
        <>
            <CookieConsent key={shortid()} />
            <SignInSignUpModal key={shortid()} />
            <MediaPlayer key={shortid()} />
            <TopDesktop key={shortid()} explorePage={menusItems.explore} />

            <div className="relative layout-children" key={shortid()}>
                <Breadcrumb key={shortid()} />
                {children}
            </div>

            <LazyLoad>
                <Footer />
            </LazyLoad>
        </>

    )

}

export default App

