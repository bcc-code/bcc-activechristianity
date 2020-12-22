import * as React from 'react'

import { usePopper } from 'react-popper';


import './popper.css'

interface IProps {

    popperContent: JSX.Element
    placement?: 'top' | 'right'
}


const ShareIconPopper: React.FC<IProps> = ({ popperContent, children, placement }) => {

    const [referenceElement, setReferenceElement] = React.useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(null);
    const [showPopper, setShowPopper] = React.useState(false)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: placement ? placement : 'top',
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });
    const PopperEl = React.useRef<HTMLDivElement>(null);

    const closeOnClick = (e: any) => {
        /*      if (PopperEl && PopperEl.current && !PopperEl.current.contains(e.target)) {
                 
             }
      */
        setShowPopper(false)
        document.removeEventListener('click', closeOnClick);

    }
    const handleShowPopper = (e: any) => {
        e.preventDefault()
        setShowPopper(!showPopper)
        document.addEventListener('click', closeOnClick);
    }

    return (
        <>
            <button onClick={handleShowPopper} onKeyDown={handleShowPopper} type="button" ref={setReferenceElement}>
                {children}
            </button>

            {showPopper && (
                <div
                    className="bg-ac-slate-dark text-white rounded-lg px-2 mx-2"
                    ref={setPopperElement}
                    style={styles.popper} {...attributes.popper}

                >
                    <div className="flex" ref={PopperEl}>
                        {popperContent}
                    </div>
                    {/*          <div className="ac-popper" ref={setArrowElement} style={{ ...styles.arrow, bottom: "-5px" }} /> */}

                </div>
            )}
        </>
    );
};

export default ShareIconPopper