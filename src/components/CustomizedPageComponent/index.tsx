import * as React from 'react'
import BlockWrapper, { IPageCompTypes } from './BlockWrapper'

const CustomizedPage: React.FC<{ items: IPageCompTypes[], slug: string, title: string }> = ({ items, slug, title }) => {
    return (
        <div>
            {items.map((section, k) => {
                console.log(section)
                return (
                    <BlockWrapper key={k} h1={k === 0 ? title : undefined} theme={`${k % 2 == 1 ? k % 4 == 1 ? 'primary' : 'secondary' : 'light'}`} content={section}>
                        section
                    </BlockWrapper>
                )
            })}
        </div>
    )
}

export default CustomizedPage

