import { IUserState } from '../types';

interface authAction {
	type:
		| 'INITIATE_LOG_IN'
		| 'INITIATE_REGISTER'
		| 'SET_USER'
		| 'SET_LOG_IN_ERROR'
		| 'SET_REGISTER_ERROR'
		| 'INITIATE_LOGOUT'
		| 'SET_LOGOUT'
		| 'SET_LOGOUT_ERROR';
	payload: any;
}

const localStorageKey = 'ac.loggedIn';

const initialState: IUserState = {
	loggedIn: 'loading'
};

const auth = (state: IUserState = initialState, action: authAction) => {
	switch (action.type) {
		case 'INITIATE_LOG_IN': {
			return {
				...state,
				loggedIn: 'loading'
			};
		}
		case 'INITIATE_REGISTER': {
			return {
				...state,
				loggedIn: 'loading'
			};
		}

		case 'INITIATE_LOGOUT': {
			return {
				...state,
				loggedIn: 'loading'
			};
		}

		case 'SET_USER': {
			localStorage.setItem(localStorageKey, 'true');
			return {
				...state,
				user: action.payload,
				loggedIn: 'success'
			};
		}

		case 'SET_LOGOUT': {
			localStorage.removeItem(localStorageKey);
			return {
				loggedIn: 'notLoggedIn'
			};
		}

		case 'SET_LOGOUT_ERROR': {
			return {
				...state,
				errorMessage: action.payload
			};
		}

		case 'SET_LOG_IN_ERROR': {
			return {
				...state,
				errorMessage: action.payload
			};
		}

		case 'SET_REGISTER_ERROR': {
			return {
				...state,
				errorMessage: action.payload
			};
		}

		default:
			return state;
	}
};

export default auth;
