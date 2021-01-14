import * as React from "react"
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

const Content: React.FC<{ content: string }> = ({ content }) => {

    return (
        <div className="main-content leading-normal" dangerouslySetInnerHTML={{ __html: content }} />
    )
}

export default Content