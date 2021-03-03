import React from 'react'
import { Link, GatsbyLinkProps } from 'gatsby'
import { trimSlug } from '@/helpers/index-js'
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

const CustomLink: React.FC<Omit<GatsbyLinkProps<{}>, 'ref'>> = ({ to, ...rest }) => {
    let updatedTo = to ? trimSlug(to) : ''

    return <Link to={`/${updatedTo}`} {...rest} />
}

export default CustomLink