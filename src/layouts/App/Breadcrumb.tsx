import * as React from 'react'
import { useSelector } from "react-redux"
import { IRootState } from '@/state/types'
import Breadcrumb from '@/components/Breadcrumb'

const BreadcrumbWrapper = () => {
    const { breadcrumb } = useSelector((state: IRootState) => ({
        breadcrumb: state.breadcrumb,
    }));
    return breadcrumb.items.length > 0 ? (
        <div className="fixed sm:relative z-50 w-full bg-white px-4 block standard-max-w i">
            <Breadcrumb {...breadcrumb} />
        </div>
    ) : null
}

export default BreadcrumbWrapper