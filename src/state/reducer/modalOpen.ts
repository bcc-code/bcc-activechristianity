import { Reducer } from 'redux';

interface TModalStateAction {
	payload: boolean;
	type: 'SET_IS_MODAL_OPEN';
}

const isModalOpen: Reducer<boolean, TModalStateAction> = (state = false, action: TModalStateAction) => {
	switch (action.type) {
		case 'SET_IS_MODAL_OPEN': {
			return action.payload;
		}

		default:
			return state;
	}
};

export default isModalOpen;
