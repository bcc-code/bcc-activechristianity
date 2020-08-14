import * as React from 'react'
import { useDispatch } from "react-redux";
import { openSignInModal } from '@/state/action'
import formText from '@/strings/signupForm.json'
import { Seperator } from '@/layout-parts/SignInSignUp/Seperator'
import newStrings from '@/strings/NewStrings.json'
const SigninSignUpModal: React.FC<{ type: 'signInOptions' | 'signUpOptions' }> = ({ type }) => {
    const dispatch = useDispatch();
    const toggleOptions = () => {
        const next = type === 'signInOptions' ? 'signUpOptions' : 'signInOptions'
        dispatch(openSignInModal(next))
    }
    const text = formText[type]
    const handleClick = () => dispatch(openSignInModal(type === "signInOptions" ? "signInForm" : "signUpForm"))
    return (
        <div className="flex flex-col items-center text-center">
            <div className="flex flex-col justify-center bg-d4primary py-12 px-4 rounded-lg text-white shadow w-full">
                <h5 className="font-semibold pb-2">{text.title}</h5>
                <span className="text-sm">{text.subTitle}</span>
            </div>
            <div className="flex flex-col justify-center py-4 w-full px-2">
                <span className="block uppercase text-xs pb-4">{text.action}</span>
                <button className="rounded-lg text-white mt-4 px-2 py-4" style={{ background: "#3b5998" }}>
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
            <div className="text-sm">
                <span>{text.optionText}</span>
                <button
                    className="text-blue-500 font-semibold"
                    onClick={toggleOptions}
                    onKeyDown={toggleOptions}
                >
                    {text.optionButton}
                </button>
            </div>
            <div className="text-xs text-gray-400 py-4">
                {text.disclaimer}
            </div>
        </div>
    )
}

export default SigninSignUpModal

