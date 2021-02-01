import { Reducer } from 'redux'
import { Dispatch } from 'redux'
import { ADD_T_URLS_Payload } from '../types'
import { languages } from '@/strings/generated/menus.json'
import { ITranslations, INavItem } from '@/types'
import { normalizeAvailableLanguages } from '@/helpers'

export const homeUrls: INavItem[] = languages.map((item) => ({
    name: item.title,
    to: item.url
}));

interface TURLStateAction {
    dispatch: Dispatch
    payload: ADD_T_URLS_Payload
    type: 'ADD_T_URLS'
}

const defaultState = homeUrls

const translationLocation: Reducer<INavItem[], TURLStateAction> = (state = defaultState, action: TURLStateAction) => {

    switch (action.type) {
        case 'ADD_T_URLS': {
            let translated_items: INavItem[] = normalizeAvailableLanguages(action.payload.translated, true)
            return translated_items
        }
        default:
            return state;
    }
}

export default translationLocation;
