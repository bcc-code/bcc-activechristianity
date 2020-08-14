import { Reducer, Dispatch } from 'redux'

interface TIsPlayingStateAction {
    dispatch: Dispatch
    payload: boolean
    type: 'SET_IS_PLAYING'
}

const defaultState = false

const autoPlay: Reducer<boolean, TIsPlayingStateAction> = (state = defaultState, action: TIsPlayingStateAction) => {
    switch (action.type) {
        case 'SET_IS_PLAYING': {

            const { payload } = action
            return payload
        }

        default:
            return state
    }
}

export default autoPlay