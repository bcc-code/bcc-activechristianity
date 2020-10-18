import { Reducer } from 'redux'

interface TSignInModalStateAction {
    type: 'FLOAT_PLAYER' | 'FIX_PLAYER'
}

const mpPlayPause: Reducer<boolean, TSignInModalStateAction> = (state = false, action: TSignInModalStateAction) => {
    switch (action.type) {
        case 'FIX_PLAYER': {
            return false
        }
        case 'FLOAT_PLAYER': {
            return true
        }

        default:
            return state
    }
}

export default mpPlayPause;