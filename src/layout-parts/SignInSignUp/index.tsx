import * as React from 'react'
import loadable from '@loadable/component'
const Modal = loadable(() => import('./Modal'))
import { useSelector } from "react-redux";
import { IRootState } from '@/state/types'
import { createSelector } from 'reselect'
const isSignInModalOpen = (state: IRootState) => ({ status: state.isSignInModalOpen })
const signInModalSelector = createSelector(isSignInModalOpen, ({ status }) => status)

const SigninSignUpModal: React.FC = () => {
    const isSignInModalOpen = useSelector(signInModalSelector);
    return isSignInModalOpen !== null ? <Modal option={isSignInModalOpen} isOpen={isSignInModalOpen !== null} /> : null
}

export default SigninSignUpModal
