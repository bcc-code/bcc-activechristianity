import React from 'react'
import './accordion.css'

export interface IAccordianItem {
    title: JSX.Element
    content: JSX.Element
    active: boolean
}

const Accordance: React.FC<IAccordianItem> = ({ title, content, active }) => {
    const contentEl = React.useRef<HTMLDivElement>(null);

    return (
        <div className="">
            <div>
                {title}
            </div>
            <div className={` slide-up slide-up-${active ? 'active' : 'close'}`} ref={contentEl} >
                {content}
            </div>
        </div>
    )

}

export default Accordance