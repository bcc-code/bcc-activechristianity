import { IBreadcrumb } from '@/types';
import { Reducer } from 'redux';

interface UpdateBreadcrumbAction {
	type: 'UPDATE_BREADCRUMB';
	payload: IBreadcrumb;
}

const updateBreadcrumb: Reducer<IBreadcrumb, UpdateBreadcrumbAction> = (
	state = {
		items: [],
		title: ''
	},
	action: UpdateBreadcrumbAction
) => {
	switch (action.type) {
		case 'UPDATE_BREADCRUMB': {
			return action.payload;
		}

		default:
			return state;
	}
};

export default updateBreadcrumb;
