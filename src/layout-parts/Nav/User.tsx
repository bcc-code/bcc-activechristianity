import * as React from 'react'
import Link from '@/components/CustomLink'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '@/state/types'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
import { openSignInModal } from '@/state/action'

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
                className="py-2"
                onClick={onClick}
                to={`/${ac_strings.slug_user}`}
            >
                {ac_strings.title_user}
            </Link>
            <span className="py-2 text-center" onClick={handleLogout}>{TS.logout}</span>

        </div>
    ) : (
            authInfo.loggedIn === "loading" ? (
                <div className="px-2">
                    {ac_strings.loading}
                </div>
            ) : (
                    <div className={`${col ? 'flex flex-col' : 'grid grid-cols-2'} ${className}`}>
                        <span className="whitespace-no-wrap p-2 text-center cursor-pointer hover:text-d4slate-dark" onClick={handleSignIn}>{TS.login}</span>
                        <span className="p-2 text-center cursor-pointer bg-d4slate-dark rounded mb-1 text-white" onClick={handleSignUp}>{TS.register}</span>
                    </div>

                )
        )
}

export default UserNav