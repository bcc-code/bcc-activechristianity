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
        <div className={`${col ? 'flex flex-col' : 'grid grid-cols-2'} ${className}`}>
            <Link
                className="p-2 uppdercase text-small"
                onClick={onClick}
                to={`/${ac_strings.slug_user}`}
            >
                {TS.account}
            </Link>
            <button className="py-2" onClick={handleLogout}>{TS.logout}</button>

        </div>
    ) : (
            authInfo.loggedIn === "loading" ? (
                <div className="px-2">
                    {ac_strings.loading}
                </div>
            ) : (
                    <div className={`${col ? 'flex flex-col' : 'grid grid-cols-2'} ${className}`}>
                        <button className="whitespace-no-wrap p-2" onClick={handleSignIn}>{TS.login}</button>
                        <button className="p-2" onClick={handleSignUp}>{TS.register}</button>
                    </div>

                )
        )
}

export default UserNav