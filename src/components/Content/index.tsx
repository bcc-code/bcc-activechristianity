import * as React from "react"
import ReactHtmlParser from "react-html-parser"
import FetchPost from '@/layout-parts/HOC/FetchPosts'

import h2p from 'html2plaintext'
import SelectionPopper from '@/components/TextSelectPopper'
import RightImgPost from '@/components/PostItem/RightImgWDes'

import { IGlossary } from '@/types'
import ToolTipGlossary from '@/components/ToolTip'
import TS from '@/strings'
import "./content.css"

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


const Content: React.FC<{ content: string, glossary?: IGlossary[], title: string, slug: string }> = ({ content, glossary, title, slug }) => {
    /*     React.useEffect(() => {
    
            selectionShare.init();
            return () => {
                selectionShare.destroy();
            }
        }, [])
     */
    console.log(content)
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
                                    <ToolTipGlossary popperContent={
                                        <span className="text-sm leading-normal font-normal font-sans max-w-64 py-6" >
                                            {shorten}...
                                            <a target="_blank" href={`${TS.slug_glossary}/${g.slug}`}> {TS.read_more} </a>
                                        </span>
                                    }>
                                        <span className="rtBibleRef"> {word}</span>
                                    </ToolTipGlossary>

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
                        return (
                            <div className="">
                                <FetchPost
                                    slugs={[alink]}
                                    layout="list"
                                    render={({ posts }) => {
                                        return (
                                            <div>
                                                {posts.map(post => (
                                                    <RightImgPost {...post} />
                                                ))}
                                            </div>
                                        )
                                    }}
                                />
                            </div>
                        )
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
        <SelectionPopper
            className="main-content leading-normal font-serif"
            slug={slug}
            title={title}
        >
            {body}
        </SelectionPopper>
    )
}

export default Content