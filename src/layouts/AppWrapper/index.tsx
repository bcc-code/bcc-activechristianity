
import React, { Profiler } from 'react'
import { useDispatch } from "react-redux"
import loadable from '@loadable/component'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'

const Footer = loadable(() => import('@/layout-parts/Footer'))
import LazyLoad from '@/components/LazyLoad';

import Breadcrumb from './Breadcrumb'


import { openSignInModal } from '@/state/action'
import { setLogout, setUser, } from '@/state/action/authAction'
import { getUserLibrary } from '@/state/action/userAction'

const MediaPlayer = loadable(() => import('@/components/MediaPlayer/AudioPlayerGlobal'))
import shortid from 'shortid'

import CookieConsent from "@/layouts/AppWrapper/CookeConsent";
const SignInSignUpModal = loadable(() => import('@/layout-parts/SignInSignUp'))
import { menusItems } from '@/strings/generated/menus.json'



const acApiModule = import('@/util/api')
// type 
import { IUser } from '@/types'


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
        const redirectedFromFb = window.location.href && window.location.href.indexOf('#_=_') > -1
        const loggedIn = localStorage.getItem(localStorageKey)
        if (loggedIn === "true" || redirectedFromFb) {
            checkUser()
        }

    }, [])

    const checkUser = () => {
        acApiModule.then(res => {
            const acApi = res.default
            acApi
                .profile()
                .then((res: IUser) => {
                    if (res && res.id) {
                        if (res.meta && res.meta.consented) {
                            dispatch(setUser(res))
                            dispatch(getUserLibrary())
                        } else {
                            dispatch(openSignInModal("giveConsent"))
                        }
                    } else {
                        dispatch(setLogout())
                    }
                })
                .catch((err: any) => {
                    console.log(err)
                    dispatch(setLogout())
                    console.log('handle login error')
                })
        })

    }


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

