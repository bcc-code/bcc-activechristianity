import { Reducer, Dispatch } from 'redux';

interface TIsAutoPlayStateAction {
	dispatch: Dispatch;
	payload: boolean;
	type: 'SET_IS_AUTOPLAY';
}

const defaultState = false;

const autoPlay: Reducer<boolean, TIsAutoPlayStateAction> = (state = defaultState, action: TIsAutoPlayStateAction) => {
	switch (action.type) {
		case 'SET_IS_AUTOPLAY': {
			const { payload } = action;
			return payload;
		}

		default:
			return state;
	}
};

export default autoPlay;
