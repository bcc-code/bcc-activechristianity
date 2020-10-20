
import { Middleware } from 'redux'

import { setUser, setLogInError, setRegisterError, setLogout, setLogoutError } from '@/state/action/authAction'
import { closeSignInModal } from '@/state/action'
import { IRootState } from '@/state/types'
/* import { IProfileRes } from '@/types/apiResType' */

import acApi from '@/util/api'

const apiMiddleware: Middleware<void, IRootState> = (store) => (next) => (action) => {
    switch (action.type) {
        // only catch a specific action
        case 'INITIATE_LOG_IN':
            // continue propagating the action through redux
            // this is our only call to next in this middleware
            next(action)
            const { email: login_email, password: login_password, remember } = action.payload
            // fetch data from an API that may take a while to respond
            acApi.login(login_email, login_password, remember)
                .then((res: any) => {
                    if (res) {
                        console.log(res)
                        store.dispatch(setUser(res))
                        store.dispatch(closeSignInModal())
                    } else {
                        throw new Error("Unknown error (possible wrong username or password)")
                    }

                })
                .catch((err: any) => {
                    const message = err[0] || err.message
                    store.dispatch(setLogout())
                    store.dispatch(setLogInError(message))
                })

            break
        case 'INITIATE_REGISTER':

            next(action)

            const { email: register_email, password: register_password, remember: register_remember } = action.payload
            /* const reguster_data = { register_fullname, register_email, register_password, register_remember } */
            acApi
                .register(register_email, register_password, register_remember)
                .then((res: any) => {
                    store.dispatch(setUser(res))
                    store.dispatch(closeSignInModal())
                })
                .catch((err: any) => {
                    const message = err[0] || err.message
                    store.dispatch(setLogout())
                    store.dispatch(setLogInError(message))
                })
            break
        case 'INITIATE_LOGOUT':
            acApi
                .logout()
                .then(() => {
                    store.dispatch(setLogout())
                })
                .catch((err: any) => {
                    console.log(err)
                    store.dispatch(setLogoutError(err.message))
                })
            break
        // if we don't need to handle this action, we still need to pass it along


        default: next(action)
    }
}

export default apiMiddleware