import { Reducer, Dispatch } from 'redux'
import { IMedia } from '../../types'

interface TCurrentTrackStateAction {
    dispatch: Dispatch
    payload: IMedia
    type: 'SET_CURRENT_MEDIA'
}

const defaultState: IMedia = {
    path: ''
}

const currentMedia: Reducer<IMedia, TCurrentTrackStateAction> = (state = defaultState, action: TCurrentTrackStateAction) => {
    switch (action.type) {
        case 'SET_CURRENT_MEDIA': {
            const { payload } = action
            return payload
        }

        default:
            return state
    }
}

export default currentMedia