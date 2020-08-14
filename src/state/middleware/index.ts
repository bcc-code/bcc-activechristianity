
import {
    Middleware,
} from 'redux'

import { IRootState } from '../types'

import { setIsModalOpen } from '@/state/action'

const middleware: Middleware<{}, IRootState> = (store) => (next) => (action) => {
    switch (action.type) {
        // only catch a specific action
        case 'OPEN_SIGNIN_MODAL':
            store.dispatch(setIsModalOpen(true))
            next(action)
            break
        case 'CLOSE_SIGNIN_MODAL':
            store.dispatch(setIsModalOpen(false))
            next(action)

            break
        default: next(action)
    }
}

export default middleware