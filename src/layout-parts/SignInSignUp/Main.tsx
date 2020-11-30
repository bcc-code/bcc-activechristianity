import * as React from 'react'
import { useDispatch } from "react-redux";
import { openSignInModal } from '@/state/action'
import { Seperator } from '@/layout-parts/SignInSignUp/Seperator'
import ac_strings from '@/strings/ac_strings.js'
import endpoints from '@/endpoints'
const formText = {
    "signUpOptions": {
        "title": ac_strings.signup_options_title,
        "subTitle": ac_strings.signup_options_sub_title,
        "facebook": ac_strings.signup_options_facebook,
        "email": ac_strings.signup_options_email,
        "optionText": ac_strings.signup_options_option_text,
        "optionButton": ac_strings.signup_options_option_button,
        "disclaimer": ac_strings.consent_register,
        "action": ac_strings.signup_options_action
    },
    "signInOptions": {
        "title": ac_strings.signin_options_title,
        "subTitle": ac_strings.signin_options_sub_title,
        "facebook": ac_strings.signin_options_facebook,
        "email": ac_strings.signin_options_email,
        "optionText": ac_strings.signin_options_option_text,
        "optionButton": ac_strings.signin_options_option_button,
        "disclaimer": ac_strings.consent_register,
        "action": ac_strings.signin_options_action
    }
}

const SigninSignUpModal: React.FC<{ type: 'signInOptions' | 'signUpOptions' }> = ({ type }) => {
    const dispatch = useDispatch();
    const toggleOptions = () => {
        const next = type === 'signInOptions' ? 'signUpOptions' : 'signInOptions'
        dispatch(openSignInModal(next))
    }
    const text = formText[type]
    const handleClick = () => dispatch(openSignInModal(type === "signInOptions" ? "signInForm" : "signUpForm"))
    const handleFacebookClick = () => {
        window.location.href = endpoints.facebook_login_redirect
    }
    return (
        <div className="flex flex-col items-center text-center">
            <div className="flex flex-col justify-center bg-d4primary py-12 px-4 rounded-lg text-white shadow w-full">
                <h5 className="font-semibold pb-2">{text.title}</h5>
                <span className="text-sm">{text.subTitle}</span>
            </div>
            <div className="flex flex-col justify-center py-4 w-full px-2">
                <span className="block uppercase text-xs pb-4">{text.action}</span>
                <button
                    className="rounded-lg text-white mt-4 px-2 py-4"
                    style={{ background: "#3b5998" }}
                    onClick={handleFacebookClick}
                    onKeyDown={handleFacebookClick}
                >
                    {text.facebook}
                </button>
                <Seperator />
                <button
                    className="bg-blue-500 rounded-lg text-white mb-4 px-2 py-4"
                    onClick={handleClick}
                    onKeyDown={handleClick}
                >
                    {text.email}
                </button>
            </div>
            <div className="text-sm text-gray-500 leading-normal">
                {text.disclaimer}
            </div>
            <div className="text-sm py-4 ">
                <span>{text.optionText}</span>
                <button
                    className="text-blue-500 font-semibold"
                    onClick={toggleOptions}
                    onKeyDown={toggleOptions}
                >
                    {text.optionButton}
                </button>
            </div>

            <div className="flex justify-center flex-col px-2 text-sm bg-d4slate-dark text-white py-4">

                <a className="pb-4" href={ac_strings.slug_privacy_policy} target="_blank">
                    <span className="h-full font-semibold">Read {ac_strings.consent_privacy_policy}</span><a href={ac_strings.slug_privacy_policy}> </a>
                </a>
                <div className="pb-4">
                    {/* <span className=" h-full font-semibold ">{ac_strings.terms_of_use} </span> */}
                    <span className="leading-normal font-normal font-sans pt-6" >
                        {ac_strings.copyright}
                    </span>
                </div>

            </div>
        </div>
    )
}

export default SigninSignUpModal

