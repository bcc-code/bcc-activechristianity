import React from 'react'
import Link from '@/components/CustomLink'
import { INavItem } from '@/types'
import './postMetaLinks.css'

interface Iprops {
    links: INavItem[],
    prefix?: string
}

const MetaLinks: React.SFC<Iprops> = ({ links, prefix }) => {

    /*     const hasComma = links.length > 1; */
    return (
        <div className="">
            {links.map((item, i) => (
                <Link
                    className={'inline-block text-d4slate underline px-2'}
                    to={`${prefix ? '/' + prefix : ''}/${item.to}`}
                    key={i}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    )
}

export default MetaLinks;
