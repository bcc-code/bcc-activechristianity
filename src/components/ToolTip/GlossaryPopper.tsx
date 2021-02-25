import * as React from 'react'
import ac_strings from '@/strings/ac_strings.js'
import { usePopper } from 'react-popper';

import './popper.css'

interface IProps {
    text?: string
    slug?: string
}


const ShareIconPopper: React.FC<IProps> = ({ text, slug }) => {

    const [referenceElement, setReferenceElement] = React.useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(null);

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'top',
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });

    return (
        <>
            <button type="button" ref={setReferenceElement} style={{ height: 0 }}>
            </button>

            <div
                className="bg-ac-slate-dark text-sm text-white rounded-lg px-2 leading-normal font-normal font-sans max-w-64 py-6"
                ref={setPopperElement}
                style={styles.popper} {...attributes.popper}

            >
                <div>
                    {text}...
                    <a className="text-ac-secondary" target="_blank" href={`/${ac_strings.slug_glossary}/${slug}`}> {ac_strings.read_more} </a>
                </div>
                <div className="ac-popper" ref={setArrowElement} style={{ ...styles.arrow, bottom: `-5px` }} />
            </div>
        </>
    );
};

export default ShareIconPopper