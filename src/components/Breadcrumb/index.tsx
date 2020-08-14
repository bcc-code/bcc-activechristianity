import React from 'react';
import Link from '@/components/CustomLink';
import { INavItem } from '@/types';
import HomeIcon from '@/components/Icons/Home'

// https://developers.google.com/search/docs/data-types/breadcrumb

import './breadcrumb.css'

interface IProps {
    items: INavItem[]
}
const Breadcrumb: React.SFC<IProps> = ({ items }) => {
    const breadcrumb = items.length > 0 ? [
        {
            name: <HomeIcon className="w-4 h-4" />,
            to: '/'
        },
        ...items
    ] : items
    return (
        <ol className="flex pb-2 text-xs text-gray-500">

            {breadcrumb.map((item, i) => {
                if (item) {
                    return (
                        <li key={i} className="breadcrumb-item" >
                            <Link activeClassName="text-gray-300" to={`/${item.to}`}>
                                {typeof item.name === "string" ? String(item.name).toUpperCase() : item.name}
                            </Link>
                        </li>
                    )
                } else {
                    return null
                }

            })}
        </ol>
    )
}

export default Breadcrumb;

