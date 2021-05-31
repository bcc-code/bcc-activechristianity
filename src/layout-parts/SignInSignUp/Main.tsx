import * as React from 'react'
import { useDispatch } from "react-redux";
import { openSignInModal, closeSignInModal } from '@/state/action'
import { getUserLibrary } from '@/state/action/userAction'
import { IUser } from '@/types'
import { setLogout, setUser, } from '@/state/action/authAction'
import { Seperator } from '@/layout-parts/SignInSignUp/Seperator'
import ac_strings from '@/strings/ac_strings.js'
import checkUser from '@/state/reducer/checkUser'
import NewLoginForm from './NewLoginForm'
import NewRegisterForm from './NewRegisterForm'
import endpoints from '@/strings/static/endpoints'

import './loginStyle.css'
const acApiModule = import('@/util/api')
const formText = {
    "signUpOptions": {
        "title": ac_strings.signup_title,
        "subTitle": ac_strings.signup_sub_title,
        "facebook": ac_strings.signup_facebook,
        "email": ac_strings.signup_email,
        "optionText": ac_strings.signup_option_text,
        "optionButton": ac_strings.signup_option_button,
        "disclaimer": ac_strings.consent_register,
        "action": ac_strings.signup_action
    },
    "signInOptions": {
        "title": ac_strings.signin_title,
        "subTitle": ac_strings.signin_sub_title,
        "facebook": ac_strings.signin_facebook,
        "email": ac_strings.signin_email,
        "optionText": ac_strings.signin_option_text,
        "optionButton": ac_strings.signin_option_button,
        "disclaimer": ac_strings.consent_register,
        "action": ac_strings.signin_action
    }
}

export const socialLoginlocalStorageKey = 'ac.signin.socialLogin'

const SigninSignUpModal: React.FC<{ option: 'signInOptions' | 'signUpOptions' }> = (props) => {

    const { option } = props

    const [reDirecting, setRedirecting] = React.useState(false)
    const dispatch = useDispatch();

    React.useEffect(() => {
        checkUser(dispatch)

    }, [])




    const handleTabClick = (current: 'signUpOptions' | 'signInOptions') => {
        if (option !== current) {
            dispatch(openSignInModal(current))
        }

    }

    const handleRedirect = (platform: string) => {
        localStorage.setItem(localStorageKey, "true")
        setRedirecting(true)
        window.location.href = endpoints[`${platform}_login_redirect`]
    }

    const tabs = [
        {
            text: ac_strings.login,
            option: "signInOptions"
        },
        {
            text: ac_strings.register,
            option: "signUpOptions"
        },
    ]
    return (
        <div className="flex flex-col items-center text-center overflow-scroll relative form-wrapper">
            <div className="flex flex-col justify-center bg-ac-primary pt-8 px-4 rounded-t-lg text-white shadow w-full">
                {/*                 <div className="flex justify-center pb-4">
                    <Logo customColor="#fff" height={36} width={36} />
                </div> */}
                <div className="flex">
                    {tabs.map(item => (
                        <button
                            className={`w-1/2 py-2 ${option == item.option ? ' font-semibold text-lg' : ''}`}
                            onClick={() => { handleTabClick(item.option) }}
                        >
                            {item.text}
                        </button>
                    ))}
                </div>
            </div>
            <>
                <div className="relative pt-6">
                    {['facebook', 'google'].map(platform => {
                        return (
                            <button key={platform} className={`social-button social-button-${platform}`} type="button" onClick={() => handleRedirect(platform)}>
                                <div className={`social-button-icon social-button-icon-${platform}`}></div>
                                <div className="social-button-text">Sign in with {platform}</div>
                            </button>
                        )
                    })}
                </div>
                <div className="flex flex-col justify-center py-2 w-full px-2">
                    <Seperator />
                </div>
            </>
            {option === "signInOptions" && <NewLoginForm key="signIn" />}
            {option === "signUpOptions" && <NewRegisterForm key="signUp" />}
        </div>
    )
}

export default SigninSignUpModal

