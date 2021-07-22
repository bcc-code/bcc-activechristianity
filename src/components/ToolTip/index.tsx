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
    const ToolTipEl = React.useRef<HTMLInputElement>(null);
    const closeOnClick = (e: any) => {
        if (ToolTipEl && ToolTipEl.current && !ToolTipEl.current.contains(e.target)) {
            setShowPopper(false)
            document.removeEventListener('click', closeOnClick);
        }



    }
    const handleShowPopper = (e: any) => {
        e.preventDefault()
        setShowPopper(true)
        document.addEventListener('click', closeOnClick);
    }
    return (
        <div ref={ToolTipEl} className="flex justify-center items-center">
            <div onClick={handleShowPopper} onKeyDown={handleShowPopper} ref={setReferenceElement}>
                {children}
            </div>

            {showPopper && (
                <div
                    className="bg-ac-slate-dark text-white rounded-lg px-2 mx-2"
                    ref={setPopperElement}
                    style={styles.popper} {...attributes.popper}

                >
                    <div className="flex" ref={PopperEl} style={placement === "right" ? { left: "-20px" } : { top: "-20px" }}>

                        {popperContent}
                    </div>
                    {/*          <div className="ac-popper" ref={setArrowElement} style={{ ...styles.arrow, bottom: "-5px" }} /> */}

                </div>
            )}
        </div>
    );
};

export default ShareIconPopper