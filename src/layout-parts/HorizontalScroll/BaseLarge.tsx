import React from 'react'
import './horizontal-scroll.css';


interface IXScrollItem {
    items: JSX.Element[]
}
const FeatureSection: React.FC<IXScrollItem> = ({ items }) => {
    return (
        <div className="scroll-snap-x-container overflow-scroll mb-4 sm:hidden w-full">
            {items.map((c, i) => {

                return (
                    <div className="scroll-snap-x-child ml-4" style={{ width: "88%", minWidth: "88%" }}>
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