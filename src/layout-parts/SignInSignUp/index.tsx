import { IRootState } from '@/state/types';
import loadable from '@loadable/component';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const Modal = loadable(() => import('./Modal'));

const isSignInModalOpen = (state: IRootState) => ({ status: state.isSignInModalOpen });
const signInModalSelector = createSelector(isSignInModalOpen, ({ status }) => status);

const SigninSignUpModal: React.FC = () => {
	const isSignInModalOpen = useSelector(signInModalSelector);
	return isSignInModalOpen !== null ? <Modal option={isSignInModalOpen} isOpen={isSignInModalOpen !== null} /> : null;
};

export default SigninSignUpModal;
