import { IUser } from '@/types';
import { Action } from 'redux';

interface ILogin {
	email: string;
	password: string;
	remember: boolean;
}

interface IRegister {
	email: string;
	password: string;
}
export type loggedIn = (payload: ILogin) => Action;
export type logIn = (payload: ILogin) => Action;

export const initiateLogIn: loggedIn = (payload: ILogin) => ({
	type: 'INITIATE_LOG_IN',
	payload
});

export const initiateRegister = (payload: IRegister) => ({
	type: 'INITIATE_REGISTER',
	payload
});

export const setUser = (payload: IUser) => ({
	type: 'SET_USER',
	payload
});

export const setNotLoggedIn = () => ({
	type: 'SET_NOT_LOGGED_IN'
});

export const setLogInError = (payload: string) => ({
	type: 'SET_LOG_IN_ERROR',
	payload
});

export const setRegisterError = (payload: string) => ({
	type: 'SET_REGISTER_ERROR',
	payload
});

export const initiateLogout = () => ({
	type: 'INITIATE_LOGOUT'
});

export const setLogout = () => ({
	type: 'SET_LOGOUT'
});

export const setLogoutError = (payload: string) => ({
	type: 'SET_LOGOUT_ERROR',
	payload
});

export const initiateConsentNotify = (payload: { receivedEmail: boolean; consent: boolean }) => ({
	type: 'INITIATE_CONSENT_NOTIFY',
	payload: payload
});
export const initiateConsent = (agree: boolean) => ({
	type: 'INITIATE_CONSENT',
	payload: agree
});
