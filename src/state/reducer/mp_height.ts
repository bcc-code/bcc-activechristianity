import { Reducer } from 'redux';

interface IMPHEIGHT {
	payload: number;
	type: 'SET_MP_HEIGHT';
}

const mpHeight: Reducer<number, IMPHEIGHT> = (state = 0, action: IMPHEIGHT) => {
	switch (action.type) {
		case 'SET_MP_HEIGHT': {
			return action.payload;
		}

		default:
			return state;
	}
};

export default mpHeight;
