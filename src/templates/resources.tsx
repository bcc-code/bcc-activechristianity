import * as React from 'react'
import { graphql } from "gatsby"
const Dummy: React.FC<IDummy> = (props) => {
    console.log(props)
    return (
        <div>
            {props.pageContext.title}
        </div>
    )
}

export default Dummy

interface IDummy {
    path: string

    pageContext: {
        title: string

    }
}
