import { Reducer } from 'redux'
import { ISignInModalContentType } from '../types'
interface TSignInModalStateAction {
    type: 'OPEN_SIGNIN_MODAL' | 'CLOSE_SIGNIN_MODAL'
    payload: ISignInModalContentType
}

const isModalOpen: Reducer<ISignInModalContentType, TSignInModalStateAction> = (state = null, action: TSignInModalStateAction) => {
    switch (action.type) {
        case 'CLOSE_SIGNIN_MODAL': {
            return null
        }
        case 'OPEN_SIGNIN_MODAL': {
            return action.payload
        }

        default:
            return state
    }
}

export default isModalOpen;