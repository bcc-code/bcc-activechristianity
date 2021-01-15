import * as React from 'react'
import loadable from '@loadable/component'
const Modal = loadable(() => import('./Modal'))
import { useSelector } from "react-redux";
import { IRootState } from '@/state/types'

const SigninSignUpModal: React.FC = () => {
    const { isSignInModalOpen } = useSelector((state: IRootState) => ({
        isSignInModalOpen: state.isSignInModalOpen,
    }));
    return isSignInModalOpen !== null ? <Modal option={isSignInModalOpen} /> : null
}

export default SigninSignUpModal
