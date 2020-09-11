import React from 'react';
import Link from '@/components/CustomLink';
import { IBreadcrumb } from '@/types';
import Icon from '@/components/Icons'
// https://developers.google.com/search/docs/data-types/breadcrumb

import './breadcrumb.css'

const Breadcrumb: React.SFC<IBreadcrumb> = ({ items }) => {
    const breadcrumb = items.length > 0 ? [
        {
            name: <Icon size="base" name="home" />,
            to: '/'
        },
        ...items
    ] : items
    return (
        <ol className="flex pb-2 text-sm text-gray-500">

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

