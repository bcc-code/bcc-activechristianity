import { Middleware } from 'redux';

import { IRootState } from '../types';

const middleware: Middleware<{}, IRootState> = store => next => action => {
	switch (action.type) {
		default:
			next(action);
	}
};

export default middleware;
