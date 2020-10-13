import * as React from 'react'

const Dummy: React.FC<IDummy> = (props) => {
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
