import { Reducer } from 'redux'
import { INavItem } from '@/types'

interface UpdateBreadcrumbAction {
    type: 'UPDATE_BREADCRUMB',
    payload: INavItem[]
}


const updateBreadcrumb: Reducer<INavItem[], UpdateBreadcrumbAction> = (state = [], action: UpdateBreadcrumbAction) => {

    switch (action.type) {
        case 'UPDATE_BREADCRUMB': {
            return action.payload
        }

        default:
            return state
    }
}

export default updateBreadcrumb;