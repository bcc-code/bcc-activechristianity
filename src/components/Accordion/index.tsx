import React from 'react'
import './accordion.css'

export interface IAccordianItem {
    title: JSX.Element;
    content: JSX.Element;
}

const Accordance: React.FC<IAccordianItem> = ({ title, content }) => {
    const contentEl = React.useRef<HTMLDivElement>(null);
    const [active, setActive] = React.useState(false)

    return (
        <div>
            <div
                className="flex w-full bg-d4gray-light hover:bg-gray-300 p-4"
                onClick={() => { setActive(!active) }}
                onKeyDown={() => { setActive(!active) }}

            >
                <div className="uppercase font-semibold px-4">
                    {active ? '-' : '+'}
                </div>
                <div className="uppercase font-semibold">
                    {title}
                </div>

            </div>
            <div className={`font-serif font-serif text-base sm:text-lg sm:leading-9 slide-up slide-up-${active ? 'active' : 'close'}`} ref={contentEl} >
                <div className="p-4 py-8 bg-gray-100">
                    {content}
                </div>

            </div>

        </div>
    )

}

export default Accordance