import * as React from "react"
import ReactHtmlParser from "react-html-parser"
import FetchPost from '@/components/FetchPost'
import shareThis from "share-this";
import "./content.css"
import h2p from 'html2plaintext'
import TooltipTrigger from '@/components/ToolTip';
import "share-this/style/scss/share-this.scss"
import * as twitterSharer from "share-this/dist/sharers/twitter"
import * as facebookSharer from "share-this/dist/sharers/facebook"
import * as emailSharer from "share-this/dist/sharers/email"
import { IGlossary } from '@/types'
import TS from '@/strings'
interface HTMLNode {
    type: string
    name: string
    data: string
    attribs: {
        [k: string]: string
    }
    children: HTMLNode[]
    parent: HTMLNode
}

const selectionShare = typeof window !== 'undefined' ? shareThis({
    sharers: [twitterSharer, facebookSharer, emailSharer]
}) : {
        init: () => { },
        destroy: () => { }
    }


const Content: React.FC<{ content: string, glossary?: IGlossary[] }> = ({ content, glossary }) => {
    React.useEffect(() => {

        selectionShare.init();
        return () => {
            selectionShare.destroy();
        }
    }, [])

    const generateBody = () => {
        if (content) {
            let updated = ReactHtmlParser(content, {
                transform(obj: object) {
                    const node = obj as HTMLNode

                    if (node.name === "script") {
                        return null
                    }

                    if (
                        node.attribs &&
                        node.attribs.class &&
                        node.attribs.class.indexOf('ac-glossary-link') > -1) {

                        const word = node.children[0].data

                        if (glossary) {
                            const g = glossary.find(item => item.word.toLowerCase() === word)

                            if (g) {
                                let shorten = h2p(g.content)

                                if (g.content.length > 235) {
                                    let parts = shorten.substr(0, 220).split(' ')
                                    parts.pop()
                                    shorten = parts.join(' ')
                                }
                                return (
                                    <TooltipTrigger

                                        tooltip={(
                                            <span className="">
                                                <span className="text-sm leading-normal font-normal font-sans" >
                                                    {shorten}
                                                    <a target="_blank" href={`${TS.glossary}/${g.slug}`}> ... </a>
                                                </span>

                                            </span>
                                        )}
                                    >
                                        {word}

                                    </TooltipTrigger>
                                )
                            }

                        }
                        return (
                            <span>{word}</span>

                        )

                    }
                    if (node.type === 'tag' &&
                        node.name === 'audio' &&
                        node.attribs &&
                        node.attribs.class &&
                        node.attribs.class.indexOf('wp-audio-shortcode') > -1) {
                        return null;
                    }


                    if (node.type === 'tag' &&
                        node.name === 'div' &&
                        node.attribs &&
                        node.attribs.class &&
                        node.attribs.class.indexOf('cue-playlist-container') > -1) {
                        return null;
                    }

                    if (node.type === 'tag' &&
                        node.attribs &&
                        node.attribs.class &&
                        node.attribs.class.indexOf('powerpress') > -1
                    ) {
                        return null;
                    }

                    if (node.name === "blockquote" &&
                        node.attribs &&
                        node.attribs.class &&
                        node.attribs.class.indexOf('wp-embedded-content') > -1) {
                        if (!node.children.length ||
                            !node.children[0].children.length ||
                            !node.children[0].children[0].attribs) return

                        const alink = node.children[0].children[0].attribs.href
                        if (!alink) return
                        return <FetchPost url={`${alink}`} />
                    }

                }
            })

            return updated
        } else {
            return null
        }
    }

    const body = generateBody()


    return (
        <div className="main-content leading-normal">
            {body}
        </div>
    )
}

export default Content