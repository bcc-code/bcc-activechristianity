import { Reducer } from 'redux'

import { IInfobar } from '@/types'
interface TInfobarStateAction {
    type: 'OPEN_INFO_BAR' | 'CLOSE_INFO_BAR'
    payload: IInfobar
}

const InfoBar: Reducer<IInfobar | null, TInfobarStateAction> = (state = null, action: TInfobarStateAction) => {
    switch (action.type) {

        case 'OPEN_INFO_BAR': {
            return action.payload
        }
        case 'CLOSE_INFO_BAR': {
            return null
        }

        default:
            return state
    }
}

export default InfoBar;