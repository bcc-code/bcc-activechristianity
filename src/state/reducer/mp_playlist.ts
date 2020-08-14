import { Reducer } from 'redux'
import { IMedia } from '@/types'
interface TPlaylistStateAction {
    payload?: IMedia[]
    type: 'ADD_TRACKS' | 'REMOVE_TRACKS'
}

const defaultState: IMedia[] = []

const playlist: Reducer<IMedia[], TPlaylistStateAction> = (state = defaultState, action: TPlaylistStateAction) => {
    switch (action.type) {
        case 'ADD_TRACKS': {
            const { payload } = action
            return payload ? [...payload] : state
        }
        case 'REMOVE_TRACKS': {
            return defaultState
        }

        default:
            return state
    }
}

export default playlist