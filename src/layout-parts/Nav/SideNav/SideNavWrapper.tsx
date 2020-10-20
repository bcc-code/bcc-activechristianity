import * as React from 'react';
import Icon from '@/components/Icons/Icon'


export interface ISideMobile {
    isSideNavOpen: boolean
    back?: () => void
    close?: () => void,
    title?: string
    children: React.ReactNode
    className?: string
}
const SideMobile: React.FC<ISideMobile> = ({ isSideNavOpen, close, back, title, children, className }) => {
    return (
        <div
            className={`drawer-side ${isSideNavOpen ? 'drawer-side-open' : 'drawer-side-close'} drawer-side-submenu bg-d4slate-lighter w-full h-full flex flex-col justify-between xs:w-mobile xs:left-auto xs:shadow overflow-y-scroll fixed top-0 right-0 bottom-0 z-50 `}
        >
            <div className="min-h-12 h-12 w-full border-b border-d4slate-light p-4">
                {back && (
                    <button className="absolute left-0 top-0 p-3" onClick={back} onKeyDown={back}>
                        <Icon name="KeyboardArrowLeft" size="6" color="slate-dark" />
                    </button>
                )}
                {title && <div className="flex justify-center w-full font-roboto font-semibold">{title}</div>}
                {close && <div className="absolute right-0 top-0 p-3" onClick={close} onKeyDown={close}>
                    <Icon name="Close" size="6" color="slate-light" />
                </div>}
            </div>
            <div className={`flex-1 ${className ? className : ''}`}>
                {children}
            </div>
        </div >
    )
}

export default React.memo(SideMobile)
