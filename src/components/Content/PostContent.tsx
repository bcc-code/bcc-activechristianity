import * as React from 'react'
import loadable from '@loadable/component'
const ShareIconPopper = loadable(() => import('@/components/ToolTip/SocialMeidaShare'))
const GlossaryPopper = loadable(() => import('@/components/ToolTip/GlossaryPopper'))

const addScript = (url: string) => {
    const script = document.createElement("script")
    script.src = url
    script.async = true
    document.body.appendChild(script)
}

import { IGlossary } from '@/types'
import "./content.css"
interface IPosition { top: number, right?: number, left?: number };

const TextSelectPopper: React.FC<{ className?: string, content: string, glossary: IGlossary[], title: string, slug: string }> = ({ children, className, slug, title, glossary, content }) => {
    const [position, setPosition] = React.useState<IPosition>({ top: 0 })
    const [showGlossary, setShowGlossary] = React.useState(false)
    const [glossaryContent, setGlossaryContent] = React.useState<null | IGlossary>(null)
    const [showPopper, setShowPopper] = React.useState(false)
    const [shareText, setShareText] = React.useState('')
    const contentEl = React.useRef<HTMLDivElement>(null);
    const popperEl = React.useRef<HTMLDivElement>(null);
    const glossaryEl = React.useRef<HTMLDivElement>(null);
    const options = { shareUrl: process.env.SITE_URL + '/' + slug }

    const closeOnClick = (e: any) => {

        if (popperEl && popperEl.current && !popperEl.current.contains(e.target)) {

            setShowPopper(false)
            document.removeEventListener('click', closeOnClick);
        }
    }

    const closeOnGlossaryClick = (e: any) => {

        if (glossaryEl && glossaryEl.current && !glossaryEl.current.contains(e.target)) {

            setShowGlossary(false)
            document.removeEventListener('click', closeOnGlossaryClick);
        }
    }
    const handleMouseUp = (e: any) => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            const isGlossary = e.target.classList.contains("ac-glossary-link")
            if (isGlossary) {
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

        if (selectionObj) {
            const hasSelected = selectionObj.anchorOffset !== selectionObj.focusOffset
            const isGlossary = e.target.classList.contains("ac-glossary-link")
            const selectionInfo = getSelectionTextAndPosition(selectionObj)
            if (isGlossary || hasSelected) {

                if (selectionInfo) {
                    if (contentEl && contentEl.current) {
                        const contentDivPosition = contentEl.current.getBoundingClientRect()
                        const { position, isForward, shareText } = selectionInfo

                        const toSetPostion: IPosition = {
                            top: position.top - contentDivPosition.top,
                        }

                        if (position.top < 105) {
                            /* toSetPostion.top =  */
                            toSetPostion.top = toSetPostion.top + (position.bottom - position.top)
                        } else {
                            toSetPostion.top = toSetPostion.top - 45
                        }
                        if (isForward) {
                            toSetPostion.right = contentEl.current.clientWidth - position.right + contentDivPosition.left
                        } else {
                            toSetPostion.left = position.left - contentDivPosition.left;
                        }

                        setPosition(toSetPostion)
                        if (isGlossary) {
                            const findGlossary = glossary?.find(g => {
                                return g.word.toLocaleLowerCase() === e.target.textContent.toLocaleLowerCase()
                            })

                            if (findGlossary) {
                                setGlossaryContent(findGlossary)
                                setShowPopper(false)
                                setShowGlossary(true)

                                setTimeout(() => {
                                    document.addEventListener('click', closeOnGlossaryClick);
                                }, 100)
                                // closeOnGlossaryClick
                            }


                        } else if (hasSelected) {
                            setShareText(shareText)
                            setShowPopper(true)
                            setShowGlossary(false)
                            setTimeout(() => {
                                document.addEventListener('click', closeOnClick);
                            }, 100)
                        }

                    }

                }
            }

        }
    }

    return (
        <article ref={contentEl} onMouseUp={handleMouseUp} className={`relative ${className ? className : ''}`}>
            {showPopper === true && (
                <div
                    ref={popperEl}
                    style={{ position: "absolute", ...position, height: "0px" }}
                >
                    <ShareIconPopper
                        shareUrl={options.shareUrl}
                        text={shareText}
                        title={title}
                    />
                </div>

            )}
            {showGlossary && (
                <div
                    style={{ position: "absolute", ...position, height: "16px" }}
                    ref={glossaryEl}
                    className=" leading-8 font-normal font-sans min-w-64 max-w-64"
                >
                    {/* {g.content}... */}
                    <GlossaryPopper
                        text={glossaryContent?.content}
                        slug={glossaryContent?.slug}
                    />
                    {/*  <a target="_blank" href={`${ac_strings.slug_glossary}/`}> {ac_strings.read_more} </a> */}
                </div>
            )}
            <div className="main-content leading-normal" dangerouslySetInnerHTML={{ __html: content }} />

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