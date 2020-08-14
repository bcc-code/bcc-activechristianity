import React from 'react'
import { Link, GatsbyLinkProps } from 'gatsby'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

const CustomLink: React.FC<Omit<GatsbyLinkProps<{}>, 'ref'>> = ({ to, ...rest }) => {
    const regex = /^[/]*/gm
    let updatedTo = to ? to.replace(regex, '') : ''

    return <Link to={`/${updatedTo}`} {...rest} />
}

export default CustomLink