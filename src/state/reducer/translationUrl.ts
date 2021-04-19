import { Reducer } from 'redux'
import { Dispatch } from 'redux'
import { ADD_T_URLS_Payload } from '../types'
import { languages } from '@/strings/generated/menus.json'
import { ITranslations, INavItem } from '@/types'
import { showAllLanguages } from '@/helpers/normalizers'

export const homeUrls: INavItem[] = languages

interface TURLStateAction {
    dispatch: Dispatch
    payload: ADD_T_URLS_Payload
    type: 'ADD_T_URLS'
}

const defaultState = homeUrls

const translationLocation: Reducer<INavItem[], TURLStateAction> = (state = defaultState, action: TURLStateAction) => {
    switch (action.type) {
        case 'ADD_T_URLS': {
            let translated_items: INavItem[] = showAllLanguages(action.payload.translated)
            return translated_items
        }
        default:
            return state;
    }
}

export default translationLocation;
