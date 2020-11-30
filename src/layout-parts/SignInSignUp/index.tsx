import * as React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { closeSignInModal } from '@/state/action'
import Modal from '@/components/Modal/ModalNotControlled'
import Main from './Main'
import SignUpForm from './Signup'
import SignInForm from './Signin'
/* import ForgotPassword from '@/layout-parts/Form/ForgotPassword' */
import ForgotPassword from './ForgotPassword'
import GiveConsent from './GiveConsent'
import { IRootState } from '@/state/types'

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
            case 'giveConsent':
                return <GiveConsent />;
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
                </div>
            )}
            closeModal={handleClose}
        />
    )
}

export default SigninSignUpModal
