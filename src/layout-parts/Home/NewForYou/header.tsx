import * as React from 'react'
import Link from '@/components/CustomLink'
export default () => {
    return (
        <div className="flex flex-row items-center justify-between pb-4">
            <h6 className="text-d4slate-dark text-lg font-bold">New for you</h6>
            <div className="text-xs">
                <Link className="text-d4secondary" to="/">Customise</Link>
                <span className="text-d4slate-light mx-1">|</span>
                <Link className="text-d4secondary" to="/" >See All</Link>
            </div>
        </div>
    )
}