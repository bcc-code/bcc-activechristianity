import * as React from 'react'
import { useDispatch } from "react-redux";
import { openSignInModal } from '@/state/action'
import { Seperator } from '@/layout-parts/SignInSignUp/Seperator'
import ac_strings from '@/strings/ac_strings.js'
import endpoints from '@/strings/static/endpoints'
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

const SigninSignUpModal: React.FC<{ type: 'signInOptions' | 'signUpOptions' }> = ({ type }) => {
    const [reDirecting, setRedirecting] = React.useState(false)
    const dispatch = useDispatch();
    const toggleOptions = () => {
        const next = type === 'signInOptions' ? 'signUpOptions' : 'signInOptions'
        dispatch(openSignInModal(next))
    }
    const text = formText[type]
    const handleClick = () => dispatch(openSignInModal(type === "signInOptions" ? "signInForm" : "signUpForm"))

    const handleFacebookClick = () => {
        setRedirecting(true)
        window.location.href = endpoints.facebook_login_redirect
    }
    return (
        <div className="flex flex-col items-center text-center overflow-scroll">
            <div className="flex flex-col justify-center bg-ac-primary py-12 px-4 rounded-lg text-white shadow w-full">
                <h5 className="font-semibold pb-2">{text.title}</h5>
                <span className="text-sm">{text.subTitle}</span>
            </div>
            <div className="flex flex-col justify-center py-4 w-full px-2">
                <span className="block uppercase text-xs pb-4">{text.action}</span>
                <button
                    className="rounded-lg text-white mt-4 px-2 py-4"
                    style={{ background: reDirecting ? "#8a8888" : "#3b5998" }}
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
                    className="text-blue-500 font-semibold px-2"
                    onClick={toggleOptions}
                    onKeyDown={toggleOptions}
                >
                    {text.optionButton}
                </button>
            </div>

            <div className="flex justify-center flex-col px-2 text-sm bg-ac-slate-dark text-white py-4">
                <div className="pb-4">
                    {/* <span className=" h-full font-semibold ">{ac_strings.terms_of_use} </span> */}
                    <span className="leading-normal font-normal font-sans pt-6" >
                        {ac_strings.copyright}
                    </span>
                </div>
                <a className="pb-4 underline" href={ac_strings.slug_privacy_policy} target="_blank">
                    <span className="h-full font-semibold">{ac_strings.consent_read_policy}</span>
                </a>


            </div>
        </div>
    )
}

export default SigninSignUpModal

