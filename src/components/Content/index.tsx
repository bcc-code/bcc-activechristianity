import * as React from "react"
import ReactHtmlParser from "react-html-parser"
import Link from '@/components/CustomLink'
import SelectionPopper from '@/components/TextSelectPopper'
import RightImgPost from '@/components/PostItemCards/RightImg'
import { FetchOnePost } from '@/HOC/FetchPosts'
import { IGlossary } from '@/types'
import ToolTipGlossary from '@/components/ToolTip'
import ac_strings from '@/strings/ac_strings'
import { htmlTags2PlainText } from '@/helpers'
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
                        node.attribs.class.indexOf('ac-glossary-link') > -1 &&
                        node.children &&
                        node.children[0]) {

                        const word = node.children[0].data

                        if (glossary) {
                            const g = glossary.find(item => item.word.toLowerCase() === word)

                            if (g) {
                                let shorten = htmlTags2PlainText(g.content)

                                if (g.content.length > 235) {
                                    let parts = shorten.substr(0, 220).split(' ')
                                    parts.pop()
                                    shorten = parts.join(' ')
                                }
                                return (
                                    <ToolTipGlossary popperContent={
                                        <span className="text-sm leading-normal font-normal font-sans max-w-64 py-6" >
                                            {shorten}...
                                            <a target="_blank" href={`${ac_strings.slug_glossary}/${g.slug}`}> {ac_strings.read_more} </a>
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

                    if (process.env.SITE_URL && node.type === 'tag' &&
                        node.name === 'a' &&
                        node.attribs &&
                        node.attribs.href
                    ) {

                        const text = node.children[0].data
                        const apiUrl = String(process.env.SITE_URL).replace(/(https?:|\/)/gm, '')
                        if (node.attribs.href.indexOf(apiUrl) > -1) {

                            const internalLink = node.attribs.href
                                .replace(`${apiUrl}/media`, '')
                                .replace(`${apiUrl}`, '')
                                .replace(`https://`, '')
                                .replace(`http://`, '')
                            return (
                                <Link to={internalLink}>{text}</Link>
                            )
                        } else {
                            return (
                                <a href={node.attribs.href}>{text}!</a>
                            )
                        }

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
                                <FetchOnePost
                                    slug={alink}

                                    render={({ post }) => {
                                        if (post) {
                                            return (
                                                <div>
                                                    <RightImgPost {...post} />
                                                </div>
                                            )
                                        } else {
                                            return <div></div>
                                        }

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
            className="main-content leading-normal"
            slug={slug}
            title={title}
        >
            {body}
        </SelectionPopper>
    )
}

export default Content