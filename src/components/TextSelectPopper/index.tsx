import * as React from 'react'

function isSelectionForward(selection: Selection) {
    let forward = false
    if (selection.isCollapsed) return true;
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;
    const anchorOffset = selection.anchorOffset;
    const focusOffset = selection.focusOffset;
    if (anchorNode && focusNode) {
        const comparedPositions = anchorNode.compareDocumentPosition(focusNode);
        if (comparedPositions === anchorNode.DOCUMENT_POSITION_FOLLOWING) {
            forward = true;
        } else if (comparedPositions === 0) {
            forward = (focusOffset - anchorOffset) > 0;
        }


        let selectionStart = forward ? anchorOffset : focusOffset;
        if (forward) {
            if (anchorNode.parentNode) {
                console.log(anchorNode.parentNode)
            }
        } else {
            console.log(anchorNode.parentNode)
        }
        /*         if (forward) {
                    if (anchorNode.parentNode.getAttribute('data-order')
                        && anchorNode.parentNode.getAttribute('data-order') === 'middle') {
                        selectionStart += this.state.selectionStart;
                    }
                    if (anchorNode.parentNode.getAttribute('data-order')
                        && anchorNode.parentNode.getAttribute('data-order') === 'last') {
                        selectionStart += this.state.selectionEnd;
                    }
                } else {
                    if (focusNode.parentNode.getAttribute('data-order')
                        && focusNode.parentNode.getAttribute('data-order') === 'middle') {
                        selectionStart += this.state.selectionStart;
                    }
                    if (focusNode.parentNode.getAttribute('data-order')
                        && focusNode.parentNode.getAttribute('data-order') === 'last') {
                        selectionStart += this.state.selectionEnd;
                    }
                } */


    }
}

/* export function getSelectionPosition(selection: Selection) {
    const isForward = isSelectionForward(selection)
} */
const TextSelectPopper: React.FC<{ className?: string }> = ({ children, className }) => {
    const handleMouseUp = (e: any) => {
        /* e.preventDefault(); */
        const selectionObj = (window.getSelection && window.getSelection());
        if (selectionObj) {

            const isForward = isSelectionForward(selectionObj)
        }
    }

    return (
        <article onMouseUp={handleMouseUp} className={className ? className : ''}>
            {children}
        </article>
    )
}

export default TextSelectPopper