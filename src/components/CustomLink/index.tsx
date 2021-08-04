import { trimSlug } from '@/helpers/index-js';
import { Link } from '@reach/router';
import { GatsbyLinkProps } from 'gatsby';
import React from 'react';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

const CustomLink: React.FC<Omit<GatsbyLinkProps<any>, 'ref'>> = ({ to, ...rest }) => {
	const updatedTo = to ? trimSlug(to) : '';

	return <Link to={`/${updatedTo}`} {...rest} />;
};

export default CustomLink;
