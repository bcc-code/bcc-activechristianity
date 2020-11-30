import React from 'react'
import './horizontal-scroll.css';
import shortid from 'shortid'

interface IXScrollItem {
    items: JSX.Element[]
    childeClassName: string
}
const FeatureSection: React.FC<IXScrollItem> = ({ items, childeClassName }) => {
    return (
        <div className="scroll-snap-x-container scroll-snap-x-container-start overflow-scroll mb-4 sm:hidden w-full" key={shortid()}>
            {items.map((c, i) => {

                return (
                    <div className={`scroll-snap-x-child-start ml-4 ${childeClassName}`}>
                        {c}
                    </div>
                )

            })}
            <div className="min-w-4">

            </div>
        </div>

    )
}

export default FeatureSection