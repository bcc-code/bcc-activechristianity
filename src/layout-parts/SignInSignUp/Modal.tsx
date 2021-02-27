import * as React from 'react'
import { useDispatch } from "react-redux";
import { closeSignInModal } from '@/state/action'
import CloseButtonRound from '@/components/Button/CloseButtonRound'
import Main from './Main'
import SignUpForm from './Signup'
import SignInForm from './Signin'
/* import ForgotPassword from '@/layout-parts/Form/ForgotPassword' */
import ForgotPassword from './ForgotPassword'
import GiveConsent from './GiveConsent'
import { IRootState } from '@/state/types'

const GetContent: React.FC<{ option: string }> = ({ option }) => {

    switch (option) {
        case 'signUpOptions':
            return <Main type='signUpOptions' />
        case 'signInOptions':
            return <Main type='signInOptions' />

        case 'signUpForm':
            return <SignUpForm />
        case 'signInForm':
            return <SignInForm />
        case 'forgotPassword':
            return <ForgotPassword />
        case 'giveConsent':
            return <GiveConsent />;
        default:
            return <Main type='signUpOptions' />
    }
}
const SigninSignUpModal: React.FC<{ option: string }> = ({ option }) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeSignInModal())
    }
    return (
        <div className="fixed inset-0 h-screen w-screen p-2 flex justify-center items-center overflow-scroll" style={{ backgroundColor: `rgba(255, 255, 255, 0.8`, zIndex: 700 }}>

            <div
                className="relative flex flex-col bg-white text-grey-500 rounded-lg shadow-md w-5/6 sm:w-3/4 md:w-mobile max-h-full overflow-hidden"
            >
                <CloseButtonRound
                    className="absolute top-0 right-0 z-10 p-2"
                    onClick={handleClose}
                />
                <GetContent option={option} />
            </div>
        </div>
    )
}

export default SigninSignUpModal
