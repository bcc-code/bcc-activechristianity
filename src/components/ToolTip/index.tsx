import React from 'react';
import './tooltip.css'

const Tooltip: React.FC<{ tooltip: string | JSX.Element }> = ({ tooltip, children }) => {
    const [isShowing, setIsShowing] = React.useState(false)
    return (
        <span className="ac-glossary-link">
            <span className="glossary-tooltip">
                <span className="glossary-link" onClick={() => { setIsShowing(true) }}>
                    {children}
                </span>
                <span className={`${isShowing ? '' : 'hidden'} glossary-tooltip-content clearfix w-64 sm:w-mobile px-8 py-4`} >
                    <span>{tooltip}
                    </span>
                </span>
            </span>
        </span>

    )
};

export default Tooltip;