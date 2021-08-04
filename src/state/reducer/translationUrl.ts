import { showAllLanguages } from '@/helpers/normalizers';
import menus from '@/strings/generated/menus.json';
import { INavItem } from '@/types';
import { Reducer } from 'redux';
import { Dispatch } from 'redux';

import { ADD_T_URLS_Payload } from '../types';

const { languages } = menus;

export const homeUrls: INavItem[] = languages;

interface TURLStateAction {
	dispatch: Dispatch;
	payload: ADD_T_URLS_Payload;
	type: 'ADD_T_URLS';
}

const defaultState = homeUrls;

const translationLocation: Reducer<INavItem[], TURLStateAction> = (state = defaultState, action: TURLStateAction) => {
	switch (action.type) {
		case 'ADD_T_URLS': {
			const translated_items: INavItem[] = showAllLanguages(action.payload.translated);
			return translated_items;
		}
		default:
			return state;
	}
};

export default translationLocation;
