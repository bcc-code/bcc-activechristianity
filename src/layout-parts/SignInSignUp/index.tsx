import * as React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { closeSignInModal } from '@/state/action'
import Modal from '@/components/Modal/ModalNotControlled'
import Main from './Main'
import SignUpForm from '@/layout-parts/Form/Signup'
import SignInForm from '@/layout-parts/Form/Signin'
/* import ForgotPassword from '@/layout-parts/Form/ForgotPassword' */
import ForgotPassword from '@/layout-parts/Form/ForgotPassword'
import { IRootState } from '@/state/types'
import TS from '@/strings'
const SigninSignUpModal: React.FC = () => {
    const dispatch = useDispatch();

    const { isSignInModalOpen } = useSelector((state: IRootState) => ({
        isSignInModalOpen: state.isSignInModalOpen,
    }));

    const getContent = () => {
        switch (isSignInModalOpen) {
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
            default:
                return <Main type='signUpOptions' />
        }
    }

    const showingContent = getContent()

    const handleClose = () => {
        dispatch(closeSignInModal())
    }

    return (
        <Modal
            isOpen={isSignInModalOpen !== null}
            content={(
                <div>
                    {showingContent}
                    <div className="flex justify-center">
                        <button className="p-4">{TS.consent_privacy_policy}</button>
                        <div className="p-4">Terms of use</div>
                    </div>
                </div>
            )}
            closeModal={handleClose}
        />
    )
}

export default SigninSignUpModal
