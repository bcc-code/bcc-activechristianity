import * as React from 'react'
import Link from '@/components/CustomLink'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '@/state/types'
import ac_strings from '@/strings/ac_strings.js'
import { openSignInModal } from '@/state/action'
import { slug_user } from '@/layout-parts/Nav/Menus'
import { initiateLogout } from '@/state/action/authAction'

interface IUserNav {
    className?: string
    col?: boolean
    callback?: () => void
}
const UserNav: React.FC<IUserNav> = ({ className, col, callback }) => {
    const dispatch = useDispatch()
    const { authInfo } = useSelector((state: IRootState) => ({ authInfo: state.auth }));

    const handleSignIn = () => {
        dispatch(openSignInModal("signInOptions"))
        if (callback) {
            callback()
        }
    }

    const handleSignUp = () => {
        dispatch(openSignInModal("signUpOptions"))
        if (callback) {
            callback()
        }
    }

    const onClick = () => {
        if (callback) {
            callback()
        }
    }

    const handleLogout = () => {
        dispatch(initiateLogout())
        if (callback) {
            callback()
        }
    }

    return authInfo.loggedIn === 'success' ? (
        <div className={`${col ? 'flex flex-col justify-center' : 'grid grid-cols-2'} ${className}`}>
            <Link
                className="py-2 hover:text-d4slate"
                onClick={onClick}
                to={`/${slug_user}`}
            >
                {ac_strings.title_user}
            </Link>
            <button className="py-2 text-center hover:text-d4slate" onClick={handleLogout}>{ac_strings.logout}</button>

        </div>
    ) : (
            authInfo.loggedIn === "loading" ? (
                <div className="px-2">
                    {ac_strings.loading}
                </div>
            ) : (
                    <div className={`${col ? 'flex flex-col' : 'grid grid-cols-2'} ${className}`}>
                        <span className="whitespace-no-wrap px-2 py-1 text-center cursor-pointer hover:text-d4slate" onClick={handleSignIn}>{ac_strings.login}</span>
                        <span className="px-2 py-1 text-center cursor-pointer bg-d4slate-dark rounded mb-1 text-white hover:text-d4slate-lighter" onClick={handleSignUp}>{ac_strings.register}</span>
                    </div>

                )
        )
}

export default UserNav