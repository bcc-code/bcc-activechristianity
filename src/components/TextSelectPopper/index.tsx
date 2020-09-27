import * as React from 'react'
import ShareIconPopper from '@/components/ToolTip/ShareIcons'

interface IPosition { top: number, right?: number, left?: number };
const TextSelectPopper: React.FC<{ className?: string, slug: string, title: string }> = ({ children, className, slug, title }) => {
    const [position, setPosition] = React.useState<IPosition>({ top: 0 })

    const [showPopper, setShowPopper] = React.useState(false)
    const [shareText, setShareText] = React.useState('')
    const contentEl = React.useRef<HTMLDivElement>(null);
    const popperEl = React.useRef<HTMLDivElement>(null);

    const options = { shareUrl: process.env.SITE_URL + '/' + slug }

    const closeOnClick = (e: any) => {

        if (contentEl && contentEl.current && !contentEl.current.contains(e.target)) {
            setShowPopper(false)
            document.removeEventListener('click', closeOnClick);
        }
    }

    const handleMouseUp = (e: any) => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            if (navigator.share) {
                navigator.share({
                    title,
                    url: options.shareUrl,
                    text: shareText
                }).then(() => {
                    console.log('Thanks for sharing!');
                })
                    .catch(console.error);
            } else {
                e.preventDefault();
                handleSelectedText(e)
            }
        } else {
            // false for not mobile device
            e.preventDefault();
            handleSelectedText(e)
        }



    }

    const handleSelectedText = (e: any) => {
        const selectionObj = (window.getSelection && window.getSelection());
        console.log(selectionObj)
        if (selectionObj && selectionObj.anchorOffset !== selectionObj.focusOffset) {

            const selectionInfo = getSelectionTextAndPosition(selectionObj)
            if (selectionInfo) {
                if (contentEl && contentEl.current) {
                    const contentDivPosition = contentEl.current.getBoundingClientRect()
                    const { position, isForward, shareText } = selectionInfo

                    const toSetPostion: IPosition = {
                        top: position.top - contentDivPosition.top,
                    }

                    if (position.top < 105) {
                        /* toSetPostion.top =  */
                        console.log(position.bottom - position.top)
                        toSetPostion.top = toSetPostion.top + (position.bottom - position.top)
                    } else {
                        toSetPostion.top = toSetPostion.top - 30
                    }
                    if (isForward) {
                        toSetPostion.right = contentEl.current.clientWidth - position.right + contentDivPosition.left
                    } else {
                        toSetPostion.left = position.left - contentDivPosition.left;
                    }

                    setPosition(toSetPostion)
                    setShareText(shareText)
                    setShowPopper(true)
                    document.addEventListener('click', closeOnClick);
                }

            }
        } else {
            if (popperEl && popperEl.current && !popperEl.current.contains(e.target)) {
                if (showPopper === true) {
                    setShowPopper(false)
                    document.removeEventListener('click', closeOnClick);
                }
            }

        }
    }

    return (
        <article ref={contentEl} onMouseUp={handleMouseUp} className={`relative ${className ? className : ''}`}>
            {showPopper === true && (
                <div
                    ref={popperEl}
                    style={{ position: "absolute", ...position, background: "red", height: "0px" }}
                >
                    <ShareIconPopper
                        shareUrl={options.shareUrl}
                        text={shareText}
                        title={title}
                    />
                </div>

            )}
            {/*             <div
                style={{ position: "fixed", ...fixedPosition, background: "green", height: "400px", width: "200px" }}
            > fixed popper</div> */}
            {children}
        </article>
    )
}

export default TextSelectPopper


function getSelectionTextAndPosition(selection: Selection) {
    let forward = false
    if (selection.isCollapsed) {
        forward = true
    }
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;
    const anchorOffset = selection.anchorOffset;
    const focusOffset = selection.focusOffset;
    const range = selection.rangeCount && selection.getRangeAt(0);
    if (range) {
        if (anchorNode && focusNode) {
            const comparedPositions = anchorNode.compareDocumentPosition(focusNode);
            if (comparedPositions === anchorNode.DOCUMENT_POSITION_FOLLOWING) {
                forward = true;
            } else if (comparedPositions === 0) {
                forward = (focusOffset - anchorOffset) > 0;
            }

            const endLineRect = getEndLineRect(range, forward)

            const content = range.toString()

            return ({
                position: endLineRect,
                shareText: content,
                isForward: forward
            })
        }
    }

}


export function getEndLineRect(range: Range, isForward: boolean) {
    let endLineRects: DOMRect[];
    const rangeRects = range.getClientRects();

    const sliceRects = [].slice.bind(rangeRects);
    const allRects: DOMRect[] = sliceRects(0)
    if (isForward) {
        let lastLeft = Infinity;
        let i = rangeRects.length;
        while (i--) {
            const rect = rangeRects[i];
            if (rect.left > lastLeft) break;
            lastLeft = rect.left;
        }
        endLineRects = sliceRects(i + 1);
    } else {
        let lastRight = -Infinity;
        let i = 0;
        for (; i < rangeRects.length; i++) {
            const rect = rangeRects[i];
            if (rect.right < lastRight) break;
            lastRight = rect.right;
        }
        endLineRects = sliceRects(0, i);
    }

    return {
        top: Math.min(...allRects.map(rect => rect.top)),
        bottom: Math.max(...endLineRects.map(rect => rect.bottom)),
        left: endLineRects[0].left,
        right: endLineRects[endLineRects.length - 1].right
    };
}


// https://github.com/MaxArt2501/share-this/blob/master/src/core.js